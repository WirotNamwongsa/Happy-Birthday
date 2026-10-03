// แก้ชื่อผู้รับ ผู้ส่ง และข้อความจดหมายได้ตรงนี้
const recipient = 'พี่น้ำ';
const sender = 'น้องเก้า';
const letterText = `สุขสันต์วันเกิดนะพี่น้ำ ขอให้ปีนี้เป็นปีที่สดใสและเต็มไปด้วยรอยยิ้ม
ขอบคุณที่เป็นพี่สาวที่น่ารักและใจดีกับน้องเก้าเสมอมา
ขอให้ทุกเรื่องที่ตั้งใจค่อยๆ สำเร็จ และมีคนดีๆอยู่ข้างๆเยอะๆ
ถ้าวันไหนเหนื่อยก็อย่าลืมพัก อย่าลืมดูเเลรักษาสุขภาพตัวเองด้วย
ขอให้ปีนี้เป็นปีที่ดีมากๆ มีความสุขในทุกๆวันเลยนะ`;

const sky = document.querySelector('#sky');
if (sky) {
  const colors = ['#ff9fbe', '#b7a0ef', '#8ed5e8', '#ffd48f', '#f6a8d5'];
  const orbColors = ['#ff9acb99', '#8edcf099', '#bd9df299', '#ffd88c99'];
  for (let i = 0; i < 9; i++) {
    const orb = document.createElement('i');
    orb.className = 'ambient-orb';
    orb.style.setProperty('--orb-x', `${Math.random() * 94}%`);
    orb.style.setProperty('--orb-y', `${Math.random() * 90}%`);
    orb.style.setProperty('--orb-size', `${75 + Math.random() * 125}px`);
    orb.style.setProperty('--orb-color', orbColors[i % orbColors.length]);
    orb.style.setProperty('--orb-duration', `${9 + Math.random() * 9}s`);
    orb.style.setProperty('--orb-delay', `${-Math.random() * 12}s`);
    sky.append(orb);
  }
  for (let i = 0; i < 22; i++) {
    const balloon = document.createElement('i');
    balloon.className = 'balloon'; balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.background = colors[i % colors.length]; balloon.style.borderColor = colors[i % colors.length];
    balloon.style.animationDuration = `${15 + Math.random() * 17}s`;
    balloon.style.animationDelay = `-${Math.random() * 28}s`; sky.append(balloon);
  }
  const starColors = ['#ffffff', '#ffe08a', '#f5b8dc', '#d0b8f6', '#a8dfec'];
  const starShapes = ['✦', '✧', '·', '♡'];
  for (let i = 0; i < 42; i++) {
    const star = document.createElement('i');
    star.className = 'bg-star'; star.textContent = starShapes[i % starShapes.length];
    star.style.setProperty('--star-x', `${Math.random() * 100}%`);
    star.style.setProperty('--star-y', `${Math.random() * 100}%`);
    star.style.setProperty('--star-color', starColors[i % starColors.length]);
    star.style.setProperty('--star-size', `${13 + Math.random() * 15}px`);
    star.style.setProperty('--star-duration', `${3 + Math.random() * 5}s`);
    star.style.setProperty('--star-delay', `${-Math.random() * 8}s`);
    sky.append(star);
  }
}

const title = document.querySelector('#birthday-title');
if (title) {
  const titleText = `Happy Birthday Na P'Nam`;
  // Keep Thai vowels and tone marks with their base character during the animation.
  const graphemes = typeof Intl.Segmenter === 'function'
    ? [...new Intl.Segmenter('th', { granularity: 'grapheme' }).segment(titleText)].map(part => part.segment)
    : [...titleText].reduce((items, char) => {
      if (/\p{Mark}/u.test(char) && items.length) items[items.length - 1] += char;
      else items.push(char);
      return items;
    }, []);
  graphemes.forEach((char, i) => {
    const span = document.createElement('span'); span.className = 'letter-pop';
    span.style.animationDelay = `${i * 55}ms`; span.textContent = char === ' ' ? '\u00a0' : char; title.append(span);
  });
}

