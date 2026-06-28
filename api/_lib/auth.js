"use strict";

const crypto = require("crypto");

const SESSION_SECONDS = 60 * 60 * 12;

function json(response, status, payload, headers = {}) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  Object.entries(headers).forEach(([name, value]) => response.setHeader(name, value));
  response.end(JSON.stringify(payload));
}

function parseCookies(request) {
  return Object.fromEntries((request.headers.cookie || "").split(";").map((part) => part.trim()).filter(Boolean).map((part) => {
    const index = part.indexOf("=");
    return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
  }));
}

function signature(value) {
  return crypto.createHmac("sha256", process.env.APP_SECRET || "").update(value).digest("base64url");
}

function sessionToken() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${expires}.${signature(expires)}`;
}

function authenticated(request) {
  if (!process.env.APP_SECRET) return false;
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
    return new URL(origin).host === (request.headers["x-forwarded-host"] || request.headers.host);
  } catch {
    return false;
  }
}

function requireAdmin(request, response) {
  if (!authenticated(request)) {
    json(response, 401, { error: "Connexion requise" });
    return false;
  }
  if (!mutationAllowed(request)) {
    json(response, 403, { error: "Origine refusée" });
    return false;
  }
  return true;
}

module.exports = { SESSION_SECONDS, authenticated, json, requireAdmin, safeEqual, sessionToken };
