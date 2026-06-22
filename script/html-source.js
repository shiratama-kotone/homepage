const api = "https://html-source.yuzuki-m-1226.workers.dev/?url=";

let lastHTML = "";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("srcBtn");
  const copy = document.getElementById("srcCopy");
  const output = document.getElementById("srcOutput");

  if (btn) {
    btn.addEventListener("click", async () => {
      const url = document.getElementById("srcUrl").value.trim();

      if (!url) {
        output.textContent = "URLを入力してください";
        return;
      }

      output.textContent = "取得中...";

      try {
        const res = await fetch(api + encodeURIComponent(url));

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const html = await res.text();

        lastHTML = html;

        output.innerHTML = prettyHTML(html);

      } catch (e) {
        output.textContent = `エラー: ${e.message}`;
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

function prettyHTML(html) {
  html = html.replace(/>\s*</g, "><");

  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

  let indent = 0;
  let inScript = false;
  let inStyle = false;

  const indentSize = "  ";

  return tokens.map(token => {

    if (/^<\/.+>/.test(token)) {
      indent = Math.max(indent - 1, 0);
    }

    let line = indentSize.repeat(indent) + escapeHTML(token);

    if (/<script\b/i.test(token)) inScript = true;
    if (/<style\b/i.test(token)) inStyle = true;

    if (/<\/script>/i.test(token)) inScript = false;
    if (/<\/style>/i.test(token)) inStyle = false;

    if (
      !inScript &&
      !inStyle &&
      /^<[^!\/][^>]*[^\/]>$/.test(token)
    ) {
      indent++;
    }

    return line;

  }).join("\n");
}

function escapeHTML(token) {
  let t = token
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  t = t.replace(
    /(&lt;\/?)([a-zA-Z0-9-]+)/g,
    '$1<span class="tag">$2</span>'
  );

  t = t.replace(
    /([a-zA-Z-:]+)=/g,
    '<span class="attr">$1</span>='
  );

  t = t.replace(
    /"([^"]*)"/g,
    '<span class="str">"$1"</span>'
  );

  return t;
}