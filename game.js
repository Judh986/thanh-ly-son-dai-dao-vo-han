const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startModal = document.getElementById('startModal');
const nameInput = document.getElementById('nameInput');
const elementSelect = document.getElementById('elementSelect');
const startBtn = document.getElementById('startBtn');

const hud = {
  playerName: document.getElementById('playerName'),
  playerRealm: document.getElementById('playerRealm'),
  mapName: document.getElementById('mapName'),
  hpBar: document.getElementById('hpBar'),
  qiBar: document.getElementById('qiBar'),
  hpText: document.getElementById('hpText'),
  qiText: document.getElementById('qiText'),
  tuviValue: document.getElementById('tuviValue'),
  moneyValue: document.getElementById('moneyValue'),
  xpValue: document.getElementById('xpValue'),
  questText: document.getElementById('questText'),
  toast: document.getElementById('toast'),
  dialogBox: document.getElementById('dialogBox'),
  dialogName: document.getElementById('dialogName'),
  dialogText: document.getElementById('dialogText'),
  dialogActionBtn: document.getElementById('dialogActionBtn'),
  closeDialog: document.getElementById('closeDialog'),
  saveBtn: document.getElementById('saveBtn'),
  modalPanel: document.getElementById('modalPanel'),
  windowTitle: document.getElementById('windowTitle'),
  panelContent: document.getElementById('panelContent'),
  closeWindowBtn: document.getElementById('closeWindowBtn')
};

const movePad = document.getElementById('movePad');
const stick = document.getElementById('stick');
const attackBtn = document.getElementById('attackBtn');
const skillBtn = document.getElementById('skillBtn');
const interactBtn = document.getElementById('interactBtn');

const SAVE_KEY = 'thanh-ly-son-save-v1';
const MAP_SIZE = 2200;

const SHOP_ITEMS = [
  { id: 'healing-potion', name: 'Đan Hồi Sinh', type: 'potion', price: 25, description: 'Phục hồi 30 máu và 10 linh lực.', rarity: 'Huyền' },
  { id: 'qi-herb', name: 'Linh Thảo', type: 'herb', price: 18, description: 'Hấp thu linh khí nhanh.', rarity: 'Thường' },
  { id: 'iron-sword', name: 'Kiếm Sắt', type: 'weapon', price: 60, description: 'Vũ khí sơ cấp phù hợp phàm nhân.', rarity: 'Thường' },
  { id: 'jade-amulet', name: 'Ngọc Huyền', type: 'amulet', price: 95, description: 'Tăng phòng ngự và tâm thần.', rarity: 'Huyền' }
];

const CULTIVATION_TIERS = [
  { realm: 'Phàm Nhân', stage: 'Phàm Nhân', min: 0, max: 9 },
  { realm: 'Phục Khí', stage: 'Tầng 1', min: 10, max: 19 },
  { realm: 'Phục Khí', stage: 'Tầng 2', min: 20, max: 29 },
  { realm: 'Phục Khí', stage: 'Tầng 3', min: 30, max: 39 },
  { realm: 'Phục Khí', stage: 'Tầng 4', min: 40, max: 49 },
  { realm: 'Phục Khí', stage: 'Tầng 5', min: 50, max: 59 },
  { realm: 'Phục Khí', stage: 'Tầng 6', min: 60, max: 69 },
  { realm: 'Phục Khí', stage: 'Tầng 7', min: 70, max: 79 },
  { realm: 'Phục Khí', stage: 'Tầng 8', min: 80, max: 89 },
  { realm: 'Phục Khí', stage: 'Tầng 9', min: 90, max: 99 },
  { realm: 'Phục Khí', stage: 'Tầng 10', min: 100, max: 109 },
  { realm: 'Phục Khí', stage: 'Tầng 11', min: 110, max: 119 },
  { realm: 'Phục Khí', stage: 'Tầng 12', min: 120, max: 129 },
  { realm: 'Phục Khí', stage: 'Tầng 13', min: 130, max: 149 },
  { realm: 'Đạo Cơ', stage: 'Sơ kỳ', min: 150, max: 199 },
  { realm: 'Đạo Cơ', stage: 'Trung kỳ', min: 200, max: 249 },
  { realm: 'Đạo Cơ', stage: 'Hậu kỳ', min: 250, max: 299 },
  { realm: 'Đạo Cơ', stage: 'Viên mãn', min: 300, max: 349 },
  { realm: 'Tử Phủ', stage: 'Sơ kỳ', min: 350, max: 399 },
  { realm: 'Tử Phủ', stage: 'Trung kỳ', min: 400, max: 449 },
  { realm: 'Tử Phủ', stage: 'Hậu kỳ', min: 450, max: 499 },
  { realm: 'Tử Phủ', stage: 'Viên mãn', min: 500, max: 549 },
  { realm: 'Kim Đan', stage: 'Sơ kỳ', min: 550, max: 599 },
  { realm: 'Kim Đan', stage: 'Trung kỳ', min: 600, max: 649 },
  { realm: 'Kim Đan', stage: 'Hậu kỳ', min: 650, max: 699 },
  { realm: 'Kim Đan', stage: 'Viên mãn', min: 700, max: 749 },
  { realm: 'Trị Tuế', stage: 'Sơ kỳ', min: 750, max: 799 },
  { realm: 'Trị Tuế', stage: 'Trung kỳ', min: 800, max: 849 },
  { realm: 'Trị Tuế', stage: 'Hậu kỳ', min: 850, max: 899 },
  { realm: 'Trị Tuế', stage: 'Viên mãn', min: 900, max: 999 }
];

