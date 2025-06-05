// Smooth scroll handled by CSS scroll-behavior but for older browsers, fallback:
document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Button click interaction
const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.textContent = "Loading...";
  // Simulate a load or interactive response
  setTimeout(() => {
    startBtn.textContent = "Let's Start!";
    startBtn.disabled = false;
    alert("Awesome! Time to start learning!");
  }, 1500);
});

// Fade in feature cards on scroll
const featuresSection = document.getElementById("features");
const onScrollFeatures = () => {
  const top = featuresSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  if (top < windowHeight * 0.85) {
    featuresSection.classList.add("visible");
    window.removeEventListener("scroll", onScrollFeatures);
  }
};
window.addEventListener("scroll", onScrollFeatures);
onScrollFeatures();

// Scroll to top button logic
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Dark mode toggle logic
const darkModeToggle = document.getElementById("darkModeToggle");
// Load user preference from localStorage
const userPrefersDark = localStorage.getItem("darkMode") === "enabled";
const body = document.body;
if (userPrefersDark) {
  body.classList.add("dark-mode");
  darkModeToggle.textContent = "Light Mode";
  darkModeToggle.setAttribute("aria-pressed", "true");
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const darkEnabled = body.classList.contains("dark-mode");
  if (darkEnabled) {
    darkModeToggle.textContent = "Light Mode";
    darkModeToggle.setAttribute("aria-pressed", "true");
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.setAttribute("aria-pressed", "false");
    localStorage.setItem("darkMode", "disabled");
  }
});

// Typing animation for hero subtitle
const typedSubtitle = document.getElementById("typedSubtitle");
const textToType = [
  "Discover beginner friendly tutorials.",
  "Get practical tips to improve workflow.",
  "Join a supportive learning community.",
];
let currentTextIndex = 0;
let charIndex = 0;
let typingDelay = 70;
let erasingDelay = 40;
let newTextDelay = 2000; // Pause before typing next message

function type() {
  if (charIndex < textToType[currentTextIndex].length) {
    typedSubtitle.textContent += textToType[currentTextIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedSubtitle.textContent = textToType[currentTextIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    currentTextIndex++;
    if (currentTextIndex >= textToType.length) currentTextIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Start typing animation after DOM loaded
  if (textToType.length) setTimeout(type, newTextDelay + 250);
});
