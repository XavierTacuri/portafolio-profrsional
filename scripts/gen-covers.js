"use strict";
/*
 * Genera las 5 ilustraciones SVG de portada para las tarjetas de proyecto.
 * Script de un solo uso (no forma parte del sitio en producción).
 */
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "assets", "images", "projects");
fs.mkdirSync(OUT_DIR, { recursive: true });

const W = 480;
const H = 270;

const DEFS = `
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#101E33"/>
      <stop offset="100%" stop-color="#050B17"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#00BFFF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00BFFF" stop-opacity="0"/>
    </radialGradient>
`;

function wrap(name, title, content) {
    const dots = gridDots();
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t-${name}">
  <title id="t-${name}">${title}</title>
  <defs>${DEFS}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${dots}
${content}
</svg>
`;
}

function gridDots() {
    let out = '<g fill="#00BFFF" opacity="0.12">';
    for (let x = 20; x < W; x += 40) {
        for (let y = 20; y < H; y += 40) {
            out += `<circle cx="${x}" cy="${y}" r="1.1"/>`;
        }
    }
    out += "</g>";
    return out;
}

const files = {};

/* 1. Territorio Electoral: mapa con distritos y pines geolocalizados */
files["territorio-electoral.svg"] = wrap(
    "01",
    "Ilustración abstracta de un mapa territorial con distritos y puntos geolocalizados",
    `
  <g stroke="#00BFFF" stroke-width="1.3" fill="#00BFFF" fill-opacity="0.08">
    <path d="M70 70 L190 55 L230 120 L160 175 L80 150 Z"/>
    <path d="M230 120 L340 80 L400 140 L330 200 L250 190 Z"/>
  </g>
  <g stroke="#7dd3fc" stroke-width="1" fill="none" stroke-dasharray="3 5" opacity="0.55">
    <path d="M150 110 L270 150"/>
    <path d="M270 150 L360 120"/>
    <path d="M150 110 L130 190"/>
  </g>
  <g fill="#EAF6FF">
    <circle cx="150" cy="110" r="5"/>
    <circle cx="270" cy="150" r="7"/>
    <circle cx="360" cy="120" r="5"/>
    <circle cx="130" cy="190" r="4"/>
  </g>
  <circle cx="270" cy="150" r="16" fill="none" stroke="#00BFFF" stroke-width="1.5" opacity="0.6"/>
  <circle cx="270" cy="150" r="24" fill="none" stroke="#00BFFF" stroke-width="1" opacity="0.3"/>`
);

/* 2. Bot de señales Forex: velas japonesas + línea de señal */
files["forex-bot.svg"] = wrap(
    "02",
    "Ilustración abstracta de un gráfico de velas financieras con una línea de señal",
    `
  <g stroke="#1b2c47" stroke-width="1">
    <line x1="0" y1="70" x2="${W}" y2="70"/>
    <line x1="0" y1="135" x2="${W}" y2="135"/>
    <line x1="0" y1="200" x2="${W}" y2="200"/>
  </g>
  <g>
    ${candles()}
  </g>
  <polyline points="40,190 100,150 160,165 220,110 280,130 340,85 400,100 440,70"
            fill="none" stroke="#00BFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  <circle cx="440" cy="70" r="5" fill="#EAF6FF"/>
  <circle cx="440" cy="70" r="11" fill="none" stroke="#00BFFF" stroke-width="1.5" opacity="0.6"/>`
);

function candles() {
    const xs = [60, 95, 130, 165, 200, 235, 270, 305, 340, 375, 410];
    const rnd = mulberry32(7);
    let out = "";
    for (const x of xs) {
        const open = 100 + rnd() * 80;
        const close = 100 + rnd() * 80;
        const high = Math.min(open, close) - 10 - rnd() * 15;
        const low = Math.max(open, close) + 10 + rnd() * 15;
        const up = close < open;
        const color = up ? "#00BFFF" : "#3b5478";
        const top = Math.min(open, close);
        const bodyH = Math.max(4, Math.abs(close - open));
        out += `<line x1="${x}" y1="${high}" x2="${x}" y2="${low}" stroke="${color}" stroke-width="1.5" opacity="0.8"/>`;
        out += `<rect x="${x - 6}" y="${top}" width="12" height="${bodyH}" fill="${color}" opacity="0.85" rx="1.5"/>`;
    }
    return out;
}

function mulberry32(a) {
    return function () {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/* 3. Jornadas Deportivas: cancha abstracta + balón */
files["jornadas-deportivas.svg"] = wrap(
    "03",
    "Ilustración abstracta de una cancha deportiva con balón y marcadores de equipo",
    `
  <g stroke="#00BFFF" stroke-width="1.4" fill="none" opacity="0.5">
    <rect x="40" y="40" width="400" height="190" rx="10"/>
    <line x1="240" y1="40" x2="240" y2="230"/>
    <circle cx="240" cy="135" r="42"/>
    <circle cx="240" cy="135" r="3" fill="#00BFFF"/>
  </g>
  <g transform="translate(170,100)">
    <circle r="28" fill="#0C1830" stroke="#EAF6FF" stroke-width="1.5"/>
    <path d="M0 -28 L8 -9 L28 -6 M0 -28 L-8 -9 L-28 -6 M8 -9 L0 6 L-8 -9 M-28 -6 L-16 12 M28 -6 L16 12 M0 6 L-16 12 L-8 28 L8 28 L16 12 Z"
          fill="none" stroke="#00BFFF" stroke-width="1"/>
  </g>
  <g fill="#EAF6FF">
    <circle cx="340" cy="90" r="5"/>
    <circle cx="360" cy="180" r="5"/>
  </g>
  <circle cx="340" cy="90" r="13" fill="none" stroke="#00BFFF" stroke-width="1.2" opacity="0.6"/>
  <circle cx="360" cy="180" r="13" fill="none" stroke="#00BFFF" stroke-width="1.2" opacity="0.6"/>`
);

/* 4. Billetera Digital: tarjeta + monedas + flujo */
files["billetera-digital.svg"] = wrap(
    "04",
    "Ilustración abstracta de una billetera digital con tarjeta y flujo de saldo",
    `
  <g transform="translate(70,70)">
    <rect width="230" height="140" rx="18" fill="#0C1830" stroke="#00BFFF" stroke-width="1.6"/>
    <rect y="34" width="230" height="22" fill="#00BFFF" opacity="0.18"/>
    <circle cx="190" cy="100" r="22" fill="#00BFFF" opacity="0.25"/>
    <circle cx="165" cy="100" r="22" fill="#7dd3fc" opacity="0.2"/>
    <rect x="24" y="90" width="70" height="10" rx="5" fill="#EAF6FF" opacity="0.5"/>
    <rect x="24" y="108" width="46" height="8" rx="4" fill="#A8B8CC" opacity="0.4"/>
  </g>
  <g stroke="#00BFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.85">
    <polyline points="330,190 360,150 390,165 430,100"/>
  </g>
  <circle cx="430" cy="100" r="5" fill="#EAF6FF"/>
  <g fill="#EAF6FF" opacity="0.8">
    <circle cx="340" cy="70" r="3"/>
    <circle cx="400" cy="60" r="2.5"/>
  </g>`
);

/* 5. Portafolio Profesional: ventana de navegador + código */
files["portafolio-profesional.svg"] = wrap(
    "05",
    "Ilustración abstracta de una ventana de navegador con símbolos de código",
    `
  <g transform="translate(60,55)">
    <rect width="360" height="170" rx="14" fill="#0C1830" stroke="#00BFFF" stroke-width="1.4"/>
    <rect width="360" height="26" rx="14" fill="#00111f"/>
    <circle cx="20" cy="13" r="4" fill="#3b5478"/>
    <circle cx="36" cy="13" r="4" fill="#3b5478"/>
    <circle cx="52" cy="13" r="4" fill="#3b5478"/>
    <g fill="none" stroke="#A8B8CC" stroke-width="2" opacity="0.5">
      <line x1="26" y1="56" x2="120" y2="56"/>
      <line x1="26" y1="76" x2="160" y2="76"/>
      <line x1="26" y1="96" x2="100" y2="96"/>
      <line x1="26" y1="128" x2="140" y2="128"/>
      <line x1="26" y1="148" x2="90" y2="148"/>
    </g>
    <path d="M230 70 L200 100 L230 130 M260 70 L290 100 L260 130"
          fill="none" stroke="#00BFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`
);

for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(OUT_DIR, name), svg.trim() + "\n");
}

console.log("Generated:", Object.keys(files).join(", "));
