// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Particle effect for hero section i like chat gpt 
function createParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.classList.add('particles');
  document.getElementById('hero').appendChild(particlesContainer);
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 5 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 2 + 1 + 's';
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// Interactive feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

// Scroll reveal animation
function revealOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .hero-button');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    } else {
      element.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger scroll reveal on initial load

// Dynamically update copyright year
document.querySelector('.copyright').textContent = `© ${new Date().getFullYear()} Solar Cheats. All rights reserved.`;

// Toggle menu for mobile view
const menuToggle = document.querySelector('.menu-toggle');
const navWrapper = document.querySelector('.nav-wrapper');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navWrapper.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', menuToggle.classList.contains('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('active');
    navWrapper.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-wrapper a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navWrapper.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
