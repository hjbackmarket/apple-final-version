/* --- Slider Logic --- */
const sliders = [
  { el: document.getElementById('slider-row-1'), pause: false },
  { el: document.getElementById('slider-row-2'), pause: false }
];

const speed = 0.8;

function step() {
  sliders.forEach(s => {
      if (!s.el || s.pause) return;
      s.el.scrollLeft += speed;
      if (s.el.scrollLeft >= s.el.scrollWidth - s.el.offsetWidth - 1) {
          s.el.scrollLeft = 0;
      }
  });
  requestAnimationFrame(step);
}

sliders.forEach(s => {
  if (!s.el) return;
  s.el.addEventListener('mouseenter', () => (s.pause = true));
  s.el.addEventListener('mouseleave', () => (s.pause = false));
});

requestAnimationFrame(step);


/* --- Footer Toggle Logic --- */
function toggleSection(button) {
  const ul = button.nextElementSibling;
  const icon = button.querySelector("i.fa-arrow-down");
  if (window.innerWidth >= 768) return;

  const isOpen = ul.classList.contains("open");
  if (isOpen) {
      ul.style.maxHeight = null;
      ul.classList.remove("open");
      icon.style.transform = "rotate(0deg)";
  } else {
      ul.style.maxHeight = ul.scrollHeight + "px";
      ul.classList.add("open");
      icon.style.transform = "rotate(180deg)";
  }
}

window.addEventListener('resize', () => {
  document.querySelectorAll(".footer-section ul").forEach(ul => {
      const icon = ul.previousElementSibling.querySelector("i.fa-arrow-down");
      if (window.innerWidth >= 768) {
          ul.style.maxHeight = null;
          ul.classList.add("open");
          if (icon) icon.style.transform = "rotate(0deg)";
      } else {
          ul.style.maxHeight = null;
          ul.classList.remove("open");
          if (icon) icon.style.transform = "rotate(0deg)";
      }
  });
});


/* --- Mobile Menu Logic --- */
function toggleMobileMenu(menuId) {
  // Only run this logic on mobile screens (less than 768px)
  if (window.innerWidth < 768) {
      const menu = document.getElementById(menuId);
      if (menu) {
          menu.classList.toggle('hidden');
          // Prevent background scrolling when menu is open
          if (!menu.classList.contains('hidden')) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = 'auto';
          }
      }
  }
}

/* --- New Hamburger Toggle Logic --- */
const menuToggle = document.getElementById('menuToggle');
const overlay = document.getElementById('mobile-menu-overlay');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('menu-active');
      overlay.classList.toggle('open');

      if (overlay.classList.contains('open')) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
      }
  });
}