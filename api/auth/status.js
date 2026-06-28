"use strict";

const { authenticated, json } = require("../_lib/auth");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") return json(response, 405, { error: "Méthode refusée" });
  return json(response, 200, { authenticated: authenticated(request) });
};