const canvas = document.querySelector('#confetti');
const ctx = canvas?.getContext('2d'); let bits = [], confettiFrame = 0;
function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
if (canvas) { resizeCanvas(); addEventListener('resize', resizeCanvas); }
function celebrate() {
  if (!ctx) return;
  const colors = ['#ff7aa9', '#ffd166', '#a88beb', '#80d9e8', '#ffacd1', '#fff'];
  for (let i = 0; i < 180; i++) bits.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * .4, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4, size: 4 + Math.random() * 7, color: colors[i % colors.length], rot: Math.random() * 6 });
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight); bits = bits.filter(p => p.y < innerHeight + 30);
    for (const p of bits) { p.x += p.vx; p.y += p.vy; p.vy += .035; p.rot += .05; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * .65); ctx.restore(); }
    if (bits.length) confettiFrame = requestAnimationFrame(draw); else { confettiFrame = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  }
  if (!confettiFrame) draw();
}
const blowButton = document.querySelector('#blowBtn');
if (blowButton) {
  const holdDuration = 2400;
  let holdStarted = 0, holdFrame = 0, lastSparkAt = 0, magicLayer = null, isHolding = false;
  function addMagicSparks(progress) {
    for (let i = 0; i < 3; i++) {
      const spark = document.createElement('span');
      const symbols = ['✨', '💖', '⭐', '🫧'];
      const angle = -Math.PI / 2 + (Math.random() - .5) * 2.2;
      const distance = 28 + Math.random() * 54;
      spark.className = 'magic-spark';
      spark.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      spark.style.setProperty('--spark-x', `${8 + Math.random() * 84}%`);
      spark.style.setProperty('--spark-y', `${10 + progress * 28}%`);
      spark.style.setProperty('--spark-size', `${12 + Math.random() * 12}px`);
      spark.style.setProperty('--spark-dx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--spark-dy', `${Math.sin(angle) * distance}px`);
      spark.style.setProperty('--spark-time', `${.65 + Math.random() * .45}s`);
      spark.style.setProperty('--spark-rotate', `${Math.random() * 100 - 50}deg`);
      magicLayer.append(spark);
      setTimeout(() => spark.remove(), 1200);
    }
  }
  function makeMagicLayer() {
    magicLayer = document.createElement('span');
    magicLayer.className = 'magic-layer';
    magicLayer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 7; i++) {
      const orb = document.createElement('i');
      orb.className = 'magic-orb';
      orb.style.setProperty('--orb-x', `${5 + Math.random() * 90}%`);
      orb.style.setProperty('--orb-y', `${Math.random() * 100}%`);
      magicLayer.append(orb);
    }
    blowButton.append(magicLayer);
  }
  function updateBurn(now) {
    if (!isHolding) return;
    const progress = Math.min((now - holdStarted) / holdDuration, 1);
    const progressPercent = `${progress * 100}%`;
    blowButton.style.setProperty('--magic-progress', progressPercent);
    if (now - lastSparkAt > 125 && progress > .03) { addMagicSparks(progress); lastSparkAt = now; }
    if (progress >= 1) { finishHold(); return; }
    holdFrame = requestAnimationFrame(updateBurn);
  }
  function startHold(event) {
    if (blowButton.disabled || isHolding) return;
    if (event.type === 'pointerdown' && event.button !== 0) return;
    event.preventDefault(); isHolding = true; holdStarted = performance.now(); lastSparkAt = 0;
    makeMagicLayer(); blowButton.classList.remove('hold-reset'); blowButton.classList.add('holding');
    if (event.pointerId !== undefined) {
      try { blowButton.setPointerCapture(event.pointerId); } catch {}
    }
    holdFrame = requestAnimationFrame(updateBurn);
  }
  function stopHold() {
    if (!isHolding) return;
    isHolding = false; cancelAnimationFrame(holdFrame);
    blowButton.classList.remove('holding'); blowButton.classList.add('hold-reset');
    blowButton.style.removeProperty('--magic-progress');
    magicLayer?.remove(); magicLayer = null;
    setTimeout(() => blowButton.classList.remove('hold-reset'), 220);
  }
  function finishHold() {
    if (!isHolding) return;
    isHolding = false; cancelAnimationFrame(holdFrame); blowButton.disabled = true;
    blowButton.classList.remove('holding'); blowButton.classList.add('blowing');
    blowButton.style.setProperty('--magic-progress', '100%');
    setTimeout(() => document.querySelector('#candle')?.classList.add('out'), 160);
    setTimeout(() => {
      const note = document.querySelector('.footer-note');
      if (note) note.textContent = 'คำอธิษฐานส่งไปถึงแล้ว';
      celebrate();
    }, 480);
    setTimeout(() => {
      blowButton.classList.add('hidden');
      const next = document.querySelector('#toGifts');
      next?.classList.remove('hidden'); next?.classList.add('next-arrive');
    }, 1250);
  }
  blowButton.addEventListener('pointerdown', startHold);
  blowButton.addEventListener('pointerup', stopHold);
  blowButton.addEventListener('pointercancel', stopHold);
  blowButton.addEventListener('lostpointercapture', stopHold);
  blowButton.addEventListener('keydown', event => {
    if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (!event.repeat) startHold(event); }
  });
  blowButton.addEventListener('keyup', event => { if (event.key === ' ' || event.key === 'Enter') stopHold(); });
  addEventListener('blur', stopHold);
}

