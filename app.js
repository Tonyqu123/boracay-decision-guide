const AREAS = {
  station_1: {
    name: "Station 1 靠 Station 2 的区域",
    shortName: "Station 1",
    summary: "经典白沙滩、舒服、安静一些，适合第一次来又不想太偏的人。",
    checks: ["到 White Beach 是否真的是步行距离", "评论里有没有反复提到噪音", "房间是否偏旧，尤其看近一年评论", "海滩侧和主路侧房型差异"],
    need: "经典白沙滩体验 + 吃饭方便 + 晚上不要太吵"
  },
  station_2: {
    name: "Station 2 / D'Mall 周边",
    shortName: "Station 2",
    summary: "吃喝最方便、最热闹，适合怕无聊、不怕人多的人。",
    checks: ["离 D'Mall 和餐厅是否真的近", "夜间噪音评论", "房间隔音和空调", "高峰期公共区域是否拥挤"],
    need: "便利和热闹，愿意用一点度假感换少走路"
  },
  station_3: {
    name: "Station 3",
    shortName: "Station 3",
    summary: "相对便宜、安静、慢节奏，适合愿意走路的人。",
    checks: ["到 Station 2 / D'Mall 的真实步行时间", "房间新旧和潮湿评论", "晚上回酒店是否方便", "周边餐饮是否够用"],
    need: "省钱的同时避开旧房、远路和隐性成本"
  },
  bulabog: {
    name: "Bulabog",
    shortName: "Bulabog",
    summary: "风筝冲浪、水上项目、另一侧海滩，适合目标明确的人。",
    checks: ["到 White Beach 的路线", "风筝冲浪或水上项目是否方便", "Wi-Fi 是否被住客夸过", "是否能接受不是经典白沙滩正面"],
    need: "住得离活动逻辑更近，别把时间浪费在来回折腾上"
  },
  diniwid: {
    name: "Diniwid",
    shortName: "Diniwid",
    summary: "安静、小众、离 Station 1 不远，适合不想住商业区的人。",
    checks: ["到 Station 1 的真实路线", "夜间交通是否方便", "周边餐饮是否够用", "是否有上下坡或行李不便"],
    need: "安静、有审美、不想被 Station 2 的商业感包围"
  },
  yapak: {
    name: "Yapak / 北部度假村区",
    shortName: "Yapak",
    summary: "高级度假村、远离人群、私密，适合泡酒店的人。",
    checks: ["酒店接送频率和费用", "酒店餐饮价格和评价", "到 D'Mall 的时间", "天气不好时酒店内是否够舒服"],
    need: "完整度假村体验，不是每天进出主商业区"
  }
};

