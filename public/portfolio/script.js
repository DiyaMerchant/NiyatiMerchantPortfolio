/* ============ CUSTOM CURSOR ============ */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX=0, mouseY=0, ringX=0, ringY=0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});
function animateRing(){
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .work-card, .t-item, .service-card, .event-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

/* ============ CONTINUOUS SCROLL REVEAL (req #9) ============ */
/* Toggles classes both ways so animations replay every scroll */
const revealEls = document.querySelectorAll('.reveal, .slide-left, .slide-side');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => scrollObserver.observe(el));

/* ============ NAV TOGGLE ============ */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMenu.classList.remove('open'))
);

/* ============ EXPERIENCE ACCORDION ============ */
document.querySelectorAll('.acc-head').forEach(head => {
  head.addEventListener('click', () => head.parentElement.classList.toggle('open'));
});

/* ============ MODE TOGGLE (Light / Default / Dark) ============ */
const html = document.documentElement;
document.querySelectorAll('.mode-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    html.setAttribute('data-mode', btn.dataset.mode);
  });
});

/* ============ SAY HELLO + CONFETTI ============ */
const helloBtn   = document.getElementById('helloBtn');
const contactCard= document.getElementById('contactCard');
helloBtn.addEventListener('click', (e) => {
  contactCard.classList.toggle('open');
  burstConfetti(e.clientX, e.clientY);
});

/* CONFETTI ENGINE */
const cvs = document.getElementById('confettiCanvas');
const ctx = cvs.getContext('2d');
function sizeCanvas(){
  cvs.width = window.innerWidth;
  cvs.height= window.innerHeight;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

let pieces = [];
const COLORS = ['#f4c2c2','#555d50','#fff3f3','#d9a0a0'];
function burstConfetti(x,y){
  for(let i=0;i<70;i++){
    pieces.push({
      x, y,
      vx:(Math.random()-.5)*9,
      vy:(Math.random()*-9)-3,
      g:0.28,
      size:Math.random()*7+4,
      rot:Math.random()*Math.PI,
      vr:(Math.random()-.5)*.3,
      color:COLORS[Math.floor(Math.random()*COLORS.length)],
      life:0,
      max:80+Math.random()*40
    });
  }
}
function tickConfetti(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  pieces = pieces.filter(p => p.life < p.max);
  pieces.forEach(p => {
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    ctx.save();
    ctx.translate(p.x,p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(0, 1 - p.life/p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
    ctx.restore();
  });
  requestAnimationFrame(tickConfetti);
}
tickConfetti();

/* ============ PARALLAX + PROGRESS + BACK TO TOP ============ */
const shapes = document.querySelectorAll('.floating-shape');
const progressBar = document.getElementById('progressBar');
const backTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  shapes.forEach((s, i) => {
    s.style.transform = `translateY(${y * (i === 0 ? 0.25 : -0.15)}px)`;
  });
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';

  if (y > 600) backTop.classList.add('show');
  else backTop.classList.remove('show');
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top:0, behavior:'smooth' });
});

/* ============ PROJECT MODAL / CAROUSEL ============ */
/* Image paths match folders under ./projects2/ (see public/portfolio/projects2/). */
function projectImages(folder, ...files) {
  const enc = encodeURIComponent;
  return files.map((f) => `./projects2/${enc(folder)}/${enc(f)}`);
}
function projectFiles(folder, ...files) {
  const enc = encodeURIComponent;
  return files.map((f) => `./projects2/${enc(folder)}/${enc(f)}`);
}