const ELEMENTS = {
  Kim: { speed: 1, power: 1.1, qi: 1.1 },
  Mộc: { speed: 1.05, power: 1.0, qi: 1.2 },
  Thủy: { speed: 1.08, power: 1.0, qi: 1.35 },
  Hỏa: { speed: 1.0, power: 1.25, qi: 1.1 },
  Thổ: { speed: 0.95, power: 1.18, qi: 1.0 },
  'Ngũ Hành': { speed: 1.08, power: 1.1, qi: 1.2 }
};

const worldMaps = {
  town: {
    name: 'Thành Ly Sơn',
    width: MAP_SIZE,
    height: MAP_SIZE,
    background: '#294d34',
    grass: '#7db85b',
    path: '#d2b07a',
    obstacles: [
      { x: 100, y: 100, w: 260, h: 140 },
      { x: 420, y: 120, w: 220, h: 150 },
      { x: 760, y: 120, w: 300, h: 120 },
      { x: 1160, y: 130, w: 260, h: 140 },
      { x: 1600, y: 170, w: 300, h: 140 },
      { x: 260, y: 760, w: 220, h: 160 },
      { x: 680, y: 760, w: 280, h: 180 },
      { x: 1110, y: 790, w: 220, h: 160 },
      { x: 1520, y: 760, w: 260, h: 200 },
      { x: 350, y: 1280, w: 320, h: 180 },
      { x: 850, y: 1250, w: 280, h: 160 },
      { x: 1300, y: 1280, w: 260, h: 180 },
      { x: 1700, y: 1260, w: 260, h: 180 }
    ],
    npcs: [
      { id: 'merchant', name: 'Tiểu Thương', job: 'Thương nhân', x: 940, y: 500, color: '#f7d06d', dialog: ['Tiểu thương: Hàng mới đến, thuốc tiên và linh thảo đều có cả!'] },
      { id: 'sage', name: 'Lão Đạo', job: 'Tán tu', x: 610, y: 1040, color: '#8cd1ff', dialog: ['Lão Đạo: Học pháp tu hành phải bước từng bước, đừng vội tìm đột phá.'] },
      { id: 'outsider', name: 'Lý Vô Mưu', job: 'Người giao nhiệm vụ', x: 1520, y: 540, color: '#ffb882', dialog: ['Lý Vô Mưu: Kẻ nào cũng có thể bước ra ngoài, đi săn yêu thú ở Rừng Huyền Sâm đi.'] }
    ],
    monsters: [],
    warps: [
      { x: 1030, y: 2050, w: 140, h: 120, toMap: 'forest', toX: 180, toY: 180, label: 'Rừng Huyền Sâm' },
      { x: 1650, y: 2050, w: 140, h: 120, toMap: 'temple', toX: 180, toY: 180, label: 'Tông Môn' }
    ],
    spawn: { x: 1000, y: 1950 }
  },
  forest: {
    name: 'Rừng Huyền Sâm',
    width: MAP_SIZE,
    height: MAP_SIZE,
    background: '#1f3d2a',
    grass: '#5aa961',
    path: '#7b513d',
    obstacles: [
      { x: 260, y: 250, w: 220, h: 200 },
      { x: 670, y: 320, w: 260, h: 200 },
      { x: 1220, y: 250, w: 220, h: 200 },
      { x: 1500, y: 760, w: 220, h: 220 },
      { x: 650, y: 1080, w: 260, h: 240 },
      { x: 1180, y: 1180, w: 260, h: 220 },
      { x: 320, y: 1540, w: 260, h: 200 }
    ],
    npcs: [
      { id: 'hunter', name: 'Đại Lực', job: 'Thợ săn', x: 1460, y: 400, color: '#7bddb5', dialog: ['Đại Lực: Yêu thú trong rừng không dễ giết, cẩn thận với việc rút lui.'] }
    ],
    monsters: [
      { id: 'wolf', x: 310, y: 640, health: 52, maxHealth: 52, speed: 1.2, dmg: 10, color: '#d6d0bf' },
      { id: 'boar', x: 930, y: 880, health: 70, maxHealth: 70, speed: 0.9, dmg: 12, color: '#9b8b55' },
      { id: 'spirit', x: 1620, y: 1220, health: 90, maxHealth: 90, speed: 1.3, dmg: 14, color: '#8ab0ff' }
    ],
    warps: [
      { x: 160, y: 1960, w: 130, h: 120, toMap: 'town', toX: 1040, toY: 1960, label: 'Thành Ly Sơn' },
      { x: 1900, y: 1960, w: 130, h: 120, toMap: 'cave', toX: 180, toY: 180, label: 'Bí Cảnh' }
    ],
    spawn: { x: 200, y: 1950 }
  },
  temple: {
    name: 'Tông Môn Thanh Ly',
    width: MAP_SIZE,
    height: MAP_SIZE,
    background: '#243654',
    grass: '#6a7db0',
    path: '#d6cfb3',
    obstacles: [
      { x: 220, y: 300, w: 280, h: 200 },
      { x: 760, y: 280, w: 260, h: 190 },
      { x: 1280, y: 250, w: 260, h: 230 },
      { x: 430, y: 920, w: 270, h: 180 },
      { x: 980, y: 900, w: 260, h: 220 },
      { x: 1470, y: 1030, w: 280, h: 180 },
      { x: 700, y: 1480, w: 310, h: 220 }
    ],
    npcs: [
      { id: 'master', name: 'Huyền Phong', job: 'Trưởng lão', x: 1120, y: 600, color: '#d7bc7f', dialog: ['Huyền Phong: Ngươi vừa bước vào đạo, hãy tu luyện bằng một quyển kiếm pháp sơ cấp.'] },
      { id: 'alchemist', name: 'Thục Nương', job: 'Luyện đan sư', x: 600, y: 520, color: '#d0a2ff', dialog: ['Thục Nương: Đan dược có thể nối dài tu vi, nhưng không thay thế được lòng kiên định.'] },
      { id: 'disciple', name: 'Tố Nhã', job: 'Đệ tử tông môn', x: 1680, y: 640, color: '#8be7c7', dialog: ['Tố Nhã: Tông môn các quy củ nghiêm minh, nhưng nơi đây rất an toàn.'] }
    ],
    monsters: [
      { id: 'guard', x: 760, y: 1460, health: 95, maxHealth: 95, speed: 0.9, dmg: 16, color: '#b7d3fd' }
    ],
    warps: [
      { x: 180, y: 1960, w: 120, h: 120, toMap: 'town', toX: 1090, toY: 1960, label: 'Thành Ly Sơn' },
      { x: 1900, y: 1960, w: 120, h: 120, toMap: 'cave', toX: 380, toY: 260, label: 'Bí Cảnh' }
    ],
    spawn: { x: 220, y: 1950 }
  },
  cave: {
    name: 'Bí Cảnh Cổ Đạo',
    width: MAP_SIZE,
    height: MAP_SIZE,
    background: '#1c1f26',
    grass: '#3a4155',
    path: '#533d3a',
    obstacles: [
      { x: 200, y: 200, w: 260, h: 220 },
      { x: 760, y: 260, w: 300, h: 240 },
      { x: 1320, y: 200, w: 200, h: 240 },
      { x: 440, y: 950, w: 260, h: 250 },
      { x: 950, y: 1020, w: 260, h: 230 },
      { x: 1500, y: 960, w: 260, h: 240 }
    ],
    npcs: [
      { id: 'secret', name: 'Cổ tu sĩ', job: 'Tán tu', x: 1550, y: 720, color: '#e4d09d', dialog: ['Cổ tu sĩ: Bí cảnh này đã mất trật tự, ngươi chỉ nên lấy được truyền thừa không được bám quá lâu.'] }
    ],
    monsters: [
      { id: 'viper', x: 540, y: 620, health: 115, maxHealth: 115, speed: 1.15, dmg: 18, color: '#7ad0d7' },
      { id: 'wraith', x: 1350, y: 1180, health: 120, maxHealth: 120, speed: 1.2, dmg: 20, color: '#d7c1ff' },
      { id: 'golem', x: 1760, y: 1460, health: 170, maxHealth: 170, speed: 0.8, dmg: 22, color: '#8a9aab' }
    ],
    warps: [
      { x: 340, y: 1960, w: 120, h: 120, toMap: 'forest', toX: 1940, toY: 1920, label: 'Rừng Huyền Sâm' },
      { x: 1800, y: 1960, w: 120, h: 120, toMap: 'temple', toX: 1920, toY: 1960, label: 'Tông Môn' }
    ],
    spawn: { x: 400, y: 1950 }
  }
};

