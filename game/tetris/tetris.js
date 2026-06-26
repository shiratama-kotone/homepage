(function () {
  'use strict';

  // 定数定義
  const COLS = 10;
  const ROWS = 20;
  const BLOCK_SIZE = 30;

  // DOM要素の取得
  const canvas = document.getElementById('tetrisgame-main-canvas');
  const ctx = canvas.getContext('2d');
  const nextCanvas = document.getElementById('tetrisgame-next-canvas');
  const nextCtx = nextCanvas.getContext('2d');
  const holdCanvas = document.getElementById('tetrisgame-hold-canvas');
  const holdCtx = holdCanvas.getContext('2d');

  // ゲーム状態管理変数
  let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  let score = 0;
  let lines = 0;
  let level = 1;
  let gameOver = true;
  let gameInterval = null;
  let lastAction = ''; 
  let canHold = true;
  let holdPieceType = null;
  let bag = [];
  let currentPiece = null;
  let nextPieceType = null;

  // ミノのカラー定義
  const COLORS = {
    'I': '#00f0f0', 'O': '#f0f000', 'T': '#a000f0',
    'S': '#00f000', 'Z': '#f00000', 'J': '#0000f0', 'L': '#f0a000'
  };

  // ミノの形状データ
  const SHAPES = {
    'I': [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    'O': [[1,1],[1,1]],
    'T': [[0,1,0],[1,1,1],[0,0,0]],
    'S': [[0,1,1],[1,1,0],[0,0,0]],
    'Z': [[1,1,0],[0,1,1],[0,0,0]],
    'J': [[1,0,0],[1,1,1],[0,0,0]],
    'L': [[0,0,1],[1,1,1],[0,0,0]]
  };

  // SRS キックデータテーブル (CanvasのY軸下方向に対応して反転済み)
  const srsData = {
    '0->1': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
    '1->0': [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
    '1->2': [[0,0], [1,0], [1,1], [0,-2], [1,-2]],
    '2->1': [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]],
    '2->3': [[0,0], [1,0], [1,-1], [0,2], [1,2]],
    '3->2': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
    '3->0': [[0,0], [-1,0], [-1,1], [0,-2], [-1,-2]],
    '0->3': [[0,0], [1,0], [1,-1], [0,2], [1,2]]
  };

  const srsDataI = {
    '0->1': [[0,0], [-2,0], [1,0], [-2,1], [1,-2]],
    '1->0': [[0,0], [2,0], [-1,0], [2,-1], [-1,2]],
    '1->2': [[0,0], [-1,0], [2,0], [-1,-2], [2,1]],
    '2->1': [[0,0], [1,0], [-2,0], [1,2], [-2,-1]],
    '2->3': [[0,0], [2,0], [-1,0], [2,-1], [-1,2]],
    '3->2': [[0,0], [-2,0], [1,0], [-2,1], [1,-2]],
    '3->0': [[0,0], [1,0], [-2,0], [1,2], [-2,-1]],
    '0->3': [[0,0], [-1,0], [2,0], [-1,-2], [2,1]]
  };

  // 7-Bag生成システム
  function generateBag() {
    if (bag.length === 0) {
      bag = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
    }
    return bag.shift();
  }

  function createPiece(type) {
    return {
      type: type,
      matrix: JSON.parse(JSON.stringify(SHAPES[type])),
      x: type === 'O' ? 4 : 3,
      y: type === 'I' ? -1 : 0,
      rotation: 0,
      lastKickIdx: -1
    };
  }

  function rotateMatrix(matrix, dir) {
    const n = matrix.length;
    let rotated = Array.from({ length: n }, () => Array(n).fill(0));
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (dir > 0) rotated[c][n - 1 - r] = matrix[r][c];
        else rotated[n - 1 - c][r] = matrix[r][c];
      }
    }
    return rotated;
  }

  function collide(matrix, offset) {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          let nextX = c + offset.x;
          let nextY = r + offset.y;
          if (nextX < 0 || nextX >= COLS || nextY >= ROWS) return true;
          if (nextY >= 0 && board[nextY][nextX]) return true;
        }
      }
    }
    return false;
  }

  // SRS（スーパーローテーションシステム）の回転処理
  function rotatePiece(dir) {
    if (!currentPiece || gameOver) return;
    if (currentPiece.type === 'O') return;

    const fromRot = currentPiece.rotation;
    const toRot = (fromRot + dir + 4) % 4;
    const newMatrix = rotateMatrix(currentPiece.matrix, dir);
    
    const key = `${fromRot}->${toRot}`;
    const kicks = currentPiece.type === 'I' ? srsDataI[key] : srsData[key];

    for (let i = 0; i < kicks.length; i++) {
      const dx = kicks[i][0];
      const dy = kicks[i][1];
      if (!collide(newMatrix, { x: currentPiece.x + dx, y: currentPiece.y + dy })) {
        currentPiece.matrix = newMatrix;
        currentPiece.x += dx;
        currentPiece.y += dy;
        currentPiece.rotation = toRot;
        currentPiece.lastKickIdx = i;
        lastAction = 'rotate';
        return;
      }
    }
  }

  // 公式準拠 T-Spin判定ロジック
  function checkTSpin(piece) {
    if (piece.type !== 'T' || lastAction !== 'rotate') return { isTSpin: false, mini: false };
    
    const cx = piece.x + 1;
    const cy = piece.y + 1;
    
    const corners = [
      { x: cx - 1, y: cy - 1 }, // 左上 (0)
      { x: cx + 1, y: cy - 1 }, // 右上 (1)
      { x: cx + 1, y: cy + 1 }, // 右下 (2)
      { x: cx - 1, y: cy + 1 }  // 左下 (3)
    ];
    
    let filledCorners = 0;
    corners.forEach(c => {
      if (c.x < 0 || c.x >= COLS || c.y >= ROWS || (c.y >= 0 && board[c.y][c.x])) {
        filledCorners++;
      }
    });
    
    if (filledCorners < 3) return { isTSpin: false, mini: false };
    
    let facingCorners = [];
    if (piece.rotation === 0) facingCorners = [0, 1];
    else if (piece.rotation === 1) facingCorners = [1, 2];
    else if (piece.rotation === 2) facingCorners = [2, 3];
    else if (piece.rotation === 3) facingCorners = [3, 0];
    
    let filledFacing = 0;
    facingCorners.forEach(idx => {
      const c = corners[idx];
      if (c.x < 0 || c.x >= COLS || c.y >= ROWS || (c.y >= 0 && board[c.y][c.x])) {
        filledFacing++;
      }
    });
    
    if (filledFacing === 2 || piece.lastKickIdx === 4) {
      return { isTSpin: true, mini: false };
    } else {
      return { isTSpin: true, mini: true };
    }
  }

  function lockPiece() {
    for (let r = 0; r < currentPiece.matrix.length; r++) {
      for (let c = 0; c < currentPiece.matrix[r].length; c++) {
        if (currentPiece.matrix[r][c]) {
          if (currentPiece.y + r < 0) {
            endGame();
            return;
          }
          board[currentPiece.y + r][currentPiece.x + c] = currentPiece.type;
        }
      }
    }
    
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r].every(val => val !== 0)) {
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        r++; 
      }
    }
    
    const tspin = checkTSpin(currentPiece);
    let msg = '';
    let points = 0;
    
    if (tspin.isTSpin) {
      if (tspin.mini) {
        msg = 'T-Spin Mini';
        if (cleared === 0) points = 100 * level;
        else if (cleared === 1) { points = 200 * level; msg += ' Single!'; }
        else if (cleared === 2) { points = 400 * level; msg += ' Double!'; }
      } else {
        msg = 'T-Spin!';
        if (cleared === 0) points = 400 * level;
        else if (cleared === 1) { points = 800 * level; msg = 'T-Spin Single!'; }
        else if (cleared === 2) { points = 1200 * level; msg = 'T-Spin Double!'; }
        else if (cleared === 3) { points = 1600 * level; msg = 'T-Spin Triple!'; }
      }
    } else {
      if (cleared === 1) { points = 100 * level; msg = 'Single'; }
      else if (cleared === 2) { points = 300 * level; msg = 'Double'; }
      else if (cleared === 3) { points = 500 * level; msg = 'Triple'; }
      else if (cleared === 4) { points = 800 * level; msg = 'TETRIS!'; }
    }
    
    if (msg) document.getElementById('tetrisgame-log-msg').innerText = msg;
    
    score += points;
    lines += cleared;
    level = Math.floor(lines / 10) + 1;
    
    updateScores();
    
    currentPiece = createPiece(nextPieceType);
    nextPieceType = generateBag();
    canHold = true;
    lastAction = '';
    
    if (collide(currentPiece.matrix, { x: currentPiece.x, y: currentPiece.y })) {
      endGame();
    }
    
    resetInterval();
  }

  function getGhostY() {
    let ghostY = currentPiece.y;
    while (!collide(currentPiece.matrix, { x: currentPiece.x, y: ghostY + 1 })) {
      ghostY++;
    }
    return ghostY;
  }

  function hardDrop() {
    if (gameOver || !currentPiece) return;
    currentPiece.y = getGhostY();
    lastAction = 'drop';
    lockPiece();
    draw();
  }

  function movePiece(dir) {
    if (!currentPiece || gameOver) return;
    if (!collide(currentPiece.matrix, { x: currentPiece.x + dir, y: currentPiece.y })) {
      currentPiece.x += dir;
      lastAction = 'move';
    }
  }

  function dropPiece() {
    if (!currentPiece || gameOver) return;
    if (!collide(currentPiece.matrix, { x: currentPiece.x, y: currentPiece.y + 1 })) {
      currentPiece.y++;
      lastAction = 'drop';
    } else {
      lockPiece();
    }
    draw();
  }

  function holdPieceAction() {
    if (!canHold || gameOver || !currentPiece) return;
    if (holdPieceType === null) {
      holdPieceType = currentPiece.type;
      currentPiece = createPiece(nextPieceType);
      nextPieceType = generateBag();
    } else {
      const tmp = holdPieceType;
      holdPieceType = currentPiece.type;
      currentPiece = createPiece(tmp);
    }
    canHold = false;
    lastAction = 'hold';
    draw();
  }

  function resetInterval() {
    clearInterval(gameInterval);
    if (gameOver) return;
    const speed = Math.max(50, 1000 - (level - 1) * 100);
    gameInterval = setInterval(dropPiece, speed);
  }

  // 描画関連関数
  function drawBlock(context, x, y, color, size = BLOCK_SIZE, isGhost = false) {
    context.fillStyle = color;
    if (isGhost) {
      context.globalAlpha = 0.25;
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.strokeRect(x * size + 1, y * size + 1, size - 2, size - 2);
      context.globalAlpha = 1.0;
    } else {
      context.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      context.fillStyle = 'rgba(255,255,255,0.15)'; 
      context.fillRect(x * size + 1, y * size + 1, size - 2, (size - 2) / 2);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) drawBlock(ctx, c, r, COLORS[board[r][c]]);
      }
    }
    
    if (currentPiece) {
      const gy = getGhostY();
      for (let r = 0; r < currentPiece.matrix.length; r++) {
        for (let c = 0; c < currentPiece.matrix[r].length; c++) {
          if (currentPiece.matrix[r][c] && gy + r >= 0) {
            drawBlock(ctx, currentPiece.x + c, gy + r, COLORS[currentPiece.type], BLOCK_SIZE, true);
          }
        }
      }
      for (let r = 0; r < currentPiece.matrix.length; r++) {
        for (let c = 0; c < currentPiece.matrix[r].length; c++) {
          if (currentPiece.matrix[r][c] && currentPiece.y + r >= 0) {
            drawBlock(ctx, currentPiece.x + c, currentPiece.y + r, COLORS[currentPiece.type]);
          }
        }
      }
    }
    
    drawPreview(nextCtx, nextCanvas, nextPieceType);
    drawPreview(holdCtx, holdCanvas, holdPieceType);
  }

  function drawPreview(context, canvasBox, type) {
    context.clearRect(0, 0, canvasBox.width, canvasBox.height);
    if (!type) return;
    const matrix = SHAPES[type];
    const size = 20;
    const offsetX = (canvasBox.width - matrix[0].length * size) / 2;
    const offsetY = (canvasBox.height - matrix.length * size) / 2;
    
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          context.fillStyle = COLORS[type];
          context.fillRect(offsetX + c * size + 1, offsetY + r * size + 1, size - 2, size - 2);
        }
      }
    }
  }

  function updateScores() {
    document.getElementById('tetrisgame-score-val').innerText = score;
    document.getElementById('tetrisgame-lines-val').innerText = lines;
    document.getElementById('tetrisgame-level-val').innerText = level;
  }

  function startGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    score = 0; lines = 0; level = 1; gameOver = false;
    holdPieceType = null; canHold = true; bag = [];
    document.getElementById('tetrisgame-log-msg').innerText = 'GO!';
    updateScores();
    
    nextPieceType = generateBag();
    currentPiece = createPiece(generateBag());
    
    resetInterval();
    draw();
  }

  function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    document.getElementById('tetrisgame-log-msg').innerText = 'GAME OVER';
  }

  // イベントリスナー登録
  document.getElementById('tetrisgame-start-btn').addEventListener('click', startGame);

  document.addEventListener('keydown', e => {
    if (gameOver || !currentPiece) return;
    switch(e.key) {
      case 'ArrowLeft': movePiece(-1); draw(); break;
      case 'ArrowRight': movePiece(1); draw(); break;
      case 'ArrowDown': dropPiece(); break;
      case 'ArrowUp': case 'x': case 'X': rotatePiece(1); draw(); break;
      case 'z': case 'Z': rotatePiece(-1); draw(); break;
      case ' ': hardDrop(); e.preventDefault(); break; // ゲーム中のスペースキーによるスクロールを防止
      case 'c': case 'C': case 'Shift': holdPieceAction(); break;
    }
  });

})();