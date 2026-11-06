/* samorodin3d — clean edition. Data, sliders, video and motion. */
(() => {
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
// The motion is the point of this demo, so it runs even when the OS asks for less.
// Add ?calm to the URL to get the still version (restore the media query before launch if wanted).
const reduce = new URLSearchParams(location.search).has('calm');
if (reduce) document.documentElement.classList.add('calm');
const ART = id => `https://www.artstation.com/artwork/${id}`;

/* ---------------------------------------------------------------- data */
const PROJECTS = [
  { id: 'P6DK44', img: 'corvette-gran-sport', title: 'Corvette Gran Sport', cat: 'Automotive', year: '2025', tags: ['car', 'game'],
    tools: ['Blender', 'Substance Painter', 'Unreal Engine'],
    text: 'A race-spec Corvette Gran Sport in production as a marketplace asset. Modeled in Blender, textured in Substance Painter and presented in Unreal Engine.' },
  { id: '3dD1qA', img: 'man-cave-ue4', title: 'Man Cave Environment', cat: 'Environments', year: '2021', tags: ['env'],
    tools: ['Unreal Engine 4', '3ds Max', 'Substance', 'Quixel Mixer'],
    text: 'A man cave for car guys built in Unreal Engine 4. Every custom prop, from the jukebox and gas pump to the bar and signage, modeled in 3ds Max and textured with Substance and Quixel Mixer.' },
  { id: 'obawV4', img: 'titan-sled', title: 'Project Titan, Arctic Sled', cat: 'Props', year: '2024', tags: ['prop', 'game'],
    tools: ['Blender', 'Unreal Engine 5'],
    text: 'Art-jam contribution: an arctic sled and a two-wheeled wagon modeled in Blender, texture maps rebuilt and optimised in UE5, plus level layout for three islands.' },
  { id: 'JrdxnD', img: 'archviz-nfinite', title: 'Arch-viz Interiors', cat: 'Environments', year: '2025', tags: ['env', 'arch'],
    tools: ['3ds Max', 'V-Ray'],
    text: 'Interior visualisation for Nfinite: rooms designed from a given layout, modeled in 3ds Max and rendered in V-Ray with the client asset library. Includes 360° panoramas.' },
  { id: 'Ry2PLD', img: 'navy-vr-simulator', title: 'Navy VR Simulator', cat: 'VR & Sim', year: '2022', tags: ['vr', 'game'],
    tools: ['Unity', 'VR', 'Game ready'],
    text: 'Royal Canadian Navy boat training simulator with Calian / SimWave. Modeled from low-poly blockouts and real navy reference, with realistic textures and VR-optimised meshes.' },
  { id: '3EBg1Y', img: 'crossbow', title: 'Stylised Crossbow', cat: 'Props', year: '2025', tags: ['prop', 'game'],
    tools: ['Low / mid poly', 'Baking', 'Game ready'],
    text: 'A stylised game crossbow kept to a low and medium polygon budget, with detail baked down from the high poly.' },
  { id: 'R348gr', img: 'vintage-gas-pump', title: 'Vintage Gas Pump', cat: 'Props', year: '2021', tags: ['prop'],
    tools: ['3ds Max', 'Substance', 'UE4'],
    text: 'A vintage gas pump modeled from real-life reference for a UE4 scene. Modeled in 3ds Max, textured in Substance.' },
  { id: 'L3PmL5', img: 'automotive-furniture', title: 'Automotive Furniture', cat: 'Automotive', year: '2021', tags: ['car', 'prop'],
    tools: ['3ds Max', 'Substance'],
    text: 'Furniture built from car parts, from tyre tables to bucket-seat chairs and tailgate sofas, designed for the Man Cave scene.' },
  { id: 'q9vXbe', img: 'retro-fridge', title: 'Retro Fridge', cat: 'Props', year: '2020', tags: ['prop'],
    tools: ['3ds Max', 'Substance Painter'],
    text: 'A retro fridge for a large UE4 scene, modeled in 3ds Max and textured in Substance Painter.' },
  { id: 'AqzoXN', img: 'excalibur-sword', title: 'Excalibur in Stone', cat: 'Props', year: '2021', tags: ['prop'],
    tools: ['ZBrush', '3ds Max', 'Substance Painter', 'Substance Stager'],
    text: 'Sword model challenge: sculpted in ZBrush, built in 3ds Max, textured in Substance Painter and lit in Substance Stager with a Megascans rock.' },
  { id: 'YegvqX', img: 'bar-tap', title: 'Bar Tap', cat: 'Props', year: '2020', tags: ['prop'],
    tools: ['3ds Max', 'Substance Painter', 'Marmoset'],
    text: 'A bar tap for the UE4 Man Cave scene. Modeled in 3ds Max, textured in Substance Painter, extra renders in Marmoset.' },
  { id: 'NqLDd1', img: 'zeph-chair', title: 'Zeph Chair Retopo', cat: 'Props', year: '2025', tags: ['prop', 'retopo'],
    tools: ['Blender', 'Substance Painter', 'Retopology'],
    text: 'Clean retopology of the Herman Miller Zeph chair in Blender, re-textured in Substance Painter.' },
  { id: 'oJEvq4', img: 'croc-shoe', title: 'Croc Shoe', cat: 'Props', year: '2026', tags: ['prop'],
    tools: ['Blender', 'Substance Painter'],
    text: 'A Croc modeled by hand in Blender for an art assessment, textured in Substance Painter and rendered in Blender, shelving unit included.' },
  { id: 'elbqEX', img: 'indigenous-interior', title: 'Indigenous Interior', cat: 'Environments', year: '2024', tags: ['env', 'arch'],
    tools: ['Modeling', 'Texturing'],
    text: 'An Indigenous interior design project with Maheshinder Singh. I modeled and textured the furniture pieces.' },
  { id: 'JevY4a', img: 'render-practice', title: 'Living Room Study', cat: 'Environments', year: '2021', tags: ['env', 'arch'],
    tools: ['Substance Stager'],
    text: 'A scene recreated from a reference image, then modeled, textured and rendered in Substance Stager.' },
  { id: '9N2ly', img: 'concept-car', title: 'Concept Roadster', cat: 'Automotive', year: '2015', tags: ['car'],
    tools: ['Original design', 'Hard surface'],
    text: 'Graduating project at VCAD: an original roadster design taken from concept to a finished environment render.' },
  { id: 'B3488', img: 'ferrari-testarossa', title: 'Ferrari Testarossa', cat: 'Automotive', year: '2015', tags: ['car'],
    tools: ['Hard surface', 'Lighting'],
    text: 'Ferrari Testarossa modeled together with its garage environment.' },
  { id: 'QnzKbL', img: 'banging-rocks', title: 'A Wall Opens, VR Props', cat: 'VR & Sim', year: '2020', tags: ['vr', 'prop'],
    tools: ['Unity', 'VR'],
    text: 'Props for Banging Rocks Studios’ VR project, made with lead artist Phoebe on final textures and integrated into Unity by me.' },
  { id: 'vDGXEa', img: 'crypto-cities', title: 'Crypto Cities VR', cat: 'VR & Sim', year: '2022', tags: ['vr'],
    tools: ['Unity', 'VR', 'Collisions'],
    text: 'Technical support for voxel artists bringing a city game into VR in Unity, covering collisions and asset layout.' },
  { id: 'WXv0XX', img: 'bunnyops-animation', title: 'BunnyOps Animation', cat: 'Animation', year: '2025', tags: ['anim', 'game'],
    tools: ['Animation clean up'],
    text: 'Gameplay animations cleaned up for the game BunnyOps.' },
  { id: 'K3gOPr', img: 'reel-2026', title: 'Disney Firebuds Finaling', cat: 'Animation', year: '2023', tags: ['anim'],
    tools: ['Maya', 'Alembic', 'Arnold'],
    text: 'Shot finaling at ICON Creative Studio: fixed character rigs and animation errors in Maya across up to 34 episodes, testing shots with Alembic and Arnold.' },
];
const BY_ID = Object.fromEntries(PROJECTS.map(p => [p.id, p]));

const ICON = {
  car: 'car-profile', prop: 'cube', env: 'house-line', arch: 'buildings',
  vr: 'virtual-reality', game: 'game-controller', retopo: 'polygon', anim: 'film-slate',
};
const CATS = [
  { key: 'car',    name: 'Automotive' },
  { key: 'prop',   name: 'Hard-surface props' },
  { key: 'env',    name: 'Environments' },
  { key: 'arch',   name: 'Arch-viz', hot: true },
  { key: 'vr',     name: 'VR & simulation' },
  { key: 'game',   name: 'Game ready' },
  { key: 'retopo', name: 'Retopology' },
  { key: 'anim',   name: 'Animation' },
];
const TABS = [{ key: 'all', name: 'All work' }, ...CATS.filter(c => ['car', 'prop', 'env', 'vr'].includes(c.key))];

const STUDIOS = [
  { img: 'archviz-nfinite', org: 'Nfinite', role: 'Arch-viz artist', year: '2025', text: 'Rooms designed from client layouts, modeled in 3ds Max and rendered in V-Ray for product visualisation, including 360° panoramas.' },
  { img: 'titan-sled', org: 'Project Titan art jam', role: 'Prop & layout artist', year: '2024', text: 'Two hero props for a shared world, textures re-optimised in UE5, and the layout of three level areas.' },
  { initials: 'IC', org: 'ICON Creative Studio', role: 'Shot finaling, Disney Firebuds', year: '2022–23', text: 'Fixed character rigs and animation sequences for up to 34 episodes, with an Alembic pipeline and Arnold test renders.' },
  { img: 'navy-vr-simulator', org: 'Calian / SimWave', role: '3D modeler', year: '2022', text: 'Royal Canadian Navy VR boat simulator, with real-world-accurate, game-optimised meshes and textures.' },
  { img: 'crypto-cities', org: 'Crypto Cities', role: 'Technical artist', year: '2021–22', text: 'Helped voxel artists bring their city game to VR: collisions, layout and Unity integration.' },
  { img: 'banging-rocks', org: 'Banging Rocks Studios', role: '3D modeler', year: '2020–21', text: 'Modeled props for the VR quest “A Wall Opens” and integrated them into Unity.' },
  { img: 'concept-car', org: 'VCAD, Vancouver', role: 'Graduate, 3D', year: '2015', text: 'Graduating portfolio: an original concept car and a Ferrari Testarossa garage render.' },
];

const EXPLORE = [
  { id: '3dD1qA', title: 'Building a whole room in UE4', text: 'Fifteen-plus custom props, one consistent texel density and a single lighting pass. How the Man Cave stayed coherent as it grew.' },
  { id: 'Ry2PLD', title: 'Accuracy for a navy simulator', text: 'Training only works when the hardware matches the real boat. Blockouts were rebuilt against navy reference and trimmed for VR frame rates.' },
  { id: 'JrdxnD', title: 'Arch-viz to a client layout', text: 'Rooms designed from a floor plan, dressed with the client asset library and rendered in V-Ray, with panoramas for every space.' },
];

const MARQUEE = ['Clean topology', 'PBR textures', 'Game ready', 'Real-world reference', 'Unreal Engine 5', 'VR optimised', 'Arch-viz in V-Ray', 'Delivered on time'];

/* ---------------------------------------------------------------- build */
const ph = n => `<svg class="ph" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const arrow = ph('b-arrow-right');
const svg = k => ph('d-' + ICON[k]);

$('#mtrack').innerHTML = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map(t => `<span>${t}</span>`).join('');

/* marquee: a script loop, like the old <marquee> tag, so it always flows.
   It drifts left on its own; scrolling pushes it faster in the direction you scroll. */
(() => {
  const mt = $('#mtrack'), SPEED = 90; // px per second
  let x = 0, dir = 1, boost = 0, last = performance.now(), lastY = scrollY;
  function tick(now) {
    const dt = Math.min(now - last, 50); last = now;
    const dy = scrollY - lastY; lastY = scrollY;
    if (dy) { dir = dy > 0 ? 1 : -1; boost = Math.min(boost + Math.abs(dy) * .35, 28); }
    boost *= .92;
    x -= dir * (SPEED * dt / 1000 + boost);
    const half = mt.scrollWidth / 2;
    if (half) { while (x <= -half) x += half; while (x > 0) x -= half; }
    mt.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

$('#catCards').innerHTML = CATS.map(c => {
  const n = PROJECTS.filter(p => p.tags.includes(c.key)).length;
  return `<button class="cat${c.hot ? ' hot' : ''}" type="button" data-key="${c.key}">
    <span class="tile">${svg(c.key)}</span><h4>${c.name}</h4><small>${n} project${n === 1 ? '' : 's'}</small></button>`;
}).join('');
$('#fcats').innerHTML = CATS.slice(0, 5).map(c => `<li><a href="#work" data-key="${c.key}">${c.name}</a></li>`).join('');

$('#ttrack').innerHTML = STUDIOS.map(s => `<article class="tcard">
  <span class="q" aria-hidden="true">&rdquo;</span>
  ${s.img ? `<img src="img/${s.img}.webp" alt="" width="76" height="76" loading="lazy">` : `<span class="ava">${s.initials}</span>`}
  <b>${s.org}</b><p class="role">${s.role}</p><p>${s.text}</p><span class="tag">${s.year}</span></article>`).join('');

$('#exgrid').innerHTML = EXPLORE.map(e => {
  const p = BY_ID[e.id];
  return `<article class="ex" data-id="${p.id}" tabindex="0">
    <div class="pic"><img src="img/${p.img}.webp" alt="${p.title}" loading="lazy"></div>
    <div class="body"><h4>${e.title}</h4><p>${e.text}</p><span class="more">Read more ${arrow}</span></div></article>`;
}).join('');

/* ---------------------------------------------------------------- gallery: three drifting columns */
const GALLERY = ['3dD1qA', 'P6DK44', 'q9vXbe', 'AqzoXN', 'JrdxnD', 'oJEvq4', 'obawV4', 'YegvqX', '3EBg1Y',
  'elbqEX', 'L3PmL5', 'JevY4a', 'R348gr', 'NqLDd1', 'QnzKbL', 'B3488', '9N2ly', 'WXv0XX'];
$('#gal').innerHTML = [0, 1, 2].map(c => `<div class="gcol">${GALLERY.filter((_, i) => i % 3 === c).map(id => {
  const p = BY_ID[id];
  return `<figure class="gtile" data-id="${p.id}" tabindex="0"><img src="img/${p.img}.webp" alt="${p.title}" loading="lazy">
    <figcaption><b>${p.title}</b><span>${p.cat} · ${p.year}</span></figcaption></figure>`;
}).join('')}</div>`).join('');

/* ---------------------------------------------------------------- work slider */
const track = $('#wtrack'), tabs = $('#tabs'), prev = $('#prev'), next = $('#next');
let filter = 'all', page = 0;

function renderTabs() {
  const list = TABS.some(t => t.key === filter) ? TABS : [...TABS, CATS.find(c => c.key === filter)];
  tabs.innerHTML = list.map(t =>
    `<button class="tab" type="button" role="tab" data-key="${t.key}" aria-selected="${t.key === filter}">${t.name}</button>`).join('');
}
function renderWork() {
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));
  track.innerHTML = items.map(p => `<article class="wcard" data-id="${p.id}" tabindex="0">
    <div class="pic"><img src="img/${p.img}.webp" alt="${p.title}" loading="lazy"><span class="chip">${p.cat}</span><span class="go">${arrow}</span><span class="yr">${p.year}</span></div>
    <div class="body"><h4>${p.title}</h4><p>${p.text}</p>
      <div class="meta"><span class="open">View</span>
        <span>${ph('d-calendar-blank')}${p.year}</span>
        <span>${ph('d-wrench')}${p.tools[0]}</span></div></div></article>`).join('');
  page = 0; slide();
  if (window.gsap && !reduce) gsap.fromTo(track.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .05, ease: 'power3.out' });
}
function perView() { const c = track.children[0]; return c ? Math.max(1, Math.round(track.clientWidth / c.offsetWidth)) : 1; }
function slide() {
  const cards = track.children, pv = perView();
  const max = Math.max(0, cards.length - pv);
  page = Math.min(Math.max(page, 0), max);
  const x = cards[page] ? cards[page].offsetLeft - cards[0].offsetLeft : 0;
  track.style.transform = `translateX(${-x}px)`;
  prev.disabled = page === 0; next.disabled = page >= max;
  prev.classList.toggle('on', page > 0); next.classList.toggle('on', page < max);
}
function setFilter(key, jump) {
  filter = key; renderTabs(); renderWork();
  if (jump) scrollTo('#work');
}
tabs.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) setFilter(b.dataset.key); });
prev.addEventListener('click', () => { page -= perView(); slide(); });
next.addEventListener('click', () => { page += perView(); slide(); });
addEventListener('resize', slide);
$('#catCards').addEventListener('click', e => {
  const c = e.target.closest('.cat'); if (!c) return;
  $$('.cat').forEach(x => x.classList.toggle('hot', x === c));
  setFilter(c.dataset.key, true);
});
$('#fcats').addEventListener('click', e => { const a = e.target.closest('a'); if (a) { e.preventDefault(); setFilter(a.dataset.key, true); } });
// swipe on touch
let sx = null;
track.addEventListener('touchstart', e => sx = e.touches[0].clientX, { passive: true });
track.addEventListener('touchend', e => {
  if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null;
  if (Math.abs(dx) > 40) { page += dx < 0 ? 1 : -1; slide(); }
});
renderTabs(); renderWork();

/* ---------------------------------------------------------------- studios slider */
const ttrack = $('#ttrack'), pager = $('#tpager');
let tpage = 0, ttimer;
function tPages() { const c = ttrack.children[0]; const pv = Math.max(1, Math.round(ttrack.clientWidth / c.offsetWidth)); return Math.max(1, ttrack.children.length - pv + 1); }
function tGo(i) {
  const n = tPages(); tpage = (i + n) % n;
  ttrack.style.transform = `translateX(${ttrack.children[0].offsetLeft - ttrack.children[tpage].offsetLeft}px)`;
  pager.innerHTML = Array.from({ length: n }, (_, k) => `<button type="button" aria-label="Show studio ${k + 1}" aria-current="${k === tpage}" data-i="${k}"></button>`).join('');
  clearTimeout(ttimer); if (!reduce) ttimer = setTimeout(() => tGo(tpage + 1), 4800);
}
pager.addEventListener('click', e => { const b = e.target.closest('button'); if (b) tGo(+b.dataset.i); });
addEventListener('resize', () => tGo(tpage));
tGo(0);

/* ---------------------------------------------------------------- viewer */
const viewer = $('#viewer');
let lastFocus;
function openViewer(id) {
  const p = BY_ID[id]; if (!p) return;
  lastFocus = document.activeElement;
  $('#vImg').src = `img/${p.img}.webp`; $('#vImg').alt = p.title;
  $('#vCat').textContent = `${p.cat} · ${p.year}`;
  $('#vTitle').textContent = p.title;
  $('#vText').textContent = p.text;
  $('#vTools').innerHTML = p.tools.map(t => `<span>${t}</span>`).join('');
  $('#vLink').href = ART(p.id);
  viewer.hidden = false; lenis && lenis.stop();
  if (window.gsap) gsap.fromTo('.vbox', { y: 40, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: .5, ease: 'power3.out' });
  $('#vClose').focus();
}
function closeViewer() { viewer.hidden = true; lenis && lenis.start(); lastFocus && lastFocus.focus(); }
document.addEventListener('click', e => {
  const card = e.target.closest('.wcard,.ex,.gtile'); if (card) openViewer(card.dataset.id);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !viewer.hidden) closeViewer();
  if (e.key === 'Enter' && e.target.matches('.wcard,.ex,.gtile')) openViewer(e.target.dataset.id);
});
$('#vClose').addEventListener('click', closeViewer);
viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });

/* ---------------------------------------------------------------- video: play only while visible */
const vids = $$('video');
const vio = new IntersectionObserver(es => es.forEach(en => {
  const v = en.target;
  if (en.isIntersecting && !v.dataset.paused) v.play().catch(() => {}); else v.pause();
}), { threshold: .25 });
vids.forEach(v => vio.observe(v));
const reel = $('#reelVideo'), reelBtn = $('#reelToggle');
reelBtn.addEventListener('click', () => {
  const pause = !reel.paused;
  reel.dataset.paused = pause ? '1' : '';
  pause ? reel.pause() : reel.play();
  reelBtn.firstChild.textContent = pause ? 'Play the Reel ' : 'Pause the Reel ';
  $('.ic', reelBtn).innerHTML = ph(pause ? 'b-play' : 'b-pause');
});
const pad = n => String(n).padStart(2, '0');
reel.addEventListener('timeupdate', () => {
  const t = reel.currentTime;
  $('#reelTc').textContent = `00:${pad(Math.floor(t))}:${pad(Math.floor((t % 1) * 24))}`;
});

/* ---------------------------------------------------------------- quote + contact */
$('#quote')?.addEventListener('submit', e => {
  e.preventDefault();
  const what = $('#qWhat').value, where = $('#qWhere').value;
  if (what || where) $('#newsLine').textContent = `${what || 'A 3D asset'}${where ? ' for ' + where : ''}. Leave an email and you will get a scope, a price and a date back.`;
  scrollTo('#contact');
  setTimeout(() => $('#nemail').focus({ preventScroll: true }), 900);
});
$('#nform').addEventListener('submit', e => {
  e.preventDefault();
  $('#nnote').textContent = `Thanks. This is an unofficial concept demo, so nothing was sent.`;
  $('#nemail').value = '';
});

/* ---------------------------------------------------------------- nav */
const nav = $('#nav'), burger = $('#burger');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
$$('.menu a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));
const secs = $$('.menu a').map(a => $(a.getAttribute('href')));
const totop = $('#totop'), bar = $('#progress');
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  nav.classList.toggle('scrolled', y > 10);
  totop.classList.toggle('show', y > innerHeight);
  bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  let cur = -1;
  secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = i; });
  $$('.menu a').forEach((a, i) => a.classList.toggle('on', i === cur));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------------- smooth scroll */
let lenis = null;
if (window.Lenis && !reduce) {
  // lerp rather than a fixed duration: the page follows the wheel at once and glides to a stop
  lenis = new Lenis({ lerp: .085, wheelMultiplier: 1, smoothWheel: true, touchMultiplier: 1.4 });
  if (window.gsap) {
    lenis.on('scroll', () => window.ScrollTrigger && ScrollTrigger.update());
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
  }
}
function scrollTo(sel) {
  const el = typeof sel === 'string' ? $(sel) : sel; if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.3 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
  const id = a.getAttribute('href'); if (id.length < 2) return;
  e.preventDefault(); scrollTo(id === '#top' ? document.body : id);
});

/* ---------------------------------------------------------------- hero work row */
$('.hero-work').addEventListener('click', e => { const f = e.target.closest('.hw[data-id]'); if (f) openViewer(f.dataset.id); });

/* ---------------------------------------------------------------- custom cursor
   Mouse only. A dot that tracks exactly and a ring that trails it. Over links the ring becomes a
   glowing disc; over pictures it becomes a labelled disc (View, Play, Zoom). */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const cur = $('#cur'), dot = $('.cur-dot', cur), ring = $('.cur-ring', cur), label = $('.cur-label', cur);
  document.documentElement.classList.add('has-cur');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, seen = false;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    if (!seen) { seen = true; rx = mx; ry = my; }
    dot.style.transform = `translate(${mx}px,${my}px)`;
    const t = e.target;
    const field = t.closest('input,select,textarea');
    const pic = !field && t.closest('.wcard,.gtile,.ex,.hw,.reel-frame,.phone');
    const link = !field && !pic && t.closest('a,button,[role="tab"],.cat,.tab,.strack span,label');
    cur.classList.toggle('text', !!field);
    cur.classList.toggle('view', !!pic);
    cur.classList.toggle('link', !!link);
    if (pic) label.textContent = pic.matches('.hw-reel,.reel-frame,.phone') ? 'Play' : 'View';
  }, { passive: true });
  addEventListener('pointerdown', () => cur.classList.add('down'));
  addEventListener('pointerup', () => cur.classList.remove('down'));
  document.addEventListener('mouseleave', () => { cur.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { cur.style.opacity = 1; });
  (function follow() {
    rx += (mx - rx) * .2; ry += (my - ry) * .2;
    ring.style.transform = `translate(${rx}px,${ry}px)` + (cur.classList.contains('down') ? ' scale(.82)' : '');
    requestAnimationFrame(follow);
  })();
}

/* ---------------------------------------------------------------- hover strike
   Every picture frame gets a light streak layer. Cards are re-rendered by the filters,
   so new frames are picked up as they appear. */
const SHINE_HOSTS = '.wcard .pic, .ex .pic, .gtile, .hw-pic, .reel-frame, .phone, .vpic';
function addShine(root = document) {
  $$(SHINE_HOSTS, root.nodeType === 1 ? root.parentNode || root : root).forEach(h => {
    if (!h.querySelector(':scope > .shine')) h.insertAdjacentHTML('beforeend', '<span class="shine" aria-hidden="true"></span>');
  });
}
addShine();
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && addShine(n))))
  .observe(document.body, { childList: true, subtree: true });

/* ---------------------------------------------------------------- motion */
$$('[data-words]').forEach(h => {
  h.innerHTML = h.textContent.trim().split(/\s+/).map(w => `<span class="w"><span>${w}</span></span>`).join(' ');
});
const counters = $$('[data-count]');
function count(el) {
  const to = +el.dataset.count, o = { v: 0 };
  if (!window.gsap || reduce) { el.textContent = to; return; }
  gsap.to(o, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(o.v) });
}

if (window.gsap && window.ScrollTrigger && !reduce) {
  gsap.registerPlugin(ScrollTrigger);
  const fine = matchMedia('(hover:hover) and (pointer:fine) and (min-width:981px)').matches;
  const scrub = (trigger, start = 'top bottom', end = 'bottom top', s = .5) => ({ trigger, start, end, scrub: s });

  /* ---- hero entrance: a quiet fade-up, nothing more */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.nav .shell > *', { y: -16, opacity: 0, duration: .7, stagger: .05 }, 0)
    .from('.hero-eyebrow, .hero-title, .hero-lead, .hero-ctas', { y: 24, opacity: 0, duration: .9, stagger: .08 }, .1)
    .from('.hw', { y: 40, opacity: 0, duration: 1, stagger: .1 }, .4)
    .from('.hero-stats > *', { y: 16, opacity: 0, duration: .8, stagger: .06 }, .7);

  /* ---- headings: word by word, further and slower than a fade */
  $$('[data-words]').forEach(h => {
    if (h.closest('.hero')) return;
    gsap.from($$('.w>span', h), { yPercent: 115, rotate: 3, opacity: 0, duration: 1.05, ease: 'expo.out', stagger: .042,
      scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });
  $$('.sec-head .lead').forEach(el => gsap.from(el, { y: 30, opacity: 0, filter: 'blur(8px)', duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));

  /* ---- blur-rise reveals, batched so neighbours stagger */
  const risers = $$('[data-rise]');
  gsap.set(risers, { y: 56, opacity: 0, filter: 'blur(10px)' });
  ScrollTrigger.batch(risers, { start: 'top 90%', once: true,
    onEnter: b => gsap.to(b, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.15, ease: 'expo.out', stagger: .13 }) });
  // hover transitions on transform fight a tween, so they are off until the card has landed
  const landing = els => ({ onStart() { els.forEach(e => e.classList.add('landing')); },
    onComplete() { els.forEach(e => e.classList.remove('landing')); gsap.set(els, { clearProps: 'transform,filter' }); } });
  $$('[data-stagger]').forEach(g => gsap.from(g.children, { y: 52, opacity: 0, scale: .94, filter: 'blur(9px)', duration: 1.05, ease: 'expo.out', stagger: .11,
    ...landing([...g.children]), scrollTrigger: { trigger: g, start: 'top 90%', once: true } }));
  gsap.from('.cat', { y: 50, opacity: 0, scale: .94, filter: 'blur(8px)', duration: 1, ease: 'expo.out', stagger: .07, ...landing($$('.cat')),
    scrollTrigger: { trigger: '#catCards', start: 'top 88%', once: true } });
  gsap.from('.tabsrow', { y: 30, opacity: 0, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: '.tabsrow', start: 'top 92%', once: true } });
  gsap.from('.wviewport', { x: 120, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.wviewport', start: 'top 90%', once: true } });
  gsap.from('.tslider', { x: 120, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.tslider', start: 'top 90%', once: true } });
  gsap.from('.crow', { x: -40, opacity: 0, duration: .8, ease: 'expo.out', stagger: .06, scrollTrigger: { trigger: '.cover', start: 'top 85%', once: true } });

  /* ---- scrubbed decoration */
  $$('.dots-deco span').forEach((s, i) => gsap.to(s, { y: -40 - (i % 4) * 22, x: i % 2 ? 18 : -14, ease: 'none', scrollTrigger: scrub(s.closest('.sec'), 'top bottom', 'bottom top', .7) }));
  $$('.ex .pic img').forEach(img => gsap.fromTo(img, { yPercent: -7, scale: 1.16 }, { yPercent: 7, scale: 1.16, ease: 'none', scrollTrigger: scrub(img.parentElement, 'top bottom', 'bottom top', .35) }));
  gsap.fromTo('.reel-frame', { rotateX: 16, rotateY: -12, scale: .88, y: 40, transformPerspective: 1200 },
    { rotateX: 0, rotateY: 0, scale: 1, y: -20, ease: 'none', scrollTrigger: scrub('#reel', 'top bottom', 'center center', .5) });
  gsap.fromTo('.phonewrap', { y: 70, rotate: 5 }, { y: -40, rotate: -2, ease: 'none', scrollTrigger: scrub('.band', 'top bottom', 'bottom top', .5) });
  gsap.from('.ptag', { opacity: 0, filter: 'blur(8px)', duration: 1, stagger: .2, scrollTrigger: { trigger: '.phonewrap', start: 'top 80%', once: true } });
  gsap.from('.bstat', { y: 40, opacity: 0, scale: .9, duration: 1, ease: 'back.out(1.6)', stagger: .12, scrollTrigger: { trigger: '.bstats', start: 'top 90%', once: true } });
  gsap.fromTo('.news', { y: 70, scale: .94 }, { y: 0, scale: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.news', start: 'top 94%', once: true } });
  gsap.from('.fgrid > *', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: '.fgrid', start: 'top 95%', once: true } });
  if (matchMedia('(min-width:981px)').matches) {
    gsap.fromTo('.strip a', { x: i => 30 + i * 22 }, { x: 0, ease: 'none', scrollTrigger: scrub('.strip', 'top bottom', 'center center', .5) });
  }

  /* ---- marquee: the inner track loops in CSS, the outer wrapper takes the push from the
     scrollbar. Two elements, because a CSS animation would override an inline transform. */
  // (the marquee is pushed by its own loop near the top of this file)

  /* ---- gallery: outer columns rise faster than the middle one, tiles open like a shutter */
  if (matchMedia('(min-width:821px)').matches) {
    $$('.gcol').forEach((col, i) => gsap.fromTo(col, { y: [90, -40, 140][i] }, { y: [-90, 60, -140][i], ease: 'none', scrollTrigger: scrub('#gallery', 'top bottom', 'bottom top', .6) }));
  }
  $$('.gtile').forEach(t => gsap.from(t, { clipPath: 'inset(18% 10% 18% 10% round 14px)', opacity: 0, scale: .92, duration: 1.2, ease: 'expo.out',
    scrollTrigger: { trigger: t, start: 'top 92%', once: true } }));
  $$('.gtile img').forEach(img => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: scrub(img.parentElement, 'top bottom', 'bottom top', .4) }));

  /* ---- skills flow: the rail fills with scroll and lights each stage as it arrives */
  const stages = $$('.stage'), vertical = () => matchMedia('(max-width:820px)').matches;
  ScrollTrigger.create({
    trigger: '#flow', start: 'top 75%', end: 'bottom 55%', scrub: .6,
    onUpdate: st => {
      const p = st.progress;
      $('#flowFill').style.transform = vertical() ? `scaleY(${p})` : `scaleX(${p})`;
      stages.forEach((s, i) => s.classList.toggle('lit', p >= i / (stages.length - 1) - .02));
    },
  });
  gsap.from('.stage', { y: 50, opacity: 0, filter: 'blur(8px)', duration: 1, ease: 'expo.out', stagger: .12, ...landing($$('.stage')), scrollTrigger: { trigger: '#flow', start: 'top 88%', once: true } });

  /* ---- skill rows stream in opposite directions and speed up with scroll velocity */
  const rows = $$('.srow').map(r => {
    const t = $('.strack', r); t.innerHTML += t.innerHTML; // two copies for a seamless loop
    return { t, dir: +r.dataset.dir, x: r.dataset.dir === '-1' ? -t.scrollWidth / 2 : 0 };
  });
  let boost = 0;
  ScrollTrigger.create({ trigger: '.skillflow', start: 'top bottom', end: 'bottom top',
    onUpdate: st => { boost = Math.min(Math.abs(st.getVelocity()) / 120, 14); } });
  gsap.ticker.add((_, dt) => {
    boost *= .93;
    rows.forEach(r => {
      const half = r.t.scrollWidth / 2;
      r.x -= r.dir * (0.6 + boost) * (dt / 16.7);
      if (r.x <= -half) r.x += half;
      if (r.x > 0) r.x -= half;
      r.t.style.transform = `translate3d(${r.x}px,0,0)`;
    });
  });
  gsap.from('.srow', { opacity: 0, x: i => i ? -140 : 140, duration: 1.3, ease: 'expo.out', stagger: .1, scrollTrigger: { trigger: '.skillflow', start: 'top 92%', once: true } });

  /* ---- pointer: light follows the cursor across cards; category cards tilt; buttons pull */
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.wcard,.ex,.tcard,.stage'); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
  }, { passive: true });
  if (fine) {
    const grid = $('#catCards');
    grid.addEventListener('pointermove', e => {
      const c = e.target.closest('.cat'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      gsap.to(c, { rotateY: x * 12, rotateX: -y * 12, y: -8, duration: .5, ease: 'power2.out', transformPerspective: 760, overwrite: 'auto' });
      gsap.to($$('.cat', grid).filter(o => o !== c), { rotateY: 0, rotateX: 0, y: 0, duration: .7, ease: 'expo.out', overwrite: 'auto' });
    }, { passive: true });
    grid.addEventListener('pointerleave', () => gsap.to('.cat', { rotateY: 0, rotateX: 0, y: 0, duration: .7, ease: 'expo.out', overwrite: 'auto' }));
    // work cards lean toward the pointer and lift
    const wt = $('#wtrack');
    wt.addEventListener('pointermove', e => {
      const c = e.target.closest('.wcard'); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      gsap.to(c, { rotateY: x * 8, rotateX: -y * 8, y: -10, duration: .5, ease: 'power2.out', transformPerspective: 900, overwrite: 'auto' });
    }, { passive: true });
    wt.addEventListener('pointerout', e => {
      const c = e.target.closest('.wcard'); if (c && !c.contains(e.relatedTarget)) gsap.to(c, { rotateY: 0, rotateX: 0, y: 0, duration: .8, ease: 'expo.out', overwrite: 'auto' });
    });
    $$('.btn-o, .arrows button').forEach(b => {
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); });
      b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.4)' }));
    });
  }

  counters.forEach(el => ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => count(el) }));
  setTimeout(() => ScrollTrigger.refresh(), 1400);
  addEventListener('load', () => ScrollTrigger.refresh());
} else {
  counters.forEach(count);
  $$('.stage').forEach(s => s.classList.add('lit'));
  $('#flowFill').style.transform = 'none';
}
})();
