// แก้ชื่อผู้รับ ผู้ส่ง และข้อความจดหมายได้ตรงนี้
const recipient = 'พี่น้ำ';
const sender = 'น้องเก้า';
const letterText = `สุขสันต์วันเกิดนะพี่น้ำ ขอให้วันนี้เป็นวันที่สดใสและเต็มไปด้วยรอยยิ้ม
ขอบคุณที่เป็นพี่สาวที่น่ารักและใจดีกับน้องเก้าเสมอมา
ขอให้ทุกเรื่องที่ตั้งใจค่อยๆ สำเร็จ และมีคนดีๆ อยู่ข้างๆ เยอะๆ
ถ้าวันไหนเหนื่อยก็อย่าลืมพัก แล้วให้น้องเก้าคอยเป็นกำลังใจให้นะ
ขอให้ปีนี้เป็นปีที่ดีมากๆ มีความสุขในทุกวันเลย รักพี่น้ำนะ 💖`;

const sky = document.querySelector('#sky');
if (sky) {
  const colors = ['#ff9fbe', '#b7a0ef', '#8ed5e8', '#ffd48f', '#f6a8d5'];
  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement('i');
    balloon.className = 'balloon'; balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.background = colors[i % colors.length]; balloon.style.borderColor = colors[i % colors.length];
    balloon.style.animationDuration = `${15 + Math.random() * 17}s`;
    balloon.style.animationDelay = `-${Math.random() * 28}s`; sky.append(balloon);
  }
}

const title = document.querySelector('#birthday-title');
if (title) {
  const titleText = `Happy Birthday ${recipient}!`;
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
if (blowButton) blowButton.addEventListener('click', () => {
  document.querySelector('#candle')?.classList.add('out'); blowButton.classList.add('hidden');
  document.querySelector('#toGifts')?.classList.remove('hidden');
  const note = document.querySelector('.footer-note'); if (note) note.textContent = 'คำอธิษฐานส่งไปถึงแล้ว ✨'; celebrate();
});

let opened = 0; const wish = document.querySelector('#wish');
document.querySelectorAll('.gift').forEach(gift => gift.addEventListener('click', () => {
  if (gift.classList.contains('opened')) return;
  gift.classList.add('shake');
  setTimeout(() => {
    gift.classList.remove('shake'); gift.classList.add('opened'); opened++;
    if (wish) { wish.textContent = `🎁 ${gift.dataset.wish}`; wish.classList.add('show'); }
    const rect = gift.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const spark = document.createElement('span'); spark.className = 'wish-spark'; spark.textContent = ['✨', '💖', '⭐'][i % 3];
      spark.style.left = `${rect.left + rect.width / 2}px`; spark.style.top = `${rect.top + rect.height / 2}px`;
      spark.style.setProperty('--x', `${(Math.random() - .5) * 140}px`); spark.style.setProperty('--y', `${-40 - Math.random() * 90}px`);
      document.body.append(spark); setTimeout(() => spark.remove(), 1000);
    }
    if (opened === 3) { document.querySelector('#all-open')?.classList.remove('hidden'); document.querySelector('#toLetter')?.classList.remove('hidden'); }
  }, 200);
}));

const envelope = document.querySelector('#envelope');
if (envelope) {
  let started = false;
  function heart() {
    const el = document.createElement('span'); el.className = 'float-heart'; el.textContent = ['💗', '💖', '💕'][Math.floor(Math.random() * 3)];
    el.style.left = `${10 + Math.random() * 80}%`; el.style.fontSize = `${18 + Math.random() * 20}px`; document.body.append(el); setTimeout(() => el.remove(), 4700);
  }
  function openLetter() {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open'); document.querySelector('#paper')?.classList.add('open');
    const hint = document.querySelector('#letter-hint'); if (hint) hint.textContent = 'มีข้อความจากใจถึงพี่น้ำ 💕';
    if (started) return; started = true; let index = 0; const target = document.querySelector('#typed');
    function type() {
      if (index < letterText.length) { target.textContent += letterText[index++]; document.querySelector('#paper').scrollTop = document.querySelector('#paper').scrollHeight; setTimeout(type, 32); }
      else { document.querySelector('#signature').textContent = `รักนะ — ${sender}`; document.querySelector('#signature')?.classList.add('show'); for (let n = 0; n < 7; n++) setTimeout(heart, n * 420); }
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