const PROJECTS = {
  mould: {
    title: 'Mould Fitness',
    images: projectImages('mould fitness',
      '1.jpg', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png')
  },
  onekind: {
    title: 'One of a Kind',
    images: projectImages('one of a kind',
      '1.png', '2.png', '3.JPG', '4.JPG')
  },
  fitgeek: {
    title: 'Fit Geek Show',
    images: projectImages('the fit geek show', '1.png', '2.png')
  },
  airborne: {
    title: 'Airborne Aerial Fitness',
    images: projectImages('airborne',
      '1.png', '2.png', '3.png', '4.png', '5.PNG', '6.JPG')
  },
  lovemusic: {
    title: 'Love For Music',
    images: projectImages('love for music',
      '1.png', '2.png', '3.png', '4.png', '5.png', '6.png',
      '7.png', '8.png', '9.png', '10.png', '11.png', '12.png')
  },
  planecrazy: {
    title: 'Plane Crazy',
    images: projectImages('plane crazy',
      '1.PNG', '2.PNG', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png')
  },
  nofiltr: {
    title: 'NoFiltr',
    images: projectFiles('nofiltr', 'Manager Manual.pdf')
  },
  eraaura: {
    title: 'era aura',
    images: projectImages('era aura',
      'a.png', 'b.png', 'c.png', 'd.png', 'e.png', 'f.png', 'g.png', 'h.png', 'i.png',
      '5.PNG', '6.PNG', '7.PNG', '8.PNG', '9.PNG',
      '10.PNG', '11.PNG', '12.PNG', '13.PNG', '14.PNG', '15.PNG', '16.PNG', '17.PNG')
  },
  muddle: {
    title: 'Muddle Kitchen',
    images: projectImages('muddle', '1.png', '2.png')
  },
  lazycurries: {
    title: 'Lazy Curries',
    images: projectImages('lazy curries', '1.png', '2.png', '3.png', '4.PNG', '5.png')
  },
  other: {
    title: 'Other Projects',
    images: projectImages('other',
      '1.png', '2.png', '4.jpg', '5.JPG', '6.png', '7.png', '8.PNG', '9.PNG',
      '10.png', '11.png', '12.png', '13.png', '14.PNG', '15.png')
  }
};

const modal     = document.getElementById('projectModal');
const modalTitle= document.getElementById('modalTitle');
const carTrack  = document.getElementById('carTrack');
const carPrev   = document.getElementById('carPrev');
const carNext   = document.getElementById('carNext');
const carCounter= document.getElementById('carCounter');

let curIndex = 0;
let curSlides = [];
const IMAGES_PER_SLIDE = 3;

function buildSlides(images) {
  const slides = [];
  for (let i = 0; i < images.length; i += IMAGES_PER_SLIDE) {
    slides.push(images.slice(i, i + IMAGES_PER_SLIDE));
  }
  return slides;
}

function openProject(key){
  const p = PROJECTS[key];
  if(!p) return;
  modalTitle.textContent = p.title;
  curSlides = buildSlides(p.images);
  curIndex  = 0;

  carTrack.innerHTML = '';
  curSlides.forEach((group, groupIndex) => {
    const slide = document.createElement('div');
    slide.className = 'car-slide';
    const page = document.createElement('div');
    page.className = 'car-page';

    group.forEach((src, i) => {
      const shell = document.createElement('div');
      shell.className = 'car-photo-shell';
      const frame = document.createElement('div');
      frame.className = 'car-photo-frame';
      const imageNumber = (groupIndex * IMAGES_PER_SLIDE) + i + 1;

      const isPdf = src.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        frame.classList.add('car-pdf-frame');

        const pdf = document.createElement('iframe');
        pdf.className = 'car-pdf';
        pdf.src = `${src}#view=FitH`;
        pdf.title = `${p.title} — document ${imageNumber}`;
        pdf.loading = 'lazy';

        const clickHint = document.createElement('a');
        clickHint.className = 'pdf-click-hint';
        clickHint.href = src;
        clickHint.target = '_blank';
        clickHint.rel = 'noopener';
        clickHint.textContent = 'click me';

        pdf.onerror = () => {
          pdf.remove();
          clickHint.remove();
          frame.textContent = `${p.title}\nDocument ${imageNumber}`;
        };

        frame.appendChild(pdf);
        shell.appendChild(frame);
        shell.appendChild(clickHint);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${p.title} — image ${imageNumber}`;
        img.onerror = () => {
          img.remove();
          frame.textContent = `${p.title}\nImage ${imageNumber}`;
        };
        frame.appendChild(img);
        shell.appendChild(frame);
      }
      page.appendChild(shell);
    });

    slide.appendChild(page);
    carTrack.appendChild(slide);
  });

  updateCarousel();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeProject(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
function updateCarousel(){
  const slideEl = carTrack.querySelector('.car-slide');
  if(!slideEl) return;
  const slideW = slideEl.getBoundingClientRect().width;
  const gap = 0;
  carTrack.style.transform = `translateX(-${curIndex*(slideW+gap)}px)`;

  const maxIndex = Math.max(0, curSlides.length - 1);
  carPrev.disabled = curIndex <= 0;
  carNext.disabled = curIndex >= maxIndex;
  carCounter.textContent = `${curIndex + 1} / ${Math.max(curSlides.length, 1)}`;
}
carPrev.addEventListener('click', () => { curIndex = Math.max(0, curIndex-1); updateCarousel(); });
carNext.addEventListener('click', () => {
  const maxIndex = Math.max(0, curSlides.length - 1);
  curIndex = Math.min(maxIndex, curIndex+1);
  updateCarousel();
});

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
});
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeProject));
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeProject();
  if (e.key === 'ArrowLeft')  carPrev.click();
  if (e.key === 'ArrowRight') carNext.click();
});

/* ============ CONTACT ACTIONS (DESKTOP COPY / MOBILE OPEN) ============ */
const isMobilePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const phoneLink = document.getElementById('phoneLink');
const emailLink = document.getElementById('emailLink');

function showCopied(link){
  const original = link.dataset.originalText || link.textContent;
  link.dataset.originalText = original;
  link.textContent = 'Copied!';
  link.classList.add('copied');
  window.setTimeout(() => {
    link.textContent = original;
    link.classList.remove('copied');
  }, 1200);
}

function fallbackCopy(text){
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function attachDesktopCopy(link){
  if (!link) return;
  link.addEventListener('click', async (e) => {
    if (isMobilePointer) return;
    e.preventDefault();
    const textToCopy = link.dataset.copyText || link.textContent.trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      fallbackCopy(textToCopy);
    }
    showCopied(link);
  });
}

attachDesktopCopy(phoneLink);
attachDesktopCopy(emailLink);