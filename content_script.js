// content_script.js
// LESSON: One file controls ALL menus. We switch by changing currentPanel.innerHTML
// HTML content lives in HTMLs/*.html and is loaded via chrome.runtime.getURL + fetch.

console.log('%c🐧 PangLive FULL GUI v0.2 — all your menus connected!', 'color:#4CAF50; font-weight:bold; font-size:16px');

let settingsState = {
  penguinOnly: false,
  spectator: false,
  manualApprove: false,
  dangerous: false,
  maxUsers: "2"
};

// ── HELPERS ──────────────────────────────────────────────────────────────────

/** Fetch an HTML snippet from the extension's HTMLs/ folder. */
async function loadMenu(filename) {
  const url = chrome.runtime.getURL(`HTMLs/${filename}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${filename}: ${response.status}`);
  return response.text();
}

/** Inject scrollbar styles once so the panel scrollbar is thin and unobtrusive. */
function injectScrollbarStyles() {
  if (document.getElementById('panglive-scrollbar-styles')) return;
  const style = document.createElement('style');
  style.id = 'panglive-scrollbar-styles';
  style.textContent = `
    #panglive-panel::-webkit-scrollbar {
      width: 4px;
    }
    #panglive-panel::-webkit-scrollbar-track {
      background: transparent;
    }
    #panglive-panel::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
    #panglive-panel::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.4);
    }
  `;
  document.head.appendChild(style);
}

/** Open the panel if closed, close it if open. Used only by the toolbar button. */
function togglePanel() {
  if (currentPanel) {
    currentPanel.remove();
    currentPanel = null;
    return;
  }
  showMainMenu();
}

/** Create the panel shell if it doesn't exist yet. Always safe to call before rendering. */
function ensurePanel() {
  if (currentPanel) return;
  injectScrollbarStyles();
  currentPanel = document.createElement('div');
  currentPanel.id = 'panglive-panel';
  currentPanel.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 320px; height: 520px; background: #5bb6b6; border: 12px solid #111;
    border-radius: 40px; z-index: 9999999; font-family: sans-serif;
    color: #111; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    overflow-x: hidden; overflow-y: scroll; padding-bottom: 40px;
    overflow-wrap: break-word; word-break: break-word;
  `;
  document.body.appendChild(currentPanel);
}

// ── PANEL REFERENCE ───────────────────────────────────────────────────────────

let currentPanel = null;

// ── MENUS ─────────────────────────────────────────────────────────────────────

async function showMainMenu() {
  ensurePanel();
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Main_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Main Menu.<br>${e.message}</p>`;
    return;
  }

  document.getElementById('host-room-btn').addEventListener('click', showCreateRoom);
  document.getElementById('join-room-btn').addEventListener('click', showJoinMenu);
  document.getElementById('settings-btn').addEventListener('click', showSettingsMenu);
}

async function showCreateRoom() {
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Create_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Create Menu.<br>${e.message}</p>`;
    return;
  }

  document.getElementById('return-from-create').addEventListener('click', showMainMenu);
  document.getElementById('create-room-btn').addEventListener('click', () => {
    alert('Room created! (Next step: real hosting)');
    showHostMenu();
  });
}

async function showHostMenu() {
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Host_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Host Menu.<br>${e.message}</p>`;
    return;
  }

  document.getElementById('return-from-host').addEventListener('click', showMainMenu);
  document.getElementById('close-room-btn').addEventListener('click', () => {
    alert('Room closed!');
    showMainMenu();
  });
  document.getElementById('toggle-joining-btn').addEventListener('click', () => {
    alert('Joining toggled! (Next step: real coordinator call)');
  });
}

async function showJoinMenu() {
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Join_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Join Menu.<br>${e.message}</p>`;
    return;
  }

  document.getElementById('return-from-join').addEventListener('click', showMainMenu);
  document.getElementById('join-room-btn').addEventListener('click', () => {
    alert('Joining room! (Next step: real join logic)');
    showRoomMenu();
  });
}

async function showRoomMenu() {
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Room_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Room Menu.<br>${e.message}</p>`;
    return;
  }

  document.getElementById('leave-room-btn').addEventListener('click', () => {
    alert('Left room!');
    showMainMenu();
  });
  document.getElementById('report-room-btn').addEventListener('click', () => {
    alert('Room reported! (Next step: real report logic)');
  });
}

