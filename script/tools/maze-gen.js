var ctx, maze, w, h, cellSize;

function generateMaze() {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  w = parseInt(document.getElementById("w").value);
  h = parseInt(document.getElementById("h").value);

  if (w % 2 === 0) w++;
  if (h % 2 === 0) h++;

  maze = [];
  for (var y = 0; y < h; y++) {
    maze[y] = [];
    for (var x = 0; x < w; x++) {
      maze[y][x] = 1;
    }
  }

  carve(1, 1);

  cellSize = Math.floor(600 / Math.max(w, h));

  canvas.width = w * cellSize;
  canvas.height = h * cellSize;

  draw(ctx, cellSize);
}

function carve(x, y) {
  var dirs = [
    [0, -2],
    [2, 0],
    [0, 2],
    [-2, 0]
  ];

  maze[y][x] = 0;

  dirs.sort(() => Math.random() - 0.5);

  for (var i = 0; i < dirs.length; i++) {
    var nx = x + dirs[i][0];
    var ny = y + dirs[i][1];

    if (ny > 0 && ny < h && nx > 0 && nx < w && maze[ny][nx] === 1) {
      maze[y + dirs[i][1] / 2][x + dirs[i][0] / 2] = 0;
      carve(nx, ny);
    }
  }
}

function draw(ctx, size) {
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      if (maze[y][x] === 1) {
        ctx.fillStyle = "#ffffff";
      } else {
        ctx.fillStyle = "#000000";
      }
      ctx.fillRect(x * size, y * size, size, size);
    }
  }

  // スタート
  ctx.fillStyle = "lime";
  ctx.fillRect(size, size, size, size);

  // ゴール
  ctx.fillStyle = "red";
  ctx.fillRect((w - 2) * size, (h - 2) * size, size, size);
}

function downloadPNG() {
  var exportCanvas = document.createElement("canvas");
  var scale = 10;

  exportCanvas.width = w * scale;
  exportCanvas.height = h * scale;

  var ectx = exportCanvas.getContext("2d");

  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      if (maze[y][x] === 1) {
        ectx.fillStyle = "#000000";
      } else {
        ectx.fillStyle = "#ffffff";
      }
      ectx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  // スタート・ゴールも描画
  ectx.fillStyle = "lime";
  ectx.fillRect(scale, scale, scale, scale);

  ectx.fillStyle = "red";
  ectx.fillRect((w - 2) * scale, (h - 2) * scale, scale, scale);

  var link = document.createElement("a");
  link.download = "maze.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
}