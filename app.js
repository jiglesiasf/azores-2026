// ═══════════════════════════════════════════════════════════════
// 1. CONFIG
// ═══════════════════════════════════════════════════════════════
const SITE_PASSWORD = 'azores2026'; // ← Cambia esta contraseña
const AUTH_KEY = 'azores2026_auth';

// ═══════════════════════════════════════════════════════════════
// 2. DOM REFERENCES
// ═══════════════════════════════════════════════════════════════
const sidebarNav = document.getElementById('sidebarNav');
const contentView = document.getElementById('contentView');
const dayView = document.getElementById('dayView');
const dayMapEl = document.getElementById('dayMap');
const bottomSheet = document.getElementById('bottomSheet');
const sheetOverlay = document.getElementById('sheetOverlay');
const sheetTitle = document.getElementById('sheetTitle');
const sheetSubtitle = document.getElementById('sheetSubtitle');
const sheetMeta = document.getElementById('sheetMeta');
const sheetBody = document.getElementById('sheetBody');
const dayBack = document.getElementById('dayBack');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

// ═══════════════════════════════════════════════════════════════
// 2. SECTION DEFINITIONS
// ═══════════════════════════════════════════════════════════════
const sections = [
  { group: 'Datos de interés' },
  { id: 'info', title: 'Vuelos y alojamiento', icon: '✈️', heading: 'Información general' },
  { id: 'reservas', title: 'Reservas', icon: '📌', heading: 'Reservas' },
  { id: 'checklist', title: 'Checklist', icon: '✅', heading: 'Checklist' },
  { id: 'notas', title: 'Notas del viaje', icon: '📝', heading: 'Notas del viaje' },

  { group: 'Planning' },
  { id: 'dia-16', title: '16 ago — Llegada', icon: '✈️', heading: 'Domingo 16 de agosto' },
  { id: 'dia-17', title: '17 ago — Furnas: termas', icon: '♨️', heading: 'Lunes 17 de agosto' },
  { id: 'dia-18', title: '18 ago — Lagoa do Furnas', icon: '🏞️', heading: 'Martes 18 de agosto' },
  { id: 'dia-19', title: '19 ago — Traslado PD', icon: '🚗', heading: 'Miércoles 19 de agosto' },
  { id: 'dia-20', title: '20 ago — Ballenas', icon: '🐋', heading: 'Jueves 20 de agosto' },
  { id: 'dia-21', title: '21 ago — Costa Norte', icon: '🌊', heading: 'Viernes 21 de agosto' },
  { id: 'dia-22', title: '22 ago — Nordeste', icon: '🧭', heading: 'Sábado 22 de agosto' },
  { id: 'dia-23', title: '23 ago — Día libre', icon: '☀️', heading: 'Domingo 23 de agosto' },
  { id: 'dia-24', title: '24 ago — Vuelta', icon: '🏠', heading: 'Lunes 24 de agosto' },

  { group: 'Puntos de interés' },
  { id: 'restaurantes', title: 'Restaurantes', icon: '🍽️', heading: 'Restaurantes' },
  { id: 'miradores', title: 'Miradores', icon: '🏔️', heading: 'Miradores' },
  { id: 'playas', title: 'Playas', icon: '🏖️', heading: 'Playas y piscinas naturales' },
  { id: 'termas', title: 'Termas', icon: '♨️', heading: 'Termas' },
  { id: 'cafeterias', title: 'Cafeterías', icon: '☕', heading: 'Cafeterías y pastelerías' },
  { id: 'compras', title: 'Compras', icon: '🛒', heading: 'Compras' },
];

const DAY_IDS = sections.filter(s => s.id && s.id.startsWith('dia-')).map(s => s.id);

// ═══════════════════════════════════════════════════════════════
// 3. STATE
// ═══════════════════════════════════════════════════════════════
let currentView = 'content';
let currentSection = null;
let currentDayId = null;
let currentMap = null;
let currentSheetState = 'collapsed';
let lastContentSection = 'info';
let parsedDays = {};
let drag = null;

