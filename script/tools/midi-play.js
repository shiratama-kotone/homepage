const midiFile = document.getElementById("midi-file");

const playBtn = document.getElementById("midi-play");
const pauseBtn = document.getElementById("midi-pause");
const stopBtn = document.getElementById("midi-stop");

const seekBar = document.getElementById("midi-seek-bar");
const currentTimeEl = document.getElementById("midi-current-time");
const totalTimeEl = document.getElementById("midi-total-time");

const zoomEl = document.getElementById("midi-zoom");
const speedEl = document.getElementById("midi-speed");

const titleEl = document.getElementById("midi-title");
const tempoEl = document.getElementById("midi-tempo");
const timeSigEl = document.getElementById("midi-time-signature");
const lengthEl = document.getElementById("midi-length");
const trackEl = document.getElementById("midi-track-count");
const noteEl = document.getElementById("midi-note-count");

const canvasRoll = document.getElementById("midi-piano-roll");
const canvasKeys = document.getElementById("midi-piano-keys");

let midiData = null;
let notes = [];
let isLoaded = false;

let duration = 0;
let currentTime = 0;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// MIDI読み込み
midiFile.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  midiData = new Midi(arrayBuffer);

  notes = [];

  midiData.tracks.forEach(track => {
    track.notes.forEach(n => {
      notes.push({
        time: n.time,
        duration: n.duration,
        midi: n.midi,
        velocity: n.velocity
      });
    });
  });

  notes.sort((a, b) => a.time - b.time);

  duration = midiData.duration;
  isLoaded = true;

  // UI更新
  totalTimeEl.textContent = formatTime(duration);
  titleEl.textContent = midiData.name || "Unknown";
  tempoEl.textContent = midiData.header.tempos?.[0]?.bpm || "-";
  timeSigEl.textContent =
    midiData.header.timeSignatures?.[0]?.timeSignature?.join("/") || "-";
  lengthEl.textContent = formatTime(duration);
  trackEl.textContent = midiData.tracks.length;
  noteEl.textContent = notes.length;

  playBtn.disabled = false;
  stopBtn.disabled = false;
  pauseBtn.disabled = false;

  console.log("MIDI loaded:", midiData);
});

let synth = null;
let startTime = 0;
let pausedTime = 0;
let isPlaying = false;
let rafId = null;

function initSynth() {
  synth = new Tone.PolySynth(Tone.Synth).toDestination();
}

// 再生
async function play() {
  if (!isLoaded) return;

  await Tone.start();

  if (!synth) initSynth();

  isPlaying = true;

  const offset = pausedTime || seekBar.value * duration;

  startTime = Tone.now() - offset;

  notes.forEach(n => {
    if (n.time >= offset) {
      synth.triggerAttackRelease(
        Tone.Midi(n.midi).toFrequency(),
        n.duration,
        startTime + n.time
      );
    }
  });

  updateTime();
}

// 一時停止
function pause() {
  isPlaying = false;
  pausedTime = currentTime;
  Tone.Transport.stop();
  cancelAnimationFrame(rafId);
}

// 停止
function stop() {
  isPlaying = false;
  pausedTime = 0;
  currentTime = 0;
  seekBar.value = 0;

  Tone.Transport.stop();
  cancelAnimationFrame(rafId);

  updateUI(0);
}

// 時間更新
function updateTime() {
  if (!isPlaying) return;

  currentTime = Tone.now() - startTime;

  if (currentTime >= duration) {
    stop();
    return;
  }

  seekBar.value = currentTime / duration;

  updateUI(currentTime);

  rafId = requestAnimationFrame(updateTime);
}

// UI更新
function updateUI(time) {
  currentTimeEl.textContent = formatTime(time);
}

// シーク操作
seekBar.addEventListener("input", () => {
  const t = seekBar.value * duration;
  pausedTime = t;

  if (isPlaying) {
    stop();
    play();
  } else {
    updateUI(t);
  }
});

// ボタン
playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);

const ctxRoll = canvasRoll.getContext("2d");
const ctxKeys = canvasKeys.getContext("2d");

const WHITE_KEYS = [0,2,4,5,7,9,11];

const NOTE_HEIGHT = 10;
const KEY_WIDTH = 80;

