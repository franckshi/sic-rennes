"use strict";

const { readContent } = require("./_lib/content");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.statusCode = 405;
    return response.end("Méthode refusée");
  }
  try {
    const data = await readContent({ fallback: true });
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=600");
    return response.end(JSON.stringify(data));
  } catch (error) {
    response.statusCode = error.status || 500;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    return response.end(JSON.stringify({ error: error.message }));
  }
};
