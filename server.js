"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const vm = require("vm");
const { execFileSync, execFile } = require("child_process");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const CONTENT_REPO = process.env.CONTENT_REPO || "";
const CONTENT_BRANCH = process.env.CONTENT_BRANCH || "content";
const GIT_SSH_KEY_FILE = process.env.GIT_SSH_KEY_FILE || "";
const DATA_DIR = process.env.DATA_DIR || (CONTENT_REPO ? path.join("/tmp", "sic-rennes-content") : path.join(ROOT, ".data"));
const DATA_FILE = path.join(DATA_DIR, "content.json");
const readSecret = (value, file, fallback) => {
  if (value) return value;
  if (file && fs.existsSync(file)) return fs.readFileSync(file, "utf8").trim();
  return fallback;
};
const ADMIN_CODE = readSecret(process.env.INITIAL_ADMIN_CODE, process.env.INITIAL_ADMIN_CODE_FILE, "SIC-RENNES-LOCAL");
const APP_SECRET = readSecret(process.env.APP_SECRET, process.env.APP_SECRET_FILE, "local-development-secret-change-me");
const ADMIN_CONFIGURED = process.env.NODE_ENV !== "production" || Boolean(
  (process.env.INITIAL_ADMIN_CODE || (process.env.INITIAL_ADMIN_CODE_FILE && fs.existsSync(process.env.INITIAL_ADMIN_CODE_FILE))) &&
  (process.env.APP_SECRET || (process.env.APP_SECRET_FILE && fs.existsSync(process.env.APP_SECRET_FILE)))
);
const COLLECTIONS = ["schools", "teachers", "programs", "events", "activities"];
const SESSION_SECONDS = 60 * 60 * 12;
const BODY_LIMIT = 40 * 1024 * 1024;
const attempts = new Map();
let writeQueue = Promise.resolve();
let dataReady = false;

function gitEnvironment() {
  return {
    ...process.env,
    GIT_TERMINAL_PROMPT: "0",
    GIT_SSH_COMMAND: GIT_SSH_KEY_FILE
      ? `ssh -i ${GIT_SSH_KEY_FILE} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new`
      : process.env.GIT_SSH_COMMAND || ""
  };
}

