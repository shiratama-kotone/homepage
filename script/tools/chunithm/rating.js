
"use strict";

(() => {
  const API_BASE = "https://api.chunisupport.net";
  const SONGS_URL = "https://static.chunisupport.net/v1/songs.json";
  const JACKET_BASE = "https://image.chunisupport.net/jackets/chunithm/";

  const SETTINGS_KEY = "chunisupport_rating_settings_v1";
  const MANUAL_KEY = "chunisupport_rating_manual_v1";

  const DIFFS = [
    "BASIC",
    "ADVANCED",
    "EXPERT",
    "MASTER",
    "ULTIMA"
  ];

  const $ = id => document.getElementById(id);

  let settings = readStorage(SETTINGS_KEY, {});
  let songs = [];
  let songsById = new Map();

  let playerData = null;
  let manualRecords = readStorage(MANUAL_KEY, []);

  let selectedSong = null;
  let lastErrorText = "";

  // -------------------------
  // ストレージ
  // -------------------------

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

  // -------------------------
  // レート計算
  // single-track.js と同じ計算式
  // -------------------------

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

  // -------------------------
  // ジャケット
  // -------------------------

  function jacketUrl(id) {
    return id
      ? JACKET_BASE + encodeURIComponent(id) + ".webp"
      : "";
  }

  function makeJacket(id, title) {
    const img = document.createElement("img");

    img.alt = title ? title + " ジャケット" : "ジャケット画像";
    img.width = 46;
    img.height = 46;
    img.loading = "lazy";

    if (id) {
      img.src = jacketUrl(id);
    }

    img.onerror = () => {
      img.onerror = null;
      img.removeAttribute("src");
      img.alt = "画像なし";
    };

    return img;
  }

  // -------------------------
  // エラー表示
  // -------------------------

  function describeError(error) {
    let summary = error.message || "不明なエラー";

    if (error.status === 401) {
      summary = "APIトークンが無効か、認証に失敗したよ。";
    } else if (error.status === 403) {
      summary = "このデータを閲覧する権限がないよ。";
    } else if (error.status === 404) {
      summary = "ユーザーまたはデータが見つからなかったよ。";
    } else if (error.status === 429) {
      summary = "APIの利用回数制限に達したよ。少し待ってから再試行してね。";
    } else if (error.status >= 500) {
      summary = "サーバー側でエラーが発生したよ。";
    } else if (error.kind === "network") {
      summary = "通信に失敗したよ。ネット接続やCORS制限を確認してね。";
    } else if (error.kind === "json") {
      summary = "サーバーの応答をJSONとして読み取れなかったよ。";
    }

    const raw = [
      "種類: " + (error.kind || "unknown"),
      "HTTP: " + (error.status || "なし"),
      "APIコード: " + (error.code || "なし"),
      "URL: " + (error.url || "不明"),
      "メッセージ: " + (error.message || "不明"),
      "",
      "レスポンス本文:",
      error.body || "(本文なし)",
      "",
      "例外:",
      error.stack || "(スタックなし)"
    ].join("\n");

    return { summary, raw };
  }

  function showError(error) {
    const info = describeError(error);

    $("errorBox").hidden = false;
    $("errorTitle").textContent = error.status
      ? "取得エラー（HTTP " + error.status + "）"
      : "取得エラー";

    $("errorSummary").textContent = info.summary;
    $("errorRaw").textContent = info.raw;
    $("errorDetails").hidden = true;
    $("errorDetailsBtn").textContent = "詳しく見る";

    lastErrorText = info.raw;
  }

  function clearError() {
    $("errorBox").hidden = true;
    $("errorDetails").hidden = true;
    lastErrorText = "";
  }

  // -------------------------
  // API通信
  // -------------------------

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
      const error = new Error(cause.message || "Fetch failed");
      error.kind = "network";
      error.url = url;
      error.stack = cause.stack || "";
      throw error;
    }

    const body = await response.text();
    let data;

    try {
      data = body ? JSON.parse(body) : null;
    } catch (cause) {
      const error = new Error("JSON解析エラー: " + cause.message);
      error.kind = "json";
      error.status = response.status;
      error.url = url;
      error.body = body;
      error.stack = cause.stack || "";
      throw error;
    }

    if (!response.ok) {
      const error = new Error(
        data?.message ||
        data?.error ||
        data?.detail ||
        response.statusText ||
        "HTTP request failed"
      );

      error.kind = "http";
      error.status = response.status;
      error.code = data?.code || data?.error_code;
      error.url = url;
      error.body = body;

      throw error;
    }

    return data;
  }

  // -------------------------
  // 設定保存
  // -------------------------

  function saveSettings() {
    settings = {
      username: $("username").value.trim(),
      token: $("token").value.trim()
    };

    writeStorage(SETTINGS_KEY, settings);
    $("loadStatus").textContent = "設定を保存したよ。";
  }

  // -------------------------
  // 楽曲データ取得
  // -------------------------

  async function loadSongs() {
    clearError();

    $("loadSongsBtn").disabled = true;
    $("songsStatus").textContent = "楽曲データを取得中…";

    try {
      const result = await fetchJson(SONGS_URL);

      if (!result || !Array.isArray(result.songs)) {
        const error = new Error("楽曲データの形式が正しくないよ。");
        error.kind = "data";
        error.url = SONGS_URL;
        error.body = JSON.stringify(result, null, 2);
        throw error;
      }

      songs = result.songs;
      songsById = new Map(
        songs.map(song => [String(song.id), song])
      );

      $("songsStatus").textContent =
        "楽曲データ取得完了。全 " +
        songs.length.toLocaleString("ja-JP") +
        " 曲を読み込んだよ。";

      $("songSearch").placeholder = "曲名を入力して検索";

      renderAll();

    } catch (error) {
      showError(error);
      $("songsStatus").textContent =
        "楽曲データの取得に失敗したよ。";
    } finally {
      $("loadSongsBtn").disabled = false;
    }
  }

  // -------------------------
  // ユーザーデータ取得
  // -------------------------

  async function loadData() {
    const username = $("username").value.trim();
    const token = $("token").value.trim();

    if (!username || !token) {
      const error = new Error("ユーザー名とAPIトークンを入力してね。");
      error.kind = "input";
      showError(error);
      return;
    }

    clearError();

    $("loadBtn").disabled = true;
    $("loadStatus").textContent = "ユーザーデータを取得中…";

    try {
      const url =
        API_BASE + "/v1/users/" + encodeURIComponent(username);

      const result = await fetchJson(url, token);

      if (!result?.player || !result?.records) {
        const error = new Error("プレイヤーデータが見つからなかったよ。");
        error.kind = "data";
        error.url = url;
        error.body = JSON.stringify(result, null, 2);
        throw error;
      }

      playerData = result;

      saveSettings();
      renderAll();

      $("loadStatus").textContent =
        "ユーザーデータ取得完了。最終更新: " +
        (result.records.updated_at || result.updated_at || "不明");

    } catch (error) {
      showError(error);
      $("loadStatus").textContent =
        "ユーザーデータの取得に失敗したよ。手動記録はそのまま残っているよ。";
    } finally {
      $("loadBtn").disabled = false;
    }
  }

  // -------------------------
  // 記録データの整形
  // -------------------------

  function normalizeApiRecord(record, isNew) {
    const song = songsById.get(String(record.id));

    const constant = Number(record.const);
    const score = Number(record.score);

    return {
      id: String(record.id),
      title: record.title || song?.title || "曲名不明",
      artist: record.artist || song?.artist || "",
      difficulty: record.difficulty,
      const: constant,
      score,
      rating: calcRate(constant, score),
      img: record.img || song?.jacket || "",
      isNew: Boolean(isNew),
      manual: false
    };
  }

  function normalizeManualRecord(record) {
    const song = songsById.get(String(record.id));

    return {
      ...record,
      id: String(record.id),
      title: record.title || song?.title || "曲名不明",
      img: record.img || song?.jacket || "",
      isNew: song ? Boolean(song.is_new) : Boolean(record.isNew),
      rating: calcRate(Number(record.const), Number(record.score)),
      manual: true
    };
  }

  function getApiRecords() {
    if (!playerData?.records) return [];

    const records = playerData.records;
    const result = [];

    if (Array.isArray(records.standard)) {
      records.standard
        .filter(record => record.is_played)
        .forEach(record => {
          const song = songsById.get(String(record.id));
          result.push(
            normalizeApiRecord(
              record,
              song ? Boolean(song.is_new) : false
            )
          );
        });

      return result;
    }

    // standard がない場合は BEST / NEW を利用
    (records.best || [])
      .filter(record => record.is_played)
      .forEach(record => {
        result.push(normalizeApiRecord(record, false));
      });

    (records.new || [])
      .filter(record => record.is_played)
      .forEach(record => {
        result.push(normalizeApiRecord(record, true));
      });

    return result;
  }

  // -------------------------
  // 手動記録とAPI記録を統合
  // -------------------------

  function getMergedRecords() {
    const merged = new Map();

    function addRecord(record) {
      const key = record.id + "|" + record.difficulty;
      const current = merged.get(key);

      if (!current) {
        merged.set(key, record);
        return;
      }

      // スコアが高い方を採用
      if (record.score > current.score) {
        merged.set(key, record);
        return;
      }

      // 同点なら手動入力を優先
      if (
        record.score === current.score &&
        record.manual &&
        !current.manual
      ) {
        merged.set(key, record);
      }
    }

    // API記録を先に追加
    getApiRecords().forEach(addRecord);

    // 手動記録も追加して比較
    manualRecords
      .map(normalizeManualRecord)
      .forEach(addRecord);

    return [...merged.values()];
  }

  // -------------------------
  // BEST / NEW の計算
  // -------------------------

  function getFrameRecords() {
    const all = getMergedRecords();

    const best = all
      .filter(record => !record.isNew)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 30);

    const newer = all
      .filter(record => record.isNew)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 20);

    return { best, newer };
  }

  // -------------------------
  // プレイヤー情報
  // -------------------------

  function renderProfile() {
    if (playerData?.player) {
      const player = playerData.player;

      $("playerName").textContent =
        player.name || playerData.username || "不明";

      $("playerRating").textContent =
        Number(player.rating || 0).toFixed(2);

      $("playerLevel").textContent = player.level ?? "--";

      $("lastPlayed").textContent = player.last_played_at
        ? new Date(player.last_played_at).toLocaleString("ja-JP")
        : "--";

      return;
    }

    const frames = getFrameRecords();
    const count = frames.best.length + frames.newer.length;

    const total = [
      ...frames.best,
      ...frames.newer
    ].reduce((sum, record) => sum + record.rating, 0);

    $("playerName").textContent = "手動入力モード";
    $("playerRating").textContent =
      count ? (total / count).toFixed(2) : "--.--";

    $("playerLevel").textContent = "--";
    $("lastPlayed").textContent = "--";
  }

  // -------------------------
  // 記録一覧表示
  // -------------------------

  function renderSongList(targetId, records) {
    const target = $(targetId);
    target.replaceChildren();

    if (!records.length) {
      const empty = document.createElement("p");
      empty.className = "description";
      empty.textContent = "まだ記録がないよ。";
      target.append(empty);
      return;
    }

    records.forEach((record, index) => {
      const row = document.createElement("div");

      const jacket = makeJacket(record.img, record.title);
      row.append(jacket);

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = (index + 1) + ". " + record.title;

      const meta = document.createElement("p");
      meta.className = "description";
      meta.textContent =
        record.difficulty +
        " / 定数 " + record.const +
        (record.manual ? " / 手動入力" : " / ChuniSupport");

      info.append(title, meta);

      const score = document.createElement("p");
      score.textContent =
        Number(record.score).toLocaleString("ja-JP") +
        "点 / Rate " + record.rating.toFixed(2);

      row.append(info, score);
      target.append(row);
    });
  }

  function renderFrames() {
    const frames = getFrameRecords();

    renderSongList("bestList", frames.best);
    renderSongList("newList", frames.newer);

    $("bestCount").textContent = frames.best.length + " / 30";
    $("newCount").textContent = frames.newer.length + " / 20";
  }

  function renderManualList() {
    const target = $("manualList");
    target.replaceChildren();

    if (!manualRecords.length) {
      const empty = document.createElement("p");
      empty.className = "description";
      empty.textContent = "まだ手動入力した記録がないよ。";
      target.append(empty);
      return;
    }

    manualRecords.forEach((record, index) => {
      const row = document.createElement("div");

      row.append(makeJacket(record.img, record.title));

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = record.title;

      const meta = document.createElement("p");
      meta.className = "description";
      meta.textContent =
        record.difficulty +
        " / 定数 " + record.const +
        " / " + Number(record.score).toLocaleString("ja-JP") + "点";

      info.append(title, meta);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "削除";

      remove.addEventListener("click", () => {
        manualRecords.splice(index, 1);
        writeStorage(MANUAL_KEY, manualRecords);
        renderAll();
      });

      row.append(info, remove);
      target.append(row);
    });
  }

  function renderAllRecords() {
    const target = $("allRecords");
    target.replaceChildren();

    const query = $("recordSearch").value
      .trim()
      .toLocaleLowerCase();

    const list = getMergedRecords()
      .filter(record =>
        record.title.toLocaleLowerCase().includes(query)
      )
      .sort((a, b) => b.rating - a.rating);

    if (!list.length) {
      const empty = document.createElement("p");
      empty.className = "description";
      empty.textContent = "該当する記録がないよ。";
      target.append(empty);
      return;
    }

    list.forEach(record => {
      const row = document.createElement("div");

      row.append(makeJacket(record.img, record.title));

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = record.title;

      const meta = document.createElement("p");
      meta.className = "description";
      meta.textContent =
        record.difficulty +
        " / 定数 " + record.const +
        (record.manual ? " / 手動入力" : " / ChuniSupport");

      info.append(title, meta);

      const score = document.createElement("p");
      score.textContent =
        Number(record.score).toLocaleString("ja-JP") +
        "点 / Rate " + record.rating.toFixed(2);

      row.append(info, score);
      target.append(row);
    });
  }

  function renderAll() {
    renderProfile();
    renderFrames();
    renderManualList();
    renderAllRecords();
  }

  // -------------------------
  // 楽曲検索
  // -------------------------

  function chooseSong(song) {
    selectedSong = song;

    $("selectedSong").textContent =
      song.title + " / " + (song.artist || "アーティスト不明");

    const select = $("difficulty");
    select.replaceChildren();

    DIFFS.forEach(diff => {
      if (!song.charts?.[diff]) return;

      const option = document.createElement("option");
      option.value = diff;
      option.textContent =
        diff + "（定数 " + song.charts[diff].const + "）";

      select.append(option);
    });

    if (!select.options.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "譜面情報なし";
      select.append(option);
    }

    updateManualConst();
    $("searchResults").hidden = true;
  }

  function updateManualConst() {
    if (!selectedSong) return;

    const chart = selectedSong.charts?.[$("difficulty").value];

    $("manualConst").value =
      chart?.const ?? "";
  }

  function setupSearch() {
    $("songSearch").addEventListener("input", () => {
      const query = $("songSearch").value
        .trim()
        .toLocaleLowerCase();

      const results = $("searchResults");
      results.replaceChildren();

      if (!query) {
        results.hidden = true;
        return;
      }

      const found = songs
        .filter(song =>
          (song.title || "").toLocaleLowerCase().includes(query) ||
          (song.artist || "").toLocaleLowerCase().includes(query)
        )
        .slice(0, 20);

      if (!found.length) {
        const empty = document.createElement("p");
        empty.textContent = "見つからなかったよ。";
        results.append(empty);
      } else {
        found.forEach(song => {
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = song.title;

          button.addEventListener("click", () => {
            chooseSong(song);
          });

          results.append(button);
        });
      }

      results.hidden = false;
    });

    $("difficulty").addEventListener("change", updateManualConst);
  }

  // -------------------------
  // 手動スコア保存
  // -------------------------

  function addManualRecord() {
    if (!selectedSong) {
      $("manualStatus").textContent =
        "先に楽曲を検索して選択してね。";
      return;
    }

    const difficulty = $("difficulty").value;
    const chart = selectedSong.charts?.[difficulty];

    const constant = Number($("manualConst").value);
    const score = Number($("manualScore").value);

    if (
      !chart ||
      !Number.isFinite(constant) ||
      constant < 1 ||
      constant > 20
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
      id: String(selectedSong.id),
      title: selectedSong.title,
      artist: selectedSong.artist || "",
      difficulty,
      const: constant,
      score,
      img: selectedSong.jacket || "",
      isNew: Boolean(selectedSong.is_new),
      date: $("manualDate").value || null
    };

    const existingIndex = manualRecords.findIndex(item =>
      String(item.id) === record.id &&
      item.difficulty === record.difficulty
    );

    if (existingIndex >= 0) {
      manualRecords[existingIndex] = record;
    } else {
      manualRecords.push(record);
    }

    writeStorage(MANUAL_KEY, manualRecords);

    $("manualStatus").textContent =
      "保存したよ。API記録と比較して高いスコアが採用されるよ。";

    $("manualScore").value = "";

    renderAll();
  }

  // -------------------------
  // PNG画像出力
  // -------------------------

  function loadImageForCanvas(id) {
    if (!id) return Promise.resolve(null);

    return new Promise(resolve => {
      const image = new Image();

      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = jacketUrl(id);
    });
  }

  async function exportPoster() {
    const frames = getFrameRecords();

    if (!frames.best.length && !frames.newer.length) {
      $("exportStatus").textContent =
        "出力する記録がまだないよ。";
      return;
    }

    $("exportImageBtn").disabled = true;
    $("exportStatus").textContent =
      "画像を作成中…";

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = 1600;
      const height = 1580;
      const margin = 44;
      const gap = 28;
      const colW = (width - margin * 2 - gap) / 2;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = "#f7f7fb";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#555577";
      ctx.font = "bold 46px sans-serif";
      ctx.fillText("CHUNITHM RATING", margin, 72);

      ctx.font = "24px sans-serif";
      ctx.fillText(
        playerData?.player?.name ||
        playerData?.username ||
        "手動入力",
        margin,
        116
      );

      ctx.font = "bold 42px sans-serif";
      ctx.fillText(
        "RATING " + $("playerRating").textContent,
        width - 430,
        92
      );

      async function drawColumn(records, x, label) {
        const top = 158;
        const rowH = 44;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, top, colW, 30 * rowH + 56);

        ctx.fillStyle = "#555577";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(label, x + 18, top + 34);

        const images = await Promise.all(
          records.map(record =>
            loadImageForCanvas(record.img)
          )
        );

        records.forEach((record, index) => {
          const y = top + 48 + index * rowH;
          const image = images[index];

          if (image) {
            try {
              ctx.drawImage(image, x + 14, y, 36, 36);
            } catch {
              ctx.fillStyle = "#e5e7eb";
              ctx.fillRect(x + 14, y, 36, 36);
            }
          } else {
            ctx.fillStyle = "#e5e7eb";
            ctx.fillRect(x + 14, y, 36, 36);
          }

          const colors = {
            BASIC: "#39a66b",
            ADVANCED: "#d89a24",
            EXPERT: "#df5367",
            MASTER: "#8860d1",
            ULTIMA: "#222222"
          };

          ctx.fillStyle = colors[record.difficulty] || "#777777";
          ctx.fillRect(x + 60, y + 4, 56, 26);

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 14px sans-serif";

          const shortDiff = {
            BASIC: "BAS",
            ADVANCED: "ADV",
            EXPERT: "EXP",
            MASTER: "MAS",
            ULTIMA: "ULT"
          };

          ctx.fillText(
            shortDiff[record.difficulty] || "???",
            x + 69,
            y + 22
          );

          ctx.fillStyle = "#555577";
          ctx.font = "bold 16px sans-serif";

          let title = String(record.title || "");

          if (title.length > 25) {
            title = title.slice(0, 24) + "…";
          }

          ctx.fillText(title, x + 126, y + 17);

          ctx.font = "13px sans-serif";
          ctx.fillStyle = "#6b7280";

          ctx.fillText(
            "定数 " + record.const +
            " / Rate " + record.rating.toFixed(2),
            x + 126,
            y + 34
          );

          ctx.textAlign = "right";
          ctx.fillStyle = "#555577";
          ctx.font = "bold 17px sans-serif";

          ctx.fillText(
            Number(record.score).toLocaleString("ja-JP"),
            x + colW - 16,
            y + 24
          );

          ctx.textAlign = "left";
        });
      }

      await Promise.all([
        drawColumn(frames.best, margin, "BEST 30"),
        drawColumn(frames.newer, margin + colW + gap, "NEW 20")
      ]);

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
        "PNG画像を作成したよ。画像が読み込めない曲はジャケットなしで出力されるよ。";

    } catch (error) {
      error.kind = error.kind || "export";
      showError(error);

      $("exportStatus").textContent =
        "画像出力に失敗したよ。エラー詳細を確認してね。";
    } finally {
      $("exportImageBtn").disabled = false;
    }
  }

  // -------------------------
  // 初期化
  // -------------------------

  function init() {
    $("username").value = settings.username || "";
    $("token").value = settings.token || "";

    setupSearch();

    $("loadSongsBtn").addEventListener("click", loadSongs);
    $("loadBtn").addEventListener("click", loadData);
    $("saveSettingsBtn").addEventListener("click", saveSettings);

    $("clearTokenBtn").addEventListener("click", () => {
      $("token").value = "";
      settings.token = "";
      writeStorage(SETTINGS_KEY, settings);

      $("loadStatus").textContent =
        "保存していたAPIトークンを消去したよ。";
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

      $("searchResults").hidden = true;
    });

    $("recordSearch").addEventListener("input", renderAllRecords);

    $("exportImageBtn").addEventListener("click", exportPoster);

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

    document.querySelectorAll(".tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(item => {
          item.classList.toggle("active", item === tab);
        });

        document.querySelectorAll(".panel").forEach(panel => {
          const active =
            panel.id === "panel-" + tab.dataset.tab;

          panel.hidden = !active;
          panel.classList.toggle("active", active);
        });
      });
    });

    renderAll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