function drawRoll() {
  if (!isLoaded) return;

  const width = canvasRoll.clientWidth = 2000;
  const height = canvasRoll.clientHeight = 600;

  canvasRoll.width = width;
  canvasRoll.height = height;

  ctxRoll.clearRect(0,0,width,height);

  const zoom = parseFloat(zoomEl.value);

  notes.forEach(n => {
    const x = n.time * 100 * zoom;
    const w = n.duration * 100 * zoom;

    const y = height - (n.midi * NOTE_HEIGHT);

    ctxRoll.fillStyle = "rgba(147,112,219,0.8)";
    ctxRoll.fillRect(x, y, w, NOTE_HEIGHT);
  });

  drawKeys();
}

function drawKeys() {
  const width = canvasKeys.clientWidth = KEY_WIDTH;
  const height = canvasRoll.clientHeight;

  canvasKeys.width = width;
  canvasKeys.height = height;

  ctxKeys.clearRect(0,0,width,height);

  for (let i = 0; i < 88; i++) {
    const midi = 21 + i;
    const y = height - i * NOTE_HEIGHT;

    const isBlack = !WHITE_KEYS.includes(midi % 12);

    ctxKeys.fillStyle = isBlack ? "#333" : "#fff";
    ctxKeys.fillRect(0, y, KEY_WIDTH, NOTE_HEIGHT);

    ctxKeys.strokeStyle = "#ccc";
    ctxKeys.strokeRect(0, y, KEY_WIDTH, NOTE_HEIGHT);
  }
}

// ズーム変更
zoomEl.addEventListener("input", () => {
  drawRoll();
});

// MIDIロード後にも描画
const oldLoad = midiFile.onchange;
midiFile.addEventListener("change", () => {
  setTimeout(drawRoll, 100);
});

let scrollX = 0;

function updatePlaybackUI() {
  if (!isPlaying) return;

  const zoom = parseFloat(zoomEl.value);
  const speed = parseFloat(speedEl.value);

  // 速度反映（再生時間補正）
  const adjustedTime = (Tone.now() - startTime) * speed;

  currentTime = adjustedTime;

  if (currentTime >= duration) {
    stop();
    return;
  }

  seekBar.value = currentTime / duration;
  updateUI(currentTime);

  // ピアノロール追従スクロール
  const viewX = currentTime * 100 * zoom;

  const container = document.getElementById("midi-roll-container");
  container.scrollLeft = viewX - 200;

  rafId = requestAnimationFrame(updatePlaybackUI);
}

// 再生関数を差し替え（重要）
function play() {
  if (!isLoaded) return;

  Tone.start();

  if (!synth) initSynth();

  isPlaying = true;

  const speed = parseFloat(speedEl.value);
  const offset = pausedTime || seekBar.value * duration;

  startTime = Tone.now() - offset / speed;

  notes.forEach(n => {
    const t = n.time / speed;

    synth.triggerAttackRelease(
      Tone.Midi(n.midi).toFrequency(),
      n.duration / speed,
      startTime + t
    );
  });

  updatePlaybackUI();
}

// 速度変更
speedEl.addEventListener("input", () => {
  if (isPlaying) {
    stop();
    play();
  }
});

let mp3Blob = null;

// MP3変換
async function convertToMp3() {
  if (!isLoaded) return;

  const progress = document.getElementById("midi-progress");
  progress.textContent = "変換中...";

  const sampleRate = 44100;
  const mp3encoder = new lamejs.Mp3Encoder(1, sampleRate, 128);

  const samples = [];

  notes.forEach(n => {
    const freq = Tone.Midi(n.midi).toFrequency();
    const length = Math.floor(n.duration * sampleRate);

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      samples.push(Math.sin(2 * Math.PI * freq * t) * 0.3);
    }
  });

  const mp3Data = [];

  let i = 0;
  while (i < samples.length) {
    const chunk = samples.slice(i, i + 1152);
    const int16 = new Int16Array(chunk.map(v => v * 32767));

    const mp3buf = mp3encoder.encodeBuffer(int16);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    i += 1152;
    progress.textContent = `変換中... ${Math.floor((i / samples.length) * 100)}%`;
  }

  const end = mp3encoder.flush();
  if (end.length > 0) mp3Data.push(end);

  mp3Blob = new Blob(mp3Data, { type: "audio/mp3" });

  progress.textContent = "完了";

  const url = URL.createObjectURL(mp3Blob);

  const downloadBtn = document.getElementById("midi-download");
  downloadBtn.href = url;
  downloadBtn.style.display = "inline-block";
}

// ボタン
document.getElementById("midi-convert")
  .addEventListener("click", convertToMp3);

// MIDIロード後に有効化
midiFile.addEventListener("change", () => {
  document.getElementById("midi-convert").disabled = false;
});