async function showSettingsMenu() {
  currentPanel.innerHTML = `<p style="text-align:center; padding-top: 20px;">Loading…</p>`;

  try {
    currentPanel.innerHTML = await loadMenu('Settings_Menu.html');
  } catch (e) {
    currentPanel.innerHTML = `<p style="color:red; padding:20px;">Error loading Settings Menu.<br>${e.message}</p>`;
    return;
  }

  // Restore saved state into the form
  const maxUsersInput   = document.getElementById('max-users-input');
  const penguinOnlyCb   = document.getElementById('penguin-only-cb');
  const spectatorCb     = document.getElementById('spectator-cb');
  const manualApproveCb = document.getElementById('manual-approve-cb');
  const dangerousCb     = document.getElementById('dangerous-cb');

  maxUsersInput.value       = settingsState.maxUsers;
  penguinOnlyCb.checked     = settingsState.penguinOnly;
  spectatorCb.checked       = settingsState.spectator;
  manualApproveCb.checked   = settingsState.manualApprove;
  dangerousCb.checked       = settingsState.dangerous;

  // Save state on any change
  maxUsersInput.addEventListener('input',   () => { settingsState.maxUsers      = maxUsersInput.value; });
  penguinOnlyCb.addEventListener('change',  () => { settingsState.penguinOnly   = penguinOnlyCb.checked; });
  spectatorCb.addEventListener('change',    () => { settingsState.spectator     = spectatorCb.checked; });
  manualApproveCb.addEventListener('change',() => { settingsState.manualApprove = manualApproveCb.checked; });
  dangerousCb.addEventListener('change',    () => { settingsState.dangerous     = dangerousCb.checked; });

  document.getElementById('return-from-settings').addEventListener('click', showMainMenu);
}

// ── LEFT BUTTON ───────────────────────────────────────────────────────────────

function addLeftPangButton() {
  if (document.getElementById('panglive-left-btn')) return true;

  const uploadElement = Array.from(document.querySelectorAll('button, div, span, a'))
    .find(el => el.textContent && el.textContent.trim() === 'Upload');

  if (!uploadElement) return false;

  const btn = document.createElement('button');
  btn.id = 'panglive-left-btn';
  btn.style.cssText = `background:#4CAF50; color:white; border:none; padding:5px 14px; border-radius:6px; font-weight:bold; font-size:13px; cursor:pointer; margin-left:10px;`;
  btn.innerHTML = `🐧 PangLive`;
  uploadElement.parentElement.insertBefore(btn, uploadElement.nextSibling);
  btn.addEventListener('click', togglePanel);

  return true;
}

// ── RIGHT ONLINE WIDGET ───────────────────────────────────────────────────────

function addRightOnlineWidget() {
  if (document.getElementById('panglive-right-widget')) return true;

  const widget = document.createElement('div');
  widget.id = 'panglive-right-widget';
  widget.style.cssText = `position:absolute; top:6px; right:260px; z-index:999999; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1); color:white; padding:4px 12px; border-radius:20px; font-size:13px; font-weight:600;`;
  widget.innerHTML = `online: <span style="font-size:18px;">👤👤👤</span> <button id="pang-chat-btn" style="background:none;border:none;font-size:20px;color:white;">💬</button>`;

  const header = document.querySelector('header') || document.querySelector('[class*="menu-bar"]') || document.body;
  header.appendChild(widget);

  document.getElementById('pang-chat-btn').addEventListener('click', () => alert('💬 Chat coming soon!'));
  return true;
}

// ── INIT ──────────────────────────────────────────────────────────────────────

let attempts = 0;
const interval = setInterval(() => {
  attempts++;
  const leftDone  = addLeftPangButton();
  const rightDone = addRightOnlineWidget();
  if ((leftDone && rightDone) || attempts > 30) clearInterval(interval);
}, 500);