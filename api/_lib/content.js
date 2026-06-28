"use strict";

const { list, put } = require("@vercel/blob");
const defaultContent = require("../../data/default-content.json");

const COLLECTIONS = ["schools", "teachers", "programs", "events", "activities"];
const CONTENT_PATH = "content/content.json";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function validData(value) {
  return value && typeof value === "object" && COLLECTIONS.every((name) => Array.isArray(value[name]));
}

function token() {
  const value = process.env.BLOB_READ_WRITE_TOKEN;
  if (!value) throw Object.assign(new Error("Stockage Vercel Blob non configuré"), { status: 503 });
  return value;
}

async function findContentBlob() {
  const result = await list({ prefix: CONTENT_PATH, limit: 20, token: token() });
  return result.blobs.find((blob) => blob.pathname === CONTENT_PATH) || null;
}

async function readContent({ fallback = false } = {}) {
  try {
    const blob = await findContentBlob();
    if (!blob) return clone(defaultContent);
    const separator = blob.url.includes("?") ? "&" : "?";
    const response = await fetch(`${blob.url}${separator}v=${encodeURIComponent(blob.uploadedAt || Date.now())}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Lecture Blob impossible (${response.status})`);
    const data = await response.json();
    if (!validData(data)) throw new Error("Structure de données invalide");
    return data;
  } catch (error) {
    if (fallback) return clone(defaultContent);
    throw error;
  }
}

async function writeContent(data) {
  if (!validData(data)) throw Object.assign(new Error("Structure de données invalide"), { status: 400 });
  return put(CONTENT_PATH, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json; charset=utf-8",
    token: token()
  });
}

module.exports = { COLLECTIONS, CONTENT_PATH, readContent, validData, writeContent };