let opened = 0; const wish = document.querySelector('#wish');
document.querySelectorAll('.gift').forEach(gift => gift.addEventListener('click', () => {
  if (gift.classList.contains('opened') || gift.classList.contains('opening')) return;
  gift.classList.add('opening');
  wish?.classList.remove('show');
  setTimeout(() => {
    gift.classList.remove('opening'); gift.classList.add('opened'); opened++;
    if (wish) {
      const label = document.createElement('span');
      label.className = 'wish-label';
      label.textContent = `🎀 คำอวยพรกล่องที่ ${[...document.querySelectorAll('.gift')].indexOf(gift) + 1}`;
      const message = document.createElement('p');
      message.className = 'wish-message';
      message.textContent = gift.dataset.wish;
      wish.replaceChildren(label, message);
      requestAnimationFrame(() => wish.classList.add('show'));
    }
    const rect = gift.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const spark = document.createElement('span'); spark.className = 'wish-spark'; spark.textContent = ['✨', '💖', '⭐'][i % 3];
      spark.style.left = `${rect.left + rect.width / 2}px`; spark.style.top = `${rect.top + rect.height / 2}px`;
      spark.style.setProperty('--x', `${(Math.random() - .5) * 140}px`); spark.style.setProperty('--y', `${-40 - Math.random() * 90}px`);
      document.body.append(spark); setTimeout(() => spark.remove(), 1000);
    }
    if (opened === 3) { document.querySelector('#all-open')?.classList.remove('hidden'); document.querySelector('#toLetter')?.classList.remove('hidden'); }
  }, 700);
}));

