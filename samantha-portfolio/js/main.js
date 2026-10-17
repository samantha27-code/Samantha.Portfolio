(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };

  /* Contact links (built programmatically) */
  const P = PROFILE;
  const links = {
    wa: `https://wa.me/${P.whatsapp}?text=${encodeURIComponent(P.waMessage)}`,
    mail: `mailto:${P.email}?subject=${encodeURIComponent(P.mailSubject)}`,
    gh: P.github, tel: `tel:${P.phoneTel}`
  };
  $$('[data-link]').forEach(a => {
    const k = a.dataset.link; a.href = links[k];
    if (k === 'wa' || k === 'gh') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  });
  $('#yr').textContent = new Date().getFullYear();

  /* Strengths & skills */
  $('#strengths').innerHTML = ['Problem-solving', 'Logical thinking', 'Willingness to learn', 'Teamwork', 'Communication', 'Time management'].map(s => `<span class="badge-x">${s}</span>`).join('');
  const skills = {
    'Programming Languages': ['C', 'Python', 'Java'], 'Web Development': ['HTML', 'CSS', 'JavaScript'],
    'Databases': ['SQL', 'MySQL', 'MongoDB'], 'Development Tools': ['Git', 'GitHub', 'VS Code']
  };
  $('#skillGrid').innerHTML = Object.entries(skills).map(([g, a]) => `<div class="col-sm-6 col-lg-3 reveal"><div class="card-x h-100"><h3 class="h6">${g}</h3><div class="d-flex flex-wrap gap-2">${a.map(x => `<span class="badge-x">${x}</span>`).join('')}</div><p class="small text-soft mt-3 mb-0">Listed on resume · not yet verified</p></div></div>`).join('');

  /* India clock */
  const tf = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const df = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const tick = () => { const d = new Date(); $('#clockTime').textContent = tf.format(d); $('#clockDate').textContent = df.format(d); };
  tick(); setInterval(tick, 1000);

  /* Courses */
  const cats = [...new Set(COURSES.map(c => c.category))].sort();
  $('#cCat').innerHTML = '<option value="">All</option>' + cats.map(c => `<option>${esc(c)}</option>`).join('');
  const count = s => COURSES.filter(c => c.status === s).length;
  $('#dash').innerHTML = [['Learning', 'In progress'], ['Planned', 'Planned'], ['Completed', 'Completed (verified)']].map(([s, l]) => `<div class="col-4"><div class="card-x text-center py-3"><div class="h3 mb-0">${count(s)}</div><div class="small text-soft">${l}</div></div></div>`).join('');
  const grid = $('#courseGrid');
  function render() {
    const q = $('#cSearch').value.trim().toLowerCase(), cat = $('#cCat').value, st = $('#cStatus').value;
    const list = COURSES.filter(c => (!q || c.title.toLowerCase().includes(q)) && (!cat || c.category === cat) && (!st || c.status === st));
    grid.innerHTML = list.map(c => `<div class="col-md-6 col-lg-4"><button type="button" class="card-x course-card h-100" data-id="${c.id}" aria-label="Open details: ${esc(c.title)}">
      <div class="d-flex justify-content-between align-items-start mb-2"><i class="bi ${c.icon} fs-2 icon-grad"></i><span class="status st-${c.status}">${c.status}</span></div>
      <h3 class="h5">${esc(c.title)}</h3><p class="text-soft small">${esc(c.description)}</p>
      <div class="d-flex flex-wrap gap-2"><span class="badge-x">${esc(c.category)}</span><span class="badge-x">${c.level}</span></div></button></div>`).join('');
    $('#cEmpty').hidden = list.length > 0;
    $('#cCount').textContent = `${list.length} course${list.length === 1 ? '' : 's'} shown`;
  }
  ['input', 'change'].forEach(e => ['#cSearch', '#cCat', '#cStatus'].forEach(s => $(s).addEventListener(e, render)));
  render();
  const modalEl = $('#courseModal');
  grid.addEventListener('click', e => {
    const b = e.target.closest('.course-card'); if (!b) return;
    const c = COURSES.find(x => x.id === b.dataset.id);
    $('#mTitle').textContent = c.title;
    $('#mBody').innerHTML = `<p class="text-soft">${esc(c.description)} <em>(Personal learning plan, not a completed qualification. Estimated ~${c.hours} hours.)</em></p>
      <div class="d-flex flex-wrap gap-2 mb-3"><span class="status st-${c.status}">${c.status}</span><span class="badge-x">${esc(c.category)}</span><span class="badge-x">${c.level}</span></div>
      <h4 class="h6">Learning objectives</h4><ul>${c.objectives.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
      <h4 class="h6">Prerequisites</h4><p>${c.prerequisites.map(esc).join(', ')}</p>
      <h4 class="h6">Modules</h4><ol>${c.modules.map(m => `<li><strong>${esc(m.title)}</strong><ul>${m.lessons.map(l => `<li>${esc(l)}</li>`).join('')}</ul></li>`).join('')}</ol>`;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  });

  /* Reveal on scroll */
  const rv = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  /* Active nav section */
  const navLinks = $$('.navbar .nav-link');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => so.observe(s));
  }
  // close mobile menu after choosing a link
  navLinks.forEach(a => a.addEventListener('click', () => { const n = $('#nav'); if (n.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(n).hide(); }));

  /* Optional cursor effect (desktop fine pointer only) */
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    const ring = $('.cur-ring'), dot = $('.cur-dot'), tg = $('#cursorToggle');
    let on = store.get('cursorFx') !== 'off', tx = 0, ty = 0, rx = 0, ry = 0, raf = 0;
    tg.hidden = false;
    const loop = () => {
      rx += (tx - rx) * .18; ry += (ty - ry) * .18;
      ring.style.transform = `translate(${rx}px,${ry}px)`; dot.style.transform = `translate(${tx}px,${ty}px)`;
      raf = requestAnimationFrame(loop);
    };
    const move = e => { tx = e.clientX; ty = e.clientY; };
    const over = e => {
      const t = e.target;
      ring.classList.toggle('hover', !!t.closest('a,button,select,summary,[role=button]'));
      const txt = !!t.closest('input,textarea');
      ring.classList.toggle('hide', txt); dot.classList.toggle('hide', txt);
    };
    const apply = () => {
      document.documentElement.classList.toggle('cursor-on', on); tg.setAttribute('aria-pressed', on);
      cancelAnimationFrame(raf);
      if (on) { addEventListener('pointermove', move, { passive: true }); addEventListener('pointerover', over, { passive: true }); raf = requestAnimationFrame(loop); }
      else { removeEventListener('pointermove', move); removeEventListener('pointerover', over); }
    };
    tg.addEventListener('click', () => { on = !on; store.set('cursorFx', on ? 'on' : 'off'); apply(); });
    apply();
  }

  /* Contact form: validates, then opens the visitor's own email app */
  const f = $('#cForm'), status = $('#fStatus');
  const setErr = (id, m) => { $('#e' + id).textContent = m; };
  f.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#fName').value.trim().slice(0, 80), email = $('#fEmail').value.trim(), msg = $('#fMsg').value.trim().slice(0, 1500);
    setErr('Name', name ? '' : 'Please enter your name.');
    setErr('Email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Please enter a valid email address.');
    setErr('Msg', msg.length >= 10 ? '' : 'Please write at least 10 characters.');
    if ($$('.err', f).some(x => x.textContent)) { status.textContent = 'Please fix the errors above.'; $$('.err', f).find(x => x.textContent).previousElementSibling.focus(); return; }
    const body = `${msg}\n\n— ${name} (${email})`;
    location.href = `mailto:${P.email}?subject=${encodeURIComponent(P.mailSubject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should now open with the message ready. Nothing is sent until you press Send there.';
  });
})();