const QUESTIONS = [
  {
    id: "goal",
    text: "Q1：你这次来长滩岛，最想要什么？",
    options: [
      { label: "躺平，看海，放空", weights: { station_1: 3, diniwid: 2, yapak: 2, station_2: -2 } },
      { label: "热闹，吃喝方便，晚上有事干", weights: { station_2: 4, station_1: 1, station_3: -1, diniwid: -2, yapak: -3 } },
      { label: "水上项目 / 风筝冲浪 / 潜水", weights: { bulabog: 4, station_2: 1, station_3: 1, yapak: -1 } },
      { label: "安静舒服，不想折腾", weights: { station_1: 3, diniwid: 2, yapak: 2, station_2: -2 } }
    ]
  },
  {
    id: "fear",
    text: "Q2：你最怕哪种踩坑？",
    options: [
      { label: "太吵，睡不好", weights: { station_1: 3, diniwid: 3, yapak: 2, station_2: -4 } },
      { label: "离海滩太远", weights: { station_1: 3, station_2: 2, station_3: 1, bulabog: -2, yapak: -2 } },
      { label: "花了钱但房间旧", weights: { station_1: 2, yapak: 2, station_2: -1, station_3: -1 } },
      { label: "周围太无聊", weights: { station_2: 4, station_1: 1, station_3: -1, diniwid: -2, yapak: -3 } },
      { label: "交通麻烦，去哪都不方便", weights: { station_2: 3, station_1: 2, station_3: 1, diniwid: -1, yapak: -4 } }
    ]
  },
  {
    id: "noise",
    text: "Q3：你对“热闹”的接受度？",
    options: [
      { label: "越热闹越好", weights: { station_2: 4, station_1: 1, diniwid: -2, yapak: -3 } },
      { label: "白天热闹可以，晚上要安静", weights: { station_1: 4, diniwid: 2, station_3: 1, station_2: -2 } },
      { label: "我只想安静", weights: { diniwid: 3, yapak: 3, station_1: 2, station_2: -4 } },
      { label: "无所谓，方便最重要", weights: { station_2: 3, station_1: 2, station_3: 1, yapak: -2 } }
    ]
  },
  {
    id: "walk",
    text: "Q4：你愿意每天走多久到核心海滩 / 餐饮区？",
    options: [
      { label: "最好 1-3 分钟", weights: { station_2: 3, station_1: 2, station_3: 1, bulabog: -2, diniwid: -2, yapak: -4 } },
      { label: "5-10 分钟可以接受", weights: { station_1: 3, station_2: 2, station_3: 2, diniwid: 1 } },
      { label: "15 分钟也行，舒服更重要", weights: { diniwid: 3, station_3: 2, station_1: 1, yapak: 1, station_2: -1 } },
      { label: "可以打车 / 接驳，不在意", weights: { yapak: 4, diniwid: 2, bulabog: 1, station_2: -1 } }
    ]
  },
  {
    id: "budget",
    text: "Q5：你的预算心态更接近哪种？",
    options: [
      { label: "能省就省，性价比第一", weights: { station_3: 4, bulabog: 2, station_2: 1, station_1: -2, yapak: -3 } },
      { label: "不想奢侈，但别太委屈", weights: { station_1: 2, station_3: 2, station_2: 2, diniwid: 1 } },
      { label: "贵一点可以，但要明显更舒服", weights: { station_1: 3, diniwid: 2, yapak: 2, station_3: -1 } },
      { label: "度假就要体验好，预算不是最主要", weights: { yapak: 4, station_1: 3, diniwid: 2, station_3: -2 } }
    ]
  },
  {
    id: "group",
    text: "Q6：你是谁来玩？",
    options: [
      { label: "一个人 / 朋友", weights: { station_2: 2, station_3: 2, bulabog: 1 } },
      { label: "情侣 / 夫妻", weights: { station_1: 3, diniwid: 2, yapak: 1, station_2: 1 } },
      { label: "带孩子 / 父母", weights: { station_1: 3, yapak: 2, station_2: 1, station_3: -1, bulabog: -2 } },
      { label: "远程办公 / 需要稳定 Wi-Fi", weights: { bulabog: 3, station_1: 2, station_2: 1, station_3: -1 } },
      { label: "主要为了运动项目", weights: { bulabog: 5, station_3: 1, station_2: 1, yapak: -1 } }
    ]
  }
];

const STORAGE_PREFIX = "boracay_stay_result_";
const LATEST_KEY = "boracay_latest_result_id";
const selectedAnswers = {};

function getPage() {
  return document.body.dataset.page || "landing";
}

function getResultId() {
  return new URLSearchParams(window.location.search).get("id") || localStorage.getItem(LATEST_KEY);
}

function goTo(page, id) {
  const target = new URL(`../${page}/`, window.location.href);
  if (id) target.searchParams.set("id", id);
  window.location.href = target.toString();
}

function makeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function scoreAreas(answers) {
  const scores = Object.fromEntries(Object.keys(AREAS).map((area) => [area, 0]));

  QUESTIONS.forEach((question) => {
    const selectedIndex = answers[question.id];
    const option = question.options[selectedIndex];
    Object.entries(option.weights).forEach(([area, score]) => {
      scores[area] += score;
    });
  });

  return Object.entries(scores)
    .map(([area, score]) => ({ area, score }))
    .sort((a, b) => b.score - a.score);
}

function getAnswerLabels(answers) {
  return Object.fromEntries(
    QUESTIONS.map((question) => [question.id, question.options[answers[question.id]].label])
  );
}

