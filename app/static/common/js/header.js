async function loadAdminHeader() {
  const container = document.getElementById('app-header');
  if (!container) return;
  try {
    const res = await fetch('/static/common/html/header.html?v=1.5.0');
    if (!res.ok) return;
    container.innerHTML = await res.text();

    const mobileToggle = container.querySelector('#nav-mobile-toggle');
    const mobileMenu = container.querySelector('#nav-mobile-menu');
    if (mobileToggle && mobileMenu) {
      const setOpen = (open) => {
        if (open) {
          mobileMenu.classList.remove('hidden');
          mobileToggle.setAttribute('aria-expanded', 'true');
          mobileMenu.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        } else {
          mobileMenu.classList.add('hidden');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }
      };

      mobileToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        setOpen(isHidden);
      });

      mobileMenu.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'A') {
          setOpen(false);
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) setOpen(false);
      });
    }

    const path = window.location.pathname;
    const links = container.querySelectorAll('a[data-nav]');
    links.forEach((link) => {
      const target = link.getAttribute('data-nav') || '';
      if (target && path.startsWith(target)) {
        link.classList.add('active');
        const group = link.closest('.nav-group');
        if (group) {
          const trigger = group.querySelector('.nav-group-trigger');
          if (trigger) {
            trigger.classList.add('active');
          }
        }
      }
    });
    if (typeof updateStorageModeButton === 'function') {
      updateStorageModeButton();
    }
  } catch (e) {
    // Fail silently to avoid breaking page load
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAdminHeader);
} else {
  loadAdminHeader();
}
