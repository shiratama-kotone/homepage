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

  <p>本サイトに掲載されている文章、画像、その他のコンテンツには、管理者に権利が帰属するものと、第三者に帰属するものが含まれています。<br><br>第三者が権利を有するコンテンツについて、その著作権、その他の権利は各権利者に帰属します。<br><br>本サイトへの掲載は、当該コンテンツの権利を管理者が保有することを意味するものではありません。</p>

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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
