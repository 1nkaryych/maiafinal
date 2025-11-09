function initCarousel(trackSelector, indicatorSelector) {
  const track = document.querySelector(trackSelector);
  const cards = Array.from(track.children);
  const indicators = document.querySelector(indicatorSelector);
  let index = 0;

  if (indicators) {
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => moveToSlide(i));
      indicators.appendChild(dot);
    });
  }

function moveToSlide(newIndex) {
    if (newIndex < 0) newIndex = cards.length - 1;
    if (newIndex >= cards.length) newIndex = 0;
    index = newIndex;
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    updateIndicators();
}

function updateIndicators() {
    if (!indicators) return;
    const dots = indicators.querySelectorAll("button");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

setInterval(() => moveToSlide(index + 1), 5000);

const parent = track.closest(".carousel-container, .carousel-container2");
const leftBtn = parent.querySelector(".carousel-arrow.left");
const rightBtn = parent.querySelector(".carousel-arrow.right");

leftBtn?.addEventListener("click", () => moveToSlide(index - 1));
rightBtn?.addEventListener("click", () => moveToSlide(index + 1));
}

document.addEventListener("DOMContentLoaded", () => {
  initCarousel("#carousel-track", "#carousel-indicators");
  initCarousel("#carousel-track2", "#carousel-indicators2");
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


document.querySelectorAll(".withus, .questions-button, .footer-button a").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const contactSection = document.querySelector("#contacts");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  });
});

const nav = document.querySelector(".nav");
const headerFlex = document.querySelector(".header-flex");

const burger = document.createElement("div");
burger.classList.add("burger");
burger.innerHTML = `
  <span></span>
  <span></span>
  <span></span>`;
headerFlex.insertBefore(burger, nav);

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
  burger.classList.toggle("active");
});

// Light/Dark Mode functionality
function initTheme() {
    const themeSwitcher = document.getElementById('theme-switcher');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcher.textContent = theme === 'light' ? '🌙' : '☀️';
}