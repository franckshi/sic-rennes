"use strict";

const { SESSION_SECONDS, json, safeEqual, sessionToken } = require("./_lib/auth");

const attempts = new Map();

module.exports = async function handler(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Méthode refusée" });
  if (!process.env.INITIAL_ADMIN_CODE || !process.env.APP_SECRET) {
    return json(response, 503, { error: "Administration Vercel non configurée" });
  }
  const ip = String(request.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const recent = (attempts.get(ip) || []).filter((time) => Date.now() - time < 10 * 60 * 1000);
  if (recent.length >= 8) return json(response, 429, { error: "Trop de tentatives. Réessayez plus tard." });
  const payload = request.body && typeof request.body === "object" ? request.body : {};
  if (!safeEqual(payload.code || "", process.env.INITIAL_ADMIN_CODE)) {
    recent.push(Date.now());
    attempts.set(ip, recent);
    return json(response, 401, { error: "Code incorrect" });
  }
  attempts.delete(ip);
  return json(response, 200, { ok: true }, {
    "Set-Cookie": `sic_session=${sessionToken()}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`
  });
};