const state = {
  currentMap: 'town',
  time: 0,
  keys: {},
  touch: { active: false, dx: 0, dy: 0 },
  ui: { interactTarget: null, questStage: 0 },
  toastTimeout: 0,
  player: null,
  camera: { x: 0, y: 0 },
  activePanel: 'profile'
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRealmInfo(tuvi) {
  const realm = CULTIVATION_TIERS.find((entry) => tuvi >= entry.min && tuvi <= entry.max);
  return realm || CULTIVATION_TIERS[CULTIVATION_TIERS.length - 1];
}

function showToast(message) {
  hud.toast.textContent = message;
  hud.toast.classList.remove('hidden');
  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => hud.toast.classList.add('hidden'), 1600);
}

function saveGame() {
  if (!state.player) return;
  const data = {
    name: state.player.name,
    element: state.player.element,
    talent: state.player.talent,
    lifespan: state.player.lifespan,
    title: state.player.title,
    realm: state.player.realm,
    realmStage: state.player.realmStage,
    tuvi: state.player.tuvi,
    cultivation: state.player.cultivation,
    hp: state.player.hp,
    qi: state.player.qi,
    maxHp: state.player.maxHp,
    maxQi: state.player.maxQi,
    money: state.player.money,
    xp: state.player.xp,
    reputation: state.player.reputation,
    inventory: state.player.inventory,
    equipment: state.player.equipment,
    map: state.currentMap,
    x: state.player.x,
    y: state.player.y,
    questStage: state.ui.questStage
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  showToast('Tiến độ đã được lưu');
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  if (!data) return false;

  const player = makePlayer(data.name || 'Linh Tử', data.element || 'Ngũ Hành');
  Object.assign(player, data);
  player.hp = Math.min(player.hp || player.maxHp, player.maxHp);
  player.qi = Math.min(player.qi || player.maxQi, player.maxQi);
  state.player = player;
  state.currentMap = data.map || 'town';
  state.ui.questStage = data.questStage || 0;
  return true;
}

function makePlayer(name, element) {
  const stats = ELEMENTS[element] || ELEMENTS['Ngũ Hành'];
  return {
    name: name.trim() || 'Linh Tử',
    element,
    talent: 68,
    lifespan: 120,
    title: 'Phàm Tử',
    realm: 'Phàm Nhân',
    realmStage: 'Phàm Nhân',
    cultivation: 'Cửu Âm Thần Công',
    tuvi: 0,
    xp: 0,
    money: 32,
    hp: 100,
    maxHp: 100,
    qi: 100,
    maxQi: 100,
    strength: 12,
    defense: 10,
    divineSense: 5,
    purity: 42,
    speed: 2.6 * stats.speed,
    power: 14 * stats.power,
    reputation: 0,
    inventory: [
      { id: 'qi-herb', name: 'Linh Thảo', type: 'herb', quantity: 3, rarity: 'Thường', description: 'Hóa linh, thu thập khí.' },
      { id: 'healing-potion', name: 'Đan Hồi Sinh', type: 'potion', quantity: 2, rarity: 'Huyền', description: 'Khôi phục sinh lực.' },
      { id: 'currency', name: 'Linh thạch', type: 'currency', quantity: 8, rarity: 'Thường', description: 'Tiền tệ của tu giới.' }
    ],
    equipment: {
      weapon: null,
      armor: null,
      accessory: null,
      amulet: null,
      shield: null,
      body: null
    },
    x: 1000,
    y: 1950,
    width: 32,
    height: 36,
    dirX: 0,
    dirY: 0,
    attackTimer: 0,
    skillTimer: 0,
    isDead: false
  };
}

function setPlayerFromModal() {
  const name = nameInput.value.trim();
  const element = elementSelect.value;
  if (!name) {
    showToast('Vui lòng nhập tên nhân vật');
    return;
  }
  state.player = makePlayer(name, element);
  state.currentMap = 'town';
  state.ui.questStage = 0;
  startModal.classList.remove('active');
  showToast(`Khởi đầu tại ${worldMaps.town.name}`);
  updateHud();
  centerCameraOnPlayer();
}

function getCurrentMap() {
  return worldMaps[state.currentMap];
}

function normalizeDir(x, y) {
  const mag = Math.hypot(x, y) || 1;
  return { x: x / mag, y: y / mag };
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function attemptMove(entity, dx, dy) {
  const map = getCurrentMap();
  const nextX = entity.x + dx;
  const nextY = entity.y + dy;

  const candidate = { x: nextX, y: entity.y, w: entity.width, h: entity.height };
  const verticalCandidate = { x: entity.x, y: nextY, w: entity.width, h: entity.height };

  let blockedX = false;
  let blockedY = false;

  for (const wall of map.obstacles) {
    if (rectsIntersect(candidate, wall)) blockedX = true;
    if (rectsIntersect(verticalCandidate, wall)) blockedY = true;
  }

  if (!blockedX) entity.x = clamp(nextX, 0, map.width - entity.width);
  if (!blockedY) entity.y = clamp(nextY, 0, map.height - entity.height);
}

function getQuestText() {
  const questStages = [
    'Tìm trưởng lão Huyền Phong ở Tông Môn để nhận chỉ dẫn.',
    'Đi qua Rừng Huyền Sâm và đánh bại 3 quái thú để rèn thân.',
    'Quay về thành để báo cáo với Lý Vô Mưu và tiếp tục bước vào con đường tiên đạo.'
  ];
  return questStages[state.ui.questStage] || questStages[0];
}

function updateQuest() {
  hud.questText.textContent = getQuestText();
}

function updateHud() {
  if (!state.player) return;

  const p = state.player;
  const info = getRealmInfo(p.tuvi);
  p.realm = info.realm;
  p.realmStage = info.stage;
  hud.playerName.textContent = p.name;
  hud.playerRealm.textContent = `${p.realm} • ${p.realmStage}`;
  hud.mapName.textContent = getCurrentMap().name;
  hud.hpText.textContent = `${Math.ceil(p.hp)} / ${p.maxHp}`;
  hud.qiText.textContent = `${Math.ceil(p.qi)} / ${p.maxQi}`;
  hud.hpBar.style.width = `${(p.hp / p.maxHp) * 100}%`;
  hud.qiBar.style.width = `${(p.qi / p.maxQi) * 100}%`;
  hud.tuviValue.textContent = p.tuvi;
  hud.moneyValue.textContent = p.money;
  hud.xpValue.textContent = p.xp;
  updateQuest();
}

function centerCameraOnPlayer() {
  const map = getCurrentMap();
  const camX = clamp(state.player.x - canvas.width / 2 + state.player.width / 2, 0, map.width - canvas.width);
  const camY = clamp(state.player.y - canvas.height / 2 + state.player.height / 2, 0, map.height - canvas.height);
  state.camera.x = camX;
  state.camera.y = camY;
}

function handleMovement(dt) {
  const p = state.player;
  let moveX = 0;
  let moveY = 0;

  if (state.keys['ArrowUp'] || state.keys['KeyW']) moveY -= 1;
  if (state.keys['ArrowDown'] || state.keys['KeyS']) moveY += 1;
  if (state.keys['ArrowLeft'] || state.keys['KeyA']) moveX -= 1;
  if (state.keys['ArrowRight'] || state.keys['KeyD']) moveX += 1;

  if (state.touch.active) {
    moveX += state.touch.dx;
    moveY += state.touch.dy;
  }

  if (moveX !== 0 || moveY !== 0) {
    const dir = normalizeDir(moveX, moveY);
    const moveSpeed = p.speed * dt * 60;
    attemptMove(p, dir.x * moveSpeed, dir.y * moveSpeed);
    p.dirX = dir.x;
    p.dirY = dir.y;
  }

  centerCameraOnPlayer();
}

function tryInteract() {
  const map = getCurrentMap();
  const p = state.player;
  let nearest = null;
  let nearestDist = 9999;

  for (const npc of map.npcs) {
    const dx = p.x - npc.x;
    const dy = p.y - npc.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 70 && dist < nearestDist) {
      nearest = npc;
      nearestDist = dist;
    }
  }

  if (nearest) {
    openDialog(nearest);
    return;
  }

  for (const warp of map.warps) {
    const warpBox = { x: warp.x, y: warp.y, w: warp.w, h: warp.h };
    const playerBox = { x: p.x, y: p.y, w: p.width, h: p.height };
    if (rectsIntersect(playerBox, warpBox)) {
      travelToMap(warp.toMap, warp.toX, warp.toY);
      return;
    }
  }

  showToast('Không có gì để tương tác tại đây');
}

function openDialog(npc) {
  hud.dialogBox.classList.remove('hidden');
  hud.dialogName.textContent = `${npc.name} • ${npc.job}`;
  hud.dialogText.textContent = npc.dialog[0];
  hud.dialogActionBtn.textContent = 'Đồng ý';
  state.ui.interactTarget = npc;
}

function closeDialog() {
  hud.dialogBox.classList.add('hidden');
  state.ui.interactTarget = null;
}

function handleDialogAction() {
  if (!state.ui.interactTarget) {
    closeDialog();
    return;
  }

  const npc = state.ui.interactTarget;
  if (npc.id === 'outsider' && state.ui.questStage === 0) {
    state.ui.questStage = 1;
    showToast('Nhiệm vụ mới: đi săn 3 quái thú ở Rừng Huyền Sâm');
    updateHud();
  } else if (npc.id === 'master' && state.ui.questStage === 1) {
    state.ui.questStage = 2;
    showToast('Nhiệm vụ hoàn thành: báo cáo với Lý Vô Mưu');
    updateHud();
  } else if (npc.id === 'merchant') {
    openPanel('shop');
  }

  closeDialog();
}

function travelToMap(mapName, x, y) {
  state.currentMap = mapName;
  state.player.x = x;
  state.player.y = y;
  centerCameraOnPlayer();
  updateHud();
  showToast(`Chuyển đến ${worldMaps[mapName].name}`);
}

function attack() {
  if (state.player.attackTimer > 0 || state.player.isDead) return;
  const p = state.player;
  p.attackTimer = 0.28;

  const attackRange = 70;
  const attackBox = {
    x: p.x - 10 + p.dirX * 18,
    y: p.y - 10 + p.dirY * 18,
    w: 48,
    h: 48
  };

  const map = getCurrentMap();
  for (const monster of map.monsters) {
    const mBox = { x: monster.x, y: monster.y, w: 36, h: 36 };
    if (Math.hypot(monster.x - p.x, monster.y - p.y) < attackRange && rectsIntersect(attackBox, mBox)) {
      monster.health -= p.power;
      if (monster.health <= 0) {
        const reward = Math.floor(Math.random() * 16) + 8;
        p.money += reward;
        p.xp += 15;
        p.qi = clamp(p.qi + 8, 0, p.maxQi);
        p.tuvi += 5;
        map.monsters = map.monsters.filter(m => m.id !== monster.id);
        showToast(`Giết quái: +${reward} linh thạch`);
      }
    }
  }
}

function useSkill() {
  if (state.player.skillTimer > 0 || state.player.isDead) return;
  state.player.skillTimer = 0.9;
  state.player.qi = clamp(state.player.qi - 18, 0, state.player.maxQi);
  const map = getCurrentMap();
  const skillRange = 150;
  for (const monster of map.monsters) {
    const dx = monster.x - state.player.x;
    const dy = monster.y - state.player.y;
    if (Math.hypot(dx, dy) < skillRange) {
      monster.health -= state.player.power * 1.8;
      if (monster.health <= 0) {
        map.monsters = map.monsters.filter(m => m.id !== monster.id);
        state.player.money += 18;
        state.player.xp += 20;
        state.player.tuvi += 10;
      }
    }
  }
  showToast('Kỹ năng: Pháp lực bắn ra!');
}

function updateMonsters(dt) {
  const map = getCurrentMap();
  for (const monster of map.monsters) {
    const dx = state.player.x - monster.x;
    const dy = state.player.y - monster.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 220) {
      const dir = normalizeDir(dx, dy);
      monster.x += dir.x * monster.speed * dt * 60;
      monster.y += dir.y * monster.speed * dt * 60;

      if (dist < 36 && state.player.hp > 0) {
        state.player.hp = clamp(state.player.hp - monster.dmg * dt * 0.8, 0, state.player.maxHp);
      }
    }
  }

  if (state.player.hp <= 0) {
    state.player.isDead = true;
    state.player.hp = state.player.maxHp;
    state.player.qi = state.player.maxQi;
    state.player.x = map.spawn.x;
    state.player.y = map.spawn.y;
    state.player.isDead = false;
    showToast('Ngươi đã luân hồi tại điểm hồi phục');
  }
}