function chooseBackupAreas(ranked, mainArea) {
  return ranked
    .filter((item) => item.area !== mainArea)
    .slice(0, 1)
    .map((item) => item.area);
}

function chooseAvoidAreas(ranked, mainArea, backupAreas, labels) {
  const avoid = [];
  const blocked = new Set([mainArea, ...backupAreas]);

  const addAvoid = (area) => {
    if (!blocked.has(area) && !avoid.includes(area)) avoid.push(area);
  };

  if (labels.fear.includes("太吵") || labels.noise.includes("晚上要安静") || labels.noise.includes("只想安静")) {
    addAvoid("station_2");
  }

  if (labels.walk.includes("1-3 分钟") || labels.walk.includes("5-10 分钟")) {
    addAvoid("yapak");
  }

  if (labels.goal.includes("热闹") || labels.fear.includes("周围太无聊")) {
    addAvoid("yapak");
    addAvoid("diniwid");
  }

  if (labels.budget.includes("省")) {
    addAvoid("yapak");
    addAvoid("station_1");
  }

  if (labels.goal.includes("躺平") || labels.fear.includes("离海滩太远")) {
    addAvoid("bulabog");
  }

  [...ranked].reverse().forEach((item) => addAvoid(item.area));
  return avoid.slice(0, 2);
}

function getNeedSummary(mainArea, labels) {
  if (labels.group.includes("远程办公")) {
    return "动线能接受、Wi-Fi 稳、房间能让你正常工作";
  }

  if (labels.group.includes("运动项目")) {
    return "住得离活动逻辑更近，别把时间浪费在来回折腾上";
  }

  if (labels.fear.includes("太吵")) {
    return AREAS[mainArea].need;
  }

  if (labels.budget.includes("省")) {
    return "省钱的同时避开旧房、远路和隐性成本";
  }

  return AREAS[mainArea].need;
}

function getReason(mainArea, labels) {
  const area = AREAS[mainArea];
  return [
    `你选的是“${labels.goal}”，同时最怕“${labels.fear}”。`,
    `${area.shortName} 的优势正好贴近这个取舍：${area.summary}`,
    `你对热闹的态度是“${labels.noise}”，步行接受度是“${labels.walk}”，所以结果不是简单按海滩排名，而是按后悔概率排序。`,
    "这个判断会压缩选择范围，让你先看对区域，再去筛酒店。"
  ];
}

function getAvoidReason(areaKey, labels) {
  const reasons = {
    station_1: "价格容易上去，如果你主要想省钱，它会显得不够划算。",
    station_2: "方便是真的方便，但人流和噪音风险很高。",
    station_3: "更慢更便宜，但如果你怕不方便，可能会嫌远。",
    bulabog: "它不是 White Beach 正面体验，第一次来容易有落差。",
    diniwid: "安静小众，但餐饮和夜生活便利性不如 Station 1 / 2。",
    yapak: "度假感强，但进出主商业区会麻烦。"
  };

  if (areaKey === "station_2" && labels.fear.includes("太吵")) return "你最怕吵，Station 2 核心区正好是高噪音风险区。";
  if (areaKey === "yapak" && labels.walk.includes("1-3 分钟")) return "你想快速到核心区，Yapak / 北部区会让你频繁依赖接驳。";
  if (areaKey === "bulabog" && labels.goal.includes("躺平")) return "你想要的是经典看海放空，Bulabog 更偏活动和另一侧海滩逻辑。";

  return reasons[areaKey];
}

function buildResult(answers) {
  const ranked = scoreAreas(answers);
  const labels = getAnswerLabels(answers);
  const mainArea = ranked[0].area;
  const backupAreas = chooseBackupAreas(ranked, mainArea);
  const avoidAreas = chooseAvoidAreas(ranked, mainArea, backupAreas, labels);

  return {
    id: makeId(),
    createdAt: new Date().toISOString(),
    paid: false,
    answers,
    answerLabels: labels,
    mainArea,
    backupAreas,
    avoidAreas,
    realNeed: getNeedSummary(mainArea, labels),
    reason: getReason(mainArea, labels),
    checks: AREAS[mainArea].checks,
    hotels: window.BORACAY_HOTELS[mainArea] || []
  };
}

