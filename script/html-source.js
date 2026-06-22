const api = "https://html-source.yuzuki-m-1226.workers.dev/?url=";

let last = "";

document.getElementById("srcBtn").addEventListener("click", async () => {
  const url = document.getElementById("srcUrl").value;

  try {
    const res = await fetch(api + encodeURIComponent(url));
    const html = await res.text();

    last = html;
    render(html);
  } catch {
    document.getElementById("srcOutput").textContent = "取得失敗";
  }
});

document.getElementById("srcCopy").addEventListener("click", () => {
  navigator.clipboard.writeText(last);
  alert("コピーした");
});

function render(html){
  const lines = html.split("\n");

  document.getElementById("srcOutput").innerHTML =
    lines.map((l, i) =>
      `${String(i+1).padStart(4," ")} | ${escape(l)}`
    ).join("\n");
}

function escape(str){
  return str
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}