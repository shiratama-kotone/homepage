const api = "https://html-source.yuzuki-m-1226.workers.dev/?url=";

let lastHTML = "";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("srcBtn");
  const copy = document.getElementById("srcCopy");

  if (btn) {
    btn.addEventListener("click", async () => {
      const url = document.getElementById("srcUrl").value.trim();

      if (!url) {
        document.getElementById("srcOutput").textContent = "URLを入力してください";
        return;
      }

      try {
        const res = await fetch(api + encodeURIComponent(url));

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const html = await res.text();

        lastHTML = html;

        document.getElementById("srcOutput").innerHTML =
          prettyHTML(html);

      } catch (e) {
        document.getElementById("srcOutput").textContent =
          "取得失敗: " + e.message;
      }
    });
  }

  if (copy) {
    copy.addEventListener("click", async () => {
      if (!lastHTML) return;

      try {
        await navigator.clipboard.writeText(lastHTML);
        alert("コピーした");
      } catch {
        alert("コピー失敗");
      }
    });
  }
});

/* ===== HTML整形 ===== */
function prettyHTML(html) {
  html = html.replace(/>\s*</g, "><");

  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

  let indent = 0;
  const indentSize = "  ";

  const lines = [];

  for (const token of tokens) {

    if (/^<\/.+>/.test(token)) {
      indent = Math.max(indent - 1, 0);
    }

    lines.push(
      indentSize.repeat(indent) + highlightToken(token)
    );

    if (
      /^<[^!/][^>]*[^/]>$/.test(token) &&
      !/^<(meta|link|img|br|hr|input)/i.test(token)
    ) {
      indent++;
    }
  }

  return lines.join("\n");
}

/* ===== ハイライト ===== */
function highlightToken(token) {

  if (!token.startsWith("<")) {
    return escapeHTML(token);
  }

  let escaped = token
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  escaped = escaped.replace(
    /^(&lt;\/?)([a-zA-Z0-9-]+)/,
    '$1<span class="tag">$2</span>'
  );

  escaped = escaped.replace(
    /([a-zA-Z-:]+)=(".*?"|'.*?')/g,
    '<span class="attr">$1</span>=<span class="str">$2</span>'
  );

  return escaped;
}

function escapeHTML(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}