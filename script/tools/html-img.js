async function loadImages() {
  var url = document.getElementById("url").value;

  var res = await fetch(
    "https://html-images.shiratama-kotone.workers.dev/?url="
    + encodeURIComponent(url)
  );

  var data = await res.json();

  var result = document.getElementById("result");

  if (data.error) {
    result.textContent = data.error;
    return;
  }

  result.innerHTML = "";

  data.images.forEach(img => {
    result.innerHTML += `
      <div>
        <img src="${img}" style="max-width:300px">
        <br>
        <a href="${img}" target="_blank">${img}</a>
      </div>
      <hr>
    `;
  });
}