document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('[data-nav]');
  const menuToggle = document.querySelector('[data-menu-toggle]');

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

  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img instanceof HTMLImageElement && img.dataset.src) {
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('loaded');
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach((img) => lazyObserver.observe(img));
  } else {
    lazyImages.forEach((img) => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
      }
    });
  }

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
