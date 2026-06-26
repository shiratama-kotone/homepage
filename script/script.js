document.getElementById("header").innerHTML = `
<header>
  <a href="/"><h2>ゆゆゆのホームページ</h2></a>
</header>
`;

document.getElementById("footer").innerHTML = `
<footer>

  <section>
    <ul>
      <li><a href="https://yuyuyu-made-bbs.onrender.com/">掲示板</a></li>
      <li><a href="/blog/">ブログ</a></li>
      <li><a href="/tools/">ツール</a></li>
      <li><a href="/links/">リンク集</a></li>
      <li><a href="/wiki/">Wiki</a></li>
      <li><a href="/contact/">お問い合わせ</a></li>
    </ul>
  </section>

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