function drawBackground(map) {
  ctx.fillStyle = map.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < map.height; y += 80) {
    for (let x = 0; x < map.width; x += 80) {
      const sx = x - state.camera.x;
      const sy = y - state.camera.y;
      ctx.fillStyle = (Math.floor(x / 80) + Math.floor(y / 80)) % 2 === 0 ? map.grass : map.grass + 'bb';
      ctx.fillRect(sx, sy, 80, 80);
    }
  }

  ctx.fillStyle = map.path;
  for (let i = 0; i < 6; i++) {
    const pathY = 540 + i * 240;
    ctx.fillRect(-state.camera.x + 200, -state.camera.y + pathY, map.width, 40);
  }
}

function drawObstacles(map) {
  ctx.fillStyle = 'rgba(27, 19, 16, 0.7)';
  for (const wall of map.obstacles) {
    ctx.fillRect(wall.x - state.camera.x, wall.y - state.camera.y, wall.w, wall.h);
  }
}

function drawNpc(npc) {
  const x = npc.x - state.camera.x;
  const y = npc.y - state.camera.y;
  ctx.fillStyle = npc.color;
  ctx.beginPath();
  ctx.arc(x + 20, y + 20, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = '12px sans-serif';
  ctx.fillText(npc.name, x - 18, y - 8);
}

function drawMonster(monster) {
  const x = monster.x - state.camera.x;
  const y = monster.y - state.camera.y;
  ctx.fillStyle = monster.color;
  ctx.beginPath();
  ctx.arc(x + 18, y + 18, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111';
  ctx.fillRect(x - 16, y - 8, 70, 6);
  ctx.fillStyle = '#ff4d4d';
  ctx.fillRect(x - 16, y - 8, (monster.health / monster.maxHealth) * 70, 6);
}

function drawPlayer() {
  const p = state.player;
  const x = p.x - state.camera.x;
  const y = p.y - state.camera.y;

  ctx.fillStyle = '#f1f0c2';
  ctx.beginPath();
  ctx.roundRect(x, y, p.width, p.height, 8);
  ctx.fill();

  ctx.fillStyle = '#2d6aa8';
  const dirX = p.dirX || 0;
  const dirY = p.dirY || 1;
  ctx.fillRect(x + p.width / 2 - 3, y + p.height - 2, 6, 10);
  ctx.fillStyle = '#d8e7ff';
  ctx.fillRect(x + p.width / 2 - 2, y + 4, 4, 10);

  if (p.attackTimer > 0) {
    ctx.strokeStyle = '#ffe67d';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + p.width / 2 + dirX * 18, y + p.height / 2 + dirY * 18, 28, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawWarps(map) {
  for (const warp of map.warps) {
    const x = warp.x - state.camera.x;
    const y = warp.y - state.camera.y;
    ctx.fillStyle = 'rgba(112, 198, 255, 0.38)';
    ctx.fillRect(x, y, warp.w, warp.h);
    ctx.fillStyle = '#def5ff';
    ctx.font = '12px sans-serif';
    ctx.fillText(warp.label, x + 10, y + 22);
  }
}

function drawMiniLegend() {
  const map = getCurrentMap();
  ctx.fillStyle = 'rgba(10,16,20,0.65)';
  ctx.fillRect(canvas.width - 160, 16, 140, 74);
  ctx.strokeStyle = 'rgba(160,200,255,0.5)';
  ctx.strokeRect(canvas.width - 160, 16, 140, 74);
  ctx.fillStyle = '#fff';
  ctx.font = '12px sans-serif';
  ctx.fillText(`${map.name}`, canvas.width - 146, 36);
  ctx.fillText(`Tu vi: ${state.player.tuvi}`, canvas.width - 146, 56);
  ctx.fillText(`Linh thạch: ${state.player.money}`, canvas.width - 146, 76);
}

function render() {
  const map = getCurrentMap();
  drawBackground(map);
  drawWarps(map);
  drawObstacles(map);

  for (const npc of map.npcs) drawNpc(npc);
  for (const monster of map.monsters) drawMonster(monster);
  drawPlayer();
  drawMiniLegend();
}

function gainCultivation(value) {
  if (!state.player) return;
  state.player.tuvi = clamp(state.player.tuvi + value, 0, 999);
  state.player.qi = clamp(state.player.qi + value * 0.5, 0, state.player.maxQi);
  state.player.xp += value;
  const info = getRealmInfo(state.player.tuvi);
  state.player.realm = info.realm;
  state.player.realmStage = info.stage;
  if (state.player.xp > 100) {
    state.player.xp = 0;
    state.player.hp = state.player.maxHp;
  }
  updateHud();
}

function ensureInventoryItemById(itemId) {
  let item = state.player.inventory.find((entry) => entry.id === itemId);
  if (!item) {
    item = { id: itemId, name: 'Vật phẩm', type: 'misc', quantity: 0, rarity: 'Thường', description: 'Vật phẩm chưa được khởi tạo' };
    state.player.inventory.push(item);
  }
  return item;
}

function useInventoryItem(itemId) {
  const item = ensureInventoryItemById(itemId);
  if (!item || item.quantity <= 0) {
    showToast('Không đủ số lượng vật phẩm');
    return;
  }

  if (item.type === 'potion') {
    state.player.hp = clamp(state.player.hp + 30, 0, state.player.maxHp);
    item.quantity -= 1;
    showToast('Dùng đan dược: hồi phục sinh lực');
  } else if (item.type === 'herb') {
    state.player.qi = clamp(state.player.qi + 22, 0, state.player.maxQi);
    item.quantity -= 1;
    showToast('Dùng linh thảo: hấp thu linh lực');
  } else {
    showToast('Vật phẩm không thể dùng ngay');
  }

  if (item.quantity <= 0) {
    state.player.inventory = state.player.inventory.filter((entry) => entry.id !== itemId || entry.type !== 'currency');
  }
  updateHud();
}

function addInventoryItem(itemId, amount = 1) {
  const existing = ensureInventoryItemById(itemId);
  existing.quantity = (existing.quantity || 0) + amount;
  if (existing.quantity <= 0) {
    state.player.inventory = state.player.inventory.filter((entry) => entry.id !== itemId);
  }
}

function buyItem(itemId) {
  const item = SHOP_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return;
  if (state.player.money < item.price) {
    showToast('Không đủ linh thạch');
    return;
  }

  state.player.money -= item.price;
  const inventoryItem = ensureInventoryItemById(item.id);
  inventoryItem.name = item.name;
  inventoryItem.type = item.type;
  inventoryItem.rarity = item.rarity;
  inventoryItem.description = item.description;
  inventoryItem.quantity = (inventoryItem.quantity || 0) + 1;
  showToast(`Mua ${item.name} thành công`);
  updateHud();
}

function renderProfilePanel() {
  const p = state.player;
  const info = getRealmInfo(p.tuvi);
  hud.windowTitle.textContent = 'Nhân vật';
  hud.panelContent.innerHTML = `
    <div class="panel-grid">
      <div class="info-card">
        <h4>Thông tin cơ bản</h4>
        <div class="info-list">
          <span><b>Tên</b><em>${p.name}</em></span>
          <span><b>Linh căn</b><em>${p.element}</em></span>
          <span><b>Tuổi thọ</b><em>${p.lifespan}</em></span>
          <span><b>Danh hiệu</b><em>${p.title}</em></span>
        </div>
      </div>
      <div class="info-card">
        <h4>Tu luyện</h4>
        <div class="info-list">
          <span><b>Cảnh giới</b><em>${info.realm}</em></span>
          <span><b>Giai đoạn</b><em>${info.stage}</em></span>
          <span><b>Tu vi</b><em>${p.tuvi}</em></span>
          <span><b>Công pháp</b><em>${p.cultivation}</em></span>
        </div>
      </div>
    </div>
    <div class="action-box">
      <button class="window-btn" id="meditateBtn">Ngồi thiền hấp thu linh khí</button>
      <button class="window-btn" id="advanceBtn">Đột phá cảnh giới</button>
    </div>
  `;

  document.getElementById('meditateBtn').addEventListener('click', () => {
    gainCultivation(12);
    showToast('Ngồi thiền hấp thu linh khí');
  });

  document.getElementById('advanceBtn').addEventListener('click', () => {
    if (state.player.tuvi >= 150 && state.player.tuvi < 999) {
      state.player.tuvi = Math.min(state.player.tuvi + 30, 999);
      state.player.qi = state.player.maxQi;
      showToast('Đột phá thành công, cảnh giới tăng lên');
      updateHud();
    } else {
      showToast('Tu vi chưa đạt điều kiện đột phá');
    }
  });
}

function renderCultivationPanel() {
  const p = state.player;
  hud.windowTitle.textContent = 'Tu luyện';
  hud.panelContent.innerHTML = `
    <div class="panel-grid">
      <div class="info-card">
        <h4>Thông số</h4>
        <div class="info-list">
          <span><b>Pháp lực</b><em>${p.power}</em></span>
          <span><b>Thần thức</b><em>${p.divineSense}</em></span>
          <span><b>Độ tinh thuần</b><em>${p.purity}%</em></span>
          <span><b>Sức mạnh</b><em>${p.strength}</em></span>
          <span><b>Phòng ngự</b><em>${p.defense}</em></span>
        </div>
      </div>
      <div class="info-card">
        <h4>Trạng thái</h4>
        <div class="info-list">
          <span><b>Cảnh giới</b><em>${p.realm}</em></span>
          <span><b>Giai đoạn</b><em>${p.realmStage}</em></span>
          <span><b>Tu vi</b><em>${p.tuvi}</em></span>
          <span><b>Linh lực</b><em>${p.qi}/${p.maxQi}</em></span>
          <span><b>Danh tiếng</b><em>${p.reputation}</em></span>
        </div>
      </div>
    </div>
    <div class="action-box">
      <button class="window-btn" id="cultivateBtn">Tu luyện bằng công pháp</button>
      <button class="window-btn" id="potionBtn">Dùng đan dược</button>
      <button class="window-btn" id="finishTaskBtn">Hoàn thành nhiệm vụ</button>
    </div>
  `;

  document.getElementById('cultivateBtn').addEventListener('click', () => {
    gainCultivation(15);
    showToast('Tu luyện công pháp thành công');
  });

  document.getElementById('potionBtn').addEventListener('click', () => {
    const potion = state.player.inventory.find((item) => item.id === 'healing-potion');
    if (!potion || potion.quantity <= 0) {
      showToast('Không có đan dược để dùng');
      return;
    }
    useInventoryItem('healing-potion');
    gainCultivation(10);
  });

  document.getElementById('finishTaskBtn').addEventListener('click', () => {
    gainCultivation(20);
    state.player.money += 20;
    state.player.reputation += 5;
    showToast('Nhiệm vụ hoàn thành: +20 tu vi, +20 linh thạch');
  });
}

function renderInventoryPanel() {
  hud.windowTitle.textContent = 'Túi đồ';
  const items = state.player.inventory;
  hud.panelContent.innerHTML = `
    <div class="item-grid">
      ${items.map((item) => `
        <div class="inventory-item">
          <strong>${item.name}</strong>
          <span>Phẩm cấp: ${item.rarity}</span>
          <span>Số lượng: ${item.quantity}</span>
          <button class="item-btn" data-item-id="${item.id}">Sử dụng</button>
        </div>
      `).join('') || '<div class="inventory-item"><strong>Không có vật phẩm</strong></div>'}
    </div>
  `;

  for (const btn of document.querySelectorAll('[data-item-id]')) {
    btn.addEventListener('click', () => useInventoryItem(btn.dataset.itemId));
  }
}

function renderShopPanel() {
  hud.windowTitle.textContent = 'Cửa hàng';
  hud.panelContent.innerHTML = `
    <div class="shop-grid">
      ${SHOP_ITEMS.map((item) => `
        <div class="shop-item">
          <strong>${item.name}</strong>
          <span>Phẩm cấp: ${item.rarity}</span>
          <span>Giá: ${item.price} linh thạch</span>
          <span>${item.description}</span>
          <button class="shop-btn" data-shop-id="${item.id}">Mua</button>
        </div>
      `).join('')}
    </div>
  `;

  for (const btn of document.querySelectorAll('[data-shop-id]')) {
    btn.addEventListener('click', () => buyItem(btn.dataset.shopId));
  }
}

function openPanel(panelName) {
  state.activePanel = panelName;
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.panel === panelName);
  });

  hud.modalPanel.classList.remove('hidden');
  if (panelName === 'profile') renderProfilePanel();
  if (panelName === 'cultivation') renderCultivationPanel();
  if (panelName === 'inventory') renderInventoryPanel();
  if (panelName === 'shop') renderShopPanel();
}

function closePanel() {
  hud.modalPanel.classList.add('hidden');
}

function bindKeyEvents() {
  window.addEventListener('keydown', (event) => {
    state.keys[event.code] = true;
    if (event.code === 'Space') {
      event.preventDefault();
      attack();
    }
    if (event.code === 'KeyJ') {
      attack();
    }
    if (event.code === 'KeyK') {
      useSkill();
    }
    if (event.code === 'KeyE') {
      tryInteract();
    }
    if (event.code === 'KeyP') {
      openPanel('profile');
    }
    if (event.code === 'KeyT') {
      openPanel('cultivation');
    }
    if (event.code === 'KeyI') {
      openPanel('inventory');
    }
    if (event.code === 'KeyB') {
      openPanel('shop');
    }
  });

  window.addEventListener('keyup', (event) => {
    state.keys[event.code] = false;
  });
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function bindTouchControls() {
  const padRect = movePad.getBoundingClientRect();
  let padPointerId = null;

  movePad.addEventListener('pointerdown', (event) => {
    padPointerId = event.pointerId;
    event.preventDefault();
    movePad.setPointerCapture(padPointerId);
    updateStickFromPointer(event, padRect);
  });

  movePad.addEventListener('pointermove', (event) => {
    if (padPointerId !== event.pointerId) return;
    event.preventDefault();
    updateStickFromPointer(event, padRect);
  });

  movePad.addEventListener('pointerup', (event) => {
    if (padPointerId !== null && event.pointerId === padPointerId) {
      padPointerId = null;
    }
    state.touch.active = false;
    state.touch.dx = 0;
    state.touch.dy = 0;
    stick.style.setProperty('--dx', '0px');
    stick.style.setProperty('--dy', '0px');
  });

  attackBtn.addEventListener('click', attack);
  skillBtn.addEventListener('click', useSkill);
  interactBtn.addEventListener('click', tryInteract);
  hud.closeDialog.addEventListener('click', closeDialog);
  hud.dialogActionBtn.addEventListener('click', handleDialogAction);
  hud.saveBtn.addEventListener('click', saveGame);
  hud.closeWindowBtn.addEventListener('click', closePanel);

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => openPanel(btn.dataset.panel));
  });

  function updateStickFromPointer(event, rect) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const limit = 30;
    const length = Math.hypot(dx, dy);
    const clampedX = length > limit ? (dx / length) * limit : dx;
    const clampedY = length > limit ? (dy / length) * limit : dy;
    stick.style.setProperty('--dx', `${clampedX}px`);
    stick.style.setProperty('--dy', `${clampedY}px`);
    state.touch.dx = clamp(clampedX / 30, -1, 1);
    state.touch.dy = clamp(clampedY / 30, -1, 1);
    state.touch.active = true;
  }
}

