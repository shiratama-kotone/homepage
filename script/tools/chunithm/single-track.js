
(() => {
    const constantInput = document.getElementById("constant");
    const scoreInput = document.getElementById("score");
    const ratingOutput = document.getElementById("rating");
    const rankOutput = document.getElementById("rank");

    const borders = [
        { score: 500000, name: "C", value: c => 0 },
        { score: 800000, name: "BBB", value: c => (c - 5) / 2 },
        { score: 900000, name: "A", value: c => c - 5 },
        { score: 925000, name: "AA", value: c => c - 3.34 },
        { score: 950000, name: "AAA", value: c => c - 1.67 },
        { score: 975000, name: "S", value: c => c },
        { score: 990000, name: "S+", value: c => c + 0.6 },
        { score: 1000000, name: "SS", value: c => c + 1.0 },
        { score: 1005000, name: "SS+", value: c => c + 1.5 },
        { score: 1007500, name: "SSS", value: c => c + 2.0 },
        { score: 1009000, name: "SSS+", value: c => c + 2.15 }
    ];

    function calculate(constant, score) {
        if (score <= 500000) return 0;
        if (score >= 1009000) return constant + 2.15;

        for (let i = 1; i < borders.length; i++) {
            const lower = borders[i - 1];
            const upper = borders[i];

            if (score <= upper.score) {
                const ratio =
                    (score - lower.score) /
                    (upper.score - lower.score);

                const lowValue = lower.value(constant);
                const highValue = upper.value(constant);

                return Math.max(
                    0,
                    lowValue + (highValue - lowValue) * ratio
                );
            }
        }

        return constant + 2.15;
    }

    function getRank(score) {
        if (score >= 1009000) return "SSS+";
        if (score >= 1007500) return "SSS";
        if (score >= 1005000) return "SS+";
        if (score >= 1000000) return "SS";
        if (score >= 990000) return "S+";
        if (score >= 975000) return "S";
        if (score >= 950000) return "AAA";
        if (score >= 925000) return "AA";
        if (score >= 900000) return "A";
        if (score >= 800000) return "BBB";
        if (score >= 500000) return "C";
        return "ランクなし";
    }

    function update() {
        const constant = Number(constantInput.value);
        const score = Number(scoreInput.value);

        if (
            constantInput.value === "" ||
            scoreInput.value === "" ||
            !Number.isFinite(constant) ||
            !Number.isFinite(score) ||
            constant <= 0 ||
            constant > 20 ||
            score < 0 ||
            score > 1010000
        ) {
            ratingOutput.textContent = "---";
            rankOutput.textContent =
                "譜面定数と0～1,010,000点を入力";
            return;
        }

        const rating = calculate(constant, score);

        ratingOutput.textContent = rating.toFixed(4);
        rankOutput.textContent =
            `${getRank(score)} ／ 小数第2位表示：${rating.toFixed(2)}`;
    }

    constantInput.addEventListener("input", update);
    scoreInput.addEventListener("input", update);

    document.getElementById("reset").addEventListener("click", () => {
        constantInput.value = "";
        scoreInput.value = "";
        update();
    });
})();
