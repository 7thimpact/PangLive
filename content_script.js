// content_script.js

/*
Emty Comment space
*/

console.log('%c🐧 PangLive GUI v0.1 — matching your screenshots!', 'color:#4CAF50; font-weight:bold; font-size:16px');

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
  btn.addEventListener('click', showPangLiveMenu);

  return true;
}

// ── THE BIG CYAN MENU (matches your first screenshot) ──
let currentPanel = null;

function showPangLiveMenu() {
  if (currentPanel) { currentPanel.remove(); currentPanel = null; return; }

  currentPanel = document.createElement('div');
  currentPanel.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 520px;
    background: #5bb6b6;
    border: 12px solid #111;
    border-radius: 40px;
    overflow: hidden;
    z-index: 9999999;
    font-family: sans-serif;
    color: #111;
    text-align: center;
  `;

  currentPanel.innerHTML = `
    <div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">&nbsp;</div>
<div style="padding: 0px 20px; font-size: 22px; font-weight: bold; text-align: center;">PangLive <span style="font-size: 14px; opacity: 0.7;">V.0.1.0</span></div>
<div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold; text-align: center;"><span style="font-size: 12px; opacity: 0.7;">Alpha Channel</span></div>
<div style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; font-size: 22px; font-weight: bold;"><hr /></div>
<p style="text-align: center;"><button type="button">Host Room</button></p>
<p style="text-align: center;"><button type="button">Join Room</button></p>
<p style="text-align: center;"><button type="button">Setings</button></p>
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

  // Click handlers
  document.getElementById('host-btn').addEventListener('click', showHostScreen);
  document.getElementById('join-btn').addEventListener('click', () => {
    alert('Join Room screen coming in the next update!');
    currentPanel.remove(); currentPanel = null;
  });
  document.getElementById('donate-link').addEventListener('click', () => window.open('https://penguinmod.com/support', '_blank'));
  document.getElementById('coffee-link').addEventListener('click', () => alert('☕ Thank you! (link coming soon)'));
  document.getElementById('gear').addEventListener('click', () => alert('⚙️ Settings screen coming soon'));
}

// ── HOST SCREEN (matches your second screenshot) ──
function showHostScreen() {
  currentPanel.innerHTML = `
    <div style="padding:20px; font-size:24px; font-weight:bold; color:#FF0000;">Host Screen</div>
    
    <div style="text-align:left; padding:0 30px; font-size:18px;">
      <div style="margin-bottom:10px;">People:</div>
      <div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
        <div style="width:40px; height:40px; background:#111; border-radius:50%;"></div>
        <div style="font-size:20px;">Username</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
        <div style="width:40px; height:40px; background:#111; border-radius:50%;"></div>
        <div style="font-size:20px;">Username</div>
      </div>
      <div style="display:flex; align-items:center; gap:12px; margin:12px 0;">
        <div style="width:40px; height:40px; background:#111; border-radius:50%;"></div>
        <div style="font-size:20px;">Username</div>
      </div>
    </div>
    
    <div style="position:absolute; bottom:20px; left:20px; right:20px; display:flex; justify-content:space-between; align-items:center;">
      <div id="gear2" style="font-size:32px; cursor:pointer;">⚙️</div>
      <div style="display:flex; gap:4px;">
        <div style="width:8px; height:22px; background:#4CAF50; border-radius:2px;"></div>
        <div style="width:8px; height:28px; background:#4CAF50; border-radius:2px;"></div>
        <div style="width:8px; height:35px; background:#4CAF50; border-radius:2px;"></div>
        <div style="width:8px; height:18px; background:#4CAF50; border-radius:2px;"></div>
      </div>
      <div style="font-size:11px;">server ping</div>
    </div>
  `;

  document.getElementById('gear2').addEventListener('click', () => {
    currentPanel.remove(); currentPanel = null;
  });
}

// Right online widget stays exactly the same (no overlap)
function addRightOnlineWidget() {
  if (document.getElementById('panglive-right-widget')) return true;

  const widget = document.createElement('div');
  widget.id = 'panglive-right-widget';
  widget.style.cssText = `
    position:absolute; top:12px; right:260px; z-index:999999;
    display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.1);
    color:white; padding:4px 12px; border-radius:20px; font-size:13px; font-weight:600;
  `;
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