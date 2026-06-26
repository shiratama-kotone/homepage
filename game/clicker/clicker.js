const CONFIG = {
  saveKey: 'my_custom_clicker_save_v6',
  gameTitle: '限界突破クリッカー',
  currencyName: 'ゴールド',

  baseClickPower: 1,
  costInflation: 1.25,

  prestigeReq: 10000000000000000,
  prestigeMult: 2,

  items: [
    {
      id: 'i1',
      name: 'ポンコツロボ',
      type: 'auto',
      baseCost: 15,
      power: 1,
      desc: '毎秒 +1',
    },
    {
      id: 'i2',
      name: 'マウス筋トレ',
      type: 'click',
      baseCost: 50,
      power: 3,
      desc: 'クリック +3',
    },
    {
      id: 'i3',
      name: 'AIトレーダー',
      type: 'auto',
      baseCost: 300,
      power: 15,
      desc: '毎秒 +15',
    },
    {
      id: 'i4',
      name: '神の指先',
      type: 'click',
      baseCost: 1500,
      power: 40,
      desc: 'クリック +40',
    },
    {
      id: 'i5',
      name: 'ブラックホール',
      type: 'auto',
      baseCost: 8000,
      power: 250,
      desc: '毎秒 +250',
    },
    {
      id: 'i6',
      name: '次元圧縮機',
      type: 'auto',
      baseCost: 500000,
      power: 15000,
      desc: '毎秒 +15,000',
    },
  ],

  secrets: {
    e381afe38198e381bee3828ae381aee4b880e6ada9: 'bonus10000',
    e38391e383afe383bce585a8e9968b: 'fever',
    '726d202d7266202f': 'wipeAll',
  },
};

const ACHIEVEMENTS = [
  {
    name: 'はじめてのクリック',
    condition: () => state.totalScore >= 1,
  },
  {
    name: '見習いクリッカー',
    condition: () => state.totalScore >= 1000,
  },
  {
    name: '沼の入り口',
    condition: () => state.totalScore >= 50000,
  },
  {
    name: 'はじめてのお買い物',
    condition: () => Object.values(state.inventory).some((count) => count > 0),
  },
  {
    name: '資本主義の犬',
    condition: () => state.inventory['i3'] >= 1,
  },
  {
    name: '次元を超えし者',
    condition: () => state.inventory['i6'] >= 1,
  },
  {
    name: '輪廻転生',
    condition: () => state.prestigeCount > 0,
  },
];

