// PangLiveMenu.js
// No DOMContentLoaded - script is at end of <body>, DOM is already ready.

// ── element refs ──
var ipCheck    = document.getElementById('ipCheck');
var mainArea   = document.getElementById('mainArea');
var btnJoin    = document.getElementById('btn-join');
var btnHost    = document.getElementById('btn-host');
var pJoin      = document.getElementById('p-join');
var pHost      = document.getElementById('p-host');
var codeBox    = document.getElementById('codeBox');
var newCodeLink= document.getElementById('newCodeLink');
var btnDoJoin  = document.getElementById('btn-do-join');
var btnDoHost  = document.getElementById('btn-do-host');
var nameInput  = document.getElementById('name');
var codeInput  = document.getElementById('code');
var jpassInput = document.getElementById('jpass');
var hpassInput = document.getElementById('hpass');
var toggleJ    = document.getElementById('toggle-jpass');
var toggleH    = document.getElementById('toggle-hpass');
var statusLine = document.getElementById('statusLine');

// ── IP checkbox gate ──
ipCheck.addEventListener('change', function() {
  if (ipCheck.checked) {
    mainArea.style.opacity = '1';
    mainArea.style.pointerEvents = '';
  } else {
    mainArea.style.opacity = '0.4';
    mainArea.style.pointerEvents = 'none';
  }
});

// ── mode switch ──
function setMode(m) {
  if (m === 'join') {
    btnJoin.className = 'active';
    btnHost.className = '';
    pJoin.className = 'panel on';
    pHost.className = 'panel';
  } else {
    btnJoin.className = '';
    btnHost.className = 'active';
    pJoin.className = 'panel';
    pHost.className = 'panel on';
    if (codeBox.textContent === '—') getCode();
  }
}

btnJoin.addEventListener('click', function() { setMode('join'); });
btnHost.addEventListener('click', function() { setMode('host'); });

// ── room code: digits only ──
codeInput.addEventListener('input', function() {
  codeInput.value = codeInput.value.replace(/\D/g, '');
});

// ── coordinator assigns the code ──
function getCode() {
  // TODO: fetch('https://coordinator-url/new-session')
  //   .then(function(r) { return r.json(); })
  //   .then(function(d) { codeBox.textContent = d.code; })
  //   .catch(function()  { codeBox.textContent = 'ERROR'; });
  codeBox.textContent = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
}

newCodeLink.addEventListener('click', getCode);

// ── copy code ──
codeBox.addEventListener('click', function() {
  var c = codeBox.textContent;
  if (c === '—') return;
  navigator.clipboard.writeText(c).catch(function(){});
  var orig = c;
  codeBox.textContent = 'Copied!';
  setTimeout(function() { codeBox.textContent = orig; }, 1000);
});

// ── show/hide password toggles ──
toggleJ.addEventListener('click', function() {
  var show = jpassInput.type === 'password';
  jpassInput.type     = show ? 'text'     : 'password';
  toggleJ.textContent = show ? 'Hide'     : 'Show';
});

toggleH.addEventListener('click', function() {
  var show = hpassInput.type === 'password';
  hpassInput.type     = show ? 'text'     : 'password';
  toggleH.textContent = show ? 'Hide'     : 'Show';
});

// ── host password: red border if under 6 chars while typing ──
hpassInput.addEventListener('input', function() {
  if (hpassInput.value.length > 0 && hpassInput.value.length < 6) {
    hpassInput.style.borderColor = 'red';
    hpassInput.style.outline     = '1px solid red';
  } else {
    hpassInput.style.borderColor = '';
    hpassInput.style.outline     = '';
  }
});

// ── flash invalid field ──
function flash(el) {
  el.classList.add('err');
  el.focus();
  setTimeout(function() { el.classList.remove('err'); }, 1200);
}

function val(el) { return el.value.trim(); }

// ── join ──
btnDoJoin.addEventListener('click', function() {
  if (!val(nameInput))           { flash(nameInput);  return; }
  if (val(codeInput).length < 10){ flash(codeInput);  return; }
  if (!val(jpassInput))          { flash(jpassInput); return; }
  // TODO: coordinator lookup + connect
  console.log('JOIN', val(nameInput), val(codeInput), val(jpassInput));
});

// ── host ──
btnDoHost.addEventListener('click', function() {
  if (!val(nameInput))             { flash(nameInput);  return; }
  if (val(hpassInput).length < 6)  { flash(hpassInput); return; }
  // TODO: register with coordinator + open WebSocket
  console.log('HOST', val(nameInput), codeBox.textContent, val(hpassInput));
});

// ── coordinator ping ──
function ping() {
  // TODO: fetch('https://coordinator-url/health')
  //   .then(function(r) { setOnline(r.ok); })
  //   .catch(function()  { setOnline(false); });
  setOnline(true); // placeholder
}

function setOnline(on) {
  statusLine.innerHTML = on
    ? '<span class="dot-on">●</span> Coordinator: online'
    : '<span class="dot-off">●</span> Coordinator: offline';
}

ping();