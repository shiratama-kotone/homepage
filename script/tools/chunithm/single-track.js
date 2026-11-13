
(() => {
    const form = document.getElementById("calculator");
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

    // 譜面定数の入力チェック
    function validConstant(c) {
        if (c < 1 || c > 20) return false;

        if (c <= 6) {
            return Number.isInteger(c);
        }

        if (c <= 9) {
            return Number.isInteger(c * 2);
        }

        return Number.isInteger(c * 10);
    }

    // レート計算
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

    // ランク判定
    function getRank(score) {
        for (let i = borders.length - 1; i >= 0; i--) {
            if (score >= borders[i].score) {
                return borders[i].name;
            }
        }

        return "ランクなし";
    }

    // 計算実行
    form.addEventListener("submit", event => {
        event.preventDefault();

        const constant = Number(constantInput.value);
        const score = Number(scoreInput.value);

        if (
            !validConstant(constant) ||
            !Number.isInteger(score) ||
            score < 0 ||
            score > 1009000
        ) {
            ratingOutput.textContent = "---";
            rankOutput.textContent = "入力値を確認してね";
            return;
        }

        const rating = calculate(constant, score);

        ratingOutput.textContent = rating.toFixed(4);
        rankOutput.textContent =
            `${getRank(score)} ／ 小数第2位：${rating.toFixed(2)}`;
    });

    // リセット
    form.addEventListener("reset", () => {
        ratingOutput.textContent = "---";
        rankOutput.textContent = "譜面定数とスコアを入力してね";
    });
})();
