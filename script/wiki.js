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