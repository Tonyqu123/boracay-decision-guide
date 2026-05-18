const AREAS = {
  station_1: {
    name: "Station 1 靠 Station 2 的区域",
    shortName: "Station 1",
    summary: "经典白沙滩、舒服、安静一些，适合第一次来又不想太偏的人。",
    checks: ["到 White Beach 是否真的是步行距离", "评论里有没有反复提到噪音", "房间是否偏旧，尤其看近一年评论", "海滩侧和主路侧房型差异"],
    need: "你要的是经典白沙滩体验 + 吃饭方便 + 晚上不要太吵。"
  },
  station_2: {
    name: "Station 2 / D'Mall 周边",
    shortName: "Station 2",
    summary: "吃喝最方便、最热闹，适合怕无聊、不怕人多的人。",
    checks: ["离 D'Mall 和餐厅是否真的近", "夜间噪音评论", "房间隔音和空调", "高峰期公共区域是否拥挤"],
    need: "你要的是便利和热闹，愿意用一点度假感换少走路。"
  },
  station_3: {
    name: "Station 3",
    shortName: "Station 3",
    summary: "相对便宜、安静、慢节奏，适合愿意走路的人。",
    checks: ["到 Station 2 / D'Mall 的真实步行时间", "房间新旧和潮湿评论", "晚上回酒店是否方便", "周边餐饮是否够用"],
    need: "你不是只想便宜，你是想用合理取舍避开冤枉钱。"
  },
  bulabog: {
    name: "Bulabog",
    shortName: "Bulabog",
    summary: "风筝冲浪、水上项目、另一侧海滩，适合目标明确的人。",
    checks: ["到 White Beach 的路线", "风筝冲浪或水上项目是否方便", "Wi-Fi 是否被住客夸过", "是否能接受不是经典白沙滩正面"],
    need: "你更在意活动和效率，不一定非要住在 White Beach 正面。"
  },
  diniwid: {
    name: "Diniwid",
    shortName: "Diniwid",
    summary: "安静、小众、离 Station 1 不远，适合不想住商业区的人。",
    checks: ["到 Station 1 的真实路线", "夜间交通是否方便", "周边餐饮是否够用", "是否有上下坡或行李不便"],
    need: "你要的是安静和审美，不想被 Station 2 的商业感包围。"
  },
  yapak: {
    name: "Yapak / 北部度假村区",
    shortName: "Yapak",
    summary: "高级度假村、远离人群、私密，适合泡酒店的人。",
    checks: ["酒店接送频率和费用", "酒店餐饮价格和评价", "到 D'Mall 的时间", "天气不好时酒店内是否够舒服"],
    need: "你要的是完整度假村体验，不是每天进出主商业区。"
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

const selectedAnswers = {};
const quizForm = document.querySelector("#quizForm");
const resultButton = document.querySelector("#resultButton");
const resetButton = document.querySelector("#resetButton");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const resultPanel = document.querySelector("#resultPanel");

function renderQuiz() {
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
}

function updateProgress() {
  const count = Object.keys(selectedAnswers).length;
  const total = QUESTIONS.length;
  progressText.textContent = `${count} / ${total}`;
  progressBar.style.width = `${(count / total) * 100}%`;
  resultButton.disabled = count !== total;
}

function handleOptionClick(event) {
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
}

function scoreAreas() {
  const scores = Object.fromEntries(Object.keys(AREAS).map((area) => [area, 0]));

  QUESTIONS.forEach((question) => {
    const selectedIndex = selectedAnswers[question.id];
    const option = question.options[selectedIndex];
    Object.entries(option.weights).forEach(([area, score]) => {
      scores[area] += score;
    });
  });

  return Object.entries(scores)
    .map(([area, score]) => ({ area, score }))
    .sort((a, b) => b.score - a.score);
}

function getSelectedLabel(questionId) {
  const question = QUESTIONS.find((item) => item.id === questionId);
  return question.options[selectedAnswers[questionId]].label;
}

function getNeedSummary(mainArea) {
  const fear = getSelectedLabel("fear");
  const budget = getSelectedLabel("budget");
  const group = getSelectedLabel("group");

  if (group.includes("远程办公")) {
    return "你的真实需求不是“住得好看”，而是：动线能接受、Wi-Fi 稳、房间能让你正常工作。";
  }

  if (group.includes("运动项目")) {
    return "你的真实需求不是经典打卡，而是：住得离活动逻辑更近，别把时间浪费在来回折腾上。";
  }

  if (fear.includes("太吵")) {
    return `你的真实需求不是“住海边”这么简单，而是：${AREAS[mainArea].need}`;
  }

  if (budget.includes("省")) {
    return "你的真实需求不是单纯便宜，而是：省钱的同时避开旧房、远路和隐性成本。";
  }

  return `你的真实需求是：${AREAS[mainArea].need}`;
}

function getReason(mainArea) {
  const goal = getSelectedLabel("goal");
  const fear = getSelectedLabel("fear");
  const noise = getSelectedLabel("noise");
  const walk = getSelectedLabel("walk");
  const area = AREAS[mainArea];

  return [
    `你选的是“${goal}”，同时最怕“${fear}”。`,
    `${area.shortName} 的优势正好贴近这个取舍：${area.summary}`,
    `你对热闹的态度是“${noise}”，步行接受度是“${walk}”，所以结果不是简单按海滩排名，而是按后悔概率排序。`,
    "这个判断会压缩选择范围，让你先看对区域，再去筛酒店。"
  ].join("");
}

function getAvoidReason(areaKey) {
  const fear = getSelectedLabel("fear");
  const goal = getSelectedLabel("goal");
  const walk = getSelectedLabel("walk");

  const reasons = {
    station_1: "价格容易上去，如果你主要想省钱，它会显得不够划算。",
    station_2: "方便是真的方便，但人流和噪音风险很高。",
    station_3: "更慢更便宜，但如果你怕不方便，可能会嫌远。",
    bulabog: "它不是 White Beach 正面体验，第一次来容易有落差。",
    diniwid: "安静小众，但餐饮和夜生活便利性不如 Station 1 / 2。",
    yapak: "度假感强，但进出主商业区会麻烦。"
  };

  if (areaKey === "station_2" && fear.includes("太吵")) return "你最怕吵，Station 2 核心区正好是高噪音风险区。";
  if (areaKey === "yapak" && walk.includes("1-3 分钟")) return "你想快速到核心区，Yapak / 北部区会让你频繁依赖接驳。";
  if (areaKey === "bulabog" && goal.includes("躺平")) return "你想要的是经典看海放空，Bulabog 更偏活动和另一侧海滩逻辑。";

  return reasons[areaKey];
}

function chooseBackupAreas(ranked, mainArea) {
  return ranked
    .filter((item) => item.area !== mainArea)
    .slice(0, 1)
    .map((item) => item.area);
}

function chooseAvoidAreas(ranked, mainArea, backupAreas) {
  const fear = getSelectedLabel("fear");
  const goal = getSelectedLabel("goal");
  const noise = getSelectedLabel("noise");
  const walk = getSelectedLabel("walk");
  const budget = getSelectedLabel("budget");
  const avoid = [];
  const blocked = new Set([mainArea, ...backupAreas]);

  const addAvoid = (area) => {
    if (!blocked.has(area) && !avoid.includes(area)) avoid.push(area);
  };

  if (fear.includes("太吵") || noise.includes("晚上要安静") || noise.includes("只想安静")) {
    addAvoid("station_2");
  }

  if (walk.includes("1-3 分钟") || walk.includes("5-10 分钟")) {
    addAvoid("yapak");
  }

  if (goal.includes("热闹") || fear.includes("周围太无聊")) {
    addAvoid("yapak");
    addAvoid("diniwid");
  }

  if (budget.includes("省")) {
    addAvoid("yapak");
    addAvoid("station_1");
  }

  if (goal.includes("躺平") || fear.includes("离海滩太远")) {
    addAvoid("bulabog");
  }

  [...ranked].reverse().forEach((item) => addAvoid(item.area));
  return avoid.slice(0, 2);
}

function renderResult() {
  const ranked = scoreAreas();
  const mainArea = ranked[0].area;
  const backupAreas = chooseBackupAreas(ranked, mainArea);
  const avoidAreas = chooseAvoidAreas(ranked, mainArea, backupAreas);
  const hotels = window.BORACAY_HOTELS[mainArea] || [];

  document.querySelector("#mainAreaName").textContent = AREAS[mainArea].name;
  document.querySelector("#needSummary").textContent = getNeedSummary(mainArea);
  document.querySelector("#reasonText").textContent = getReason(mainArea);

  document.querySelector("#backupList").innerHTML = backupAreas
    .map((area) => `<li><strong>${AREAS[area].shortName}</strong>：${AREAS[area].summary}</li>`)
    .join("");

  document.querySelector("#avoidList").innerHTML = avoidAreas
    .map((area) => `<li><strong>${AREAS[area].shortName}</strong>：${getAvoidReason(area)}</li>`)
    .join("");

  document.querySelector("#checkList").innerHTML = AREAS[mainArea].checks
    .map((check) => `<li>${check}</li>`)
    .join("");

  document.querySelector("#hotelList").innerHTML = hotels
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

  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetQuiz() {
  Object.keys(selectedAnswers).forEach((key) => delete selectedAnswers[key]);
  quizForm.querySelectorAll(".option-button").forEach((button) => button.classList.remove("is-selected"));
  resultPanel.hidden = true;
  updateProgress();
}

renderQuiz();
updateProgress();
quizForm.addEventListener("click", handleOptionClick);
resultButton.addEventListener("click", renderResult);
resetButton.addEventListener("click", resetQuiz);
