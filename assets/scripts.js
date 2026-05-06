/* =========================================================
   Paws and Pets Play Club — Shared scripts
   ========================================================= */

(function () {
  'use strict';

  // Mark JS as available so reveal-hiding CSS only kicks in here
  document.documentElement.classList.add('js');

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- Mobile menu --------
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------- Nav: shadow on scroll + hide mobile CTA bar near top --------
  const nav = document.querySelector('.nav');
  const mobileCtaBar = document.querySelector('.mobile-cta-bar');
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (mobileCtaBar) {
      mobileCtaBar.classList.toggle('hidden', y < 240);
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------- Smooth scroll for anchor links --------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = (nav && nav.offsetHeight) || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // -------- Reveal on scroll --------
  const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-stagger');
  if (revealEls.length) {
    if (prefersReduced) {
      revealEls.forEach(el => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(el => io.observe(el));

      // Failsafe: anything still hidden after 1.5s gets shown anyway.
      // Catches edge cases (full-page screenshots, IO not firing for elements far below the fold).
      setTimeout(() => {
        revealEls.forEach(el => { if (!el.classList.contains('in')) el.classList.add('in'); });
      }, 1500);
    }
  }

  // -------- Parallax for elements with .parallax data-speed --------
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length && !prefersReduced) {
    const tickParallax = () => {
      const sy = window.scrollY;
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const speed = parseFloat(el.dataset.speed || '0.12');
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(2)}px, 0)`;
      });
    };
    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { tickParallax(); raf = null; });
    }, { passive: true });
    tickParallax();
  }

  // -------- Animated counters --------
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const duration = parseInt(el.dataset.duration || '1400', 10);
      const start = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        const v = target * easeOut(t);
        el.textContent = (decimals ? v.toFixed(decimals) : Math.floor(v)).toString() + (el.dataset.suffix || '');
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if (prefersReduced) {
      counters.forEach(c => {
        c.textContent = (parseInt(c.dataset.decimals || '0', 10)
          ? parseFloat(c.dataset.count).toFixed(parseInt(c.dataset.decimals, 10))
          : Math.floor(parseFloat(c.dataset.count))) + (c.dataset.suffix || '');
      });
    } else {
      const cio = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { animate(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => cio.observe(c));
    }
  }

  // -------- Lightbox (Gallery page) --------
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCap = lightbox.querySelector('.lb-cap');
    const lbClose = lightbox.querySelector('.lb-close');
    const lbPrev = lightbox.querySelector('.lb-prev');
    const lbNext = lightbox.querySelector('.lb-next');
    const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    let idx = 0;

    function open(i) {
      idx = i;
      const el = triggers[idx];
      const src = el.getAttribute('data-src') || el.querySelector('img').src;
      const cap = el.getAttribute('data-cap') || el.querySelector('img').alt;
      lbImg.src = src;
      lbImg.alt = cap;
      lbCap.textContent = cap;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function next(d) { idx = (idx + d + triggers.length) % triggers.length; open(idx); }

    triggers.forEach((t, i) => {
      t.addEventListener('click', e => { e.preventDefault(); open(i); });
      t.style.cursor = 'zoom-in';
    });
    lbClose && lbClose.addEventListener('click', close);
    lbPrev && lbPrev.addEventListener('click', e => { e.stopPropagation(); next(-1); });
    lbNext && lbNext.addEventListener('click', e => { e.stopPropagation(); next(1); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next(1);
      if (e.key === 'ArrowLeft') next(-1);
    });
  }

  // -------- Scroll-back paw --------
  const sp = document.querySelector('.scroll-paw');
  if (sp) {
    window.addEventListener('scroll', () => {
      sp.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    sp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // -------- Form (Web3Forms with mailto fallback) --------
  const form = document.getElementById('contactForm');
  if (form) {
    const successEl = document.getElementById('formSuccess');
    const errorEl = document.getElementById('formError');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      successEl && successEl.classList.remove('show');
      errorEl && errorEl.classList.remove('show');

      const data = new FormData(form);
      const accessKey = data.get('access_key');

      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const subject = encodeURIComponent(`New inquiry from ${data.get('name') || 'website visitor'}`);
        const body = encodeURIComponent(
          `Name: ${data.get('name') || ''}\n` +
          `Phone: ${data.get('phone') || ''}\n` +
          `Email: ${data.get('email') || ''}\n` +
          `Service: ${data.get('service') || ''}\n` +
          `Pet type: ${data.get('pet_type') || ''}\n\n` +
          `Notes:\n${data.get('message') || ''}\n`
        );
        window.location.href = `mailto:pawsandpetsplayclub1@gmail.com?subject=${subject}&body=${body}`;
        if (successEl) {
          successEl.textContent = "Opening your email app… (Web3Forms access key not yet set.)";
          successEl.classList.add('show');
        }
        return;
      }

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        const json = await res.json();
        if (res.ok && json.success) {
          form.reset();
          successEl && successEl.classList.add('show');
          setTimeout(() => successEl && successEl.classList.remove('show'), 8000);
        } else {
          throw new Error(json.message || 'Submit failed');
        }
      } catch (err) {
        errorEl && errorEl.classList.add('show');
        setTimeout(() => errorEl && errorEl.classList.remove('show'), 8000);
      }
    });
  }
})();
