"use strict";

const { requireAdmin, json } = require("./_lib/auth");
const { writeContent } = require("./_lib/content");
const defaultContent = require("../data/default-content.json");

module.exports = async function handler(request, response) {
  if (request.method !== "POST") return json(response, 405, { error: "Méthode refusée" });
  if (!requireAdmin(request, response)) return;
  try {
    const blob = await writeContent(defaultContent);
    return json(response, 200, { ok: true, contentUrl: blob.url });
  } catch (error) {
    return json(response, error.status || 500, { error: error.message || "Réinitialisation impossible" });
  }
};
