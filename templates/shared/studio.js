/* =========================================================
   HIMSISFO Shared Studio Script (templates/shared/studio.js)
   ========================================================= */

const ICONS = {
  book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
};
const SPARK = '<svg viewBox="0 0 24 24"><path d="M12 0C12.9 7.4 16.6 11.1 24 12 16.6 12.9 12.9 16.6 12 24 11.1 16.6 7.4 12.9 0 12 7.4 11.1 11.1 7.4 12 0Z"/></svg>';

document.querySelectorAll('[data-icon]').forEach((el) => {
  const name = el.dataset.icon;
  el.innerHTML = name === 'spark'
    ? SPARK
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
});

const HEADER = `
  <div class="brand">
    <img class="logo-hima" src="../../assets/logo-himsisfo.png" alt="Logo HIMSISFO" />
    <img class="logo-univ" src="../../assets/logo-universitas.jpg" alt="Logo Universitas Siber Asia" />
    <span class="vr"></span>
    <div class="brand-text"><b>HIMSISFO</b><span>Himpunan Mahasiswa Sistem Informasi</span></div>
  </div>
  <div class="tagline"><span class="c">CONNECT</span><span class="r">CREATE</span><span class="e">EMPOWER</span></div>`;

const FOOTER = `
  <svg viewBox="0 0 1080 86" preserveAspectRatio="none">
    <defs>
      <linearGradient id="ftGradL" x1="0" y1="0" x2="540" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#2DD4BF"/>
        <stop offset="60%" stop-color="#06B6D4"/>
        <stop offset="100%" stop-color="#2563EB"/>
      </linearGradient>
      <linearGradient id="ftGradR" x1="540" y1="0" x2="1080" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#2563EB"/>
        <stop offset="50%" stop-color="#7C3AED"/>
        <stop offset="100%" stop-color="#A855F7"/>
      </linearGradient>
    </defs>
    <path d="M0 10 C120 48, 290 52, 540 38 C790 24, 960 40, 1080 6 L1080 86 L0 86 Z" fill="url(#ftGradL)" opacity="0.92"/>
    <path d="M0 32 C180 56, 390 42, 680 36 C860 32, 990 18, 1080 4 L1080 86 L0 86 Z" fill="url(#ftGradR)" opacity="0.88"/>
    <path d="M0 24 C170 48, 380 38, 620 38 C830 38, 975 30, 1080 18 L1080 86 L0 86 Z" fill="#0B1F3A"/>
  </svg>
  <div class="footer-content">
    <b>HIMSISFO</b><span class="bar"></span><span>Menghubungkan <span class="dot">·</span> Berkarya <span class="dot">·</span> Memberdayakan</span>
  </div>`;

document.querySelectorAll('[data-tpl="header"]').forEach((el) => (el.innerHTML = HEADER));
document.querySelectorAll('[data-tpl="footer"]').forEach((el) => (el.innerHTML = FOOTER));

const zoomSel = document.getElementById('zoom');
zoomSel?.addEventListener('change', () => {
  document.querySelectorAll('.frame').forEach((f) => f.style.setProperty('--s', zoomSel.value));
});

const toast = (msg) => {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2800);
};

async function exportPoster(node, filename) {
  if (location.protocol === 'file:') {
    toast('Buka lewat local server (`npx serve .`) atau GitHub Pages untuk me-render template menjadi PNG.');
    return;
  }
  await document.fonts.ready;
  const w = Number(node.dataset.w) || 1080;
  const h = Number(node.dataset.h) || 1350;
  const ratio = Number(document.getElementById('ratio')?.value) || 1;
  const opts = {
    width: w, height: h,
    pixelRatio: ratio,
    cacheBust: true,
    style: { transform: 'none', margin: '0' },
  };
  toast(`Membuat ${filename}…`);
  await htmlToImage.toPng(node, opts);
  const blob = await htmlToImage.toBlob(node, opts);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast(`✔ ${filename} berhasil diunduh!`);
}

document.querySelectorAll('.item').forEach((item) => {
  const id = item.dataset.id;
  const poster = document.getElementById(id);
  item.querySelector('[data-dl]')?.addEventListener('click', (e) => {
    e.preventDefault();
    exportPoster(poster, `${id}.png`);
  });
});
