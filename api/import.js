"use strict";

const { requireAdmin, json } = require("./_lib/auth");
const { validData, writeContent } = require("./_lib/content");

module.exports = async function handler(request, response) {
  if (request.method !== "PUT") return json(response, 405, { error: "Méthode refusée" });
  if (!requireAdmin(request, response)) return;
  const source = request.body?.data || request.body;
  if (!validData(source)) return json(response, 400, { error: "Sauvegarde incomplète" });
  try {
    const blob = await writeContent(source);
    return json(response, 200, { ok: true, contentUrl: blob.url });
  } catch (error) {
    return json(response, error.status || 500, { error: error.message || "Import impossible" });
  }
};
