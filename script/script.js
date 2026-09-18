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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}

document.querySelectorAll(".accordion").forEach(function (accordion) {
  const button = accordion.querySelector(".accordion-button");
  const icon = accordion.querySelector(".accordion-icon");
  const content = accordion.querySelector(".accordion-content");

  button.addEventListener("click", function () {
    if (accordion.classList.contains("open")) {
      content.style.height = "0px";
      icon.textContent = "+";
      accordion.classList.remove("open");
    } else {
      content.style.height = content.scrollHeight + "px";
      icon.textContent = "−";
      accordion.classList.add("open");
    }
  });
});