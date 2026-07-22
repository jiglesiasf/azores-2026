// Route data for each day
const ROUTES = {
  'dia-16': {
    center: [37.74, -25.50],
    zoom: 11,
    stops: [
      { name: 'Aeropuerto PDL', coords: [37.7412, -25.6979], icon: 'airport', desc: 'Llegada 18:50 · Recoger coche' },
      { name: 'Supermercado', coords: [37.7450, -25.6850], icon: 'shop', desc: 'Compra rápida antes de Furnas' },
      { name: 'Furnas — Quinta das Camélias', coords: [37.7817, -25.3022], icon: 'hotel', desc: 'Check-in ~20:00' },
    ],
    route: [[37.7412, -25.6979], [37.7450, -25.6850], [37.7600, -25.5500], [37.7817, -25.3022]],
  },

  'dia-17': {
    center: [37.778, -25.307],
    zoom: 14,
    stops: [
      { name: 'Quinta das Camélias', coords: [37.7817, -25.3022], icon: 'hotel', desc: 'Alojamiento · Desayuno' },
      { name: 'Parque Terra Nostra', coords: [37.7850, -25.3117], icon: 'viewpoint', desc: 'Jardín botánico · Mañana' },
      { name: 'A Quinta', coords: [37.7835, -25.3045], icon: 'restaurant', desc: 'Comida · Wine bar' },
      { name: 'Chalet da Tia Mercès', coords: [37.7716, -25.3037], icon: 'restaurant', desc: 'Merienda · Tetería' },
      { name: 'Caldeiras das Furnas', coords: [37.7726, -25.3039], icon: 'viewpoint', desc: 'Fumarolas · Paseo tarde' },
      { name: 'Jardim da Alameda', coords: [37.7710, -25.3085], icon: 'viewpoint', desc: 'Jardín público · Paseo tarde' },
      { name: 'Casa Invertida', coords: [37.7724, -25.3103], icon: 'viewpoint', desc: 'Casa al revés · Foto' },
      { name: 'Quinta das Camélias', coords: [37.7817, -25.3022], icon: 'hotel', desc: 'Vuelta al alojamiento' },
    ],
    route: [[37.7817, -25.3022], [37.7850, -25.3117], [37.7835, -25.3045], [37.7716, -25.3037], [37.7726, -25.3039], [37.7710, -25.3085], [37.7724, -25.3103], [37.7817, -25.3022]],
  },

  'dia-18': {
    center: [37.77, -25.28],
    zoom: 12,
    stops: [
      { name: 'Quinta das Camélias', coords: [37.7817, -25.3022], icon: 'hotel', desc: 'Alojamiento' },
      { name: 'Lagoa do Furnas', coords: [37.7617, -25.3217], icon: 'viewpoint', desc: 'Paseo junto al lago' },
      { name: 'Capela de N. Sra. das Vitórias', coords: [37.7580, -25.3250], icon: 'viewpoint', desc: 'Orilla del lago' },
      { name: 'Miradouro do Lagoa do Furnas', coords: [37.7650, -25.3150], icon: 'viewpoint', desc: 'Vistas al lago · Fotos' },
    ],
    route: [[37.7817, -25.3022], [37.7617, -25.3217], [37.7580, -25.3250], [37.7650, -25.3150], [37.7817, -25.3022]],
  },

  'dia-19': {
    center: [37.73, -25.45],
    zoom: 11,
    stops: [
      { name: 'Quinta das Camélias', coords: [37.7817, -25.3022], icon: 'hotel', desc: 'Check-out 10:00' },
      { name: 'Lagoa do Fogo', coords: [37.7500, -25.4833], icon: 'viewpoint', desc: 'Parada en ruta (si hay tiempo)' },
      { name: 'Vila Franca do Campo', coords: [37.7185, -25.4343], icon: 'viewpoint', desc: 'Paseo · Vista al islote' },
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Check-in Ponta Delgada' },
      { name: 'Marina / Portas da Cidade', coords: [37.7350, -25.6600], icon: 'viewpoint', desc: 'Paseo tarde' },
    ],
    route: [[37.7817, -25.3022], [37.7500, -25.4833], [37.7185, -25.4343], [37.7397, -25.6685], [37.7350, -25.6600]],
  },

  'dia-20': {
    center: [37.74, -25.67],
    zoom: 13,
    stops: [
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Desayuno 07:30' },
      { name: 'Puerto de Ponta Delgada', coords: [37.7350, -25.6550], icon: 'whale', desc: '鲸 Whale watching 08:30' },
      { name: 'Mercado Municipal', coords: [37.7397, -25.6685], icon: 'shop', desc: 'Tarde · Frutas, quesos' },
      { name: 'Jardim António Borges', coords: [37.7420, -25.6730], icon: 'viewpoint', desc: 'Jardín exótico con cueva' },
    ],
    route: [[37.7397, -25.6685], [37.7350, -25.6550], [37.7397, -25.6685], [37.7420, -25.6730]],
  },

  'dia-21': {
    center: [37.80, -25.75],
    zoom: 11,
    stops: [
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Salida temprana' },
      { name: 'Ribeira Grande', coords: [37.8197, -25.5168], icon: 'viewpoint', desc: 'Centro · Mañana' },
      { name: 'Praia de Santa Bárbara', coords: [37.8250, -25.5400], icon: 'beach', desc: 'Arena negra · Surf' },
      { name: 'Ferraria', coords: [37.8687, -25.7908], icon: 'thermal', desc: 'Piscina natural termal' },
      { name: 'Sete Cidades', coords: [37.7817, -25.8008], icon: 'viewpoint', desc: 'Lagunas azul y verde · Tarde' },
      { name: 'Miradouro da Vista do Rei', coords: [37.7750, -25.8100], icon: 'viewpoint', desc: 'La foto más famosa' },
    ],
    route: [[37.7397, -25.6685], [37.8197, -25.5168], [37.8250, -25.5400], [37.8687, -25.7908], [37.7817, -25.8008], [37.7750, -25.8100], [37.7397, -25.6685]],
  },

  'dia-22': {
    center: [37.80, -25.20],
    zoom: 11,
    stops: [
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Salida' },
      { name: 'Povoação', coords: [37.7483, -25.2417], icon: 'viewpoint', desc: 'Pueblo · Primera colonización' },
      { name: 'Faro do Nordeste', coords: [37.8617, -25.1333], icon: 'viewpoint', desc: 'Faro más oriental' },
      { name: 'Salto do Prego', coords: [37.8167, -25.1833], icon: 'viewpoint', desc: 'Cascada · Sendero' },
    ],
    route: [[37.7397, -25.6685], [37.7483, -25.2417], [37.8617, -25.1333], [37.8167, -25.1833], [37.7397, -25.6685]],
  },

  'dia-23': {
    center: [37.74, -25.55],
    zoom: 12,
    stops: [
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Día libre · Según ánimo' },
      { name: 'Praia de Monte Escritto', coords: [37.7300, -25.6450], icon: 'beach', desc: 'Opción A: playa' },
      { name: 'Vila Franca do Campo', coords: [37.7185, -25.4343], icon: 'viewpoint', desc: 'Opción C: islote' },
    ],
    route: [[37.7397, -25.6685], [37.7300, -25.6450], [37.7185, -25.4343], [37.7397, -25.6685]],
  },

  'dia-24': {
    center: [37.74, -25.68],
    zoom: 13,
    stops: [
      { name: 'IN53 Guest House', coords: [37.7397, -25.6685], icon: 'hotel', desc: 'Check-out · Maletas listas' },
      { name: 'Aeropuerto PDL', coords: [37.7412, -25.6979], icon: 'airport', desc: 'Devolver coche · Vuelo 09:50' },
    ],
    route: [[37.7397, -25.6685], [37.7412, -25.6979]],
  },
};

// Icon definitions
const MARKER_ICONS = {
  airport:   { color: '#e74c3c', fa: 'fa-plane' },
  hotel:     { color: '#9b59b6', fa: 'fa-bed' },
  restaurant:{ color: '#e67e22', fa: 'fa-utensils' },
  viewpoint: { color: '#3498db', fa: 'fa-binoculars' },
  beach:     { color: '#2ecc71', fa: 'fa-umbrella-beach' },
  thermal:   { color: '#00bcd4', fa: 'fa-water' },
  whale:     { color: '#1565c0', fa: 'fa-water' },
  shop:      { color: '#f39c12', fa: 'fa-shopping-bag' },
  coffee:    { color: '#8d6e63', fa: 'fa-mug-hot' },
};
