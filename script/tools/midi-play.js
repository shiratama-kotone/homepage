
"use strict";

// ========================================
// DOM
// ========================================

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
const rollContainer = document.getElementById("midi-roll-container");
const rollTrack = document.getElementById("midi-roll-track");
const playhead = document.getElementById("midi-playhead");

const convertBtn = document.getElementById("midi-convert");
const downloadBtn = document.getElementById("midi-download");
const progressEl = document.getElementById("midi-progress");

// ========================================
// 設定
// ========================================

const NOTE_HEIGHT = 10;
const KEY_WIDTH = 80;
const PIXELS_PER_BEAT = 60;

const CHANNEL_COLORS = [
    "#e74c3c", "#3498db", "#2ecc71", "#f1c40f",
    "#9b59b6", "#e67e22", "#1abc9c", "#e84393",
    "#7f8c8d", "#16a085", "#d35400", "#6c5ce7",
    "#00cec9", "#fd79a8", "#636e72", "#a29bfe"
];

const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11];

// ========================================
// データ
// ========================================

let midiData = null;
let notes = [];

let isLoaded = false;
let isPlaying = false;
let isStarting = false;

let duration = 0;
let currentTime = 0;

let synth = null;

let startTime = 0;
let startPosition = 0;

let rafId = null;
let playbackGeneration = 0;

let mp3Url = null;

let tempoEvents = [];
let timeSignatureEvents = [];

const PITCH_MIN = 0;
const PITCH_MAX = 127;

// ========================================
// 初期化
// ========================================

if (
    !midiFile ||
    !playBtn ||
    !pauseBtn ||
    !stopBtn ||
    !seekBar ||
    !canvasRoll ||
    !canvasKeys ||
    !rollContainer ||
    !rollTrack ||
    !playhead
) {
    throw new Error("MIDI Player: 必要なHTML要素が見つからない");
}

const ctxRoll = canvasRoll.getContext("2d");
const ctxKeys = canvasKeys.getContext("2d");

// ========================================
// 時間表示
// ========================================