// ═══════════════════════════════════════════════════════════════
// 4. MARKDOWN PARSER
// ═══════════════════════════════════════════════════════════════
function getDayId(title) {
  const m = title.match(/(\d+)/);
  return m ? 'dia-' + m[1] : null;
}

function parseMarkdown(md) {
  const lines = md.split('\n');
  const days = {};
  const contentLines = [];
  let i = 0;

  while (i < lines.length) {
    const dayMatch = lines[i].match(/^## 📍 (.+?) — (.+)$/);

    if (dayMatch) {
      const title = dayMatch[1].trim();
      const subtitle = dayMatch[2].trim();
      const id = getDayId(title);
      const daySections = [];
      let curSub = null;
      let buf = [];
      i++;

      while (i < lines.length) {
        if (lines[i].match(/^#{1,2} [^#]/) && !lines[i].match(/^### /)) break;

        const subMatch = lines[i].match(/^### ([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)\s*(.+)$/u);
        if (subMatch) {
          if (curSub) { curSub.content = buf.join('\n').trim(); daySections.push(curSub); }
          curSub = { icon: subMatch[1], label: subMatch[2].trim(), content: '' };
          buf = [];
          i++;
          continue;
        }
        buf.push(lines[i]);
        i++;
      }

      if (curSub) { curSub.content = buf.join('\n').trim(); daySections.push(curSub); }
      if (id) days[id] = { id, title, subtitle, sections: daySections };
    } else {
      contentLines.push(lines[i]);
      i++;
    }
  }

  return { contentMd: contentLines.join('\n'), days };
}

// ═══════════════════════════════════════════════════════════════
// 5. SIDEBAR
// ═══════════════════════════════════════════════════════════════
function buildNav() {
  sidebarNav.innerHTML = '';
  sections.forEach(s => {
    if (s.group) {
      const h = document.createElement('div');
      h.className = 'nav-section';
      h.textContent = s.group;
      sidebarNav.appendChild(h);
      return;
    }
    const a = document.createElement('a');
    a.className = 'nav-link';
    a.dataset.section = s.id;
    a.innerHTML = `<span class="nav-icon">${s.icon}</span> ${s.title}`;
    a.addEventListener('click', e => {
      e.preventDefault();
      DAY_IDS.includes(s.id) ? showDay(s.id) : showContent(s.id);
      closeSidebar();
    });
    sidebarNav.appendChild(a);
  });
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const l = document.querySelector(`.nav-link[data-section="${id}"]`);
  if (l) l.classList.add('active');
}

// ═══════════════════════════════════════════════════════════════
// 6. VIEW ROUTER
// ═══════════════════════════════════════════════════════════════
function showDay(id) {
  if (currentDayId === id && currentView === 'day') return;
  destroyMap();
  currentView = 'day';
  currentDayId = id;
  contentView.classList.add('hidden');
  dayView.classList.remove('hidden');
  initDayMap(id);
  renderBottomSheet(id);
  setSheetState('collapsed');
  setActiveNav(id);
  history.replaceState(null, '', '#' + id);
}

function showContent(id) {
  currentView = 'content';
  currentDayId = null;
  destroyMap();
  dayView.classList.add('hidden');
  contentView.classList.remove('hidden');
  if (id) {
    lastContentSection = id;
    scrollToSection(id);
    setActiveNav(id);
    history.replaceState(null, '', '#' + id);
  }
}

function destroyMap() {
  if (currentMap) { currentMap.remove(); currentMap = null; }
}

// ═══════════════════════════════════════════════════════════════
// 7. DAY VIEW — MAP
// ═══════════════════════════════════════════════════════════════
function initDayMap(dayId) {
  const route = ROUTES[dayId];
  if (!route) return;

  currentMap = L.map(dayMapEl, { zoomControl: false, attributionControl: true });
  L.control.zoom({ position: 'topright' }).addTo(currentMap);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(currentMap);

  route.stops.forEach(stop => {
    const ic = MARKER_ICONS[stop.icon] || MARKER_ICONS.viewpoint;
    const icon = L.divIcon({
      className: 'marker-icon',
      html: `<div class="marker-pin" style="background:${ic.color}"><i class="fa-solid ${ic.fa}"></i></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -40]
    });

    L.marker(stop.coords, { icon })
      .bindPopup(
        `<div class="popup-content"><div class="popup-icon" style="background:${ic.color}"><i class="fa-solid ${ic.fa}"></i></div><div class="popup-text"><strong>${stop.name}</strong><span>${stop.desc}</span></div></div>`,
        { className: 'custom-popup', maxWidth: 260 }
      )
      .addTo(currentMap);
  });

  if (route.route && route.route.length > 1) {
    L.polyline(route.route, {
      color: '#0ea5e9', weight: 3, opacity: 0.55,
      dashArray: '10, 8', lineCap: 'round', lineJoin: 'round'
    }).addTo(currentMap);
  }

  const bounds = L.latLngBounds(route.stops.map(s => s.coords));
  currentMap.fitBounds(bounds, { padding: [50, 50] });
  setTimeout(() => currentMap.invalidateSize(), 120);
}

// ═══════════════════════════════════════════════════════════════
// 8. DAY VIEW — BOTTOM SHEET
// ═══════════════════════════════════════════════════════════════
function setSheetState(state) {
  bottomSheet.classList.remove('sheet-collapsed', 'sheet-half', 'sheet-full');
  bottomSheet.classList.add('sheet-' + state);
  bottomSheet.style.transform = '';
  currentSheetState = state;
  sheetOverlay.classList.toggle('visible', state !== 'collapsed');
  sheetOverlay.style.opacity = '';
}

function onDragStart(e) {
  if (!e.target.closest('.sheet-handle-area')) return;
  e.preventDefault();
  const m = new DOMMatrix(getComputedStyle(bottomSheet).transform);
  drag = {
    startY: e.clientY,
    startTransformY: m.m42,
    lastY: e.clientY,
    lastTime: Date.now(),
    velocity: 0
  };
  bottomSheet.classList.add('no-transition');
  sheetOverlay.style.transition = 'none';
}

function onDragMove(e) {
  if (!drag) return;
  e.preventDefault();
  let y = drag.startTransformY + (e.clientY - drag.startY);
  const vh = window.innerHeight;
  y = Math.max(vh * 0.08, Math.min(vh - 110, y));
  bottomSheet.style.transform = `translateY(${y}px)`;

  const now = Date.now();
  const dt = now - drag.lastTime;
  if (dt > 0) drag.velocity = (e.clientY - drag.lastY) / dt;
  drag.lastY = e.clientY;
  drag.lastTime = now;

  const progress = 1 - (y - vh * 0.08) / (vh - 110 - vh * 0.08);
  sheetOverlay.style.opacity = Math.max(0, Math.min(0.4, progress * 0.4));
}

function onDragEnd() {
  if (!drag) return;
  bottomSheet.classList.remove('no-transition');
  sheetOverlay.style.transition = '';

  const dy = drag.startTransformY + (drag.lastY - drag.startY);
  const vel = drag.velocity;
  drag = null;

  const vh = window.innerHeight;
  const cY = vh - 110, hY = vh * 0.5, fY = vh * 0.08;
  let target;

  if (vel < -0.3) target = dy > hY ? 'half' : 'full';
  else if (vel > 0.3) target = dy < hY ? 'half' : 'collapsed';
  else {
    const dC = Math.abs(dy - cY), dH = Math.abs(dy - hY), dF = Math.abs(dy - fY);
    const mn = Math.min(dC, dH, dF);
    target = mn === dC ? 'collapsed' : mn === dH ? 'half' : 'full';
  }

  setSheetState(target);
}

// ═══════════════════════════════════════════════════════════════
// 9. DAY VIEW — BOTTOM SHEET CONTENT
// ═══════════════════════════════════════════════════════════════
function renderBottomSheet(dayId) {
  const day = parsedDays[dayId];
  if (!day) return;

  sheetTitle.textContent = day.title;
  sheetSubtitle.textContent = day.subtitle;

  const route = ROUTES[dayId];
  const carSec = day.sections.find(s => s.label.includes('Tiempo en coche'));
  const carTime = carSec ? carSec.content.replace(/[~\n]/g, '').trim() : '';
  const stops = route ? route.stops.length : 0;

  sheetMeta.innerHTML = '';
  if (carTime) sheetMeta.innerHTML += `<span class="meta-item"><i class="fa-solid fa-car"></i> ${carTime}</span>`;
  if (stops) sheetMeta.innerHTML += `<span class="meta-item"><i class="fa-solid fa-location-dot"></i> ${stops} paradas</span>`;

  sheetBody.innerHTML = '';
  day.sections.forEach(sec => {
    if (sec.label.includes('Tiempo en coche')) return;

    const acc = document.createElement('div');
    acc.className = 'accordion';

    const toggle = document.createElement('button');
    toggle.className = 'accordion-toggle';
    toggle.innerHTML = `
      <span class="accordion-icon">${sec.icon}</span>
      <span class="accordion-label">${sec.label}</span>
      <i class="fa-solid fa-chevron-down accordion-chevron"></i>`;
    toggle.addEventListener('click', () => toggleAccordion(toggle));

    const content = document.createElement('div');
    content.className = 'accordion-content';
    content.innerHTML = `<div class="accordion-inner">${marked.parse(sec.content)}</div>`;

    acc.appendChild(toggle);
    acc.appendChild(content);
    sheetBody.appendChild(acc);
  });
}

function toggleAccordion(toggle) {
  const wasOpen = toggle.classList.contains('open');

  sheetBody.querySelectorAll('.accordion-toggle.open').forEach(t => {
    t.classList.remove('open');
    t.nextElementSibling.classList.remove('open');
  });

  if (!wasOpen) {
    toggle.classList.add('open');
    toggle.nextElementSibling.classList.add('open');
  }
}

// ═══════════════════════════════════════════════════════════════
// 10. CONTENT VIEW
// ═══════════════════════════════════════════════════════════════
function renderContent(md) {
  contentView.innerHTML = marked.parse(md);
  insertAnchors();
  initCheckboxes();
  addChecklistProgress();
}

function insertAnchors() {
  contentView.querySelectorAll('h1, h2').forEach(h => {
    const txt = h.textContent;
    const sec = sections.find(s => s.heading && (
      txt.includes(s.heading) ||
      txt.includes(s.heading.replace(/^(Domingo|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado)\s+/, ''))
    ));
    if (!sec) return;
    const a = document.createElement('div');
    a.id = 'section-' + sec.id;
    a.style.scrollMarginTop = '1.5rem';
    h.parentNode.insertBefore(a, h);
  });
}

function scrollToSection(id) {
  const el = document.getElementById('section-' + id);
  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); currentSection = id; }
}

// ═══════════════════════════════════════════════════════════════
// 11. CHECKBOXES
// ═══════════════════════════════════════════════════════════════
const CHECKBOX_KEY = 'azores2026_checkboxes';
const loadCBState = () => { try { return JSON.parse(localStorage.getItem(CHECKBOX_KEY)) || {}; } catch { return {}; } };
const saveCBState = s => localStorage.setItem(CHECKBOX_KEY, JSON.stringify(s));

function initCheckboxes() {
  const state = loadCBState();
  contentView.querySelectorAll('li input[type="checkbox"]').forEach(cb => {
    cb.closest('li').style.listStyleType = 'none';
    const key = cb.parentElement.textContent.trim();
    if (state[key] !== undefined) cb.checked = state[key];
    cb.addEventListener('change', () => { const s = loadCBState(); s[key] = cb.checked; saveCBState(s); updateProgress(); });
    const li = cb.closest('li');
    li.style.cursor = 'pointer';
    li.addEventListener('click', e => { if (e.target === cb) return; cb.checked = !cb.checked; cb.dispatchEvent(new Event('change')); });
  });
}

function addChecklistProgress() {
  const cbs = contentView.querySelectorAll('li input[type="checkbox"]');
  if (!cbs.length) return;
  const total = cbs.length, checked = Array.from(cbs).filter(c => c.checked).length;
  const p = document.createElement('div');
  p.className = 'checklist-progress';
  p.id = 'checklistProgress';
  p.innerHTML = `<div class="progress-bar"><div class="progress-fill" style="width:${(checked/total)*100}%"></div></div><span class="progress-text">${checked}/${total}</span>`;
  const first = cbs[0];
  const list = first.closest('ul') || first.closest('ol');
  if (list && list.parentNode) list.parentNode.insertBefore(p, list);
}

function updateProgress() {
  const p = document.getElementById('checklistProgress');
  if (!p) return;
  const cbs = contentView.querySelectorAll('li input[type="checkbox"]');
  const total = cbs.length, checked = Array.from(cbs).filter(c => c.checked).length;
  const fill = p.querySelector('.progress-fill');
  const txt = p.querySelector('.progress-text');
  if (fill) fill.style.width = `${(checked/total)*100}%`;
  if (txt) txt.textContent = `${checked}/${total}`;
}

// ═══════════════════════════════════════════════════════════════
// 12. SCROLL SPY
// ═══════════════════════════════════════════════════════════════
function onScroll() {
  if (currentView !== 'content') return;
  let active = null;
  for (const s of sections) {
    if (!s.id || DAY_IDS.includes(s.id)) continue;
    const el = document.getElementById('section-' + s.id);
    if (el && el.getBoundingClientRect().top <= 100) active = s.id;
  }
  if (active && active !== currentSection) { currentSection = active; setActiveNav(active); }
}

// ═══════════════════════════════════════════════════════════════
// 13. SIDEBAR TOGGLE
// ═══════════════════════════════════════════════════════════════
function closeSidebar() { sidebar.classList.remove('open'); }
menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) closeSidebar();
});

// ═══════════════════════════════════════════════════════════════
// 14. EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════
window.addEventListener('scroll', onScroll, { passive: true });
bottomSheet.addEventListener('pointerdown', onDragStart);
window.addEventListener('pointermove', onDragMove);
window.addEventListener('pointerup', onDragEnd);
dayBack.addEventListener('click', () => showContent(lastContentSection));
sheetOverlay.addEventListener('click', () => setSheetState('collapsed'));

// ═══════════════════════════════════════════════════════════════
// 15. AUTH & INITIALIZATION
// ═══════════════════════════════════════════════════════════════
function isAuth() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function initLoginGate() {
  const gate = document.getElementById('loginGate');
  const form = document.getElementById('loginForm');
  const input = document.getElementById('loginPassword');
  const error = document.getElementById('loginError');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === SITE_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      gate.classList.add('hidden');
isAuth() ? init() : initLoginGate();
    } else {
      error.textContent = 'Contraseña incorrecta';
      input.value = '';
      input.focus();
    }
  });

  input.focus();
}

async function init() {
  buildNav();
  try {
    const resp = await fetch('Azores_2026_Itinerario.md');
    if (!resp.ok) throw new Error('No se pudo cargar el itinerario');
    const md = await resp.text();
    const { contentMd, days } = parseMarkdown(md);
    parsedDays = days;
    renderContent(contentMd);

    const hash = location.hash.slice(1);
    if (hash && DAY_IDS.includes(hash)) showDay(hash);
    else if (hash) showContent(hash);
    else showContent('info');
  } catch (err) {
    contentView.innerHTML = `<div class="loading">Error: ${err.message}</div>`;
  }
}

init();
