document.getElementById("header").innerHTML = `
<header>
  <h2>ゆゆゆのホームページ</h2>
  <button id="themeBtn">テーマ切替</button>
</header>
`;

document.getElementById("footer").innerHTML = `
<footer>
  <p>© ゆゆゆ</p>
</footer>
`;

/* ===== テーマ処理 ===== */

function setTheme(mode){
  document.documentElement.setAttribute("data-theme", mode);
  document.cookie = "theme=" + mode + "; path=/; max-age=31536000";
}

function getTheme(){
  return document.cookie
    .split("; ")
    .find(row => row.startsWith("theme="))
    ?.split("=")[1];
}

// 初期適用
const saved = getTheme() || "light";
setTheme(saved);

/* ===== ボタン ===== */

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeBtn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme");
    const next = now === "dark" ? "light" : "dark";
    setTheme(next);
  });
});