const envelope = document.querySelector('#envelope');
if (envelope) {
  let started = false;
  let letterReady = false;
  let modalTyped = null, modalSignature = null;
  const paper = document.querySelector('#paper');
  const letterModal = document.querySelector('#letterModal');
  const modalPaperSlot = document.querySelector('#modalPaperSlot');
  function showLetterModal() {
    if (!letterModal || !modalPaperSlot || !paper) return;
    const copy = paper.cloneNode(true);
    copy.removeAttribute('id'); copy.classList.remove('open'); copy.classList.add('modal-paper');
    modalTyped = copy.querySelector('#typed'); modalTyped?.removeAttribute('id'); modalTyped?.classList.add('typed-copy');
    modalSignature = copy.querySelector('#signature'); modalSignature?.removeAttribute('id');
    modalPaperSlot.replaceChildren(copy);
    letterModal.showModal();
    document.querySelector('#closeLetterModal')?.focus();
  }
  paper?.addEventListener('click', event => {
    if (!envelope.classList.contains('open')) return;
    event.stopPropagation();
    if (letterReady) showLetterModal();
  });
  document.querySelector('#closeLetterModal')?.addEventListener('click', () => letterModal?.close());
  letterModal?.addEventListener('click', event => { if (event.target === letterModal) letterModal.close(); });
  function heart() {
    const el = document.createElement('span'); el.className = 'float-heart'; el.textContent = ['💗', '💖', '💕'][Math.floor(Math.random() * 3)];
    el.style.left = `${10 + Math.random() * 80}%`; el.style.fontSize = `${18 + Math.random() * 20}px`; document.body.append(el); setTimeout(() => el.remove(), 4700);
  }
  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open'); document.querySelector('#paper')?.classList.add('open');
    const hint = document.querySelector('#letter-hint'); if (hint) hint.textContent = 'กำลังเขียนจดหมายถึงพี่น้ำอยู่ 💕';
    if (started) return; started = true; let index = 0; const target = document.querySelector('#typed');
    function type() {
      if (index < letterText.length) { target.textContent += letterText[index++]; if (modalTyped) modalTyped.textContent = target.textContent; paper.scrollTop = paper.scrollHeight; setTimeout(type, 32); }
      else {
        const signature = document.querySelector('#signature'); signature.textContent = `From N'Kao`; signature.classList.add('show');
        if (modalSignature) { modalSignature.textContent = signature.textContent; modalSignature.classList.add('show'); }
        for (let n = 0; n < 7; n++) setTimeout(heart, n * 420);
        setTimeout(() => {
          letterReady = true; paper.classList.add('ready-to-expand');
          if (hint) hint.textContent = 'อ่านจดหมายครบแล้ว แตะที่กระดาษเพื่อขยายอ่าน';
        }, 720);
      }
    }
    setTimeout(type, 500);
  }
  envelope.addEventListener('click', openLetter);
  envelope.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLetter(); } });
}

let lastSpark = 0;
function sparkle(x, y) {
  if (Date.now() - lastSpark < 60) return; lastSpark = Date.now();
  const el = document.createElement('span'); el.className = 'sparkle'; el.textContent = Math.random() > .45 ? '✨' : '♡';
  el.style.left = `${x}px`; el.style.top = `${y}px`; document.body.append(el); setTimeout(() => el.remove(), 800);
}
addEventListener('pointermove', e => { if (e.pointerType === 'mouse') sparkle(e.clientX, e.clientY); });
addEventListener('pointerdown', e => sparkle(e.clientX, e.clientY));

// Pop a small ring of floating hearts anywhere the page is clicked or tapped.
document.addEventListener('pointerdown', event => {
  const hearts = ['💗', '💖', '💕', '💓', '🩷'];
  const count = 9;
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    const angle = (Math.PI * 2 * i / count) + (Math.random() - .5) * .35;
    const distance = 38 + Math.random() * 48;
    heart.className = 'click-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.setProperty('--click-x', `${event.clientX}px`);
    heart.style.setProperty('--click-y', `${event.clientY}px`);
    heart.style.setProperty('--heart-x', `${Math.cos(angle) * distance}px`);
    heart.style.setProperty('--heart-y', `${Math.sin(angle) * distance}px`);
    heart.style.setProperty('--heart-rotate', `${Math.random() * 70 - 35}deg`);
    heart.style.setProperty('--heart-size', `${14 + Math.random() * 12}px`);
    document.body.append(heart);
    setTimeout(() => heart.remove(), 1000);
  }
});

// Animate internal page links, then follow their normal destinations.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
  const destination = new URL(link.href, location.href);
  if (!destination.pathname.endsWith('.html') || destination.href === location.href) return;
  if (destination.protocol !== 'file:' && destination.origin !== location.origin) return;
  event.preventDefault();
  document.body.classList.add('page-leaving');
  setTimeout(() => { location.assign(destination.href); }, 440);
});
