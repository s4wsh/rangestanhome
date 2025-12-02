/* ===============================
   🎨 Soft Parallax + Shadow Fade
   =============================== */

const heroImg = document.querySelector('.image-card img');

if (heroImg) {
  const isMobile = window.innerWidth <= 820;

  if (!isMobile) {

    // نرم‌تر شدن حرکت
    heroImg.style.transition = "transform 0.25s ease-out";

    heroImg.addEventListener("mousemove", (e) => {
      const bounds = heroImg.getBoundingClientRect();

      const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
      const relY = (e.clientY - bounds.top) / bounds.height - 0.5;

      const x = relX * 18; 
      const y = relY * 18;

      heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });

    heroImg.addEventListener("mouseleave", () => {
      heroImg.style.transform = "translate(0px, 0px) scale(1)";
    });
  }
}
