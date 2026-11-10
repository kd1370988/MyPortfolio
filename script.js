(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const backToTop = document.querySelector('.back-to-top');
  const year = document.querySelector('#current-year');
  const contactEmail = document.querySelector('#contact-email');
  const copyEmailButton = document.querySelector('#copy-email-button');
  const copyEmailStatus = document.querySelector('#contact-copy-status');
  const gmailContactLink = document.querySelector('#gmail-contact-link');

  if (year) year.textContent = String(new Date().getFullYear());

  // HTML内のメールアドレス1か所から、Gmailリンクとコピー機能を設定する。
  const email = contactEmail ? contactEmail.textContent.trim() : '';
  if (email && gmailContactLink) {
    gmailContactLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  }

  const copyTextToClipboard = async (text) => {
    // HTTPSなどの安全なコンテキストではClipboard APIを優先する。
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // file:// でHTMLを直接開いた場合などに備えたフォールバック。
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const copied = document.execCommand('copy');
    textarea.remove();
    if (!copied) throw new Error('Clipboard copy failed');
  };

  if (copyEmailButton && contactEmail && copyEmailStatus) {
    copyEmailButton.addEventListener('click', async () => {
      const address = contactEmail.textContent.trim();
      try {
        await copyTextToClipboard(address);
        copyEmailStatus.textContent = 'コピーしました。メールの宛先欄に貼り付けてください。';
        copyEmailStatus.classList.remove('is-error');
        copyEmailStatus.classList.add('is-success');
      } catch (error) {
        copyEmailStatus.textContent = `自動コピーできませんでした。メールアドレス「${address}」を選択してコピーしてください。`;
        copyEmailStatus.classList.remove('is-success');
        copyEmailStatus.classList.add('is-error');
      }
    });
  }

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
