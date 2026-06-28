import fs from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const sourcePath = path.resolve(process.argv[2] || "/private/tmp/sic-content-latest.json");
const outputPath = path.resolve(process.argv[3] || "/private/tmp/sic-content-vercel.json");
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) throw new Error("BLOB_READ_WRITE_TOKEN est requis");

const content = JSON.parse(await fs.readFile(sourcePath, "utf8"));
let uploaded = 0;

async function migrate(value, trail = []) {
  if (typeof value === "string" && value.startsWith("data:image/")) {
    const match = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/is);
    if (!match) return value;
    const extension = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[match[1].toLowerCase()] || "img";
    const name = trail.map((part) => String(part).replace(/[^a-z0-9_-]+/gi, "-")).filter(Boolean).join("-") || `image-${uploaded + 1}`;
    const blob = await put(`media/migrated-${name}.${extension}`, Buffer.from(match[2], "base64"), {
      access: "public",
      addRandomSuffix: true,
      contentType: match[1],
      token
    });
    uploaded += 1;
    process.stdout.write(`Image ${uploaded} migrée\n`);
    return blob.url;
  }
  if (Array.isArray(value)) {
    const result = [];
    for (let index = 0; index < value.length; index += 1) result.push(await migrate(value[index], [...trail, index]));
    return result;
  }
  if (value && typeof value === "object") {
    const result = {};
    for (const [key, child] of Object.entries(value)) result[key] = await migrate(child, [...trail, key]);
    return result;
  }
  return value;
}

const migrated = await migrate(content);
const contentBlob = await put("content/content.json", JSON.stringify(migrated), {
  access: "public",
  addRandomSuffix: false,
  allowOverwrite: true,
  cacheControlMaxAge: 60,
  contentType: "application/json; charset=utf-8",
  token
});
await fs.writeFile(outputPath, `${JSON.stringify(migrated, null, 2)}\n`);
process.stdout.write(`CONTENT_URL=${contentBlob.url}\nOUTPUT=${outputPath}\nIMAGES=${uploaded}\n`);
