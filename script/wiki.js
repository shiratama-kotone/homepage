var pageList = [];
var pageMap = {};

async function loadPages() {
  var res = await fetch("/pages.json");
  var pages = await res.json();

  pages.forEach(function(page) {
    pageMap[page.title] = page.url;
    pageList.push(page.title);
  });

  // 長い順（被り防止）
  pageList.sort(function(a, b) {
    return b.length - a.length;
  });
}

function isHeading(tag) {
  return /^H[1-6]$/.test(tag);
}

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

function walk(node) {
  if (node.nodeType === 3) {
    var text = node.nodeValue;
    var html = linkText(text);

    if (html !== text) {
      var span = document.createElement("span");
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    }

  } else if (node.nodeType === 1) {
    var tag = node.tagName;

    // リンク系・コード系は無視
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