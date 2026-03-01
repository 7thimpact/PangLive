// content_script.js
// LESSON: One file controls ALL menus. We switch by changing currentPanel.innerHTML

console.log('%c🐧 PangLive FULL GUI v0.2 — all your menus connected!', 'color:#4CAF50; font-weight:bold; font-size:16px');
let settingsState = {
  penguinOnly: false,
  spectator: false,
  manualApprove: false,
  dangerous: false,
  maxUsers: "2"
};

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
  btn.addEventListener('click', showMainMenu);

  return true;
}

let currentPanel = null;

// ── MAIN MENU (your Main_Menu.html) ──
function showMainMenu() {
  if (currentPanel) { currentPanel.remove(); currentPanel = null; return; }

  currentPanel = document.createElement('div');
  currentPanel.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 320px; height: 520px; background: #5bb6b6; border: 12px solid #111;
    border-radius: 40px; overflow: hidden; z-index: 9999999; font-family: sans-serif;
    color: #111; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    overflow-y: auto;
    padding-bottom: 40px;
  `;

  currentPanel.innerHTML = `
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">&nbsp;</div>
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">PangLive <span style="font-size: 14px; opacity: 0.7;">V.0.1.0</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><span style="font-size: 12px; opacity: 0.7;">Alpha Channel</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold;"><hr /></div>
    <p style="text-align: center;"><button id="host-room-btn" type="button">Host Room</button></p>
    <p style="text-align: center;"><button id="join-room-btn" type="button">Join Room</button></p>
    <p style="text-align: center;"><button id="settings-btn" type="button">Settings</button></p>
    <hr />
    <p style="text-align: left;">&nbsp;<span style="padding: 0px 20px;">💵 Donate to PenguinMod</span>&nbsp;</p>
    <p style="text-align: left;"><span style="padding: 0px 24.5px;">☕ Donate to 7thImpact</span></p>
    <hr />
    <p style="padding: 0px 20px; text-align: left;">GitHub Repository</p>
    <p style="padding: 0px 20px; text-align: left;">Support Server</p>
    <p style="padding: 0px 20px; text-align: left;">Uptime Tracker</p>
    <p style="padding: 0px 20px; text-align: left;">Advanced Wiki</p>
    <p style="padding: 0px 20px; text-align: left;">Privacy Policy</p>
    <hr />
    <p style="padding: 0px 20px; text-align: left;">Coordinator Ping: [PING]</p>
    <p style="padding: 0px 20px; text-align: left;">Coordinator Up? [TRUE/FALSE]</p>
  `;

  document.body.appendChild(currentPanel);

  // Wire buttons
  document.getElementById('host-room-btn').addEventListener('click', showCreateRoom);
  document.getElementById('join-room-btn').addEventListener('click', showJoinMenu);
  document.getElementById('settings-btn').addEventListener('click', showSettingsMenu);
}

// ── CREATE ROOM (your Create_Menu.html) ──
function showCreateRoom() {
  currentPanel.innerHTML = `
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">&nbsp;</div>
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">PangLive <span style="font-size: 14px; opacity: 0.7;">V.0.1.0</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><span style="font-size: 12px; opacity: 0.7;">Alpha Channel</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><hr style="font-size: 22px;" /><strong><em>Create Room</em></strong></div>
    <p style="text-align: center;"><button id="return-from-create" type="button">Return</button></p>
    <hr />
    <p><label for="username">Username:</label> <input id="username" name="username" type="text" /></p>
    <p><label for="password">Set Room Password:</label> <input id="password" name="password" type="text" maxlength="32" /></p>
    <ul><li><span style="font-size: 12px;">Remember, this password is the one thing (besides manual joins) stopping other people from accessing your IP.</span></li></ul>
    <p style="text-align: left;"><button id="create-room-btn" type="button">Create Room</button></p>
    <hr />
    <p>Coordinator Up? [TRUE/FALSE]<br />Coordinator Ping [PING]</p>
    <p style="text-align: left;">&nbsp;<span style="padding: 0px 20px;">💵 Donate to PenguinMod</span>&nbsp;</p>
    <p style="text-align: left;"><span style="padding: 0px 24.5px;">☕ Donate to 7thImpact</span></p>
    <hr />
    <p style="padding: 0px 20px; text-align: left;">GitHub Repository</p>
    <p style="padding: 0px 20px; text-align: left;">Support Server</p>
    <p style="padding: 0px 20px; text-align: left;">Privacy Policy</p>
  `;

  document.getElementById('return-from-create').addEventListener('click', showMainMenu);
  document.getElementById('create-room-btn').addEventListener('click', () => {
    alert('Room created! (Next step: real hosting)');
    showHostMenu(); // goes to Host Menu after create
  });
}

// ── HOST MENU (your Host_Menu.html) ──
function showHostMenu() {
  currentPanel.innerHTML = "HTML Extras\Create_Menu.html";

  document.getElementById('return-from-host').addEventListener('click', showMainMenu);
  document.getElementById('close-room-btn').addEventListener('click', () => {
    alert('Room closed!');
    showMainMenu();
  });
}

// ── JOIN MENU (your Join_Menu.html) ──
function showJoinMenu() {
  currentPanel.innerHTML = `
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">&nbsp;</div>
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">PangLive <span style="font-size: 14px; opacity: 0.7;">V.0.1.0</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><span style="font-size: 12px; opacity: 0.7;">Alpha Channel</span></div>
    <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><hr /><em><strong>Join Menu</strong></em></div>
    <p style="text-align: center;"><button id="return-from-join" type="button">Return</button></p>
    <hr />
    <p><label for="username">Username:</label> <input id="username" name="username" type="text" /></p>
    <p><label for="roomcode">Room Code:</label> <input id="roomcode" name="roomcode" type="text" /></p>
    <p><label for="password">Room Password:</label> <input id="password" name="password" type="text" /></p>
    <hr />
    <p>Coordinator Up? [TRUE/FALSE]<br />Coordinator Ping [PING]</p>
    <hr />
    <p style="text-align: left;">&nbsp;<span style="padding: 0px 20px;">💵 Donate to PenguinMod</span>&nbsp;</p>
    <p style="text-align: left;"><span style="padding: 0px 24.5px;">☕ Donate to 7thImpact</span></p>
    <hr />
    <p style="padding: 0px 20px; text-align: left;">GitHub Repository</p>
    <p style="padding: 0px 20px; text-align: left;">Support Server</p>
    <p style="padding: 0px 20px; text-align: left;">Privacy Policy</p>
  `;

  document.getElementById('return-from-join').addEventListener('click', showMainMenu);
}

// ── SETTINGS MENU (your Settings_Menu.html) ──
function showSettingsMenu() {
  currentPanel.innerHTML = `
        <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">&nbsp;</div>
        <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">PangLive <span style="font-size: 14px; opacity: 0.7;">V.0.1.0</span></div>
        <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><span style="font-size: 12px; opacity: 0.7;">Alpha Channel</span></div>
        <div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><hr style="font-size: 22px;" /><em><strong>Settings Menu</strong></em></div>
        <p style="text-align: center;"><button id="return-from-settings" type="button">Return</button></p>
        <hr />
        <p style="text-align: left; padding-left: 30px;"><label for="item"> Max Users Per Session<br /><span style="font-size: 12px;">(2-4 Users) <span style="color: #ff0000;">(Enable Dangerous Settings for 2-10)</span></span></label></p>
        <p style="text-align: left; padding-left: 30px;"><input id="item" name="item" type="text" /></p>
        <p style="text-align: left;">&nbsp;</p>
        <p style="text-align: left; padding-left: 30px;">&nbsp;<input id="item" name="item" type="checkbox" value="item" />&nbsp;PenguinMod Users Only?</p>
        <ul>
        <li style="text-align: left;"><span style="font-size: 12px;">Only allows signed-in PeguinMod Users to join your room.</span></li>
        </ul>
        <p style="text-align: left; padding-left: 30px;">&nbsp;<input id="item" name="item" type="checkbox" value="item" />&nbsp;Everyone Joins as a Spectator?</p>
        <ul>
        <li style="text-align: left;"><span style="font-size: 12px;">When anyone joins, they won't have editor permissions by default</span></li>
        </ul>
        <p style="text-align: left; padding-left: 30px;">&nbsp;<input id="item" name="item" type="checkbox" value="item" />&nbsp;Manually Approve Joins?</p>
        <ul>
        <li style="text-align: left;"><span style="font-size: 12px;">You have to approve the Username/Nickname of the person joining before they are handed your IP information to join.</span></li>
        </ul>
        <p style="text-align: left; padding-left: 30px;">&nbsp;<input id="item" name="item" type="checkbox" value="item" />&nbsp;Enable Dangerous Settings?</p>
        <ul>
        <li style="text-align: left;"><span style="font-size: 12px;">Let's you push the limits of my silly thingy</span></li>
        </ul>
        <hr />
        <p style="text-align: left;">&nbsp;<span style="padding: 0px 20px;">💵 Donate to PenguinMod</span>&nbsp;</p>
        <p style="text-align: left;"><span style="padding: 0px 24.5px;">☕ Donate to 7thImpact</span></p>
        <hr />
        <p style="padding: 0px 20px; text-align: left;">GitHub Repository</p>
        <p style="padding: 0px 20px; text-align: left;">Support Server</p>
        <p style="padding: 0px 20px; text-align: left;">Privacy Policy</p>
  `;

  document.getElementById('return-from-settings').addEventListener('click', showMainMenu);
}

// Right online widget (unchanged)
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

// Run everything
let attempts = 0;
const interval = setInterval(() => {
  attempts++;
  const leftDone = addLeftPangButton();
  const rightDone = addRightOnlineWidget();
  if ((leftDone && rightDone) || attempts > 30) clearInterval(interval);
}, 500);