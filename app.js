const sidebarNav = document.getElementById('sidebarNav');
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

// Sections to extract from the markdown for navigation
const sections = [
  // DATOS DE INTERÉS
  { group: 'Datos de interés' },
  { id: 'info', title: 'Vuelos y alojamiento', icon: '✈️', heading: 'Información general' },
  { id: 'reservas', title: 'Reservas', icon: '📌', heading: 'Reservas' },
  { id: 'checklist', title: 'Checklist', icon: '✅', heading: 'Checklist' },
  { id: 'notas', title: 'Notas del viaje', icon: '📝', heading: 'Notas del viaje' },

  // PLANNING
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

  // PUNTOS DE INTERÉS
  { group: 'Puntos de interés' },
  { id: 'restaurantes', title: 'Restaurantes', icon: '🍽️', heading: 'Restaurantes' },
  { id: 'miradores', title: 'Miradores', icon: '🏔️', heading: 'Miradores' },
  { id: 'playas', title: 'Playas', icon: '🏖️', heading: 'Playas y piscinas naturales' },
  { id: 'termas', title: 'Termas', icon: '♨️', heading: 'Termas' },
  { id: 'cafeterias', title: 'Cafeterías', icon: '☕', heading: 'Cafeterías y pastelerías' },
  { id: 'compras', title: 'Compras', icon: '🛒', heading: 'Compras' },
];

let currentSection = null;

// Build sidebar navigation
function buildNav(sections) {
  sidebarNav.innerHTML = '';
  sections.forEach(s => {
    if (s.group) {
      const header = document.createElement('div');
      header.className = 'nav-section';
      header.textContent = s.group;
      sidebarNav.appendChild(header);
      return;
    }
    const link = document.createElement('a');
    link.className = 'nav-link';
    link.dataset.section = s.id;
    link.innerHTML = `${s.icon} ${s.title}`;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(s.id);
      closeSidebar();
    });
    sidebarNav.appendChild(link);
  });
}

// Scroll to a section in the rendered content
function scrollToSection(sectionId) {
  const el = document.getElementById('section-' + sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveNav(sectionId);
    currentSection = sectionId;
    history.replaceState(null, '', '#' + sectionId);
  }
}

function setActiveNav(sectionId) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (link) link.classList.add('active');
}

// Parse markdown and insert section anchors
function renderMarkdown(md) {
  // Add anchor IDs before each ## heading
  let processed = md;
  sections.forEach(s => {
    // Match the heading in markdown (## or ###)
    const regex = new RegExp(`(##\\s+${escapeRegex(s.heading)})`, 'i');
    processed = processed.replace(regex, `<div id="section-${s.id}">$1`);
    // Close the previous section div
  });

  // Use marked to render
  const html = marked.parse(processed);
  content.innerHTML = html;

  // Add closing divs and fix - actually let's do it differently
  // Just render and add scroll targets
  content.innerHTML = marked.parse(md);

  // Now add anchor divs before each heading
  sections.forEach(s => {
    const headings = content.querySelectorAll('h2, h3');
    for (const h of headings) {
      if (h.textContent.includes(s.heading) || h.textContent.includes(s.heading.replace(/^(Domingo|Lunes|Martes|Miércoles|Jueves|Viernes|Sábado)\s+/, ''))) {
        const anchor = document.createElement('div');
        anchor.id = 'section-' + s.id;
        anchor.style.scrollMarginTop = '1.5rem';
        h.parentNode.insertBefore(anchor, h);
        break;
      }
    }
  });
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Checkboxes: make clickable, save state, remove bullets
const CHECKBOX_KEY = 'azores2026_checkboxes';

function loadCheckboxState() {
  try {
    return JSON.parse(localStorage.getItem(CHECKBOX_KEY)) || {};
  } catch { return {}; }
}

function saveCheckboxState(state) {
  localStorage.setItem(CHECKBOX_KEY, JSON.stringify(state));
}

function initCheckboxes() {
  const state = loadCheckboxState();
  const checkboxes = content.querySelectorAll('li input[type="checkbox"]');

  checkboxes.forEach((cb, i) => {
    // Remove bullet point
    cb.closest('li').style.listStyleType = 'none';

    // Restore state
    const key = cb.parentElement.textContent.trim();
    if (state[key] !== undefined) {
      cb.checked = state[key];
    }

    // Make clickable and save
    cb.addEventListener('change', () => {
      const s = loadCheckboxState();
      s[key] = cb.checked;
      saveCheckboxState(s);
    });

    // Allow clicking the label text too
    const li = cb.closest('li');
    li.style.cursor = 'pointer';
    li.addEventListener('click', (e) => {
      if (e.target === cb) return;
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    });
  });
}

// Scroll spy
function onScroll() {
  let active = null;
  for (const s of sections) {
    if (!s.id) continue;
    const el = document.getElementById('section-' + s.id);
    if (el && el.getBoundingClientRect().top <= 100) {
      active = s.id;
    }
  }
  if (active && active !== currentSection) {
    currentSection = active;
    setActiveNav(active);
  }
}

// Sidebar toggle (mobile)
function toggleSidebar() {
  sidebar.classList.toggle('open');
}

function closeSidebar() {
  sidebar.classList.remove('open');
}

menuToggle.addEventListener('click', toggleSidebar);
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    closeSidebar();
  }
});

window.addEventListener('scroll', onScroll, { passive: true });

// Load and render
async function init() {
  buildNav(sections);
  try {
    const resp = await fetch('Azores_2026_Itinerario.md');
    if (!resp.ok) throw new Error('No se pudo cargar el itinerario');
    const md = await resp.text();
    renderMarkdown(md);
    initCheckboxes();

    // Check URL hash
    if (location.hash) {
      setTimeout(() => scrollToSection(location.hash.slice(1)), 100);
    } else {
      scrollToSection('info');
    }
  } catch (err) {
    content.innerHTML = `<div class="loading">Error: ${err.message}</div>`;
  }
}

init();
