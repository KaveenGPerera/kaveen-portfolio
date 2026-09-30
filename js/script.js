/* ==========================================================================
   Kaveen Perera — Portfolio interactions
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('has-js');

  /* ---------- Theme toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.add('theme-transition');
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
      window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 500);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky header + scroll progress ---------- */
  const header = document.getElementById('siteHeader');
  const progressLine = document.getElementById('progressLine');
  const timelineLine = document.getElementById('timelineLine');

  function onScroll(){
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressLine) progressLine.style.width = pct + '%';

    updateTimelineFill();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav){
    const setNavOpen = (isOpen) => {
      mainNav.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    navToggle.addEventListener('click', () => {
      setNavOpen(!mainNav.classList.contains('open'));
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setNavOpen(false));
    });
    document.addEventListener('click', (event) => {
      if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) setNavOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setNavOpen(false);
    });
  }

  /* ---------- Gallery image backdrops ---------- */
  document.querySelectorAll('.gallery-item').forEach(item => {
    const image = item.querySelector('img');
    if (image) item.style.setProperty('--gallery-image', `url("${image.src}")`);
  });

  /* ---------- Scroll reveal (staggered by section, not per-card) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  revealEls.forEach(el => el.classList.add('in-view'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting){
          setTimeout(() => entry.target.classList.add('in-view'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Timeline progress fill ---------- */
  function updateTimelineFill(){
    if (!timelineLine) return;
    const rect = timelineLine.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    let visible = vh * 0.6 - rect.top;
    visible = Math.max(0, Math.min(total, visible));
    const pct = total > 0 ? (visible / total) * 100 : 0;
    timelineLine.style.setProperty('--fill', pct + '%');
  }

  /* ---------- Project filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const applyProjectFilter = (filter) => {
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('filtered-out', !match);
    });
  };
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyProjectFilter(btn.dataset.filter);
    });
  });

  /* ---------- Thumbnail placeholder patterns (no external images needed) ---------- */
  const palette = {
    donor:      ['#F2D9D9', '#C2495A'],
    wellness:   ['#DDEBE0', '#3F8F5C'],
    cinema:     ['#E4DEF0', '#6C3FC5'],
    furniture:  ['#F0E6D6', '#B5842E'],
    airquality: ['#DCEAF0', '#2E7EA6'],
    study:      ['#E9E2F5', '#7451C4'],
    hotel:      ['#FBEEDD', '#D98A3D'],
    ai:         ['#E9E2F5', '#6C3FC5'],
    transit:    ['#DCEAF0', '#2E7EA6'],
    fitness:    ['#F2D9D9', '#C2495A'],
    fashion:    ['#F0E6D6', '#B5842E']
  };
  document.querySelectorAll('[data-mock]').forEach(el => {
    const key = el.dataset.mock;
    const c = palette[key] || ['#E4DEF0', '#6C3FC5'];
    el.style.background = `linear-gradient(135deg, ${c[0]}, ${c[1]}33)`;
  });
  document.querySelectorAll('.project-thumb--image').forEach(thumb => {
    const image = thumb.querySelector('img');
    if (image) thumb.style.setProperty('--project-image', `url("${image.src}")`);
  });

  /* ---------- Portrait fallback toggle ---------- */
  const portraitImg = document.getElementById('portraitImg');
  const portraitFallback = document.getElementById('portraitFallback');
  if (portraitImg && portraitFallback){
    portraitImg.addEventListener('error', () => {
      portraitImg.style.display = 'none';
      portraitFallback.style.display = 'flex';
    });
    portraitImg.addEventListener('load', () => {
      portraitFallback.style.display = 'none';
    });
    // trigger check on load in case image is already broken/missing
    if (!portraitImg.complete || portraitImg.naturalWidth === 0){
      portraitFallback.style.display = 'flex';
    }
  }

  /* ---------- Smooth-scroll offset for fixed header ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

});
