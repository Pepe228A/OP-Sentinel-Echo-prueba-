// STARFIELD
const canvas = document.getElementById('starfield'),
      ctx    = canvas.getContext('2d');
let stars = [], W, H, num = 300;
function initStars(){
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  stars = Array.from({length:num}, () => ({
    x: Math.random()*W,
    y: Math.random()*H,
    z: Math.random()*W
  }));
}
function drawStars(){
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,W,H);
  ctx.fillStyle = '#fff';
  stars.forEach(s => {
    s.z -= 2;
    if (s.z <= 0) s.z = W;
    let x = (s.x - W/2)*(W/s.z)+W/2,
        y = (s.y - H/2)*(W/s.z)+H/2,
        r = W/s.z;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

// COUNTDOWN 48h
const endTime = Date.now() + 48*3600*1000;
function updateTimer(){
  let d = endTime - Date.now();
  if (d < 0) d = 0;
  const hrs = String(Math.floor(d/3600000)).padStart(2,'0'),
        mins = String(Math.floor((d%3600000)/60000)).padStart(2,'0'),
        secs = String(Math.floor((d%60000)/1000)).padStart(2,'0');
  document.getElementById('countdown').textContent = `${hrs}:${mins}:${secs}`;
}

// OSINT FEED SIMULADO
const osintMsgs = [
  "[08:12Z] Usuario anónimo posteó ‘Compromiso detectado en EU-EduNet’",
  "[08:17Z] #LeakTrending: ‘VaultDown v2.1 descubierta’",
  "[08:24Z] Nodo C2 reubicado a proxy.redactada.onion",
  "[08:33Z] Reporte forense: ‘Cerber X23-Delta activo’",
  "[08:40Z] Tweet: ‘Desinfo campaign iniciada #SentinelEcho’"
];
let osIdx = 0;
function rotateOSINT(){
  const ul = document.getElementById('osint-feed'),
        li = document.createElement('li');
  li.textContent = osintMsgs[osIdx++ % osintMsgs.length];
  ul.prepend(li);
  if (ul.children.length > 6) ul.removeChild(ul.lastChild);
}

// CONSOLA FORENSE
const forLogs = [
  "[-] Escaneo lateral detectado en EU network",
  "[+] Volcado de memoria exitoso (SHA3 verified)",
  "[-] Honeypot activado: interceptando DNS-over-HTTPS",
  "[+] Firma digital atribuida a STORM-BX/AsiaCentral",
  "[!] Ejecutando spoofing narrativo…"
];
let logIdx = 0;
function appendLog(){
  const pre = document.getElementById('forensic-log');
  pre.textContent += forLogs[logIdx++ % forLogs.length] + "\n";
  pre.scrollTop = pre.scrollHeight;
}

// TOGGLE PLAY/PAUSE PARA NARRACIONES
const btnOp   = document.getElementById('playAudio'),
      opAudio = document.getElementById('narration'),
      btnDp   = document.getElementById('playDeploy'),
      dpAudio = document.getElementById('deploymentAudio');

function toggleAudio(audioEl, btnEl, labelPlay, labelPause) {
  if (audioEl.paused) {
    audioEl.play();
    btnEl.textContent = labelPause;
  } else {
    audioEl.pause();
    btnEl.textContent = labelPlay;
  }
}

const opPlay  = '▶️ Reproducir narración',
      opPause = '⏸️ Pausar narración',
      dpPlay  = '▶️ Reproducir despliegue',
      dpPause = '⏸️ Pausar despliegue';

btnOp.addEventListener('click', () => toggleAudio(opAudio, btnOp, opPlay, opPause));
btnDp.addEventListener('click', () => toggleAudio(dpAudio, btnDp, dpPlay, dpPause));

// INIT
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  drawStars();
  updateTimer(); setInterval(updateTimer, 1000);
  setInterval(rotateOSINT, 4000);
  setInterval(appendLog, 2500);
});
window.addEventListener('resize', initStars);