function gitSync(args) {
  return execFileSync("git", args, {
    cwd: fs.existsSync(path.join(DATA_DIR, ".git")) ? DATA_DIR : ROOT,
    env: gitEnvironment(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function gitAsync(args) {
  return new Promise((resolve, reject) => {
    execFile("git", args, { cwd: DATA_DIR, env: gitEnvironment() }, (error, stdout, stderr) => {
      if (error) {
        error.message = `${error.message}\n${stderr}`.trim();
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

function initialData() {
  const source = fs.readFileSync(path.join(ROOT, "js", "seed-data.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: "seed-data.js" });
  return JSON.parse(JSON.stringify(sandbox.window.SEED_DATA));
}

function validData(value) {
  return value && typeof value === "object" && COLLECTIONS.every((name) => Array.isArray(value[name]));
}

function ensureData() {
  if (dataReady) return;
  if (CONTENT_REPO) {
    if (fs.existsSync(path.join(DATA_DIR, ".git"))) {
      gitSync(["fetch", "origin", CONTENT_BRANCH]);
      gitSync(["reset", "--hard", `origin/${CONTENT_BRANCH}`]);
    } else {
      fs.mkdirSync(path.dirname(DATA_DIR), { recursive: true });
      execFileSync("git", ["clone", "--depth", "1", "--branch", CONTENT_BRANCH, "--single-branch", CONTENT_REPO, DATA_DIR], {
        cwd: path.dirname(DATA_DIR),
        env: gitEnvironment(),
        stdio: ["ignore", "pipe", "pipe"]
      });
    }
  } else {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData(), null, 2));
  }
  dataReady = true;
}

function readData() {
  ensureData();
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    if (!validData(parsed)) throw new Error("Structure de données invalide");
    return parsed;
  } catch (error) {
    console.error("Données illisibles, restauration des données initiales.", error);
    const fallback = initialData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function writeData(data) {
  if (!validData(data)) return Promise.reject(new Error("Structure de données invalide"));
  writeQueue = writeQueue.then(async () => {
    ensureData();
    const temporary = `${DATA_FILE}.${process.pid}.tmp`;
    await fs.promises.writeFile(temporary, JSON.stringify(data, null, 2));
    await fs.promises.rename(temporary, DATA_FILE);
    if (CONTENT_REPO) {
      await gitAsync(["config", "user.name", "SIC Rennes Admin"]);
      await gitAsync(["config", "user.email", "admin@sic-rennes.fr"]);
      await gitAsync(["add", "content.json"]);
      const changed = await new Promise((resolve) => {
        execFile("git", ["diff", "--cached", "--quiet"], { cwd: DATA_DIR, env: gitEnvironment() }, (error) => resolve(Boolean(error)));
      });
      if (changed) {
        await gitAsync(["commit", "-m", `Update website content ${new Date().toISOString()}`]);
        await gitAsync(["push", "origin", CONTENT_BRANCH]);
      }
    }
  });
  return writeQueue;
}

function json(response, status, payload, headers = {}) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  response.end(JSON.stringify(payload));
}

function redirect(response, location) {
  response.writeHead(302, { Location: location, "Cache-Control": "no-store" });
  response.end();
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").map((part) => part.trim()).filter(Boolean).map((part) => {
    const index = part.indexOf("=");
    return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
  }));
}

function signature(value) {
  return crypto.createHmac("sha256", APP_SECRET).update(value).digest("base64url");
}

function sessionToken() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${signature(expires)}`;
}

function authenticated(request) {
  const token = parseCookies(request).sic_session || "";
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || Number(expires) < Date.now() / 1000) return false;
  const expected = signature(expires);
  if (supplied.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

function safeEqual(left, right) {
  const a = crypto.createHash("sha256").update(String(left)).digest();
  const b = crypto.createHash("sha256").update(String(right)).digest();
  return crypto.timingSafeEqual(a, b);
}

function mutationAllowed(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.host;
  } catch {
    return false;
  }
}

function bodyJSON(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > BODY_LIMIT) {
        reject(Object.assign(new Error("Fichier trop volumineux"), { status: 413 }));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch {
        reject(Object.assign(new Error("JSON invalide"), { status: 400 }));
      }
    });
    request.on("error", reject);
  });
}

function securityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "SAMEORIGIN");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self' data: blob:; connect-src 'self'; base-uri 'self'; form-action 'self'");
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function staticFile(requestPath, response) {
  let clean = decodeURIComponent(requestPath.split("?")[0]);
  if (clean === "/") clean = "/index.html";
  if (clean.endsWith("/")) clean += "index.html";
  if (clean.includes("\0") || clean.split("/").some((part) => part === ".." || part.startsWith("."))) return false;
  if (["/server.js", "/package.json", "/package-lock.json", "/render.yaml"].includes(clean)) return false;
  const file = path.resolve(ROOT, `.${clean}`);
  if (!file.startsWith(`${ROOT}${path.sep}`) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return false;
  const type = MIME[path.extname(file).toLowerCase()];
  if (!type) return false;
  response.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-cache"
  });
  fs.createReadStream(file).pipe(response);
  return true;
}

async function api(request, response, pathname) {
  if (pathname === "/api/health" && request.method === "GET") {
    return json(response, 200, { ok: true });
  }

  if (pathname === "/api/auth/status" && request.method === "GET") {
    return json(response, 200, { authenticated: authenticated(request) });
  }

  if (pathname === "/api/login" && request.method === "POST") {
    if (!ADMIN_CONFIGURED) return json(response, 503, { error: "Administration en attente de configuration Render" });
    const ip = request.headers["x-forwarded-for"]?.split(",")[0].trim() || request.socket.remoteAddress || "unknown";
    const recent = (attempts.get(ip) || []).filter((time) => Date.now() - time < 10 * 60 * 1000);
    if (recent.length >= 8) return json(response, 429, { error: "Trop de tentatives. Réessayez plus tard." });
    const payload = await bodyJSON(request);
    if (!safeEqual(payload.code || "", ADMIN_CODE)) {
      recent.push(Date.now());
      attempts.set(ip, recent);
      return json(response, 401, { error: "Code incorrect" });
    }
    attempts.delete(ip);
    return json(response, 200, { ok: true }, {
      "Set-Cookie": `sic_session=${sessionToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_SECONDS}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
    });
  }

  if (pathname === "/api/logout" && request.method === "POST") {
    return json(response, 200, { ok: true }, {
      "Set-Cookie": "sic_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0"
    });
  }

  if (!authenticated(request)) return json(response, 401, { error: "Connexion requise" });
  if (!mutationAllowed(request)) return json(response, 403, { error: "Origine refusée" });

  if (pathname.startsWith("/api/data/") && request.method === "PUT") {
    const collection = pathname.slice("/api/data/".length);
    if (!COLLECTIONS.includes(collection)) return json(response, 404, { error: "Collection inconnue" });
    const payload = await bodyJSON(request);
    if (!Array.isArray(payload.value)) return json(response, 400, { error: "Tableau attendu" });
    const data = readData();
    data[collection] = payload.value;
    await writeData(data);
    return json(response, 200, { ok: true, updatedAt: new Date().toISOString() });
  }

  if (pathname === "/api/import" && request.method === "PUT") {
    const payload = await bodyJSON(request);
    const source = payload.data || payload;
    if (!validData(source)) return json(response, 400, { error: "Sauvegarde incomplète" });
    await writeData(source);
    return json(response, 200, { ok: true });
  }

  if (pathname === "/api/reset" && request.method === "POST") {
    await writeData(initialData());
    return json(response, 200, { ok: true });
  }

  return json(response, 404, { error: "API introuvable" });
}

ensureData();

const server = http.createServer(async (request, response) => {
  securityHeaders(response);
  const pathname = new URL(request.url, `http://${request.headers.host || "localhost"}`).pathname;
  try {
    if (pathname.startsWith("/api/")) return await api(request, response, pathname);
    if (pathname === "/js/seed-data.js") {
      response.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "no-store" });
      return response.end(`window.SEED_DATA = ${JSON.stringify(readData()).replace(/</g, "\\u003c")};`);
    }
    if (pathname === "/admin.html" && !authenticated(request)) return redirect(response, "/login.html");
    if (pathname === "/login.html" && authenticated(request)) return redirect(response, "/admin.html");
    if (staticFile(pathname, response)) return;
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page introuvable");
  } catch (error) {
    console.error(error);
    if (!response.headersSent) json(response, error.status || 500, { error: error.message || "Erreur serveur" });
    else response.end();
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SIC à Rennes disponible sur le port ${PORT}`);
});
