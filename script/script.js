document.getElementById("header").innerHTML = `
<header>
  <a href="/"><h2>透明なセカイ</h2></a>
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

  <p class="note">本サイトに掲載されている文章、画像、その他のコンテンツには、管理者に権利が帰属するものと、第三者に帰属するものが含まれています。<br><br>第三者が権利を有するコンテンツについて、その著作権、その他の権利は各権利者に帰属します。<br><br>本サイトへの掲載は、当該コンテンツの権利を管理者が保有することを意味するものではありません。<br></p>

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




































(() => {
  // ===== 設定 =====

  // 変更前のURL
  const OLD_ORIGIN = "https://shiratama-kotone-homepage.netlify.app/";

  // 変更後のURL
  const NEW_URL = "https://homepage.shiratama-kotone.jp/";

  // カウントダウン秒数
  const WAIT_SECONDS = 30;

  // ===== URL判定 =====

  if (location.origin !== new URL(OLD_ORIGIN).origin) return;

  // ===== 表示処理 =====

  function init() {
    if (document.getElementById("url-change-notice")) return;

    const newURL = new URL(NEW_URL);

    // 背景を暗くするオーバーレイ
    const overlay = document.createElement("div");
    overlay.id = "url-change-overlay";

    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.6)",
      zIndex: "9998"
    });

    overlay.setAttribute("aria-hidden", "true");

    // フローティング通知
    const notice = document.createElement("section");
    notice.id = "url-change-notice";
    notice.className = "card";

    Object.assign(notice.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "9999",
      width: "min(380px, calc(100vw - 40px))",
      maxHeight: "calc(100vh - 40px)",
      overflowY: "auto",
      boxSizing: "border-box",
      margin: "0"
    });

    notice.setAttribute("role", "dialog");
    notice.setAttribute("aria-modal", "true");
    notice.setAttribute("aria-labelledby", "url-change-title");

    // HTML
    notice.innerHTML = `
      <h2 id="url-change-title">
        URL変更のお知らせ
      </h2>

      <div style="
        padding: 14px;
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        margin: 16px 0;
        overflow-wrap: anywhere;
      ">
        <div style="
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 4px;
        ">
          変更前
        </div>

        <div style="font-weight: 700;">
          ${escapeHTML(location.origin)}
        </div>

        <div style="
          text-align: center;
          font-size: 24px;
          margin: 10px 0;
        ">
          ↓
        </div>

        <div style="
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 4px;
        ">
          変更後
        </div>

        <div style="font-weight: 700;">
          ${escapeHTML(newURL.origin)}
        </div>
      </div>

      <p style="font-size: 14px; margin-bottom: 12px;">
        サイトのURLが変更されたよ。
        新しいURLを利用してね。
      </p>

      <p style="
        font-size: 14px;
        text-align: center;
        margin-bottom: 14px;
      ">
        <strong id="url-change-count"
          style="font-size: 24px; font-variant-numeric: tabular-nums;">
          ${WAIT_SECONDS}
        </strong>
        秒後に自動で移動するよ。
      </p>

      <button
        id="url-change-button"
        type="button"
        style="
          width: 100%;
          box-sizing: border-box;
        "
      >
        新しいサイトへ移動
      </button>
    `;

    // HTML内の文字列を安全に表示する
    function escapeHTML(value) {
      return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[char]);
    }

    // 背景と通知を追加
    document.body.appendChild(overlay);
    document.body.appendChild(notice);

    // 背景の操作を禁止
    for (const element of document.body.children) {
      if (element !== overlay && element !== notice) {
        element.inert = true;
      }
    }

    // スクロール禁止
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // カウントダウン
    const count = notice.querySelector("#url-change-count");
    const button = notice.querySelector("#url-change-button");

    const endTime = Date.now() + WAIT_SECONDS * 1000;

    let timer = null;
    let redirected = false;

    // 転送
    function redirect() {
      if (redirected) return;

      redirected = true;

      if (timer !== null) {
        clearInterval(timer);
      }

      button.disabled = true;
      button.textContent = "移動中...";

      location.replace(NEW_URL);
    }

    // ボタン
    button.addEventListener("click", redirect);

    // カウント更新
    function tick() {
      const remaining = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
      );

      count.textContent = remaining;

      if (remaining <= 0) {
        redirect();
      }
    }

    // ボタンにフォーカス
    button.focus();

    // タイマー開始
    tick();
    timer = setInterval(tick, 250);
  }

  // DOM読み込み後に実行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();
