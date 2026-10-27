(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.querySelector('#current-year');

  if (year) year.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    siteNav.classList.remove('is-open');
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
      siteNav.classList.toggle('is-open', !isOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  const updateBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > 450);
  };

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  }
})();
