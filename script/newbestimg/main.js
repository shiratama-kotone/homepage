const URLbase_record = "https://apiwrapper.qmc.workers.dev/?content=record&id=";
const URLbase_profile =
    "https://apiwrapper.qmc.workers.dev/?content=profile&id=";
const URLbase_jacket = "https://reiwa.f5.si/jackets/chunithm/";
const URLbase_chunithm_record = "https://reiwa.f5.si/chunithm_record.json";
const testProfile_URL = "https://reiwa.f5.si/testdata/chunirec_profile.json";
const testRecord_URL = "https://reiwa.f5.si/testdata/chunirec_record.json";

const BEST_COUNT = 30;
const NEW_COUNT = 20;

var testMode = false;
var chunithmRecord;

window.addEventListener("DOMContentLoaded", async () => {
    var randomValueForCacheBusting = String(Math.random());

    // ăŚăźăśăźĺăă­ăźăŤăŤăšăăŹăźă¸ăăĺĺž
    document.getElementById("chunirec_username").value =
        localStorage.getItem("chunirec_username") || "";

    // ă˘ăŻăťăšăăźăŻăłăă­ăźăŤăŤăšăăŹăźă¸ăăĺĺž
    document.getElementById("chunirec_apiaccesstoken").value =
        localStorage.getItem("chunirec_apiaccesstoken") || "";

    // č¨­ĺŽčŞ­ăżčžźăż
    document.getElementById("chunibestimgnew_showprev").checked =
        localStorage.getItem("chunibestimgnew_showprev") === "true";
    document.getElementById("chunibestimgnew_shownew").checked =
        localStorage.getItem("chunibestimgnew_shownew") === "true";
    document.getElementById("chunibestimgnew_copyrightmode").checked =
        localStorage.getItem("chunibestimgnew_copyrightmode") === "true";

    // ăŹăłăźăăăźăżĺĺž
    chunithmRecord = await (
        await fetch(`${URLbase_chunithm_record}?v=${randomValueForCacheBusting}`)
    ).json();
});

function unixToTimeString(unixTime) {
    const date = new Date(unixTime * 1000);
    const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // JSTčŁć­Ł

    const h = String(jstDate.getUTCHours()).padStart(2, "0");
    const m = String(jstDate.getUTCMinutes()).padStart(2, "0");
    const s = String(jstDate.getUTCSeconds()).padStart(2, "0");

    return `${h}:${m}:${s}`;
}