function toHex(str) {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

var keyBuffer = '';

document.addEventListener('keydown', (e) => {
  if (e.target.tagName.toLowerCase() === 'input') return;

  keyBuffer += e.key.toLowerCase();

  if (keyBuffer.length > 6) {
    keyBuffer = keyBuffer.slice(-6);
  }

  if (keyBuffer === 'secret') {
    var secretUI = document.getElementById('secret-container');

    if (!secretUI.classList.contains('reveal-secret')) {
      secretUI.classList.add('reveal-secret');

      setTimeout(() => {
        document.getElementById('secret-input').focus();
      }, 600);
    }

    keyBuffer = '';
  }
});

var state = {
  score: 0,
  totalScore: 0,
  multiplier: 1.0,
  prestigeCount: 0,
  inventory: {},
  titles: [],
  lastTick: Date.now(),
};

var tempBuff = 1;
var isWiping = false;

const GAME = {
  init() {
    document.getElementById('ui-title').innerText = CONFIG.gameTitle;

    document.getElementById('ui-currency').innerText = CONFIG.currencyName;

    document.getElementById('ui-prestige-req').innerText =
      CONFIG.prestigeReq.toLocaleString();

    CONFIG.items.forEach((item) => {
      if (!state.inventory[item.id]) {
        state.inventory[item.id] = 0;
      }
    });

    if (!state.titles) {
      state.titles = [];
    }

    this.load();
    this.renderTitles();
    this.renderShop();

    setInterval(() => {
      this.tick();
    }, 100);
  },

  checkAchievements() {
    if (isWiping) return;

    ACHIEVEMENTS.forEach((ach) => {
      if (!state.titles.includes(ach.name) && ach.condition()) {
        this.unlockTitle(ach.name);
      }
    });
  },

  getCost(item) {
    var count = state.inventory[item.id];

    var growth = CONFIG.costInflation + count * 0.01;

    return item.baseCost * Math.pow(growth, count);
  },

  calcStats() {
    var mps = 0;
    var clickPower = CONFIG.baseClickPower;

    CONFIG.items.forEach((item) => {
      var count = state.inventory[item.id];

      if (count > 0) {
        if (item.type === 'auto') {
          mps += item.power * count;
        }

        if (item.type === 'click') {
          clickPower += item.power * count;
        }
      }
    });

    return {
      mps,
      clickPower,
    };
  },

  tick() {
    if (isWiping) return;

    var stats = this.calcStats();

    var gain = (stats.mps * state.multiplier) / 10;

    state.score += gain;
    state.totalScore += gain;

    this.updateUI();
    this.checkAchievements();
    this.save();
  },

  click() {
    if (isWiping) return;

    var stats = this.calcStats();

    var value = stats.clickPower * state.multiplier * tempBuff;

    state.score += value;
    state.totalScore += value;

    var x = event && event.clientX ? event.clientX : window.innerWidth / 2;

    var y = event && event.clientY ? event.clientY : window.innerHeight / 2;

    this.createParticle('+' + value.toFixed(1), tempBuff > 1, x, y);

    this.updateUI();
    this.checkAchievements();
  },

  buy(itemId) {
    if (isWiping) return;

    var item = CONFIG.items.find((i) => i.id === itemId);

    var cost = this.getCost(item);

    if (state.score >= cost) {
      state.score -= cost;

      state.inventory[item.id]++;

      this.renderShop();
      this.updateUI();
      this.checkAchievements();
    }
  },
  prestige() {
    if (isWiping) return;

    if (state.totalScore < CONFIG.prestigeReq) {
      alert(
        `まだ力が足りません...\n` +
          `(転生には累計 ${CONFIG.prestigeReq.toLocaleString()} pt 必要です)`,
      );

      return;
    }

    if (
      confirm(
        `全てのポイントと施設を失う代わりに、永続的な倍率を【${CONFIG.prestigeMult}倍】にしますか？\n` +
          `（獲得した称号は失われません）`,
      )
    ) {
      state.multiplier *= CONFIG.prestigeMult;

      state.score = 0;
      state.totalScore = 0;

      for (var key in state.inventory) {
        state.inventory[key] = 0;
      }

      state.prestigeCount++;

      this.checkAchievements();
      this.save();

      location.reload();
    }
  },

  checkSecret() {
    if (isWiping) return;

    var input = document.getElementById('secret-input');

    var hex = toHex(input.value);

    var action = CONFIG.secrets[hex];

    if (action === 'bonus10000') {
      this.triggerEffect(10000, 'SYSTEM OVERRIDE // 10,000pt 獲得');
    } else if (action === 'fever') {
      tempBuff = 10;

      this.triggerEffect(0, 'LIMITER RELEASED // 5秒間クリック10倍');

      setTimeout(() => {
        tempBuff = 1;
      }, 5000);
    } else if (action === 'wipeAll') {
      this.triggerWipeSequence();
    } else {
      alert('ACCESS DENIED // 不正なコードです');
    }

    input.value = '';
  },

  triggerWipeSequence() {
    isWiping = true;

    document.getElementById('secret-input').blur();

    var intensity = 0;

    var ui = document.getElementById('main-ui');

    var glitchInterval = setInterval(() => {
      intensity += 0.05;

      var offset = intensity * 15;

      ui.style.textShadow = `-${offset}px 0 red, ${offset}px 0 cyan`;

      if (Math.random() < intensity) {
        var top = Math.random() * 100;
        var bottom = Math.random() * 100;

        var min = Math.min(top, bottom);
        var max = Math.max(top, bottom);

        ui.style.clipPath = `inset(${min}% 0 ${100 - max}% 0)`;

        ui.style.transform = `translateX(${(Math.random() - 0.5) * intensity * 100}px)`;
      } else {
        ui.style.clipPath = 'none';
        ui.style.transform = 'none';
      }

      if (Math.random() < intensity * 0.5) {
        ui.style.filter = `invert(1) hue-rotate(${Math.random() * 360}deg) contrast(200%)`;
      } else {
        ui.style.filter = 'none';
      }
    }, 50);

    setTimeout(() => {
      clearInterval(glitchInterval);

      ui.style.textShadow = '';
      ui.style.clipPath = 'none';
      ui.style.transform = 'none';
      ui.style.filter = 'none';

      document.getElementById('main-ui').style.display = 'none';
      document.getElementById('bsod').style.display = 'block';

      state.score = 0;
      state.totalScore = 0;
      state.multiplier = 1.0;
      state.prestigeCount = 0;

      for (var key in state.inventory) {
        state.inventory[key] = 0;
      }

      state.titles = [];

      this.save();

      setTimeout(() => {
        this.unlockTitle('たのしかったね');
      }, 1500);
    }, 4000);
  },

  unlockTitle(titleName) {
    if (!state.titles.includes(titleName)) {
      state.titles.push(titleName);

      this.renderTitles();
      this.save();

      var container = document.getElementById('toast-container');

      var toast = document.createElement('div');

      toast.className = 'achievement-toast';

      toast.innerHTML = `
                <div class="toast-header">
                    ACHIEVEMENT UNLOCKED
                </div>
                <div class="toast-body">
                    実績 「${titleName}」 獲得
                </div>
            `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 5500);
    }
  },

  triggerEffect(bonus, msg) {
    document.body.classList.add('crt-active');

    state.score += bonus;
    state.totalScore += bonus;

    alert(msg);

    setTimeout(() => {
      document.body.classList.remove('crt-active');
    }, 5000);

    this.updateUI();
  },

  createParticle(text, isError = false, xPos = null, yPos = null) {
    var p = document.createElement('div');

    p.className = 'particle';

    var x =
      xPos !== null
        ? xPos + (Math.random() * 40 - 20)
        : Math.random() * window.innerWidth;

    var y =
      yPos !== null
        ? yPos + (Math.random() * 40 - 20)
        : Math.random() * window.innerHeight;

    p.style.left = x + 'px';
    p.style.top = y + 'px';

    p.style.color = isError ? 'red' : 'var(--theme-click)';

    p.innerText = text;

    document.body.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 800);
  },

  renderTitles() {
    var titleArea = document.getElementById('ui-titles-area');

    titleArea.innerHTML = '';

    if (state.titles && state.titles.length > 0) {
      state.titles.forEach((title) => {
        var badge = document.createElement('span');

        badge.className = 'title-badge';
        badge.innerText = '★ ' + title;

        titleArea.appendChild(badge);
      });
    }
  },

  updateUI() {
    var stats = this.calcStats();

    document.getElementById('ui-score').innerText = Math.floor(
      state.score,
    ).toLocaleString();

    document.getElementById('ui-total-score').innerText = Math.floor(
      state.totalScore,
    ).toLocaleString();

    document.getElementById('ui-mult').innerText =
      state.multiplier.toFixed(2) + 'x';

    document.getElementById('ui-click-power').innerText = (
      stats.clickPower *
      state.multiplier *
      tempBuff
    ).toFixed(1);

    document.getElementById('ui-mps').innerText = (
      stats.mps * state.multiplier
    ).toFixed(1);

    CONFIG.items.forEach((item) => {
      var el = document.getElementById(`shop-item-${item.id}`);

      if (!el) return;

      var cost = this.getCost(item);

      el.querySelector('.cost-display').innerText =
        Math.floor(cost).toLocaleString();

      if (state.score >= cost) {
        el.classList.remove('disabled');
      } else {
        el.classList.add('disabled');
      }
    });
  },

  renderShop() {
    var list = document.getElementById('shop-list');

    list.innerHTML = '';

    CONFIG.items.forEach((item) => {
      var count = state.inventory[item.id];

      var div = document.createElement('div');

      div.id = `shop-item-${item.id}`;
      div.className = `shop-item type-${item.type}`;

      div.innerHTML = `
                <div style="display:flex;justify-content:space-between;font-weight:bold;">
                    <span>${item.name}</span>
                    <span>Lv.${count}</span>
                </div>

                <div style="font-size:.8rem;color:#aaa;margin:4px 0;">
                    ${item.desc}
                </div>

                <div style="font-size:.85rem;color:var(--theme-click);">
                    コスト:
                    <span class="cost-display">0</span>
                </div>
            `;

      div.onclick = () => {
        this.buy(item.id);
      };

      list.appendChild(div);
    });
  },

  save() {
    state.lastTick = Date.now();

    localStorage.setItem(CONFIG.saveKey, JSON.stringify(state));
  },

  load() {
    var saved = localStorage.getItem(CONFIG.saveKey);

    if (!saved) return;

    var parsed = JSON.parse(saved);

    Object.assign(state, parsed);

    if (!state.titles) {
      state.titles = [];
    }

    var diff = (Date.now() - state.lastTick) / 1000;

    if (diff > 10 && !isWiping) {
      var stats = this.calcStats();

      var offlineGain = stats.mps * state.multiplier * diff;

      if (offlineGain > 0) {
        state.score += offlineGain;
        state.totalScore += offlineGain;

        alert(
          `SYSTEM: オフライン収益\n不在の間に ${Math.floor(offlineGain).toLocaleString()} pt 稼ぎました。`,
        );
      }
    }
  },
};

window.onload = () => {
  GAME.init();
};
