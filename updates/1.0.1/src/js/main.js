// FluXOS v1.0.1 - GÜNCELLENMIŞ SÜRÜM
alert('🎉 Tebrikler! FluXOS v1.0.1 başarıyla yüklendi!');
console.log('FluXOS v1.0.1 aktif!');

let windows = {};
let zIndexCounter = 1000;
let draggedWindow = null;
let offsetX = 0;
let offsetY = 0;

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('clock').textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.classList.toggle('active');
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('startMenu');
  const startBtn = document.querySelector('.start-btn');
  if (!menu.contains(e.target) && !startBtn.contains(e.target)) {
    menu.classList.remove('active');
  }
});

function createWindow(id, title, icon, width, height, content) {
  if (windows[id]) {
    focusWindow(id);
    return;
  }

  const windowDiv = document.createElement('div');
  windowDiv.className = 'window active';
  windowDiv.id = 'window-' + id;
  windowDiv.style.width = width + 'px';
  windowDiv.style.height = height + 'px';
  windowDiv.style.top = (Math.random() * 100 + 50) + 'px';
  windowDiv.style.left = (Math.random() * 200 + 100) + 'px';
  windowDiv.style.zIndex = ++zIndexCounter;

  windowDiv.innerHTML = '<div class="window-titlebar" onmousedown="startDrag(event, \'' + id + '\')"><div class="window-title"><span style="font-size: 18px;">' + icon + '</span><span>' + title + '</span></div><div class="window-controls"><button class="window-btn" onclick="minimizeWindow(\'' + id + '\')">─</button><button class="window-btn close" onclick="closeWindow(\'' + id + '\')">✕</button></div></div><div class="window-content" id="content-' + id + '">' + content + '</div>';

  document.getElementById('windowsContainer').appendChild(windowDiv);
  
  windows[id] = {
    element: windowDiv,
    title: title,
    icon: icon,
    minimized: false
  };

  addTaskbarButton(id, title, icon);
  focusWindow(id);
}

function closeWindow(id) {
  if (windows[id]) {
    windows[id].element.remove();
    delete windows[id];
    removeTaskbarButton(id);
  }
}

function minimizeWindow(id) {
  if (windows[id]) {
    windows[id].element.style.display = 'none';
    windows[id].minimized = true;
    const taskbarBtn = document.getElementById('taskbar-' + id);
    if (taskbarBtn) taskbarBtn.classList.remove('active');
  }
}

function focusWindow(id) {
  Object.keys(windows).forEach(wid => {
    windows[wid].element.style.zIndex = 1000;
    const taskbarBtn = document.getElementById('taskbar-' + wid);
    if (taskbarBtn) taskbarBtn.classList.remove('active');
  });
  
  if (windows[id]) {
    windows[id].element.style.zIndex = ++zIndexCounter;
    windows[id].element.style.display = 'flex';
    windows[id].minimized = false;
    const taskbarBtn = document.getElementById('taskbar-' + id);
    if (taskbarBtn) taskbarBtn.classList.add('active');
  }
}

function startDrag(e, id) {
  draggedWindow = windows[id].element;
  const rect = draggedWindow.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  focusWindow(id);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
  if (draggedWindow) {
    draggedWindow.style.left = (e.clientX - offsetX) + 'px';
    draggedWindow.style.top = (e.clientY - offsetY) + 'px';
  }
}

function stopDrag() {
  draggedWindow = null;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
}

function addTaskbarButton(id, title, icon) {
  const btn = document.createElement('button');
  btn.className = 'taskbar-app';
  btn.id = 'taskbar-' + id;
  btn.innerHTML = '<span style="font-size: 16px;">' + icon + '</span> ' + title;
  btn.onclick = function() {
    if (windows[id].minimized) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  };
  document.getElementById('taskbarApps').appendChild(btn);
}

function removeTaskbarButton(id) {
  const btn = document.getElementById('taskbar-' + id);
  if (btn) btn.remove();
}

