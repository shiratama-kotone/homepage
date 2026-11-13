
"use strict";

(() => {
  const API_BASE = "https://api.chunisupport.net";
  const SONGS_URL = "https://static.chunisupport.net/v1/songs.json";
  const JACKET_BASE = "https://image.chunisupport.net/jackets/chunithm/";
  const SETTINGS_KEY = "chunisupport_rating_settings_v1";
  const MANUAL_KEY = "chunisupport_rating_manual_v1";
  const DIFFS = ["BASIC", "ADVANCED", "EXPERT", "MASTER", "ULTIMA"];
  const $ = (id) => document.getElementById(id);

  let settings = readStorage(SETTINGS_KEY, {});
  let songs = [];
  let songsById = new Map();
  let playerData = null;
  let manualRecords = readStorage(MANUAL_KEY, []);
  let selectedSong = null;
  let lastErrorText = "";

  function readStorage(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value == null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }

function calcRate(constant, score) {
  const borders = [
    { score: 500000, value: c => 0 },
    { score: 800000, value: c => (c - 5) / 2 },
    { score: 900000, value: c => c - 5 },
    { score: 925000, value: c => c - 3.34 },
    { score: 950000, value: c => c - 1.67 },
    { score: 975000, value: c => c },
    { score: 990000, value: c => c + 0.6 },
    { score: 1000000, value: c => c + 1.0 },
    { score: 1005000, value: c => c + 1.5 },
    { score: 1007500, value: c => c + 2.0 },
    { score: 1009000, value: c => c + 2.15 }
  ];

  if (score <= 500000) return 0;
  if (score >= 1009000) return constant + 2.15;

  for (let i = 1; i < borders.length; i++) {
    const lower = borders[i - 1];
    const upper = borders[i];

    if (score <= upper.score) {
      const ratio =
        (score - lower.score) /
        (upper.score - lower.score);

      const lowValue = Math.max(0, lower.value(constant));
      const highValue = Math.max(0, upper.value(constant));

      return Math.max(
        0,
        lowValue + (highValue - lowValue) * ratio
      );
    }
  }

  return constant + 2.15;
}

  function jacketUrl(id) {
    return id
      ? JACKET_BASE + encodeURIComponent(id) + ".webp"
      : "";
  }

  function makeJacket(id, title, className = "jacket") {
    const img = document.createElement("img");

    img.className = className;
    img.alt = title ? title + " ジャケット" : "ジャケット画像";
    img.loading = "lazy";
    img.src = jacketUrl(id);

    img.onerror = () => {
      img.onerror = null;
      img.removeAttribute("src");
      img.alt = "画像なし";
      img.style.objectFit = "contain";
    };

    return img;
  }

  function describeError(error) {
    const status = error.status
      ? "HTTP " + error.status
      : "HTTPステータスなし";

    const code = error.code
      ? "APIコード: " + error.code
      : "APIコード: なし";

    const detail = error.message || "詳細不明";
    let summary = detail;

    if (error.status === 401) {
      summary = "APIトークンが無効か、認証に失敗したよ。トークンを確認してね。";
    } else if (error.status === 403) {
      summary = "このデータを閲覧する権限がないよ。非公開ユーザーの場合は本人または承認済みフレンドのトークンが必要。";
    } else if (error.status === 404) {
      summary = "ユーザーが見つからないか、非公開設定で閲覧できない可能性があるよ。";
    } else if (error.status === 429) {
      summary = "APIの利用回数制限に達したよ。少し待ってから再試行してね。";
    } else if (error.status >= 500) {
      summary = "ChuniSupport側でサーバーエラーが発生したよ。";
    } else if (error.kind === "network") {
      summary = "通信に失敗したよ。ネット接続やブラウザのCORS制限を確認してね。";
    } else if (error.kind === "json") {
      summary = "サーバーの応答をJSONとして読み取れなかったよ。";
    }

    const raw = [
      "種類: " + (error.kind || "unknown"),
      status,
      code,
      "URL: " + (error.url || "不明"),
      "メッセージ: " + detail,
      "レスポンス本文:",
      error.body || "(本文なし)",
      "例外:",
      error.stack || "(スタックなし)"
    ].join("\n");

    return { summary, raw };
  }

  function showError(error) {
    const box = $("errorBox");
    const info = describeError(error);

    $("errorTitle").textContent = error.status
      ? "取得エラー（HTTP " + error.status + "）"
      : "取得エラー";

    $("errorSummary").textContent = info.summary;
    $("errorRaw").textContent = info.raw;
    $("errorDetails").hidden = true;
    $("errorDetailsBtn").textContent = "詳しく見る";

    box.classList.add("show");
    lastErrorText = info.raw;
  }

  function clearError() {
    $("errorBox").classList.remove("show");
    $("errorDetails").hidden = true;
    lastErrorText = "";
  }

  async function fetchJson(url, token = "") {
    let response;

    try {
      response = await fetch(url, {
        headers: token
          ? {
              Authorization: "Bearer " + token,
              Accept: "application/json"
            }
          : {
              Accept: "application/json"
            },
        cache: "no-store"
      });
    } catch (cause) {
      const error = new Error(
        cause && cause.message ? cause.message : "Fetch failed"
      );

      error.kind = "network";
      error.url = url;
      error.stack = cause && cause.stack ? cause.stack : "";

      throw error;
    }

    const body = await response.text();
    let data = null;

    try {
      data = body ? JSON.parse(body) : null;
    } catch (cause) {
      const error = new Error("JSONの解析に失敗: " + cause.message);

      error.kind = "json";
      error.status = response.status;
      error.url = url;
      error.body = body;
      error.stack = cause.stack || "";

      throw error;
    }

    if (!response.ok) {
      const error = new Error(
        data && (data.message || data.error || data.detail)
          ? (data.message || data.error || data.detail)
          : response.statusText || "HTTP request failed"
      );

      error.kind = "http";
      error.status = response.status;
      error.code = data && (data.code || data.error_code);
      error.url = url;
      error.body = body;

      throw error;
    }

    return data;
  }

  function saveSettings() {
    settings = {
      username: $("username").value.trim(),
      token: $("token").value.trim()
    };

    writeStorage(SETTINGS_KEY, settings);
    $("loadStatus").textContent = "設定をこのブラウザに保存したよ。";
  }

  async function loadData() {
    const username = $("username").value.trim();
    const token = $("token").value.trim();

    if (!username || !token) {
      showError(Object.assign(
        new Error("ユーザー名とAPIトークンの両方を入力してね。"),
        { kind: "input" }
      ));

      $("errorSummary").textContent =
        "ユーザー名とAPIトークンの両方を入力してね。";

      return;
    }

    clearError();
    $("loadBtn").disabled = true;
    $("loadStatus").textContent =
      "プレイヤーデータと楽曲データを取得中…";

    try {
      const userUrl =
        API_BASE + "/v1/users/" + encodeURIComponent(username);

      const [userResult, songsResult] = await Promise.allSettled([
        fetchJson(userUrl, token),
        fetchJson(SONGS_URL)
      ]);

      if (userResult.status === "rejected") {
        throw userResult.reason;
      }

      playerData = userResult.value;

      if (
        songsResult.status === "fulfilled" &&
        Array.isArray(songsResult.value.songs)
      ) {
        songs = songsResult.value.songs;
        songsById = new Map(songs.map(song => [song.id, song]));
      } else {
        songs = [];
        songsById = new Map();

        if (songsResult.status === "rejected") {
          showError(songsResult.reason);
        }
      }

      if (!playerData || !playerData.player || !playerData.records) {
        throw Object.assign(
          new Error(
            "このユーザーにはChuniSupportに連携されたプレイヤーデータがないよ。"
          ),
          {
            kind: "data",
            url: userUrl,
            body: JSON.stringify(playerData, null, 2)
          }
        );
      }

      saveSettings();
      renderProfile();
      renderFrames();
      renderManualList();
      renderAllRecords();

      $("loadStatus").textContent =
        "取得完了。最終更新: " +
        (playerData.records.updated_at || playerData.updated_at || "不明");

      if (songs.length) {
        $("manualStatus").textContent =
          "楽曲データ " + songs.length.toLocaleString() + " 曲を読み込んだよ。";
      } else if (songsResult.status === "rejected") {
        $("loadStatus").textContent +=
          " ただし楽曲検索用データは取得できなかったよ。";
      }
    } catch (error) {
      showError(error);
      $("loadStatus").textContent =
        "データの取得に失敗したよ。下のエラー詳細を確認してね。";
    } finally {
      $("loadBtn").disabled = false;
    }
  }

  function renderProfile() {
    const player = playerData.player;

    $("playerName").textContent =
      player.name || playerData.username || "不明";

    $("playerRating").textContent =
      Number(player.rating || 0).toFixed(2);

    $("playerLevel").textContent = player.level ?? "--";

    $("lastPlayed").textContent = player.last_played_at
      ? new Date(player.last_played_at).toLocaleString("ja-JP")
      : "--";
  }

  function normalizeApiRecord(record, isNew) {
    return {
      id: record.id,
      title: record.title,
      artist: record.artist,
      difficulty: record.difficulty,
      const: record.const,
      score: record.score,
      rating: Number.isFinite(Number(record.rating))
        ? Number(record.rating)
        : calcRate(record.const, record.score),
      img: record.img || (songsById.get(record.id) || {}).jacket,
      isNew,
      updated_at: record.updated_at,
      manual: false
    };
  }

  function getFrameRecords() {
    const records = playerData.records;

    if (!manualRecords.length) {
      return {
        best: (records.best || [])
          .filter(record => record.is_played)
          .map(record => normalizeApiRecord(record, false)),

        newer: (records.new || [])
          .filter(record => record.is_played)
          .map(record => normalizeApiRecord(record, true))
      };
    }

    const merged = new Map();

    (records.standard || [])
      .filter(record => record.is_played)
      .forEach(record => {
        const song = songsById.get(record.id);
        const isNew = song ? !!song.is_new : false;

        merged.set(
          record.id + "|" + record.difficulty,
          normalizeApiRecord(record, isNew)
        );
      });

    manualRecords.forEach(record => {
      const song = songsById.get(record.id);

      const normalized = {
        ...record,
        img: record.img || (song && song.jacket) || "",
        rating: calcRate(record.const, record.score),
        manual: true
      };

      merged.set(
        record.id + "|" + record.difficulty,
        normalized
      );
    });

    const all = [...merged.values()];

    return {
      best: all
        .filter(record => !record.isNew)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 30),

      newer: all
        .filter(record => record.isNew)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 20)
    };
  }

  function renderFrames() {
    if (!playerData || !playerData.records) return;

    const frames = getFrameRecords();

    renderSongList("bestList", frames.best);
    renderSongList("newList", frames.newer);

    $("bestCount").textContent = frames.best.length + " / 30";
    $("newCount").textContent = frames.newer.length + " / 20";
  }

  function renderSongList(targetId, records) {
    const target = $(targetId);
    target.replaceChildren();

    if (!records.length) {
      target.innerHTML = '<div class="empty">記録がないよ。</div>';
      return;
    }

    records.forEach((record, index) => {
      const row = document.createElement("div");
      row.className = "songrow";

      row.append(makeJacket(record.img, record.title));

      const info = document.createElement("div");

      const diff = document.createElement("span");
      diff.className = "diff " + record.difficulty;
      diff.textContent = ({
        BASIC: "BAS",
        ADVANCED: "ADV",
        EXPERT: "EXP",
        MASTER: "MAS",
        ULTIMA: "ULT"
      })[record.difficulty] || record.difficulty;

      const title = document.createElement("div");
      title.className = "songtitle";
      title.textContent = (index + 1) + ". " + record.title;

      const meta = document.createElement("div");
      meta.className = "songmeta";
      meta.append(
        diff,
        document.createTextNode(
          " 定数 " + (record.const ?? "?") +
          (record.manual ? " ・手動" : "")
        )
      );

      info.append(title, meta);

      const score = document.createElement("div");
      score.className = "score";
      score.textContent =
        Number(record.score || 0).toLocaleString("ja-JP");

      const rate = document.createElement("small");
      rate.textContent =
        "Rate " + Number(record.rating || 0).toFixed(2);

      score.append(rate);
      row.append(info, score);
      target.append(row);
    });
  }

  function renderManualList() {
    const target = $("manualList");
    target.replaceChildren();

    if (!manualRecords.length) {
      target.innerHTML =
        '<div class="empty">まだ記録がないよ。</div>';
      return;
    }

    manualRecords.forEach((record, index) => {
      const row = document.createElement("div");
      row.className = "songrow";

      row.append(makeJacket(record.img, record.title));

      const info = document.createElement("div");

      info.innerHTML =
        '<div class="songtitle">' +
        escapeHtml(record.title) +
        '</div><div class="songmeta">' +
        escapeHtml(record.difficulty) +
        ' ・ 定数 ' +
        escapeHtml(record.const) +
        ' ・ ' +
        Number(record.score).toLocaleString("ja-JP") +
        '</div>';

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "削除";

      remove.addEventListener("click", () => {
        manualRecords.splice(index, 1);
        writeStorage(MANUAL_KEY, manualRecords);

        renderManualList();
        renderFrames();
        renderAllRecords();
      });

      row.append(info, remove);
      target.append(row);
    });
  }

  function renderAllRecords() {
    if (!playerData || !playerData.records) return;

    const query = $("recordSearch").value
      .trim()
      .toLocaleLowerCase();

    const base = (playerData.records.standard || [])
      .filter(record => record.is_played)
      .map(record => {
        const song = songsById.get(record.id);
        return normalizeApiRecord(
          record,
          song ? !!song.is_new : false
        );
      });

    const map = new Map(
      base.map(record => [
        record.id + "|" + record.difficulty,
        record
      ])
    );

    manualRecords.forEach(record => {
      map.set(
        record.id + "|" + record.difficulty,
        {
          ...record,
          rating: calcRate(record.const, record.score),
          manual: true
        }
      );
    });

    const list = [...map.values()]
      .filter(record =>
        (record.title || "").toLocaleLowerCase().includes(query)
      )
      .sort((a, b) => b.rating - a.rating);

    const target = $("allRecords");
    target.replaceChildren();

    if (!list.length) {
      target.innerHTML =
        '<div class="empty">該当する記録がないよ。</div>';
      return;
    }

    list.forEach(record => {
      const row = document.createElement("div");
      row.className = "songrow";

      row.append(
        makeJacket(
          record.img || (songsById.get(record.id) || {}).jacket,
          record.title
        )
      );

      const info = document.createElement("div");

      const title = document.createElement("div");
      title.className = "songtitle";
      title.textContent = record.title;

      const meta = document.createElement("div");
      meta.className = "songmeta";
      meta.textContent =
        "定数 " + (record.const ?? "?") +
        (record.manual ? " ・手動入力" : "");

      info.append(title, meta);

      const score = document.createElement("div");
      score.className = "score";
      score.textContent =
        Number(record.score).toLocaleString("ja-JP");

      const rate = document.createElement("small");
      rate.textContent =
        "Rate " + Number(record.rating).toFixed(2);

      score.append(rate);
      row.append(info, score);
      target.append(row);
    });
  }

  function chooseSong(song) {
    selectedSong = song;

    $("selectedSong").textContent =
      song.title + " / " + (song.artist || "アーティスト不明");

    const select = $("difficulty");
    select.replaceChildren();

    DIFFS.forEach(diff => {
      if (song.charts && song.charts[diff]) {
        const option = document.createElement("option");

        option.value = diff;
        option.textContent =
          diff + "（定数 " +
          (song.charts[diff].const ?? "?") +
          "）";

        select.append(option);
      }
    });

    if (!select.options.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "譜面情報なし";
      select.append(option);
    }

    updateManualConst();
    $("searchResults").classList.remove("show");
  }

  function updateManualConst() {
    if (!selectedSong) return;

    const chart = selectedSong.charts[$("difficulty").value];

    $("manualConst").value =
      chart && chart.const != null ? chart.const : "";
  }

  function setupSearch() {
    $("songSearch").addEventListener("input", () => {
      const query = $("songSearch").value
        .trim()
        .toLocaleLowerCase();

      const results = $("searchResults");
      results.replaceChildren();

      if (!query) {
        results.classList.remove("show");
        return;
      }

      const found = songs
        .filter(song =>
          (song.title || "").toLocaleLowerCase().includes(query) ||
          (song.artist || "").toLocaleLowerCase().includes(query)
        )
        .slice(0, 20);

      if (!found.length) {
        results.innerHTML =
          '<div class="empty">見つからなかったよ。</div>';
      } else {
        found.forEach(song => {
          const button = document.createElement("button");

          button.type = "button";
          button.className = "searchitem";
          button.textContent = song.title;

          const small = document.createElement("small");
          small.textContent =
            (song.artist || "") + " ・ " + (song.genre || "");

          button.append(small);

          button.addEventListener("click", () => {
            chooseSong(song);
          });

          results.append(button);
        });
      }

      results.classList.add("show");
    });

    $("difficulty").addEventListener("change", updateManualConst);
  }

  function addManualRecord() {
    if (!selectedSong) {
      $("manualStatus").textContent =
        "先に楽曲を検索して選択してね。";
      return;
    }

    const difficulty = $("difficulty").value;
    const chart = selectedSong.charts[difficulty];
    const constant = Number($("manualConst").value);
    const score = Number($("manualScore").value);

    if (
      !chart ||
      !Number.isFinite(constant) ||
      constant < 1 ||
      constant > 16.9
    ) {
      $("manualStatus").textContent =
        "譜面定数を正しく入力してね。";
      return;
    }

    if (
      !Number.isInteger(score) ||
      score < 0 ||
      score > 1010000
    ) {
      $("manualStatus").textContent =
        "スコアは0〜1,010,000の整数で入力してね。";
      return;
    }

    const record = {
      id: selectedSong.id,
      title: selectedSong.title,
      artist: selectedSong.artist,
      difficulty,
      const: constant,
      score,
      img: selectedSong.jacket || "",
      isNew: !!selectedSong.is_new,
      date: $("manualDate").value || null
    };

    const existingIndex = manualRecords.findIndex(
      item =>
        item.id === record.id &&
        item.difficulty === record.difficulty
    );

    if (existingIndex >= 0) {
      manualRecords[existingIndex] = record;
    } else {
      manualRecords.push(record);
    }

    writeStorage(MANUAL_KEY, manualRecords);

    $("manualStatus").textContent =
      "保存したよ。既存の手動記録があれば更新したよ。";

    $("manualScore").value = "";

    renderManualList();
    renderFrames();
    renderAllRecords();
  }

  async function loadImageForCanvas(id) {
    if (!id) return null;

    return new Promise(resolve => {
      const image = new Image();

      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = jacketUrl(id);
    });
  }

  async function exportPoster() {
    if (!playerData || !playerData.player) {
      $("exportStatus").textContent =
        "先にプレイヤーデータを取得してね。";
      return;
    }

    $("exportImageBtn").disabled = true;
    $("exportStatus").textContent =
      "ジャケット画像を読み込んでいるよ…";

    try {
      const frames = getFrameRecords();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = 1600;
      const height = 1580;
      const margin = 44;
      const gap = 28;
      const colW = (width - margin * 2 - gap) / 2;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#f3f4f7";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#20232b";
      ctx.font = "bold 46px sans-serif";
      ctx.fillText("CHUNITHM RATING", margin, 72);

      ctx.font = "24px sans-serif";
      ctx.fillStyle = "#555d6b";
      ctx.fillText(
        playerData.player.name || playerData.username,
        margin,
        116
      );

      ctx.font = "bold 48px sans-serif";
      ctx.fillStyle = "#20232b";
      ctx.fillText(
        "RATING  " +
        Number(playerData.player.rating || 0).toFixed(2),
        width - 440,
        92
      );

      const drawColumn = async (records, x, label, maxRows) => {
        const top = 158;
        const rowH = 44;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, top, colW, maxRows * rowH + 56);

        ctx.fillStyle = "#20232b";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(label, x + 18, top + 34);

        const imgs = await Promise.all(
          records.map(record =>
            loadImageForCanvas(
              record.img || (songsById.get(record.id) || {}).jacket
            )
          )
        );

        records.forEach((record, index) => {
          const y = top + 48 + index * rowH;
          const img = imgs[index];

          if (img) {
            try {
              ctx.drawImage(img, x + 14, y, 36, 36);
            } catch {
              ctx.fillStyle = "#e3e5eb";
              ctx.fillRect(x + 14, y, 36, 36);
            }
          } else {
            ctx.fillStyle = "#e3e5eb";
            ctx.fillRect(x + 14, y, 36, 36);
          }

          const diffColor = {
            BASIC: "#39a66b",
            ADVANCED: "#d89a24",
            EXPERT: "#df5367",
            MASTER: "#8860d1",
            ULTIMA: "#222"
          }[record.difficulty] || "#777";

          ctx.fillStyle = diffColor;
          ctx.fillRect(x + 60, y + 4, 56, 26);

          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px sans-serif";
          ctx.fillText(
            ({
              BASIC: "BAS",
              ADVANCED: "ADV",
              EXPERT: "EXP",
              MASTER: "MAS",
              ULTIMA: "ULT"
            })[record.difficulty] || "???",
            x + 69,
            y + 22
          );

          ctx.fillStyle = "#20232b";
          ctx.font = "bold 16px sans-serif";

          let title = String(record.title || "");
          if (title.length > 27) {
            title = title.slice(0, 26) + "…";
          }

          ctx.fillText(title, x + 126, y + 17);

          ctx.font = "13px sans-serif";
          ctx.fillStyle = "#697181";
          ctx.fillText(
            "定数 " + (record.const ?? "?") +
            "  Rate " + Number(record.rating || 0).toFixed(2),
            x + 126,
            y + 34
          );

          ctx.textAlign = "right";
          ctx.fillStyle = "#20232b";
          ctx.font = "bold 17px sans-serif";

          ctx.fillText(
            Number(record.score || 0).toLocaleString("ja-JP"),
            x + colW - 16,
            y + 24
          );

          ctx.textAlign = "left";
          ctx.strokeStyle = "#e6e8ed";
          ctx.beginPath();
          ctx.moveTo(x + 12, y + 42);
          ctx.lineTo(x + colW - 12, y + 42);
          ctx.stroke();
        });
      };

      await Promise.all([
        drawColumn(frames.best, margin, "BEST 30", 30),
        drawColumn(
          frames.newer,
          margin + colW + gap,
          "NEW 20",
          30
        )
      ]);

      ctx.fillStyle = "#697181";
      ctx.font = "14px sans-serif";
      ctx.fillText(
        "Generated from ChuniSupport data",
        margin,
        height - 18
      );

      const blob = await new Promise(resolve =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        throw new Error("PNG画像を生成できなかったよ。");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "chunithm-rating.png";

      document.body.append(link);
      link.click();
      link.remove();

      setTimeout(() => URL.revokeObjectURL(url), 30000);

      $("exportStatus").textContent =
        "PNG画像を保存したよ。ジャケット画像がCORSで読み込めない曲は画像なしで出力されるよ。";
    } catch (error) {
      showError(
        Object.assign(error, {
          kind: error.kind || "export"
        })
      );

      $("exportStatus").textContent =
        "画像の出力に失敗したよ。エラー詳細を確認してね。";
    } finally {
      $("exportImageBtn").disabled = false;
    }
  }

  function init() {
    $("username").value = settings.username || "";
    $("token").value = settings.token || "";

    setupSearch();

    $("loadBtn").addEventListener("click", loadData);
    $("saveSettingsBtn").addEventListener("click", saveSettings);

    $("clearTokenBtn").addEventListener("click", () => {
      $("token").value = "";
      settings.token = "";
      writeStorage(SETTINGS_KEY, settings);

      $("loadStatus").textContent =
        "保存していたAPIトークンを消去したよ。";
    });

    $("errorDetailsBtn").addEventListener("click", () => {
      const details = $("errorDetails");

      details.hidden = !details.hidden;

      $("errorDetailsBtn").textContent =
        details.hidden ? "詳しく見る" : "閉じる";
    });

    $("copyErrorBtn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(lastErrorText);
        $("copyErrorBtn").textContent = "コピーしたよ";
      } catch {
        $("copyErrorBtn").textContent = "コピーできなかったよ";
      }
    });

    $("addManualBtn").addEventListener("click", addManualRecord);

    $("clearManualFormBtn").addEventListener("click", () => {
      selectedSong = null;

      $("songSearch").value = "";
      $("manualConst").value = "";
      $("manualScore").value = "";
      $("manualDate").value = "";

      $("selectedSong").textContent =
        "楽曲が選択されていないよ。";

      $("searchResults").classList.remove("show");
    });

    $("recordSearch").addEventListener(
      "input",
      renderAllRecords
    );

    $("exportImageBtn").addEventListener(
      "click",
      exportPoster
    );

    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(item => {
          item.classList.toggle("active", item === tab);
        });

        document.querySelectorAll(".panel").forEach(panel => {
          panel.classList.toggle(
            "active",
            panel.id === "panel-" + tab.dataset.tab
          );
        });
      });
    });

    renderManualList();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