async function generate() {
    loadingState(true);

    // APIăăźăŻăłĺĺžă¨äżĺ­
    const apiToken = document.getElementById("chunirec_apiaccesstoken").value;
    localStorage.setItem("chunirec_apiaccesstoken", apiToken);

    // ăŚăźăśăźăă­ăăŁăźăŤĺĺž
    const username = document.getElementById("chunirec_username").value;
    const tokenParam = apiToken ? `&token=${apiToken}` : "";
    // const userProfile = await (await fetch(URLbase_profile + username)).json();
    const userProfile = testMode
        ? await (await fetch(testProfile_URL)).json()
        : await (await fetch(`${URLbase_profile}${username}${tokenParam}`)).json();

    if (userProfile.error !== undefined) {
        const errCode = userProfile.error.code;
        const errStr = `ă¨ăŠăźăłăźă: ${String(errCode)}\n`;
        const errMessage = userProfile.error.message;
        switch (errCode) {
            case 404:
                alert(
                    `${errStr}ăŚăźăśăźăčŚă¤ăăăžăăă§ăăăăŚăźăśăźĺăŤééăăăŞăăç˘şčŞăăŚăă ăăă`,
                );
                break;
            case 403:
                if (errMessage === "invalid token.") {
                    alert(
                        `${errStr}ĺĽĺăăăAPIă˘ăŻăťăšăăźăŻăłăŤééăăăŞăăç˘şčŞăăŚăă ăăă`,
                    );
                } else {
                    alert(
                        `${errStr}ĺĽĺăăăăŚăźăśăźăéĺŹéăŤăŞăŁăŚăăŞăăç˘şčŞăăŚăă ăăă`,
                    );
                }
                break;
            case 429:
                alert(
                    `${errStr}ă˘ăŻăťăšăéä¸­ăăŚăăžăăăă°ăăĺžăŁăŚăăĺĺşŚăčŠŚăăă ăăă\nćŹĄĺăŽă˘ăŻăťăšçˇŠĺ: ${unixToTimeString(Number(userProfile.error.waituntilunix))}`,
                );
                break;
            case 503:
                alert(
                    `${errStr}chunirecăŤă˘ăŻăťăšă§ăăžăăăăĄăłăăăłăšä¸­ăŽĺŻč˝ć§ăăăăžăă`,
                );
                break;
            default:
                alert(
                    `${errStr}ä¸ćăŞă¨ăŠăźă§ăăĺăĺăăăăŠăźă ăžăăŻXă˘ăŤăŚăłăăăăĺăĺăăăă ăăă`,
                );
                break;
        }
        loadingState(false);
        return;
    }

    // ăŚăźăśăźĺăäżĺ­
    localStorage.setItem("chunirec_username", username);

    // č¨­ĺŽäżĺ­
    localStorage.setItem(
        "chunibestimgnew_showprev",
        document.getElementById("chunibestimgnew_showprev").checked,
    );
    localStorage.setItem(
        "chunibestimgnew_shownew",
        document.getElementById("chunibestimgnew_shownew").checked,
    );
    localStorage.setItem(
        "chunibestimgnew_copyrightmode",
        document.getElementById("chunibestimgnew_copyrightmode").checked,
    );

    // ăŹăłăźăăăźăżĺĺž
    const userRecordDataRaw = testMode
        ? await (await fetch(testRecord_URL)).json()
        : await (await fetch(`${URLbase_record}${username}${tokenParam}`)).json();
    let userRecordData = userRecordDataRaw.records;

    const playerDataSupplement = JSON.parse(
        localStorage.getItem("scoresup-data") || "[]",
    ); // scoresupăŽčŁĺŽăăźăż
    // scoresupăăźăżăăăźă¸ďźĺăăźăżĺŞĺăăă ăoverrideăăŠă°ăăăăăŽăŻä¸ć¸ăďź
    for (const supplement of playerDataSupplement) {
        const index = userRecordData.findIndex(
            (r) => r.id === supplement.id && r.diff === supplement.diff,
        );
        if (index !== -1) {
            // ĺăć˛ăĺăăźăżăŤĺ­ĺ¨ăăĺ ´ĺ
            if (supplement.override) {
                // overrideăăŠă°ăçŤăŁăŚăăă°ä¸ć¸ă
                userRecordData[index] = supplement;
            }
            // overrideăăŠă°ăăŞăăă°ĺăăźăżăĺŞĺďźä˝ăăăŞăďź
        } else {
            // ĺăăźăżăŤăŞăć˛ăŻčŁĺŽă¨ăăŚčż˝ĺ 
            userRecordData.push(supplement);
        }
    }

    // ćĽ˝ć˛ăŹăłăźăăŽĺĺž
    userRecordData = userRecordData.map((data) => {
        const music = chunithmRecord.find(
            (m) => m.chunirec_id === data.id && m.diff === data.diff,
        );
        if (music) {
            data.const = music.const;
            data.is_const_unknown = music.unknown === 1;
            data.rating = calculateRating(data.score, data.const);
        }
        return data;
    });

    // ä¸čśłăŹăłăźăăčż˝ĺ ăăăăšăć ăťć°ć˛ć ăč¨çŽ
    userRecordData = complementRecord(userRecordData);
    // ăăšăć ăťć°ć˛ć ăŻăŹăźăéé +ĺŽć°éé +idxănumberăŤăăăăŽćé ă§ă˝ăźă
    userRecordData = userRecordData.sort(
        (a, b) => b.rating - a.rating || b.const - a.const || Number(a.idx) - Number(b.idx),
    );
    const userBestData = calculateBest(userRecordData, BEST_COUNT);
    const userNewData = calculateNew(userRecordData, NEW_COUNT);

    document.getElementById("pre-render-area").style.display = "block";

    // ćçť
    // ĺćĺ
    initializeArea();
    removeButtons();

    // ăăă(čä˝ć¨Šă˘ăźăé˘éŁ)
    if (document.getElementById("chunibestimgnew_copyrightmode").checked) {
        document.getElementById("img-logoimg").style.display = "none";
        document.getElementById("img-title").innerText =
            "CHUNITHM ăăšăć ăťć°ć˛ć ĺŻžčąĄćĽ˝ć˛";
        document.getElementById("img-header-text").style.marginLeft = "0px";
    } else {
        document.getElementById("img-logoimg").style.display = "block";
        document.getElementById("img-title").innerText = "ăăšăć ăťć°ć˛ć ĺŻžčąĄćĽ˝ć˛";
        document.getElementById("img-header-text").style.marginLeft = "20px";
    }
    document.getElementById("img-logoimg").style.display = "block";
    document.getElementById("img-title").innerText = "ăăšăć ăťć°ć˛ć ĺŻžčąĄćĽ˝ć˛";
    document.getElementById("img-header-text").style.marginLeft = "20px";

    // ć´ć°ăťçććĽć
    const updatedDatetime = userProfile.updated_at
        .replaceAll("-", "/")
        .replaceAll("T", " ")
        .substring(0, 19);
    document.getElementById("v-update-dt").innerText = updatedDatetime;
    const now = new Date();
    const generatedDatetime = toISOStringWithTimezone(now)
        .replaceAll("-", "/")
        .replaceAll("T", " ")
        .substring(0, 19);
    document.getElementById("v-generate-dt").innerText = generatedDatetime;

    // ăăŹă¤ă¤ăźĺăťăŹăźă
    document.getElementById("v-player-name").innerText = userProfile.player_name;
    document.getElementById("v-current-rating").innerText = userProfile.rating;
    document.getElementById("v-best-rating").innerText = calclateAverageRating(
        userBestData,
        BEST_COUNT,
    ).toFixed(4);
    document.getElementById("v-new-rating").innerText = calclateAverageRating(
        userNewData,
        NEW_COUNT,
    ).toFixed(4);

    // ăăšăć ăťć°ć˛ć ăŽćĽ˝ć˛ăŽăăĄćć°ăŽăăŽăŽćĽäťăĺĺž
    let newestDate = new Date("1970/01/01");
    const bestNewIntegratedData = userBestData.concat(userNewData);
    for (let i = 0; i < bestNewIntegratedData.length; i++) {
        const date = getUpdatedDate(bestNewIntegratedData[i].updated_at);
        if (date > newestDate) {
            newestDate = date;
        }
    }

    renderSong(
        userBestData,
        document.getElementById("img-best-songs"),
        newestDate,
    );
    renderSong(userNewData, document.getElementById("img-new-songs"), newestDate);

    if (document.getElementById("chunibestimgnew_showprev").checked) {
        document.getElementById("generate-image").style.display = "block";
    } else {
        renderImage();
    }

    loadingState(false);
}