function openApp(appName) {
  switch(appName) {
    case 'notepad': openNotepad(); break;
    case 'calculator': openCalculator(); break;
    case 'paint': openPaint(); break;
    case 'browser': openBrowser(); break;
    case 'terminal': openTerminal(); break;
    case 'system': openSystemInfo(); break;
    case 'settings': openSettings(); break;
  }
}

function openNotepad() {
  const content = '<textarea id="notepad-text" style="height: calc(100% - 50px); margin-bottom: 10px;" placeholder="v1.0.1 - Güncellenmiş Not Defteri!"></textarea><button class="btn" onclick="saveNotepad()">💾 Kaydet</button><button class="btn btn-secondary" onclick="loadNotepad()">📂 Aç</button><button class="btn btn-danger" onclick="document.getElementById(\'notepad-text\').value = \'\'">🗑️ Temizle</button>';
  createWindow('notepad', 'Not Defteri v1.0.1', '📝', 600, 500, content);
}

async function saveNotepad() {
  const text = document.getElementById('notepad-text').value;
  const result = await api.writeFile('notepad.txt', text);
  alert(result.success ? '✅ Kaydedildi!' : '❌ Hata: ' + result.error);
}

async function loadNotepad() {
  const result = await api.readFile('notepad.txt');
  if (result.success) {
    document.getElementById('notepad-text').value = result.data;
    alert('✅ Dosya yüklendi!');
  } else {
    alert('❌ Dosya bulunamadı!');
  }
}

function openCalculator() {
  const content = '<div class="calc-display" id="calc-display">0</div><div class="calc-grid"><button class="calc-btn" onclick="calcClear()">C</button><button class="calc-btn" onclick="calcBackspace()">⌫</button><button class="calc-btn operator" onclick="calcInput(\'/\')">/</button><button class="calc-btn operator" onclick="calcInput(\'*\')">×</button><button class="calc-btn" onclick="calcInput(\'7\')">7</button><button class="calc-btn" onclick="calcInput(\'8\')">8</button><button class="calc-btn" onclick="calcInput(\'9\')">9</button><button class="calc-btn operator" onclick="calcInput(\'-\')">-</button><button class="calc-btn" onclick="calcInput(\'4\')">4</button><button class="calc-btn" onclick="calcInput(\'5\')">5</button><button class="calc-btn" onclick="calcInput(\'6\')">6</button><button class="calc-btn operator" onclick="calcInput(\'+\')">+</button><button class="calc-btn" onclick="calcInput(\'1\')">1</button><button class="calc-btn" onclick="calcInput(\'2\')">2</button><button class="calc-btn" onclick="calcInput(\'3\')">3</button><button class="calc-btn" onclick="calcInput(\'0\')">0</button><button class="calc-btn" onclick="calcInput(\'.\')">.</button><button class="calc-btn equals" onclick="calcEquals()">=</button></div>';
  createWindow('calculator', 'Hesap Makinesi', '🔢', 400, 550, content);
}

let calcExpression = '0';

function calcInput(val) {
  if (calcExpression === '0') calcExpression = '';
  calcExpression += val;
  document.getElementById('calc-display').textContent = calcExpression;
}

function calcClear() {
  calcExpression = '0';
  document.getElementById('calc-display').textContent = '0';
}

function calcBackspace() {
  calcExpression = calcExpression.slice(0, -1) || '0';
  document.getElementById('calc-display').textContent = calcExpression;
}

function calcEquals() {
  try {
    const result = eval(calcExpression.replace('×', '*'));
    calcExpression = String(result);
    document.getElementById('calc-display').textContent = result;
  } catch {
    document.getElementById('calc-display').textContent = 'Hata';
    calcExpression = '0';
  }
}

