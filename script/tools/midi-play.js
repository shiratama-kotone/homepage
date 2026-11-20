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

const convertBtn = document.getElementById("midi-convert");
const downloadBtn = document.getElementById("midi-download");
const progressEl = document.getElementById("midi-progress");

// ========================================
// データ
// ========================================

let midiData = null;
let notes = [];

let isLoaded = false;
let isPlaying = false;

let duration = 0;
let currentTime = 0;

let synth = null;

let startTime = 0;
let startPosition = 0;

let rafId = null;

let playbackGeneration = 0;

let mp3Blob = null;
let mp3Url = null;

// ========================================
// 設定
// ========================================

const NOTE_HEIGHT = 10;
const KEY_WIDTH = 80;

const WHITE_KEYS = [0, 2, 4, 5, 7, 9, 11];

const PIXELS_PER_SECOND = 100;

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
    !canvasKeys
) {
    throw new Error("MIDI Player: 必要なHTML要素が見つからない");
}

const ctxRoll = canvasRoll.getContext("2d");
const ctxKeys = canvasKeys.getContext("2d");

// ========================================
// 時間表示
// ========================================

function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) {
        sec = 0;
    }

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${String(s).padStart(2, "0")}`;
}

// ========================================
// 再生位置
// ========================================

function getSpeed() {
    const speed = parseFloat(speedEl.value);

    return Number.isFinite(speed) && speed > 0
        ? speed
        : 1;
}

function getCurrentPosition() {
    if (!isPlaying) {
        return currentTime;
    }

    const elapsed =
        (performance.now() - startTime) / 1000;

    return Math.min(
        startPosition + elapsed * getSpeed(),
        duration
    );
}

// ========================================
// UI更新
// ========================================

function updateUI(time) {
    currentTime = Math.max(
        0,
        Math.min(time, duration)
    );

    currentTimeEl.textContent = formatTime(currentTime);

    seekBar.value = duration > 0
        ? (currentTime / duration) * 100
        : 0;
}

function updateButtons() {
    playBtn.disabled = !isLoaded || isPlaying;
    pauseBtn.disabled = !isPlaying;
    stopBtn.disabled = !isLoaded;
    convertBtn.disabled = !isLoaded;
}

// ========================================
// 音源
// ========================================

function createSynth() {
    if (synth) {
        synth.dispose();
    }

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

// 予約済みの音を含めて音源を破棄
function resetSynth() {
    if (synth) {
        synth.releaseAll();
        synth.dispose();
        synth = null;
    }
}

// ========================================
// MIDI読み込み
// ========================================

midiFile.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    stop();

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
                    track: trackIndex
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

        currentTime = 0;
        startPosition = 0;

        isLoaded = true;

        // MIDI情報
        totalTimeEl.textContent = formatTime(duration);

        titleEl.textContent =
            parsedMidi.name || file.name.replace(/\.(mid|midi)$/i, "");

        tempoEl.textContent =
            parsedMidi.header.tempos?.[0]?.bpm
                ? parsedMidi.header.tempos[0].bpm
                : "-";

        const timeSignature =
            parsedMidi.header.timeSignatures?.[0]?.timeSignature;

        timeSigEl.textContent = timeSignature
            ? timeSignature.join("/")
            : "-";

        lengthEl.textContent = formatTime(duration);

        trackEl.textContent = parsedMidi.tracks.length;

        noteEl.textContent = notes.length;

        // シークバー
        seekBar.value = 0;

        // MP3関連
        progressEl.textContent = "";

        if (mp3Url) {
            URL.revokeObjectURL(mp3Url);
            mp3Url = null;
        }

        mp3Blob = null;

        downloadBtn.style.display = "none";

        updateUI(0);
        updateButtons();

        drawRoll();

        console.log("MIDI loaded:", parsedMidi);

    } catch (error) {
        console.error("MIDI loading error:", error);

        isLoaded = false;
        midiData = null;
        notes = [];

        duration = 0;

        updateButtons();

        alert(
            "MIDIファイルを読み込めなかった\n\n" +
            error.message
        );
    }
});

// ========================================
// 再生
// ========================================

async function play() {
    if (!isLoaded || isPlaying) return;

    if (currentTime >= duration) {
        currentTime = 0;
    }

    try {
        await Tone.start();

        resetSynth();
        createSynth();

        const speed = getSpeed();

        const offset = currentTime;

        const now = Tone.now();

        startPosition = offset;
        startTime = performance.now();

        playbackGeneration++;

        const generation = playbackGeneration;

        isPlaying = true;

        // ノート予約
        notes.forEach(note => {
            const noteEnd = note.time + note.duration;

            if (noteEnd <= offset) {
                return;
            }

            const noteStart = Math.max(
                note.time,
                offset
            );

            const delay = (noteStart - offset) / speed;

            const noteDuration =
                (noteEnd - noteStart) / speed;

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
    updateButtons();
}

// ========================================
// 停止
// ========================================

function stop() {
    isPlaying = false;

    playbackGeneration++;

    cancelAnimationFrame(rafId);

    resetSynth();

    currentTime = 0;
    startPosition = 0;

    updateUI(0);
    updateButtons();

    if (rollContainer) {
        rollContainer.scrollLeft = 0;
    }
}

// ========================================
// 再生時間更新
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

    // ピアノロール追従
    const zoom = parseFloat(zoomEl.value) || 1;

    const viewX =
        currentTime * PIXELS_PER_SECOND * zoom;

    if (rollContainer) {
        rollContainer.scrollLeft = Math.max(
            0,
            viewX - rollContainer.clientWidth * 0.3
        );
    }

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

    if (wasPlaying) {
        play();
    }
});

// ========================================
// ボタン
// ========================================

playBtn.addEventListener("click", play);

pauseBtn.addEventListener("click", pause);

stopBtn.addEventListener("click", stop);

// ========================================
// ピアノロール
// ========================================

function getPitchRange() {
    if (notes.length === 0) {
        return {
            min: 21,
            max: 108
        };
    }

    const min = Math.min(
        ...notes.map(n => n.midi)
    );

    const max = Math.max(
        ...notes.map(n => n.midi)
    );

    return {
        min: Math.min(21, min),
        max: Math.max(108, max)
    };
}

function drawRoll() {
    if (!isLoaded) return;

    const zoom = parseFloat(zoomEl.value) || 1;

    const width = Math.max(
        2000,
        Math.ceil(
            duration * PIXELS_PER_SECOND * zoom
        )
    );

    const range = getPitchRange();

    const height =
        (range.max - range.min + 1) * NOTE_HEIGHT;

    canvasRoll.width = width;
    canvasRoll.height = height;

    canvasRoll.style.width = `${width}px`;
    canvasRoll.style.height = `${height}px`;

    canvasKeys.width = KEY_WIDTH;
    canvasKeys.height = height;

    canvasKeys.style.width = `${KEY_WIDTH}px`;
    canvasKeys.style.height = `${height}px`;

    ctxRoll.clearRect(0, 0, width, height);

    // 横線・鍵盤背景
    for (
        let midi = range.min;
        midi <= range.max;
        midi++
    ) {
        const y =
            (range.max - midi) * NOTE_HEIGHT;

        const isBlack =
            !WHITE_KEYS.includes(midi % 12);

        ctxRoll.fillStyle = isBlack
            ? "rgba(0,0,0,0.08)"
            : "rgba(255,255,255,0.03)";

        ctxRoll.fillRect(
            0,
            y,
            width,
            NOTE_HEIGHT
        );

        ctxRoll.strokeStyle = "rgba(128,128,128,0.25)";
        ctxRoll.lineWidth = 1;

        ctxRoll.beginPath();
        ctxRoll.moveTo(0, y + NOTE_HEIGHT);
        ctxRoll.lineTo(width, y + NOTE_HEIGHT);
        ctxRoll.stroke();
    }

    // 時間目盛り
    ctxRoll.font = "12px sans-serif";
    ctxRoll.fillStyle = "#888";

    const secondsStep = zoom >= 2 ? 1 : 5;

    for (
        let sec = 0;
        sec <= duration;
        sec += secondsStep
    ) {
        const x =
            sec * PIXELS_PER_SECOND * zoom;

        ctxRoll.strokeStyle = "rgba(128,128,128,0.3)";

        ctxRoll.beginPath();
        ctxRoll.moveTo(x, 0);
        ctxRoll.lineTo(x, height);
        ctxRoll.stroke();

        ctxRoll.fillText(
            formatTime(sec),
            x + 3,
            14
        );
    }

    // ノート描画
    notes.forEach(note => {
        const x =
            note.time * PIXELS_PER_SECOND * zoom;

        const w = Math.max(
            2,
            note.duration * PIXELS_PER_SECOND * zoom
        );

        const y =
            (range.max - note.midi) * NOTE_HEIGHT;

        const velocity = Math.max(
            0.2,
            Math.min(note.velocity, 1)
        );

        ctxRoll.fillStyle =
            `rgba(147,112,219,${0.4 + velocity * 0.5})`;

        ctxRoll.fillRect(
            x,
            y + 1,
            w,
            NOTE_HEIGHT - 2
        );
    });

    drawKeys(range);
}

// ========================================
// 鍵盤描画
// ========================================

function drawKeys(range) {
    const height = canvasKeys.height;

    ctxKeys.clearRect(
        0,
        0,
        KEY_WIDTH,
        height
    );

    for (
        let midi = range.min;
        midi <= range.max;
        midi++
    ) {
        const y =
            (range.max - midi) * NOTE_HEIGHT;

        const isBlack =
            !WHITE_KEYS.includes(midi % 12);

        ctxKeys.fillStyle = isBlack
            ? "#333"
            : "#fff";

        ctxKeys.fillRect(
            0,
            y,
            KEY_WIDTH,
            NOTE_HEIGHT
        );

        ctxKeys.strokeStyle = "#aaa";

        ctxKeys.strokeRect(
            0,
            y,
            KEY_WIDTH,
            NOTE_HEIGHT
        );

        if (midi % 12 === 0) {
            ctxKeys.fillStyle = isBlack
                ? "#fff"
                : "#222";

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
    drawRoll();
});

// ========================================
// 速度変更
// ========================================

speedEl.addEventListener("input", () => {
    if (!isPlaying) return;

    // 変更前の再生位置を保存
    currentTime = getCurrentPosition();

    isPlaying = false;

    playbackGeneration++;

    cancelAnimationFrame(rafId);

    resetSynth();

    // 新しい速度で再生し直す
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

        // 長時間の音声によるメモリ不足を防止
        if (frameCount > sampleRate * 600) {
            throw new Error(
                "10分を超えるMIDIは変換できない"
            );
        }

        const AudioContextClass =
            window.OfflineAudioContext ||
            window.webkitOfflineAudioContext;

        if (!AudioContextClass) {
            throw new Error(
                "OfflineAudioContextに対応していない"
            );
        }

        const offlineContext = new AudioContextClass(
            1,
            frameCount,
            sampleRate
        );

        const masterGain =
            offlineContext.createGain();

        masterGain.gain.value = 0.7;

        masterGain.connect(offlineContext.destination);

        // ノートを音声化
        notes.forEach(note => {
            const oscillator =
                offlineContext.createOscillator();

            const gain =
                offlineContext.createGain();

            const start = Math.max(0, note.time);

            const end = Math.min(
                duration + 1,
                note.time + note.duration
            );

            if (end <= start) return;

            oscillator.type = "sine";

            oscillator.frequency.value =
                440 * Math.pow(
                    2,
                    (note.midi - 69) / 12
                );

            const velocity = Math.max(
                0,
                Math.min(note.velocity, 1)
            );

            const volume = velocity * 0.2;

            gain.gain.setValueAtTime(
                volume,
                start
            );

            gain.gain.setValueAtTime(
                volume,
                Math.max(start, end - 0.03)
            );

            gain.gain.linearRampToValueAtTime(
                0,
                end
            );

            oscillator.connect(gain);
            gain.connect(masterGain);

            oscillator.start(start);
            oscillator.stop(end);
        });

        const renderedBuffer =
            await offlineContext.startRendering();

        progressEl.textContent = "MP3にエンコード中...";

        const mp3encoder = new lamejs.Mp3Encoder(
            1,
            sampleRate,
            128
        );

        const channel = renderedBuffer.getChannelData(0);

        const mp3Data = [];

        const blockSize = 1152;

        const totalBlocks = Math.ceil(
            channel.length / blockSize
        );

        for (
            let block = 0;
            block < totalBlocks;
            block++
        ) {
            const start = block * blockSize;

            const end = Math.min(
                start + blockSize,
                channel.length
            );

            const pcm = new Int16Array(
                end - start
            );

            for (let i = start; i < end; i++) {
                const sample = Math.max(
                    -1,
                    Math.min(1, channel[i])
                );

                pcm[i - start] =
                    sample < 0
                        ? sample * 32768
                        : sample * 32767;
            }

            const encoded =
                mp3encoder.encodeBuffer(pcm);

            if (encoded.length > 0) {
                mp3Data.push(encoded);
            }

            if (block % 100 === 0) {
                progressEl.textContent =
                    `MP3変換中... ${Math.floor(
                        (block / totalBlocks) * 100
                    )}%`;

                await new Promise(resolve =>
                    setTimeout(resolve, 0)
                );
            }
        }

        const end = mp3encoder.flush();

        if (end.length > 0) {
            mp3Data.push(end);
        }

        mp3Blob = new Blob(
            mp3Data,
            {
                type: "audio/mpeg"
            }
        );

        // 古いURLを破棄
        if (mp3Url) {
            URL.revokeObjectURL(mp3Url);
        }

        mp3Url = URL.createObjectURL(mp3Blob);

        downloadBtn.href = mp3Url;
        downloadBtn.style.display = "inline-block";

        progressEl.textContent = "変換完了";

    } catch (error) {
        console.error("MP3 conversion error:", error);

        progressEl.textContent =
            "変換に失敗: " + error.message;

        alert(
            "MP3変換に失敗した\n\n" +
            error.message
        );

    } finally {
        convertBtn.disabled = !isLoaded;
    }
}

// ========================================
// MP3変換ボタン
// ========================================

convertBtn.addEventListener(
    "click",
    convertToMp3
);

// ========================================
// 初期状態
// ========================================

updateButtons();
updateUI(0);