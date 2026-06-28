"use strict";

const { requireAdmin, json } = require("../_lib/auth");
const { COLLECTIONS, readContent, writeContent } = require("../_lib/content");

module.exports = async function handler(request, response) {
  if (request.method !== "PUT") return json(response, 405, { error: "Méthode refusée" });
  if (!requireAdmin(request, response)) return;
  const collection = request.query.collection;
  if (!COLLECTIONS.includes(collection)) return json(response, 404, { error: "Collection inconnue" });
  if (!Array.isArray(request.body?.value)) return json(response, 400, { error: "Tableau attendu" });
  try {
    const data = await readContent({ fallback: true });
    data[collection] = request.body.value;
    const blob = await writeContent(data);
    return json(response, 200, { ok: true, contentUrl: blob.url, updatedAt: new Date().toISOString() });
  } catch (error) {
    return json(response, error.status || 500, { error: error.message || "Enregistrement impossible" });
  }
};
