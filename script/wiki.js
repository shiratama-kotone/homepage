var pageList = [];
var pageMap = {};

function getCurrentPath() {
  return location.pathname.replace(/\/$/, "");
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

        // 自己リンク防止
        if (url === currentPath) {
          continue;
        }

        matched = name;
        break;
      }
    }

    if (matched) {
      var url2 = pageMap[matched];

      result += `<a href="${url2}">${matched}</a>`;
      i += matched.length;
    } else {
      result += text[i];
      i++;
    }
  }

  return result;
}

// DOM走査（安全版）
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
    ) return;

    // 見出し無視
    if (isHeading(tag)) return;

    Array.from(node.childNodes).forEach(walk);
  }
}

function autoLink(root) {
  walk(root);
}

// 起動
window.addEventListener("DOMContentLoaded", async function () {
  await loadPages();
  autoLink(document.querySelector(".content"));
});