function renderSong(data, area, newestDateInitial) {
    for (let i = 0; i < data.length; i++) {
        // ă¸ăŁăąăăURLĺĺž
        const filename = `${data[i].img}.webp`;
        const jacketURL = URLbase_jacket + filename;

        // éŁćĺşŚăťăŠăłăăťăŠăłăŻăťăšăłă˘ĺĺž
        const musicDiff = data[i].diff.toLowerCase();

        let musicLamp = "";
        let musicLampColor;
        if (data[i].is_alljustice) {
            musicLamp = "ALL JUSTICE";
            musicLampColor = "rgb(255, 223, 117)";
        } else if (data[i].is_fullcombo) {
            musicLamp = "FULL COMBO";
            musicLampColor = "#fff";
        }

        const musicScore = data[i].score;
        let musicScoreRank, rankColor;
        if (musicScore < 5e5) {
            musicScoreRank = "D";
            rankColor = "#888888";
        } else if (musicScore < 6e5) {
            musicScoreRank = "C";
            rankColor = "#b87333";
        } else if (musicScore < 7e5) {
            musicScoreRank = "B";
            rankColor = "#03b1fc";
        } else if (musicScore < 8e5) {
            musicScoreRank = "BB";
            rankColor = "#03b1fc";
        } else if (musicScore < 9e5) {
            musicScoreRank = "BBB";
            rankColor = "#03b1fc";
        } else if (musicScore < 925000) {
            musicScoreRank = "A";
            rankColor = "#fc6203";
        } else if (musicScore < 950000) {
            musicScoreRank = "AA";
            rankColor = "#fc6203";
        } else if (musicScore < 975000) {
            musicScoreRank = "AAA";
            rankColor = "#fc6203";
        } else if (musicScore < 990000) {
            musicScoreRank = "S";
            rankColor = "#fc8403";
        } else if (musicScore < 1e6) {
            musicScoreRank = "S+";
            rankColor = "#fc8403";
        } else if (musicScore < 1005000) {
            musicScoreRank = "SS";
            rankColor = "#fc8403";
        } else if (musicScore < 1007500) {
            musicScoreRank = "SS+";
            rankColor = "#fc8403";
        } else if (musicScore < 1009000) {
            musicScoreRank = "SSS";
            rankColor = "#ffdf75";
        } else {
            musicScoreRank = "SSS+";
            rankColor = "#03fc1c";
        }

        // ćçť
        const musicBlock = document.createElement("div");
        musicBlock.className = "img-song-block";

        const musicBlockUpper = musicBlock.appendChild(
            document.createElement("div"),
        );
        musicBlockUpper.className = "img-song-block-upper";

        // ăăźăżé¨
        const musicBlockData = musicBlockUpper.appendChild(
            document.createElement("div"),
        );
        musicBlockData.className = "img-song-block-data";

        const musicRank = musicBlockData.appendChild(document.createElement("div"));
        musicRank.className = "img-song-rank";
        musicRank.innerText = `#${String(i + 1)}`;

        const musicConstTxt = musicBlockData.appendChild(
            document.createElement("div"),
        );
        musicConstTxt.className = "img-song-txt";
        musicConstTxt.innerText = "CONST";

        const musicConst = musicBlockData.appendChild(
            document.createElement("div"),
        );
        musicConst.className = "img-song-const";
        musicConst.innerText = data[i].is_const_unknown ? "*" : "";
        musicConst.innerText += data[i].const.toFixed(1);
        if (data[i].is_const_unknown) {
            musicConst.classList.add("const-unknown");
        }

        const ratingArrow = musicBlockData.appendChild(
            document.createElement("div"),
        );
        ratingArrow.className = "img-song-arrow";
        ratingArrow.innerText = "âź";

        const musicRatingTxt = musicBlockData.appendChild(
            document.createElement("div"),
        );
        musicRatingTxt.className = "img-song-txt";
        musicRatingTxt.innerText = "RATING";

        const musicRating = musicBlockData.appendChild(
            document.createElement("div"),
        );
        musicRating.className = "img-song-const";
        musicRating.innerText += data[i].rating.toFixed(2);

        // ă¸ăŁăąăăé¨
        const musicBlockImg = musicBlockUpper.appendChild(
            document.createElement("div"),
        );
        musicBlockImg.className = "img-song-block-img";

        const musicJacket = musicBlockImg.appendChild(
            document.createElement("img"),
        );
        musicJacket.src = jacketURL;
        musicJacket.setAttribute("crossOrigin", "anonymous");
        if (document.getElementById("chunibestimgnew_copyrightmode").checked) {
            musicJacket.src = "../commonassets/images/ban2.png";
            document
                .querySelector("#pre-render-area")
                .classList.add("copyright-mode");
            document.querySelector("#img-logoimg").style.display = "none";
            document.querySelector("#img-title").textContent =
                "CHUNITHM ăăšăć ăťć°ć˛ć ĺŻžčąĄćĽ˝ć˛";
        } else {
            musicJacket.src = jacketURL;
            document
                .querySelector("#pre-render-area")
                .classList.remove("copyright-mode");
            document.querySelector("#img-logoimg").style.display = "block";
            document.querySelector("#img-title").textContent =
                "ăăšăć ăťć°ć˛ć ĺŻžčąĄćĽ˝ć˛";
        }

        if (
            document.querySelector("#chunibestimgnew_shownew").checked &&
            getUpdatedDate(data[i].updated_at).getTime() ===
            newestDateInitial.getTime()
        ) {
            const musicNewest = musicBlockImg.appendChild(
                document.createElement("div"),
            );
            musicNewest.className = "img-new-emblem";
            musicNewest.innerText = "NEW!!";
        }

        const musicDiffEmblem = musicBlockImg.appendChild(
            document.createElement("div"),
        );
        musicDiffEmblem.className = `img-diff-emblem ${musicDiff}`;

        if (musicLamp !== "") {
            const musicLampTxt = musicBlockImg.appendChild(
                document.createElement("div"),
            );
            musicLampTxt.className = "img-score-lamp-highcontrast";
            musicLampTxt.innerText = musicLamp;
            musicLampTxt.style.color = musicLampColor;
        }

        const musicScoreRankTxt = musicBlockImg.appendChild(
            document.createElement("div"),
        );
        musicScoreRankTxt.className = "img-score-rank-highcontrast";
        musicScoreRankTxt.innerText = `${musicScore.toLocaleString()} `;
        const musicRankTxt = musicScoreRankTxt.appendChild(
            document.createElement("span"),
        );
        musicRankTxt.innerText = musicScoreRank;
        musicRankTxt.style.color = rankColor;

        const musicBlockLower = musicBlock.appendChild(
            document.createElement("div"),
        );
        musicBlockLower.className = "img-song-block-lower";

        const musicTitle = musicBlockLower.appendChild(
            document.createElement("div"),
        );
        musicTitle.className = "img-song-block-lower-title";
        musicTitle.innerText = data[i].title;

        area.appendChild(musicBlock);
    }

    // ăăăźďźéŤă0ăŽčŚç´ ďźă4ă¤čż˝ĺ ăăflexĺăŽĺˇŚĺŻăăĺŽçž
    for (let i = 0; i < 4; i++) {
        const dummy = document.createElement("div");
        dummy.className = "img-song-block-dummy";
        area.appendChild(dummy);
    }
}

function download() {
    const now = new Date();
    const downloadable = document.createElement("a");
    downloadable.href = document.getElementById("result-img").src;
    downloadable.download = `best_${String(Math.floor(now.getTime() / 1000))}.jpg`;
    downloadable.click();
}

function share() {
    if (!navigator.canShare) {
        alert("ăăŽăăŠăŚăśăŻăˇă§ă˘ăŤĺŻžĺżăăŚăăžăăă");
        return;
    }
    const img = document.getElementById("result-img");
    const cBase = document.getElementById("imgcanvasbase");
    const canvas = cBase.appendChild(document.createElement("canvas"));
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.style.display = "none";
    const canvasContext = canvas.getContext("2d");
    canvasContext.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg");
    const blob = toBlob(dataURL);
    const imageFile = new File([blob], "image.jpg", {
        type: "image/jpeg",
    });
    navigator
        .share({
            files: [imageFile],
        })
        .then(() => {
            canvas.remove();
        })
        .catch((error) => {
            console.log(error);
            canvas.remove();
        });
}