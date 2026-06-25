// https://zenn.dev/de_teiu_tkg/articles/0938b41ec85d20
const toBlob = (base64) => {
    const decodedData = atob(base64.replace(/^.*,/, ""));
    const buffers = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
        buffers[i] = decodedData.charCodeAt(i);
    }
    try {
        const blob = new Blob([buffers.buffer], {
            type: "image/jpeg",
        });
        return blob;
    } catch (e) {
        return null;
    }
};

// https://qiita.com/h53/items/05139982c6fd81212b08
function toISOStringWithTimezone(date) {
    const pad = (str) => (`0${str}`).slice(-2);
    const year = (date.getFullYear()).toString();
    const month = pad((date.getMonth() + 1).toString());
    const day = pad(date.getDate().toString());
    const hour = pad(date.getHours().toString());
    const min = pad(date.getMinutes().toString());
    const sec = pad(date.getSeconds().toString());
    const tz = -date.getTimezoneOffset();
    const sign = tz >= 0 ? '+' : '-';
    const tzHour = pad((tz / 60).toString());
    const tzMin = pad((tz % 60).toString());

    return `${year}-${month}-${day}T${hour}:${min}:${sec}${sign}${tzHour}:${tzMin}`;
}

// updated_atăăćĽäťăŽăżăĺĺž
function getUpdatedDate(updated_at) {
    return new Date(updated_at.slice(0, 10));
}

function floorFloatBig(f, n) {
    const p = Big(10).pow(n);
    const eps = Big(1).div(Big(10).pow(n + 12));
    return Big(f).plus(eps).times(p).round(0, 0).div(p);
}

function calculateRating(score, chartConstant, floor = true) {
    console.log(`Calculating rating for score: ${score}, constant: ${chartConstant}`);
    if (score === null) {
        score = 0;
    }
    const s = Big(score);
    const cc = Big(chartConstant);
    let rating = Big(0);

    if (s.gte(1009000)) {
        rating = cc.plus('2.15');
    } else if (s.gte(1007500)) {
        const diff = s.minus(1007500);
        rating = cc.plus('2').plus(diff.times('0.0001'));
    } else if (s.gte(1005000)) {
        const diff = s.minus(1005000);
        rating = cc.plus('1.5').plus(diff.times('0.0002'));
    } else if (s.gte(1000000)) {
        const diff = s.minus(1000000);
        rating = cc.plus('1').plus(diff.times('0.0001'));
    } else if (s.gte(975000)) {
        const diff = s.minus(975000);
        rating = cc.plus(diff.times('0.00004'));
    } else if (s.gte(900000)) {
        const diff = s.minus(900000);
        rating = cc.minus('5').plus(diff.times(Big('0.1').div(1500)));
    } else if (s.gte(800000)) {
        const diff = s.minus(800000);
        rating = cc.minus('5').div(2).plus(diff.times(cc.minus('5')).div(200000));
    } else if (s.gte(500000)) {
        const diff = s.minus(500000);
        rating = cc.minus('5').div(2).times(diff.div(300000));
    }

    rating = floor ? floorFloatBig(rating, 2) : rating;
    return Math.max(rating.toNumber(), 0);
}



function loadingState(b) {
    if (b) {
        // ă­ăźăăźčĄ¨ç¤ş
        document.getElementById("imggen_loader").style.display = "block";

        // çćăăżăłéčĄ¨ç¤ş
        document.getElementById("generate").style.display = "none";
    } else {
        // ă­ăźăăźéčĄ¨ç¤ş
        document.getElementById("imggen_loader").style.display = "none";

        // çćăăżăłčĄ¨ç¤ş
        document.getElementById("generate").style.display = "block";
    }
}

function initializeArea() {
    const bestSongs = document.getElementById("img-best-songs");
    while (bestSongs.firstChild) bestSongs.removeChild(bestSongs.firstChild);
    const newSongs = document.getElementById("img-new-songs");
    while (newSongs.firstChild) newSongs.removeChild(newSongs.firstChild);
    const imgWrapper = document.getElementById("result-img-wrapper");
    while (imgWrapper.firstChild) imgWrapper.removeChild(imgWrapper.firstChild);
}

function removeButtons() {
    document.getElementById("generate-image").style.display = "none";
    document.getElementById("download").style.display = "none";
    document.getElementById("share").style.display = "none";
}

function renderImage() {
    loadingState(true);
    removeButtons();
    html2canvas(document.getElementById("pre-render-area"), { scale: 2 }).then(c => {
        document.getElementById("pre-render-area").style.display = "none";
        const img = document.createElement("img");
        img.src = c.toDataURL("image/jpeg");
        img.id = "result-img";
        img.style.width = "min(100%, 900px)";
        document.getElementById("result-img-wrapper").appendChild(img);
        document.getElementById("result-img-wrapper").style.display = "block";
        document.getElementById("download").style.display = "block";
        document.getElementById("share").style.display = "block";
        loadingState(false);
    });
    loadingState(false);
}

// --------------------------------------------------

const allMusicsRecordURL = "https://reiwa.f5.si/chunithm_record.json";
const additionalMusicsURL = "https://reiwa.f5.si/chunirec_additional_record.json?rev=1";
const versions_URL = "https://reiwa.f5.si/chunithm_versions.json";
var allMusics, additionalMusics, versions;

document.addEventListener("DOMContentLoaded", async () => {
    allMusics = await (await fetch(allMusicsRecordURL)).json();
    additionalMusics = await (await fetch(additionalMusicsURL)).json();
    allMusics = allMusics.concat(additionalMusics);
    versions = await (await fetch(versions_URL)).json();
});

function complementRecord(entries) {
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const music = allMusics.find(m => (m.chunirec_id === entry.id && m.diff === entry.diff));
        if (music) {
            entry.version = music.version;
            entry.artist = music.artist;
            entry.img = music.img;
            entry.idx = music.idx;
            // entry.release = music.release * 100;
        } else {
            console.log(`Music not found: ${entry.title} ${entry.diff}`);
        }
        entry.ratingDetailed = calculateRating(entry.score, entry.const, false);
    }

    return entries;
}

// const NEWEST_VERSION = "CHUNITHM X-VERSE-X";
const NEWEST_VERSION = "X-VERSE-X";

// QUESTIONABLE: ăăźă¸ă§ăłĺć¸ăă ăă§čŻăć°ăăăăĺ°ćĽăŽăă¨ăčăăă¨ăăĄăŁă¨releasećéćŻčźăăăťăăčŻăć°ăăă
function calculateBest(entries, count) {
    return entries.filter(e => e.version !== NEWEST_VERSION).slice(0, count);
}

function calculateNew(entries, count) {
    return entries.filter(e => e.version === NEWEST_VERSION).slice(0, count);
}

function calclateAverageRating(entries, count) {
    return entries.reduce((acc, cur) => acc + cur.rating, 0) / count;
}

console.log(calculateRating(1007211, 14.4)); // 16.34
console.log(calculateRating(1007240, 14.4)); // 16.34
console.log(calculateRating(1007296, 14.4)); // 16.35