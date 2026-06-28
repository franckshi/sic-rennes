"use strict";

const { json } = require("./_lib/auth");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") return json(response, 405, { error: "Méthode refusée" });
  return json(response, 200, {
    ok: true,
    storageConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    adminConfigured: Boolean(process.env.INITIAL_ADMIN_CODE && process.env.APP_SECRET)
  });
};
