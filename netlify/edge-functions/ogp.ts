
const SITE_NAME = "透明なセカイ";
const DEFAULT_DESCRIPTION = "ここにはなんもないかもだし、あるかも\nこのサイトを見てみればわかる…のかな";
const OG_IMAGE = "https://yuyuyu-homepage.netlify.app/og-image.png";

function escapeAttr(value: string) {
  return value.replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
}

function getTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1].replace(/<[^>]*>/g, "").trim() || SITE_NAME;
}

function getDescription(html: string) {
  const match = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
  );
  return match?.[1] || DEFAULT_DESCRIPTION;
}

function setMeta(html: string, key: string, value: string, attr: string) {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(value)}">`;
  const pattern = new RegExp(
    `<meta\\b(?=[^>]*\\b${attr}=["']${key}["'])[^>]*>`, "i"
  );

  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace(/<head[^>]*>/i, `$&\n${tag}`);
}

export default async function handler(request: Request, context: any) {
  const response = await context.next();
  const type = response.headers.get("content-type") || "";

  if (!type.includes("text/html")) return response;

  let html = await response.text();
  if (!/<head\b/i.test(html)) return response;

  const title = getTitle(html);
  const description = getDescription(html);
  const url = new URL(request.url).href;

  const tags = [
    ["og:type", "website", "property"],
    ["og:title", title, "property"],
    ["og:description", description, "property"],
    ["og:url", url, "property"],
    ["og:image", OG_IMAGE, "property"],
    ["og:site_name", SITE_NAME, "property"],
    ["twitter:card", "summary_large_image", "name"],
    ["twitter:title", title, "name"],
    ["twitter:description", description, "name"],
    ["twitter:image", OG_IMAGE, "name"]
  ];

  for (const [key, value, attr] of tags) {
    html = setMeta(html, key, value, attr);
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("etag");

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export const config = {
  path: "/*",
  method: ["GET"],
  excludedPath: [
    "/style/*",
    "/script/*",
    "/assets/*",
    "/*.css",
    "/*.js",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.webp",
    "/*.svg",
    "/*.ico"
  ]
};