function update(dt) {
  if (!state.player) return;

  state.time += dt;
  state.player.attackTimer = Math.max(0, state.player.attackTimer - dt);
  state.player.skillTimer = Math.max(0, state.player.skillTimer - dt);

  handleMovement(dt);
  updateMonsters(dt);
  updateHud();

  const map = getCurrentMap();
  if (state.ui.questStage === 1 && map.name === 'Rừng Huyền Sâm' && map.monsters.length === 0) {
    state.ui.questStage = 2;
    showToast('Đã hoàn thành mục tiêu săn quái. Hãy quay về thành!');
    updateHud();
  }
}

function loop(ts) {
  const last = loop.last || ts;
  const dt = Math.min((ts - last) / 1000, 0.033);
  loop.last = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

function initGame() {
  resizeCanvas();
  const hasSave = loadGame();
  if (!hasSave) {
    startModal.classList.add('active');
    state.player = makePlayer('Linh Tử', 'Ngũ Hành');
  }

  if (state.player) {
    state.currentMap = worldMaps[state.currentMap] ? state.currentMap : 'town';
    updateHud();
    centerCameraOnPlayer();
  }

  bindKeyEvents();
  bindTouchControls();
  openPanel('profile');
  closePanel();
  window.addEventListener('resize', resizeCanvas);
  requestAnimationFrame(loop);
}

startBtn.addEventListener('click', () => {
  setPlayerFromModal();
  centerCameraOnPlayer();
});

initGame();
