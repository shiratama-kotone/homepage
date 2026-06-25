document.getElementById("captureBtn").addEventListener("click", async () => {
  var url = document.getElementById("urlInput").value.trim();
  var img = document.getElementById("resultImage");

  if (!url) {
    alert("URLを入力してください");
    return;
  }

  try {
    img.style.display = "none";

    var workerUrl =
      "https://page-screenshot.shiratama-kotone.workers.dev/?url=" +
      encodeURIComponent(url);

    img.src = workerUrl;

    img.onload = () => {
      img.style.display = "block";
    };

    img.onerror = () => {
      alert("取得に失敗しました");
    };
  } catch (error) {
    alert("エラーが発生しました");
    console.error(error);
  }
});