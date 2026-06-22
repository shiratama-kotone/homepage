const api = "https://html-source.yuzuki-m-1226.workers.dev/?url=";

let lastHTML = "";

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("srcBtn");
  const copy = document.getElementById("srcCopy");

  if (btn) {
    btn.addEventListener("click", async () => {
      const url = document.getElementById("srcUrl").value;
      if (!url) return;

      try {
        const res = await fetch(api + encodeURIComponent(url));
        const html = await res.text();

        lastHTML = html;
        render(prettyHTML(html));
      } catch {
        document.getElementById("srcOutput").textContent = "取得失敗";
      }
    });
  }

  if (copy) {
    copy.addEventListener("click", () => {
      navigator.clipboard.writeText(lastHTML);
      alert("コピーした");
    });
  }
});

/* ===== HTML整形（script/styleも分離） ===== */
function prettyHTML(html){
  html = html.replace(/>\s*</g, "><");

  const tokens = html.split(/(<[^>]+>)/g).filter(Boolean);

  let indent = 0;
  let inScript = false;
  let inStyle = false;

  const indentSize = "  ";

  return tokens.map(token => {

    // script / style開始
    if (token.match(/<script\b/)) inScript = true;
    if (token.match(/<style\b/)) inStyle = true;

    // 閉じタグ
    if (token.match(/<\/script>/)) inScript = false;
    if (token.match(/<\/style>/)) inStyle = false;

    let line = indentSize.repeat(indent) + escape(token);

    // 中身はインデント変えない（そのまま表示）
    if (inScript || inStyle) {
      return line;
    }

    // インデント処理
    if (token.match(/^<\/.+>/)) {
      indent = Math.max(indent - 1, 0);
    }

    if (token.match(/^<[^!\/][^>]*[^\/]>$/)) {
      indent++;
    }

    return line;

  }).join("\n");
}

/* ===== シンタックスハイライト ===== */
function escape(token){
  let t = token
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  // タグ色
  t = t.replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g,
    `$1<span class="tag">$2</span>`
  );

  // 属性名
  t = t.replace(/([a-zA-Z-]+)=/g,
    `<span class="attr">$1</span>=`
  );

  // 文字列
  t = t.replace(/"([^"]*)"/g,
    `<span class="str">"$1"</span>`
  );

  return t;
}