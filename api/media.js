"use strict";

const { del, put } = require("@vercel/blob");
const { requireAdmin, json } = require("./_lib/auth");

const MAX_BYTES = 3 * 1024 * 1024;

function token() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw Object.assign(new Error("Stockage Vercel Blob non configuré"), { status: 503 });
  return process.env.BLOB_READ_WRITE_TOKEN;
}

function safeName(value) {
  return String(value || "image")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/(^-+|-+$)/g, "") || "image";
}

module.exports = async function handler(request, response) {
  if (!["POST", "DELETE"].includes(request.method)) return json(response, 405, { error: "Méthode refusée" });
  if (!requireAdmin(request, response)) return;
  try {
    if (request.method === "DELETE") {
      const urls = Array.isArray(request.body?.urls) ? request.body.urls.filter((url) => /\.public\.blob\.vercel-storage\.com\//.test(url)) : [];
      if (urls.length) await del(urls, { token: token() });
      return json(response, 200, { ok: true });
    }
    const match = String(request.body?.data || "").match(/^data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=\s]+)$/i);
    if (!match) return json(response, 400, { error: "Image invalide" });
    const buffer = Buffer.from(match[2].replace(/\s/g, ""), "base64");
    if (!buffer.length || buffer.length > MAX_BYTES) return json(response, 413, { error: "Image trop volumineuse (3 Mo maximum)" });
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[match[1].toLowerCase()] || "img";
    const base = safeName(request.body?.name).replace(/\.[a-z0-9]+$/i, "");
    const blob = await put(`media/${Date.now()}-${base}.${extension}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: match[1],
      token: token()
    });
    return json(response, 201, { ok: true, url: blob.url });
  } catch (error) {
    return json(response, error.status || 500, { error: error.message || "Téléversement impossible" });
  }
};