function saveResult(result) {
  localStorage.setItem(`${STORAGE_PREFIX}${result.id}`, JSON.stringify(result));
  localStorage.setItem(LATEST_KEY, result.id);
}

function loadResult(id) {
  if (!id) return null;
  const raw = localStorage.getItem(`${STORAGE_PREFIX}${id}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function updateStoredResult(result) {
  localStorage.setItem(`${STORAGE_PREFIX}${result.id}`, JSON.stringify(result));
}

function areaLine(areaKey) {
  return `<strong>${AREAS[areaKey].shortName}</strong>：${AREAS[areaKey].summary}`;
}

function renderMissingResult(target) {
  target.innerHTML = `
    <section class="empty-state">
      <h2>还没有测试结果</h2>
      <p>先完成 6 题测试，再查看你的住宿区域判断。</p>
      <a class="primary-button" href="../quiz/">开始测试</a>
    </section>
  `;
}

function initQuiz() {
  const quizForm = document.querySelector("#quizForm");
  const resultButton = document.querySelector("#resultButton");
  const resetButton = document.querySelector("#resetButton");
  const progressText = document.querySelector("#progressText");
  const progressBar = document.querySelector("#progressBar");

  quizForm.innerHTML = QUESTIONS.map((question) => {
    const options = question.options
      .map(
        (option, index) => `
          <button
            class="option-button"
            type="button"
            data-question="${question.id}"
            data-option="${index}"
          >${option.label}</button>
        `
      )
      .join("");

    return `
      <fieldset class="question-block">
        <legend class="question-title">${question.text}</legend>
        <div class="options-grid">${options}</div>
      </fieldset>
    `;
  }).join("");

  const updateProgress = () => {
    const count = Object.keys(selectedAnswers).length;
    const total = QUESTIONS.length;
    progressText.textContent = `${count} / ${total}`;
    progressBar.style.width = `${(count / total) * 100}%`;
    resultButton.disabled = count !== total;
  };

  quizForm.addEventListener("click", (event) => {
    const button = event.target.closest(".option-button");
    if (!button) return;

    const questionId = button.dataset.question;
    const optionIndex = Number(button.dataset.option);
    selectedAnswers[questionId] = optionIndex;

    quizForm
      .querySelectorAll(`[data-question="${questionId}"]`)
      .forEach((optionButton) => optionButton.classList.remove("is-selected"));
    button.classList.add("is-selected");
    updateProgress();
  });

  resetButton.addEventListener("click", () => {
    Object.keys(selectedAnswers).forEach((key) => delete selectedAnswers[key]);
    quizForm.querySelectorAll(".option-button").forEach((button) => button.classList.remove("is-selected"));
    updateProgress();
  });

  resultButton.addEventListener("click", () => {
    const result = buildResult(selectedAnswers);
    saveResult(result);
    goTo("result", result.id);
  });

  updateProgress();
}

function renderFreeResult(result, target) {
  target.innerHTML = `
    <section class="result-card">
      <p class="eyebrow">Basic Result</p>
      <h2>你最适合住：${AREAS[result.mainArea].name}</h2>
      <p class="need-summary">你的真实需求是：${result.realNeed}</p>
      <div class="result-columns">
        <div>
          <h3>备选</h3>
          <p>${result.backupAreas.map(areaLine).join("<br>")}</p>
        </div>
        <div>
          <h3>不建议</h3>
          <p>${result.avoidAreas.map((area) => `<strong>${AREAS[area].shortName}</strong>：${getAvoidReason(area, result.answerLabels)}`).join("<br>")}</p>
        </div>
      </div>
    </section>

    <section class="locked-panel">
      <div>
        <p class="eyebrow">Locked</p>
        <h2>想知道为什么是这里，以及具体该看哪些酒店？</h2>
        <p>完整版会解锁完整判断理由、订酒店检查清单、3 个酒店初筛方向、每家酒店注意点，以及可下载结果卡。</p>
      </div>
      <ul class="plain-list">
        <li>完整判断理由</li>
        <li>订酒店重点检查清单</li>
        <li>3 个酒店初筛方向</li>
        <li>每家酒店的注意点</li>
        <li>可下载 PDF / 图片结果卡</li>
      </ul>
      <a class="primary-button" href="../pay/?id=${result.id}">9.9 元解锁完整结果</a>
      <p class="fine-print">一次付费，一次完整住宿决策卡。当前版本未接真实支付。</p>
    </section>
  `;
}

function initResult() {
  const mount = document.querySelector("#resultMount");
  const result = loadResult(getResultId());
  if (!result) {
    renderMissingResult(mount);
    return;
  }
  renderFreeResult(result, mount);
}

function initPay() {
  const mount = document.querySelector("#payMount");
  const result = loadResult(getResultId());
  if (!result) {
    renderMissingResult(mount);
    return;
  }

  const backLink = document.querySelector("#backToResultLink");
  backLink.href = `../result/?id=${result.id}`;

  mount.innerHTML = `
    <section class="pay-layout">
      <article class="price-card">
        <p class="eyebrow">完整版</p>
        <h2>¥9.9</h2>
        <p>适合第一次去长滩岛、想少踩坑、少做功课的人。</p>
        <button id="mockPayButton" class="primary-button" type="button">模拟解锁完整结果</button>
        <p class="fine-print">这里暂不接真实支付。按钮只会在本地标记为已解锁。</p>
      </article>

      <article class="info-card">
        <h3>你已免费获得</h3>
        <ul class="plain-list">
          <li>${AREAS[result.mainArea].name}</li>
          <li>${result.realNeed}</li>
          <li>备选：${result.backupAreas.map((area) => AREAS[area].shortName).join("、")}</li>
          <li>不建议：${result.avoidAreas.map((area) => AREAS[area].shortName).join("、")}</li>
        </ul>
      </article>

      <article class="info-card">
        <h3>你将获得</h3>
        <ul class="plain-list">
          <li>你的完整住宿区域判断</li>
          <li>为什么推荐这个区域</li>
          <li>哪些区域不建议你优先看</li>
          <li>订酒店前必须检查的 4 个重点</li>
          <li>3-5 个酒店初筛方向</li>
          <li>每家酒店的适合原因和注意点</li>
          <li>可下载 PDF / 图片版结果卡</li>
        </ul>
      </article>

      <article class="value-block">
        <h3>这 9.9 买的不是一份攻略</h3>
        <p>它买的是：少开十几个标签页，少被酒店照片带偏，少在 Station 1 / 2 / 3 之间反复纠结，少因为位置、噪音、房型差异踩坑。</p>
        <p>酒店价格、房态和评论会变化。候选酒店只是初筛方向，不构成最终预订保证。付款后请结合近一年评论、实时价格和取消政策再下单。</p>
      </article>
    </section>
  `;

  document.querySelector("#mockPayButton").addEventListener("click", () => {
    result.paid = true;
    result.unlockedAt = new Date().toISOString();
    updateStoredResult(result);
    goTo("success", result.id);
  });
}

function hotelCards(result) {
  return result.hotels
    .map(
      (hotel) => `
        <article class="hotel-card">
          <h4>${hotel.name}</h4>
          <p>${hotel.fit}</p>
          <p class="watch">注意：${hotel.watch}</p>
          <div class="hotel-meta">
            ${hotel.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function resultSummaryText(result) {
  return [
    "长滩岛住宿决策卡",
    `最适合住：${AREAS[result.mainArea].name}`,
    `真实需求：${result.realNeed}`,
    `备选：${result.backupAreas.map((area) => AREAS[area].shortName).join("、")}`,
    `不建议：${result.avoidAreas.map((area) => AREAS[area].shortName).join("、")}`,
    "订酒店重点看：",
    ...result.checks.map((check, index) => `${index + 1}. ${check}`),
    "酒店候选：",
    ...result.hotels.map((hotel, index) => `${index + 1}. ${hotel.name}：${hotel.fit} 注意：${hotel.watch}`)
  ].join("\n");
}

function downloadImage(result) {
  const lines = [
    "长滩岛住哪里",
    "你的住宿决策卡",
    `最适合住：${AREAS[result.mainArea].name}`,
    `核心需求：${result.realNeed}`,
    `备选：${result.backupAreas.map((area) => AREAS[area].shortName).join("、")}`,
    `不建议：${result.avoidAreas.map((area) => AREAS[area].shortName).join("、")}`,
    "预订前请重新查看近一年评论、价格和取消政策。"
  ];

  const escaped = lines.map((line) => line.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]));
  const textNodes = escaped
    .map((line, index) => `<text x="56" y="${88 + index * 54}" font-size="${index === 0 ? 42 : 25}" font-weight="${index < 2 ? 800 : 600}" fill="${index === 0 ? "#075a63" : "#1f2933"}">${line}</text>`)
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
      <rect width="1200" height="760" fill="#f5f2ea"/>
      <rect x="32" y="32" width="1136" height="696" rx="22" fill="#fffdf8" stroke="#d9d3c7" stroke-width="3"/>
      <circle cx="1050" cy="130" r="74" fill="#d45b3f" opacity="0.16"/>
      <circle cx="970" cy="230" r="46" fill="#007c89" opacity="0.14"/>
      ${textNodes}
      <text x="56" y="690" font-size="20" fill="#667085">基于 6 个回答生成。候选酒店只作为初筛方向。</text>
    </svg>
  `;
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "boracay-stay-card.svg";
  link.click();
  URL.revokeObjectURL(link.href);
}

function initSuccess() {
  const mount = document.querySelector("#successMount");
  const result = loadResult(getResultId());
  if (!result) {
    renderMissingResult(mount);
    return;
  }

  if (!result.paid) {
    mount.innerHTML = `
      <section class="empty-state">
        <h2>完整结果还未解锁</h2>
        <p>当前版本没有接真实支付。你可以从模拟解锁页继续。</p>
        <a class="primary-button" href="../pay/?id=${result.id}">去模拟解锁</a>
      </section>
    `;
    return;
  }

  mount.innerHTML = `
    <section id="decisionCard" class="decision-card">
      <p class="eyebrow">Boracay Stay Card</p>
      <h2>长滩岛住宿决策卡</h2>
      <div class="hero-result-line">
        <span>你最适合住</span>
        <strong>${AREAS[result.mainArea].name}</strong>
      </div>
      <p class="need-summary">核心需求：${result.realNeed}</p>

      <div class="result-columns">
        <div>
          <h3>为什么是这里</h3>
          ${result.reason.map((line) => `<p>${line}</p>`).join("")}
        </div>
        <div>
          <h3>备选 / 不建议</h3>
          <p><strong>备选：</strong>${result.backupAreas.map((area) => AREAS[area].shortName).join("、")}</p>
          <p><strong>不建议：</strong>${result.avoidAreas.map((area) => AREAS[area].shortName).join("、")}</p>
        </div>
      </div>

      <section class="checks-block">
        <h3>订酒店前必须检查</h3>
        <ol>
          ${result.checks.map((check) => `<li>${check}</li>`).join("")}
        </ol>
      </section>

      <section>
        <h3>酒店初筛方向</h3>
        <div class="hotel-list">${hotelCards(result)}</div>
      </section>

      <p class="fine-print">基于你的 6 个回答生成。预订前请重新查看近一年评论、实时价格和取消政策。</p>
    </section>

    <div class="success-actions no-print">
      <button id="downloadPdfButton" class="primary-button" type="button">下载 PDF</button>
      <button id="downloadImageButton" class="ghost-button" type="button">下载图片</button>
      <button id="copySummaryButton" class="ghost-button" type="button">复制结果摘要</button>
    </div>
  `;

  document.querySelector("#downloadPdfButton").addEventListener("click", () => window.print());
  document.querySelector("#downloadImageButton").addEventListener("click", () => downloadImage(result));
  document.querySelector("#copySummaryButton").addEventListener("click", async () => {
    await navigator.clipboard.writeText(resultSummaryText(result));
    document.querySelector("#copySummaryButton").textContent = "已复制";
  });
}

const page = getPage();
if (page === "quiz") initQuiz();
if (page === "result") initResult();
if (page === "pay") initPay();
if (page === "success") initSuccess();
