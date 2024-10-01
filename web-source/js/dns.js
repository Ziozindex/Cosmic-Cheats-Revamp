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
