var pageList = [];
var pageMap = {};
var linkedPages = new Set();

function normalizePath(path) {
  return path
    .replace(/\.html$/, "")
    .replace(/\/$/, "");
}

function getCurrentPath() {
  return normalizePath(location.pathname);
}

async function loadPages() {
  var res = await fetch("/wiki/pages.json");
  var pages = await res.json();

  pages.forEach(function(page) {

    // 正式名
    pageMap[page.title] = page.url;
    pageList.push(page.title);

    // 別名
    if (page.aliases) {
      page.aliases.forEach(function(alias) {
        pageMap[alias] = page.url;
        pageList.push(alias);
      });
    }

  });

  // 長い順（被り防止）
  pageList.sort(function(a, b) {
    return b.length - a.length;
  });
}

function isHeading(tag) {
  return /^H[1-6]$/.test(tag);
}

// 文字列→リンク変換
function linkText(text) {
  var result = "";
  var i = 0;
  var currentPath = getCurrentPath();

  while (i < text.length) {
    var matched = null;

    for (var j = 0; j < pageList.length; j++) {
      var name = pageList[j];
      var url = pageMap[name];

      if (text.startsWith(name, i)) {

        // 自己リンク防止（.html有無を無視）
        if (normalizePath(url) === currentPath) {
          continue;
        }

        // 同じリンク先は1回だけ
        if (linkedPages.has(normalizePath(url))) {
          continue;
        }

        matched = name;
        break;
      }
    }

    if (matched) {
      var url2 = pageMap[matched];
      var normalizedUrl = normalizePath(url2);

      result += `<a href="${url2}">${matched}</a>`;

      // リンク済みとして記録
      linkedPages.add(normalizedUrl);

      i += matched.length;
    } else {
      result += text[i];
      i++;
    }
  }

  return result;
}

// DOM走査
function walk(node) {
  if (node.nodeType === 3) {
    var text = node.nodeValue;
    var html = linkText(text);

    if (html !== text) {
      var temp = document.createElement("span");
      temp.innerHTML = html;

      var frag = document.createDocumentFragment();

      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }

      node.parentNode.replaceChild(frag, node);
    }

  } else if (node.nodeType === 1) {
    var tag = node.tagName;

    // 除外タグ
    if (
      tag === "A" ||
      tag === "CODE" ||
      tag === "SCRIPT" ||
      tag === "STYLE" ||
      tag === "TEXTAREA"
    ) {
      return;
    }

    // breadcrumbクラスを除外
    if (node.classList.contains("breadcrumb")) {
      return;
    }

    // 見出し無視
    if (isHeading(tag)) {
      return;
    }

    Array.from(node.childNodes).forEach(walk);
  }
}

function autoLink(root) {
  if (root) {
    // ページごとにリンク済み情報をリセット
    linkedPages.clear();

    walk(root);
  }
}

// 起動
window.addEventListener("DOMContentLoaded", async function () {
  await loadPages();
  autoLink(document.querySelector(".content"));
});

const searchIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#1f1f1f"><path d="M446.67-280h66.66v-166.67H680v-66.66H513.33V-680h-66.66v166.67H280v66.66h166.67V-280Zm-260 160q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z"/></svg>`;

const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#1f1f1f"><path d="M260-448h440.67v-66.67H260V-448Zm-73.33 328q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-586.66H186.67v586.66Zm0-586.66v586.66-586.66Z"/></svg>`;

document.querySelectorAll(".accordion").forEach(function (accordion) {
  const button = accordion.querySelector(".accordion-button");
  const icon = accordion.querySelector(".accordion-icon");
  const content = accordion.querySelector(".accordion-content");

  icon.innerHTML = searchIcon;

  button.addEventListener("click", function () {
    if (accordion.classList.contains("open")) {
      content.style.height = "0px";
      icon.innerHTML = searchIcon;
      accordion.classList.remove("open");
    } else {
      accordion.classList.add("open");
      content.style.height = content.scrollHeight + "px";
      icon.innerHTML = minusIcon;
    }
  });
});

document.querySelectorAll(".sexual-warning").forEach(el => {
  el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 -960 960 960"
         aria-hidden="true">
      <path d="m40-120 440-760 440 760H40Zm115.33-66.67h649.34L480-746.67l-324.67 560Zm351.17-60.95q9.5-9.61 9.5-23.83 0-14.22-9.62-23.72-9.61-9.5-23.83-9.5-14.22 0-23.72 9.62-9.5 9.62-9.5 23.83 0 14.22 9.62 23.72 9.62 9.5 23.83 9.5 14.22 0 23.72-9.62ZM449.33-352H516v-216h-66.67v216ZM480-466.67Z"/>
    </svg>
    <div class="sexual-warning-content">
      <strong>注意</strong>
      このページには、性的な表現や描写、性的な内容を含む記述があります。閲覧する際はご注意ください。
    </div>
  `;
});