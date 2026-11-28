
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://homepage.shiratama-kotone.jp";
const ROOT_DIR = __dirname;
const OUTPUT = path.join(ROOT_DIR, "sitemap.xml");

const EXCLUDED = [
  "404.html"
];

function getHtmlFiles(dir) {
  let results = [];

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (["node_modules", ".git"].includes(item.name)) continue;
      results.push(...getHtmlFiles(fullPath));
    } else if (
      item.isFile() &&
      item.name.toLowerCase().endsWith(".html") &&
      !EXCLUDED.includes(item.name.toLowerCase())
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

const files = getHtmlFiles(ROOT_DIR);

const urls = files.map(file => {
  const relative = path.relative(ROOT_DIR, file)
    .split(path.sep)
    .join("/");

  const url = relative === "index.html"
    ? `${BASE_URL}/`
    : `${BASE_URL}/${relative}`;

  return `  <url>\n    <loc>${url}</loc>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

fs.writeFileSync(OUTPUT, sitemap, "utf8");

console.log(`Sitemap generated: ${urls.length} URLs`);