function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) sec = 0;

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${String(s).padStart(2, "0")}`;
}

function getSpeed() {
    const speed = Number(speedEl.value);

    return Number.isFinite(speed) && speed > 0
        ? speed
        : 1;
}

function getZoom() {
    return Number(zoomEl.value) || 1;
}

// ========================================
// テンポ・拍子
// ========================================

// 秒数を4分音符単位の拍数に変換
function secondsToBeats(seconds) {
    if (!tempoEvents.length) {
        return seconds * 2;
    }

    let beats = 0;
    let previousTime = 0;
    let bpm = tempoEvents[0].bpm;

    for (let i = 1; i < tempoEvents.length; i++) {
        const event = tempoEvents[i];

        if (seconds <= event.time) break;

        const segmentEnd = Math.min(seconds, event.time);

        beats += (segmentEnd - previousTime) * bpm / 60;

        previousTime = event.time;
        bpm = event.bpm;
    }

    beats += Math.max(0, seconds - previousTime) * bpm / 60;

    return beats;
}

// 拍数を秒数に変換
function beatsToSeconds(beats) {
    if (!tempoEvents.length) {
        return beats * 0.5;
    }

    let seconds = 0;
    let previousBeat = 0;
    let bpm = tempoEvents[0].bpm;

    for (let i = 1; i < tempoEvents.length; i++) {
        const event = tempoEvents[i];
        const eventBeat = secondsToBeats(event.time);

        if (beats <= eventBeat) break;

        seconds += (eventBeat - previousBeat) * 60 / bpm;

        previousBeat = eventBeat;
        bpm = event.bpm;
    }

    seconds += Math.max(0, beats - previousBeat) * 60 / bpm;

    return seconds;
}

// 秒数をロール上のX座標に変換
function timeToX(seconds) {
    return secondsToBeats(seconds) * PIXELS_PER_BEAT * getZoom();
}

// ========================================
// チャンネルカラー
// ========================================

function getChannelColor(channel) {
    return CHANNEL_COLORS[
        ((channel % 16) + 16) % 16
    ];
}

// ========================================
// 再生位置
// ========================================

function getCurrentPosition() {
    if (!isPlaying) return currentTime;

    const elapsed = (performance.now() - startTime) / 1000;

    return Math.min(
        startPosition + elapsed * getSpeed(),
        duration
    );
}

// ========================================
// UI
// ========================================

function updateUI(time) {
    currentTime = Math.max(0, Math.min(time, duration));

    currentTimeEl.textContent = formatTime(currentTime);

    seekBar.value = duration > 0
        ? (currentTime / duration) * 100
        : 0;

    updatePlayhead();
}

function updateButtons() {
    playBtn.disabled = !isLoaded || isPlaying || isStarting;
    pauseBtn.disabled = !isPlaying;
    stopBtn.disabled = !isLoaded;
    convertBtn.disabled = !isLoaded;
}

// ========================================
// 再生位置の赤い線
// ========================================

function updatePlayhead() {
    if (!isLoaded) {
        playhead.style.display = "none";
        return;
    }

    playhead.style.left = `${timeToX(currentTime)}px`;
    playhead.style.display = "block";
}

// ========================================
// 音源
// ========================================

function resetSynth() {
    if (!synth) return;

    synth.releaseAll();
    synth.dispose();
    synth = null;
}

function createSynth() {
    resetSynth();

    synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.7,
            release: 0.2
        }
    }).toDestination();

    synth.volume.value = -8;
}

// ========================================
// MIDI読み込み
// ========================================

midiFile.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    stop();

    isLoaded = false;
    updateButtons();

    try {
        if (typeof Midi === "undefined") {
            throw new Error("MIDIライブラリが読み込まれていない");
        }

        const arrayBuffer = await file.arrayBuffer();
        const parsedMidi = new Midi(arrayBuffer);

        const loadedNotes = [];

        parsedMidi.tracks.forEach((track, trackIndex) => {
            track.notes.forEach(note => {
                loadedNotes.push({
                    time: note.time,
                    duration: note.duration,
                    midi: note.midi,
                    velocity: note.velocity,
                    track: trackIndex,
                    channel: Number.isInteger(track.channel)
                        ? track.channel
                        : 0
                });
            });
        });

        loadedNotes.sort((a, b) => a.time - b.time);

        midiData = parsedMidi;
        notes = loadedNotes;

        duration = Math.max(
            parsedMidi.duration,
            ...notes.map(n => n.time + n.duration),
            0
        );

        // テンポイベント
        tempoEvents = (parsedMidi.header.tempos || [])
            .map(event => ({
                time: event.time,
                bpm: event.bpm
            }))
            .filter(event =>
                Number.isFinite(event.time) &&
                Number.isFinite(event.bpm) &&
                event.bpm > 0
            )
            .sort((a, b) => a.time - b.time);

        if (!tempoEvents.length) {
            tempoEvents = [{ time: 0, bpm: 120 }];
        }

        if (tempoEvents[0].time > 0) {
            tempoEvents.unshift({ time: 0, bpm: 120 });
        }

        // 拍子イベント
        timeSignatureEvents =
            (parsedMidi.header.timeSignatures || [])
                .map(event => ({
                    time: event.time,
                    numerator: event.timeSignature[0],
                    denominator: event.timeSignature[1]
                }))
                .filter(event =>
                    Number.isFinite(event.time) &&
                    event.numerator > 0 &&
                    event.denominator > 0
                )
                .sort((a, b) => a.time - b.time);

        if (!timeSignatureEvents.length) {
            timeSignatureEvents = [{
                time: 0,
                numerator: 4,
                denominator: 4
            }];
        }

        if (timeSignatureEvents[0].time > 0) {
            timeSignatureEvents.unshift({
                time: 0,
                numerator: 4,
                denominator: 4
            });
        }

        currentTime = 0;
        startPosition = 0;

        isLoaded = true;

        totalTimeEl.textContent = formatTime(duration);

        titleEl.textContent =
            parsedMidi.name ||
            file.name.replace(/\.(mid|midi)$/i, "");

        tempoEl.textContent =
            parsedMidi.header.tempos?.[0]?.bpm ?? "-";

        const firstSignature =
            parsedMidi.header.timeSignatures?.[0]?.timeSignature;

        timeSigEl.textContent = firstSignature
            ? firstSignature.join("/")
            : "-";

        lengthEl.textContent = formatTime(duration);
        trackEl.textContent = parsedMidi.tracks.length;
        noteEl.textContent = notes.length;

        progressEl.textContent = "";

        if (mp3Url) {
            URL.revokeObjectURL(mp3Url);
            mp3Url = null;
        }

        downloadBtn.removeAttribute("href");
        downloadBtn.style.display = "none";

        updateUI(0);
        updateButtons();

        drawRoll();
        drawKeys();

        rollContainer.scrollLeft = 0;

        console.log("MIDI loaded:", parsedMidi);

    } catch (error) {
        console.error("MIDI loading error:", error);

        isLoaded = false;
        midiData = null;
        notes = [];
        duration = 0;

        updateButtons();

        alert("MIDIファイルを読み込めなかった\n\n" + error.message);
    }
});

// ========================================
// 再生
// ========================================

async function play() {
    if (!isLoaded || isPlaying || isStarting) return;

    if (currentTime >= duration) {
        currentTime = 0;
    }

    isStarting = true;
    updateButtons();

    try {
        await Tone.start();

        createSynth();

        const speed = getSpeed();
        const offset = currentTime;
        const now = Tone.now();

        startPosition = offset;
        startTime = performance.now();

        playbackGeneration++;

        const generation = playbackGeneration;

        isPlaying = true;
        isStarting = false;

        notes.forEach(note => {
            const noteEnd = note.time + note.duration;

            if (noteEnd <= offset) return;

            const noteStart = Math.max(note.time, offset);

            const delay = (noteStart - offset) / speed;
            const noteDuration = (noteEnd - noteStart) / speed;

            if (noteDuration <= 0) return;

            const frequency =
                Tone.Frequency(note.midi, "midi").toFrequency();

            const velocity = Math.max(
                0,
                Math.min(note.velocity, 1)
            );

            synth.triggerAttackRelease(
                frequency,
                noteDuration,
                now + delay,
                velocity
            );
        });

        updateButtons();
        updatePlaybackUI(generation);

    } catch (error) {
        console.error("Playback error:", error);

        isPlaying = false;
        isStarting = false;

        resetSynth();
        updateButtons();

        alert("再生できなかった\n\n" + error.message);
    }
}

// ========================================
// 一時停止
// ========================================

function pause() {
    if (!isPlaying) return;

    currentTime = getCurrentPosition();

    isPlaying = false;
    playbackGeneration++;

    cancelAnimationFrame(rafId);
    resetSynth();

    updateUI(currentTime);
    drawKeys();
    updateButtons();
}

// ========================================
// 停止
// ========================================

function stop() {
    isPlaying = false;
    isStarting = false;

    playbackGeneration++;

    cancelAnimationFrame(rafId);
    resetSynth();

    currentTime = 0;
    startPosition = 0;

    updateUI(0);
    drawKeys();
    updateButtons();

    rollContainer.scrollLeft = 0;

    if (!isLoaded) {
        playhead.style.display = "none";
    }
}

// ========================================
// 再生中の更新
// ========================================

function updatePlaybackUI(generation) {
    if (!isPlaying) return;
    if (generation !== playbackGeneration) return;

    currentTime = getCurrentPosition();

    if (currentTime >= duration) {
        stop();
        return;
    }

    updateUI(currentTime);

    // 再生位置に合わせて横スクロール
    const viewX = timeToX(currentTime);

    rollContainer.scrollLeft = Math.max(
        0,
        viewX - rollContainer.clientWidth * 0.3
    );

    // 鍵盤の発光を更新
    drawKeys();

    rafId = requestAnimationFrame(() => {
        updatePlaybackUI(generation);
    });
}

// ========================================
// シーク
// ========================================

seekBar.addEventListener("input", () => {
    if (!isLoaded) return;

    const position =
        (Number(seekBar.value) / 100) * duration;

    const wasPlaying = isPlaying;

    if (wasPlaying) {
        isPlaying = false;
        playbackGeneration++;

        cancelAnimationFrame(rafId);
        resetSynth();
    }

    currentTime = position;

    updateUI(position);
    drawKeys();

    if (wasPlaying) play();
});

// ========================================
// ボタン
// ========================================

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);

// ========================================
// ピッチ範囲
// ========================================

function getPitchRange() {
    return {
        min: PITCH_MIN,
        max: PITCH_MAX
    };
}

// ========================================
// 拍子イベントを使った小節線の計算
// ========================================

function getMeasureLines() {
    const lines = [];

    let currentBeat = 0;
    let previousTime = 0;

    let numerator = 4;
    let denominator = 4;

    for (let i = 0; i < timeSignatureEvents.length; i++) {
        const event = timeSignatureEvents[i];

        const eventBeat = secondsToBeats(event.time);

        const beatLength = 4 / denominator;
        const barLength = numerator * beatLength;

        // 拍子変更位置までの小節線
        let beat = currentBeat;

        while (beat <= eventBeat + 0.0001) {
            if (beat >= currentBeat - 0.0001) {
                lines.push({
                    beat,
                    bar: true
                });
            }

            beat += barLength;
        }

        currentBeat = eventBeat;
        previousTime = event.time;

        numerator = event.numerator;
        denominator = event.denominator;
    }

    const beatLength = 4 / denominator;
    const barLength = numerator * beatLength;

    let beat = currentBeat + barLength;

    while (beat <= secondsToBeats(duration) + 0.0001) {
        lines.push({
            beat,
            bar: true
        });

        beat += barLength;
    }

    return lines;
}

// ========================================
// ピアノロール描画
// ========================================

function drawRoll() {
    if (!isLoaded) return;

    const zoom = getZoom();
    const range = getPitchRange();

    const height =
        (range.max - range.min + 1) * NOTE_HEIGHT;

    const width = Math.max(
        2000,
        Math.ceil(timeToX(duration) + 100)
    );

    canvasRoll.width = width;
    canvasRoll.height = height;

    canvasRoll.style.width = `${width}px`;
    canvasRoll.style.height = `${height}px`;

    canvasKeys.width = KEY_WIDTH;
    canvasKeys.height = height;

    canvasKeys.style.width = `${KEY_WIDTH}px`;
    canvasKeys.style.height = `${height}px`;

    rollTrack.style.width = `${width}px`;
    rollTrack.style.height = `${height}px`;

    playhead.style.height = `${height}px`;

    ctxRoll.clearRect(0, 0, width, height);

    // 鍵盤ごとの背景
    for (let midi = range.min; midi <= range.max; midi++) {
        const y = (range.max - midi) * NOTE_HEIGHT;

        const isBlack = !WHITE_KEYS.includes(midi % 12);

        ctxRoll.fillStyle = isBlack
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.03)";

        ctxRoll.fillRect(0, y, width, NOTE_HEIGHT);

        ctxRoll.strokeStyle = "rgba(128,128,128,0.2)";
        ctxRoll.lineWidth = 1;

        ctxRoll.beginPath();
        ctxRoll.moveTo(0, y + NOTE_HEIGHT);
        ctxRoll.lineTo(width, y + NOTE_HEIGHT);
        ctxRoll.stroke();
    }

    // 拍の線
    const totalBeats = secondsToBeats(duration);
    const signature = timeSignatureEvents[0] || {
        numerator: 4,
        denominator: 4
    };

    const beatLength = 4 / signature.denominator;

    ctxRoll.font = "11px sans-serif";

    for (
        let beat = 0;
        beat <= totalBeats + 0.001;
        beat += beatLength
    ) {
        const x = beat * PIXELS_PER_BEAT * zoom;

        ctxRoll.strokeStyle = "rgba(128,128,128,0.28)";
        ctxRoll.lineWidth = 1;

        ctxRoll.beginPath();
        ctxRoll.moveTo(x, 0);
        ctxRoll.lineTo(x, height);
        ctxRoll.stroke();
    }

    // 小節の線を濃く描画
    const measureLines = getMeasureLines();

    measureLines.forEach(line => {
        const x = line.beat * PIXELS_PER_BEAT * zoom;

        ctxRoll.strokeStyle = "rgba(100,100,100,0.75)";
        ctxRoll.lineWidth = 2;

        ctxRoll.beginPath();
        ctxRoll.moveTo(x, 0);
        ctxRoll.lineTo(x, height);
        ctxRoll.stroke();
    });

    // ノート描画
    notes.forEach(note => {
        const x = timeToX(note.time);

        const w = Math.max(
            2,
            (timeToX(note.time + note.duration) - x)
        );

        const y = (range.max - note.midi) * NOTE_HEIGHT;

        const velocity = Math.max(
            0.2,
            Math.min(note.velocity, 1)
        );

        const color = getChannelColor(note.channel);

        ctxRoll.globalAlpha = 0.4 + velocity * 0.5;
        ctxRoll.fillStyle = color;

        ctxRoll.fillRect(
            x,
            y + 1,
            w,
            NOTE_HEIGHT - 2
        );

        ctxRoll.globalAlpha = 1;
    });

    // 時刻表示
    ctxRoll.fillStyle = "#888";
    ctxRoll.font = "11px sans-serif";

    const labelStep = 4;

    for (
        let beat = 0;
        beat <= totalBeats;
        beat += labelStep
    ) {
        const x = beat * PIXELS_PER_BEAT * zoom;
        const sec = beatsToSeconds(beat);

        ctxRoll.fillText(formatTime(sec), x + 3, 12);
    }

    updatePlayhead();
}

// ========================================
// 鍵盤描画・発光
// ========================================

function drawKeys() {
    const range = getPitchRange();
    const height = canvasKeys.height;

    if (!height) return;

    ctxKeys.clearRect(0, 0, KEY_WIDTH, height);

    // 現在鳴っている音を取得
    const activeNotes = isPlaying
        ? notes.filter(note =>
            currentTime >= note.time &&
            currentTime < note.time + note.duration
        )
        : [];

    for (let midi = range.min; midi <= range.max; midi++) {
        const y = (range.max - midi) * NOTE_HEIGHT;

        const isBlack = !WHITE_KEYS.includes(midi % 12);

        const activeChannels = [
            ...new Set(
                activeNotes
                    .filter(note => note.midi === midi)
                    .map(note => note.channel)
            )
        ];

        // 通常の鍵盤色
        ctxKeys.fillStyle = isBlack ? "#333" : "#fff";
        ctxKeys.fillRect(0, y, KEY_WIDTH, NOTE_HEIGHT);

        // 発音中のチャンネルカラー
        if (activeChannels.length === 1) {
            ctxKeys.fillStyle = getChannelColor(activeChannels[0]);
            ctxKeys.fillRect(0, y, KEY_WIDTH, NOTE_HEIGHT);
        } else if (activeChannels.length > 1) {
            const segmentWidth = KEY_WIDTH / activeChannels.length;

            activeChannels.forEach((channel, index) => {
                ctxKeys.fillStyle = getChannelColor(channel);

                ctxKeys.fillRect(
                    index * segmentWidth,
                    y,
                    segmentWidth,
                    NOTE_HEIGHT
                );
            });
        }

        // 鍵盤の境界線
        ctxKeys.strokeStyle = "#888";
        ctxKeys.lineWidth = 0.7;
        ctxKeys.strokeRect(0, y, KEY_WIDTH, NOTE_HEIGHT);

        // Cの音名
        if (midi % 12 === 0) {
            ctxKeys.fillStyle = activeChannels.length
                ? "#fff"
                : (isBlack ? "#fff" : "#222");

            ctxKeys.font = "10px sans-serif";

            ctxKeys.fillText(
                `C${Math.floor(midi / 12) - 1}`,
                5,
                y + 9
            );
        }
    }
}

// ========================================
// ズーム変更
// ========================================

zoomEl.addEventListener("input", () => {
    const oldX = timeToX(currentTime);

    drawRoll();

    rollContainer.scrollLeft = Math.max(
        0,
        oldX - rollContainer.clientWidth * 0.3
    );
});

// ========================================
// 再生速度変更
// ========================================

speedEl.addEventListener("input", () => {
    if (!isPlaying) return;

    currentTime = getCurrentPosition();

    isPlaying = false;
    playbackGeneration++;

    cancelAnimationFrame(rafId);
    resetSynth();

    play();
});

// ========================================
// MP3変換
// ========================================

async function convertToMp3() {
    if (!isLoaded || notes.length === 0) return;

    if (
        typeof lamejs === "undefined" ||
        typeof lamejs.Mp3Encoder !== "function"
    ) {
        alert("MP3変換ライブラリが読み込まれていない");
        return;
    }

    convertBtn.disabled = true;
    progressEl.textContent = "音声を生成中...";

    try {
        const sampleRate = 44100;

        const frameCount = Math.ceil(
            (duration + 1) * sampleRate
        );

        if (frameCount > sampleRate * 600) {
            throw new Error("10分を超えるMIDIは変換できない");
        }

        const AudioContextClass =
            window.OfflineAudioContext ||
            window.webkitOfflineAudioContext;

        if (!AudioContextClass) {
            throw new Error("OfflineAudioContextに対応していない");
        }

        const offlineContext = new AudioContextClass(
            1,
            frameCount,
            sampleRate
        );

        const masterGain = offlineContext.createGain();
        masterGain.gain.value = 0.7;
        masterGain.connect(offlineContext.destination);

        // ノートを音声化
        notes.forEach(note => {
            const oscillator = offlineContext.createOscillator();
            const gain = offlineContext.createGain();

            const start = Math.max(0, note.time);

            const end = Math.min(
                duration + 1,
                note.time + note.duration
            );

            if (end <= start) return;

            oscillator.type = "sine";

            oscillator.frequency.value =
                440 * Math.pow(2, (note.midi - 69) / 12);

            const velocity = Math.max(
                0,
                Math.min(note.velocity, 1)
            );

            const volume = velocity * 0.2;

            gain.gain.setValueAtTime(volume, start);

            gain.gain.setValueAtTime(
                volume,
                Math.max(start, end - 0.03)
            );

            gain.gain.linearRampToValueAtTime(0, end);

            oscillator.connect(gain);
            gain.connect(masterGain);

            oscillator.start(start);
            oscillator.stop(end);
        });

        const renderedBuffer =
            await offlineContext.startRendering();

        progressEl.textContent = "MP3にエンコード中...";

        const encoder = new lamejs.Mp3Encoder(
            1,
            sampleRate,
            128
        );

        const channel = renderedBuffer.getChannelData(0);
        const mp3Data = [];

        const blockSize = 1152;
        const totalBlocks = Math.ceil(channel.length / blockSize);

        for (let block = 0; block < totalBlocks; block++) {
            const start = block * blockSize;
            const end = Math.min(start + blockSize, channel.length);

            const pcm = new Int16Array(end - start);

            for (let i = start; i < end; i++) {
                const sample = Math.max(-1, Math.min(1, channel[i]));

                pcm[i - start] = sample < 0
                    ? sample * 32768
                    : sample * 32767;
            }

            const encoded = encoder.encodeBuffer(pcm);

            if (encoded.length > 0) {
                mp3Data.push(encoded);
            }

            if (block % 100 === 0) {
                progressEl.textContent =
                    `MP3変換中... ${Math.floor(block / totalBlocks * 100)}%`;

                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        const endData = encoder.flush();

        if (endData.length > 0) {
            mp3Data.push(endData);
        }

        const blob = new Blob(mp3Data, {
            type: "audio/mpeg"
        });

        if (mp3Url) {
            URL.revokeObjectURL(mp3Url);
        }

        mp3Url = URL.createObjectURL(blob);

        downloadBtn.href = mp3Url;
        downloadBtn.style.display = "inline-block";

        progressEl.textContent = "変換完了";

    } catch (error) {
        console.error("MP3 conversion error:", error);

        progressEl.textContent = "変換に失敗: " + error.message;

        alert("MP3変換に失敗した\n\n" + error.message);

    } finally {
        convertBtn.disabled = !isLoaded;
    }
}

// ========================================
// MP3変換ボタン
// ========================================

convertBtn.addEventListener("click", convertToMp3);

// ========================================
// 初期状態
// ========================================

updateButtons();
updateUI(0);