function openPaint() {
  const content = '<div class="paint-toolbar"><div class="color-box active" style="background: #000;" onclick="selectColor(\'#000\', event)"></div><div class="color-box" style="background: #f00;" onclick="selectColor(\'#f00\', event)"></div><div class="color-box" style="background: #0f0;" onclick="selectColor(\'#0f0\', event)"></div><div class="color-box" style="background: #00f;" onclick="selectColor(\'#00f\', event)"></div><div class="color-box" style="background: #ff0;" onclick="selectColor(\'#ff0\', event)"></div><div class="color-box" style="background: #f0f;" onclick="selectColor(\'#f0f\', event)"></div><div class="color-box" style="background: #0ff;" onclick="selectColor(\'#0ff\', event)"></div><button class="btn btn-secondary" onclick="clearCanvas()">🗑️ Temizle</button></div><canvas id="paint-canvas" width="550" height="400"></canvas>';
  createWindow('paint', 'Paint', '🎨', 600, 550, content);
  setTimeout(initPaint, 100);
}

let paintColor = '#000';
let painting = false;

function selectColor(color, event) {
  paintColor = color;
  document.querySelectorAll('.color-box').forEach(box => box.classList.remove('active'));
  event.target.classList.add('active');
}

function initPaint() {
  const canvas = document.getElementById('paint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.onmousedown = function(e) {
    painting = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  };
  
  canvas.onmousemove = function(e) {
    if (painting) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = paintColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  };
  
  canvas.onmouseup = function() { painting = false; };
  canvas.onmouseleave = function() { painting = false; };
}

function clearCanvas() {
  const canvas = document.getElementById('paint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function openBrowser() {
  const content = '<div style="margin-bottom: 20px;"><h3>🌐 FluXOS Tarayıcı v1.0.1</h3><p style="color: #666; font-size: 13px;">Güncellenmiş tarayıcı!</p></div><div class="url-bar"><input type="text" class="url-input" id="browser-url" placeholder="https://www.google.com" value="https://www.google.com"><button class="btn" onclick="openRealBrowserWindow()">🚀 Yeni Pencerede Aç</button></div><div style="margin: 20px 0;"><h4 style="margin-bottom: 10px;">🔥 Popüler Siteler:</h4><div style="display: flex; gap: 10px; flex-wrap: wrap;"><button class="btn btn-secondary" onclick="quickOpen(\'https://www.google.com\')">🔍 Google</button><button class="btn btn-secondary" onclick="quickOpen(\'https://www.youtube.com\')">📺 YouTube</button><button class="btn btn-secondary" onclick="quickOpen(\'https://www.github.com\')">💻 GitHub</button><button class="btn btn-secondary" onclick="quickOpen(\'https://www.wikipedia.org\')">📚 Wikipedia</button></div></div>';
  createWindow('browser', 'Web Tarayıcı', '🌐', 800, 600, content);
}

function openRealBrowserWindow() {
  const url = document.getElementById('browser-url').value.trim();
  if (!url) {
    alert('❌ Lütfen bir URL girin!');
    return;
  }
  
  let finalUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    finalUrl = 'https://' + url;
  }
  
  api.openRealBrowser(finalUrl);
}

function quickOpen(url) {
  document.getElementById('browser-url').value = url;
  api.openRealBrowser(url);
}

function openTerminal() {
  const content = '<div class="terminal" id="terminal"><div class="terminal-line">FluXOS Terminal v1.0.1 - UPDATED!</div><div class="terminal-line">Komutlar: help, clear, date, echo [text], sysinfo</div><div class="terminal-line" style="margin-top: 10px;"><span class="terminal-prompt">$</span><input type="text" class="terminal-input" id="terminal-input" onkeypress="if(event.key===\'Enter\') runCommand()"></div></div>';
  createWindow('terminal', 'Terminal', '⌨️', 700, 400, content);
  setTimeout(function() {
    const input = document.getElementById('terminal-input');
    if (input) input.focus();
  }, 100);
}

