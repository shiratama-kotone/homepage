var currentRoom = null;
var timer = null;

var lastSeenId = 0;
var audio = new Audio("https://actions.google.com/sounds/v1/notifications/beep_short.ogg");

// 🔑 token
function saveToken() {
  var t = document.getElementById("token").value;
  localStorage.setItem("cw_token", t);
}

// API
async function api(path) {
  return fetch(path, {
    headers: {
      "X-Chatwork-Token": localStorage.getItem("cw_token")
    }
  }).then(r => r.json());
}

// ルーム取得
async function loadRooms() {
  var data = await api("/rooms");

  var html = "";

  data.forEach(r => {
    html += `<div onclick="selectRoom(${r.room_id})">${r.name}</div>`;
  });

  document.getElementById("rooms").innerHTML = html;
}

// ルーム選択
function selectRoom(id) {
  currentRoom = id;

  lastSeenId = parseInt(localStorage.getItem("cw_last_" + id) || "0");

  loadMessages(true);

  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    loadMessages(true);
  }, 3000);
}

// メッセージ取得
async function loadMessages(silent = false) {
  if (!currentRoom) return;

  var data = await fetch("/messages?room_id=" + currentRoom, {
    headers: {
      "X-Chatwork-Token": localStorage.getItem("cw_token")
    }
  }).then(r => r.json());

  var html = "";
  var newLast = lastSeenId;
  var hasNew = false;

  data.forEach(m => {
    var unread = m.message_id > lastSeenId;
    if (unread) hasNew = true;

    if (m.message_id > newLast) {
      newLast = m.message_id;
    }

    var body = m.body;

    // @ハイライト
    body = body.replace(/@(\w+)/g, "<span class='mention'>@$1</span>");

    html += `<div class="msg ${unread ? "unread" : ""}">${body}</div>`;
  });

  if (lastSeenId > 0) {
    html += `<div class="read-marker">── 既読ライン ──</div>`;
  }

  document.getElementById("messages").innerHTML = html;

  // キャッシュ更新
  localStorage.setItem("cw_last_" + currentRoom, newLast);
  lastSeenId = newLast;

  // 通知音
  if (hasNew && !silent) {
    audio.play();
  }

  // スクロール
  if (!silent && hasNew) {
    var box = document.getElementById("messages");
    box.scrollTop = box.scrollHeight;
  }
}

// 送信
async function sendMessage() {
  var text = document.getElementById("sendText").value;

  await fetch("/send?room_id=" + currentRoom + "&body=" + encodeURIComponent(text), {
    headers: {
      "X-Chatwork-Token": localStorage.getItem("cw_token")
    }
  });

  document.getElementById("sendText").value = "";
  loadMessages(true);
}