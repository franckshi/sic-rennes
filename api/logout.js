"use strict";

const { json } = require("./_lib/auth");

module.exports = async function handler(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Méthode refusée" });
  return json(response, 200, { ok: true }, {
    "Set-Cookie": "sic_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
  });
};