async function runCommand() {
  const input = document.getElementById('terminal-input');
  if (!input) return;
  
  const cmd = input.value.trim();
  const terminal = document.getElementById('terminal');
  
  if (!cmd) return;
  
  terminal.innerHTML += '<div class="terminal-line"><span class="terminal-prompt">$</span> ' + cmd + '</div>';
  
  if (cmd === 'help') {
    terminal.innerHTML += '<div class="terminal-line">Komutlar: help, clear, date, echo [text], sysinfo</div>';
  } else if (cmd === 'clear') {
    terminal.innerHTML = '<div class="terminal-line">FluXOS Terminal v1.0.1</div>';
  } else if (cmd === 'date') {
    terminal.innerHTML += '<div class="terminal-line">' + new Date().toString() + '</div>';
  } else if (cmd.startsWith('echo ')) {
    terminal.innerHTML += '<div class="terminal-line">' + cmd.substring(5) + '</div>';
  } else if (cmd === 'sysinfo') {
    const info = await api.systemInfo();
    terminal.innerHTML += '<div class="terminal-line">Platform: ' + info.platform + ', CPU: ' + info.cpus + ', RAM: ' + info.memory + '</div>';
  } else {
    terminal.innerHTML += '<div class="terminal-line" style="color: #f00;">Bilinmeyen komut.</div>';
  }
  
  terminal.innerHTML += '<div class="terminal-line"><span class="terminal-prompt">$</span> <input type="text" class="terminal-input" id="terminal-input" onkeypress="if(event.key===\'Enter\') runCommand()"></div>';
  terminal.scrollTop = terminal.scrollHeight;
  
  const newInput = document.getElementById('terminal-input');
  if (newInput) newInput.focus();
}

async function openSystemInfo() {
  const info = await api.systemInfo();
  const content = '<h3 style="margin-bottom: 20px;">💻 Sistem Bilgileri</h3><div class="info-grid"><div class="info-card"><div class="info-card-title">İşletim Sistemi</div><div class="info-card-value">' + info.platform + '</div></div><div class="info-card"><div class="info-card-title">CPU</div><div class="info-card-value">' + info.cpus + '</div></div><div class="info-card"><div class="info-card-title">RAM</div><div class="info-card-value">' + info.memory + '</div></div><div class="info-card"><div class="info-card-title">Versiyon</div><div class="info-card-value">1.0.1</div></div></div>';
  createWindow('system', 'Sistem Bilgileri', '💻', 600, 400, content);
}

async function openSettings() {
  const versionInfo = await api.getVersion();
  const content = '<h3>⚙️ Ayarlar</h3><div style="margin: 20px 0; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;"><h4 style="margin: 0;">FluXOS v' + versionInfo.version + '</h4></div><div style="background: white; padding: 20px; border-radius: 12px; border: 2px solid #e0e0e0;"><h4>🔑 Güncelleme Anahtarı</h4><input type="text" id="update-key" placeholder="Anahtar girin" style="width: 100%; margin-bottom: 10px;"><button class="btn" onclick="applyUpdateKey()">🚀 Uygula</button><div id="update-result" style="margin-top: 15px;"></div></div>';
  createWindow('settings', 'Ayarlar', '⚙️', 700, 500, content);
}

function checkUpdates() {
  api.checkForUpdates();
  alert('🔍 Kontrol ediliyor!');
}

async function applyUpdateKey() {
  const key = document.getElementById('update-key').value.trim();
  const resultDiv = document.getElementById('update-result');
  
  if (!key) {
    resultDiv.innerHTML = '<div style="background: #fff3cd; padding: 15px; border-radius: 8px;">⚠️ Anahtar girin!</div>';
    return;
  }
  
  resultDiv.innerHTML = '<div style="background: #d1ecf1; padding: 15px; border-radius: 8px;">⏳ Kontrol ediliyor...</div>';
  
  const result = await api.updateWithKey(key);
  
  if (result.success) {
    resultDiv.innerHTML = '<div style="background: #d4edda; padding: 20px; border-radius: 8px;"><h4>✅ Başarılı!</h4><p>Versiyon: v' + result.version + '</p><button class="btn" onclick="location.reload()">🔄 Yeniden Başlat</button></div>';
  } else {
    resultDiv.innerHTML = '<div style="background: #f8d7da; padding: 15px; border-radius: 8px;">❌ Hata: ' + result.error + '</div>';
  }
}
