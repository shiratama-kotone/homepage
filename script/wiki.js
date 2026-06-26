var pageList = [];
var pageMap = {};

async function loadPages() {
  var res = await fetch("/wiki/pages.json");
  var pages = await res.json();

  pages.forEach(function(page) {
    pageMap[page.title] = page.url;
    pageList.push(page.title);
  });

  // 🔥被り防止（長い順優先）
  pageList.sort(function(a, b) {
    return b.length - a.length;
  });
}

function isHeading(tag) {
  return /^H[1-6]$/.test(tag);
}

// 文字列をリンク化（左から貪欲一致）
function linkText(text) {
  var result = "";
  var i = 0;

  while (i < text.length) {
    var matched = null;

    for (var j = 0; j < pageList.length; j++) {
      var name = pageList[j];

      if (text.startsWith(name, i)) {
        matched = name;
        break;
      }
    }

    if (matched) {
      var url = pageMap[matched];

      result += `<a href="${url}">${matched}</a>`;
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

    // ❌無視対象
    if (
      tag === "A" ||
      tag === "CODE" ||
      tag === "SCRIPT" ||
      tag === "STYLE" ||
      tag === "TEXTAREA"
    ) return;

    // ❌見出し無視
    if (isHeading(tag)) return;

    Array.from(node.childNodes).forEach(walk);
  }
}

function autoLink(root) {
  walk(root);
}

// 🚀起動
window.addEventListener("DOMContentLoaded", async function () {
  await loadPages();
  autoLink(document.querySelector(".content"));
});