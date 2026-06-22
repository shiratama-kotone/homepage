let tools = [];
let currentCategory = "all";

/* ===== JSON読み込み ===== */
fetch("/tools/tools.json")
  .then(res => res.json())
  .then(data => {
    tools = data;
    render(tools);
  });

/* ===== 描画 ===== */
function render(list){
  const el = document.getElementById("list");
  if(!el) return;

  el.innerHTML = "";

  list.forEach(t => {
    const card = document.createElement("a");
    card.className = "tool-card";
    card.href = t.url;

    card.innerHTML = `
      <h2>${t.title}</h2>
      <p>${t.desc}</p>
      <span class="tag">${t.category}</span>
    `;

    el.appendChild(card);
  });
}

/* ===== カテゴリ切り替え ===== */
function filterCategory(cat){
  currentCategory = cat;
  applyFilter();
}

/* ===== フィルター統合処理 ===== */
function applyFilter(){
  const search = document.getElementById("search");
  const q = search ? search.value : "";

  let filtered = tools;

  // カテゴリ
  if(currentCategory !== "all"){
    filtered = filtered.filter(t => t.category === currentCategory);
  }

  // 検索
  if(q){
    filtered = filtered.filter(t =>
      t.title.includes(q) ||
      t.desc.includes(q)
    );
  }

  render(filtered);
}

/* ===== 検索イベント ===== */
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");

  if(search){
    search.addEventListener("input", applyFilter);
  }
});