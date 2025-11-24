document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-nav]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const header = document.querySelector('.site-header');

  const closeNav = () => {
    nav?.classList.remove('open');
    menuToggle?.classList.remove('active');
    document.body.classList.remove('nav-open');
  };

  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  nav?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      closeNav();
    }
  });

  // Toggle condensed header styles after scroll.
  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState);

  document.querySelectorAll('img[data-src]').forEach((img) => {
    if (img instanceof HTMLImageElement && img.dataset.src) {
      img.src = img.dataset.src;
      img.onload = () => img.classList.add('loaded');
      img.removeAttribute('data-src');
    }
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('visible'));
  }
});
