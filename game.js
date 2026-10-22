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
  saveBtn: document.getElementById('saveBtn')
};

const movePad = document.getElementById('movePad');
const stick = document.getElementById('stick');
const attackBtn = document.getElementById('attackBtn');
const skillBtn = document.getElementById('skillBtn');
const interactBtn = document.getElementById('interactBtn');

const SAVE_KEY = 'thanh-ly-son-save-v1';
const MAP_SIZE = 2200;

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
  attackCooldown: 0,
  skillCooldown: 0,
  saveCooldown: 0,
  player: null,
  camera: { x: 0, y: 0 },
  ahead: 0
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function showToast(message) {
  hud.toast.textContent = message;
  hud.toast.classList.remove('hidden');
  clearTimeout(state.toastTimeout);
  state.toastTimeout = setTimeout(() => hud.toast.classList.add('hidden'), 1600);
}

function saveGame() {
  const data = {
    name: state.player.name,
    element: state.player.element,
    map: state.currentMap,
    x: state.player.x,
    y: state.player.y,
    hp: state.player.hp,
    qi: state.player.qi,
    realm: state.player.realm,
    tuvi: state.player.tuvi,
    money: state.player.money,
    xp: state.player.xp,
    questStage: state.ui.questStage
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  showToast('Tiến độ đã được lưu');
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  if (!data) return false;

  state.player = { ...makePlayer(data.name || 'Linh Tử', data.element || 'Ngũ Hành'), ...data };
  state.currentMap = data.map || 'town';
  state.ui.questStage = data.questStage || 0;
  return true;
}

function makePlayer(name, element) {
  const stats = ELEMENTS[element] || ELEMENTS['Ngũ Hành'];
  return {
    name: name.trim() || 'Linh Tử',
    element,
    realm: 'Phàm Nhân',
    tuvi: 0,
    xp: 0,
    money: 32,
    hp: 100,
    maxHp: 100,
    qi: 100,
    maxQi: 100,
    width: 32,
    height: 36,
    speed: 2.6 * stats.speed,
    power: 14 * stats.power,
    x: 1000,
    y: 1950,
    dirX: 0,
    dirY: 0,
    attackTimer: 0,
    skillTimer: 0,
    lastAttackAt: 0,
    lastSkillAt: 0,
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

function normalizeDir(x, y) {
  const mag = Math.hypot(x, y) || 1;
  return { x: x / mag, y: y / mag };
}

function getCurrentMap() {
  return worldMaps[state.currentMap];
}

function rectsIntersect(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function isInsideMap(entity) {
  const map = getCurrentMap();
  return entity.x >= 0 && entity.y >= 0 && entity.x + entity.width <= map.width && entity.y + entity.height <= map.height;
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
  hud.playerName.textContent = p.name;
  hud.playerRealm.textContent = `${p.realm} • ${p.element}`;
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
  const baseText = npc.dialog[0];
  hud.dialogText.textContent = baseText;
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
    showToast('Hệ thống cửa hàng sẽ được tích hợp trong giai đoạn sau');
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
      showToast(`${monster.id} bị đánh`);
      if (monster.health <= 0) {
        const reward = Math.floor(Math.random() * 16) + 8;
        p.money += reward;
        p.xp += 15;
        p.qi = clamp(p.qi + 8, 0, p.maxQi);
        map.monsters = map.monsters.filter(m => m.id !== monster.id);
        showToast(`Giết quái: +${reward} linh thạch`);
        if (p.xp >= 100) {
          p.tuvi += 1;
          p.xp = 0;
          p.hp = p.maxHp;
          p.qi = p.maxQi;
        }
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
  });

  window.addEventListener('keyup', (event) => {
    state.keys[event.code] = false;
  });
}

function bindTouchControls() {
  const padRect = movePad.getBoundingClientRect();
  let padPointerId = null;

  movePad.addEventListener('pointerdown', (event) => {
    padPointerId = event.pointerId;
    movePad.setPointerCapture(padPointerId);
    updateStickFromPointer(event, padRect);
  });

  movePad.addEventListener('pointermove', (event) => {
    if (padPointerId !== event.pointerId) return;
    updateStickFromPointer(event, padRect);
  });

  movePad.addEventListener('pointerup', () => {
    padPointerId = null;
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

function initGame() {
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
  requestAnimationFrame(loop);
}

startBtn.addEventListener('click', () => {
  setPlayerFromModal();
  centerCameraOnPlayer();
});

initGame();
