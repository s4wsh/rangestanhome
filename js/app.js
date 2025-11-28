// mobile nav
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navCta = document.querySelector('.nav-cta');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    if (navCta) navCta.classList.toggle('is-open');
  });
}

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => obs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// hero image cursor visor + subtle parallax
const heroWrapper = document.getElementById('heroVisor');
if (heroWrapper) {
  const circle = heroWrapper.querySelector('.hero-visor-circle');
  const img = heroWrapper.querySelector('.hero-image');

  const handleMove = ev => {
    const rect = heroWrapper.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;

    if (circle) {
      circle.style.transform = `translate(${x - 90}px, ${y - 90}px)`;
    }
    if (img) {
      const offsetX = (x / rect.width - 0.5) * 6;
      const offsetY = (y / rect.height - 0.5) * 6;
      img.style.transform = `scale(1.03) translate(${-offsetX}px, ${-offsetY}px)`;
    }
  };

  const reset = () => {
    if (circle) circle.style.transform = `translate(50%, 50%)`;
    if (img) img.style.transform = 'scale(1)';
  };

  heroWrapper.addEventListener('pointermove', handleMove);
  heroWrapper.addEventListener('pointerleave', reset);
}
