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

// Perfect Smooth Scrolling Carousel

class SmoothCarousel {
    constructor(element) {
        this.carousel = element;
        this.inner = element.querySelector('.carousel-inner'); // Ensure this class matches your inner element
        
        // Check if the inner element is found
        if (!this.inner) {
            console.error('Carousel inner element not found!');
            return; // Prevent further execution if inner element is not found
        }
        
        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.velocity = 0;
        this.position = 0;
        this.rafId = null;
        this.lastTime = performance.now();
        this.maxOverscroll = 100; // Maximum overscroll in pixels

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Mouse events
        this.carousel.addEventListener('mousedown', this.onDragStart.bind(this));
        window.addEventListener('mousemove', this.onDragMove.bind(this));
        window.addEventListener('mouseup', this.onDragEnd.bind(this));

        // Touch events
        this.carousel.addEventListener('touchstart', this.onDragStart.bind(this));
        this.carousel.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
        this.carousel.addEventListener('touchend', this.onDragEnd.bind(this));

        // Prevent default touch behavior
        this.carousel.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    }

    onDragStart(e) {
        this.isDown = true;
        this.carousel.classList.add('active');
        this.startX = this.getEventX(e) - this.carousel.offsetLeft;
        this.scrollLeft = this.position;
        this.velocity = 0;
        this.rafId && cancelAnimationFrame(this.rafId);
        this.lastTime = performance.now();
    }

    onDragMove(e) {
        console.log('Inner Element:', this.inner); // Debug log
        if (!this.isDown) return;
        e.preventDefault();
        const x = this.getEventX(e) - this.carousel.offsetLeft;
        const walk = (x - this.startX) * 2; // Adjust sensitivity as needed
        const newPosition = this.scrollLeft - walk;
        this.position = this.clampPosition(newPosition);
    }

    onDragEnd() {
        this.isDown = false;
        this.carousel.classList.remove('active');
        // Calculate velocity based on the current and previous positions
        this.velocity = (this.position - this.scrollLeft) / (performance.now() - this.lastTime);
    }

    getEventX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    }

    clampPosition(position) {
        if (!this.inner) {
            console.error('this.inner is null');
            return position; // Return current position if this.inner is null
        }

        const minPosition = -this.maxOverscroll;
        const maxPosition = this.inner.scrollWidth - this.carousel.clientWidth + this.maxOverscroll;
        return Math.max(minPosition, Math.min(position, maxPosition));
    }

    applySpring() {
        const minPosition = 0;
        const maxPosition = this.inner.scrollWidth - this.carousel.clientWidth;
        const overscroll = 0.1;

        if (this.position < minPosition) {
            const delta = minPosition - this.position;
            this.position += delta * overscroll;
            this.velocity *= 0.9; // Dampen velocity
        } else if (this.position > maxPosition) {
            const delta = maxPosition - this.position;
            this.position += delta * overscroll;
            this.velocity *= 0.9; // Dampen velocity
        }
    }

    render() {
        if (this.isDown) {
            this.velocity = 0;
        } else {
            const now = performance.now();
            const dt = now - this.lastTime;
            this.lastTime = now;

            this.velocity *= Math.pow(0.95, dt / 16.666);
            this.position += this.velocity * dt / 16.666;

            this.applySpring();
        }

        this.position = this.clampPosition(this.position);
        this.inner.style.transform = `translateX(${-this.position}px)`;
        this.rafId = requestAnimationFrame(this.render.bind(this));
    }
}

// Initialize the carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = document.querySelector('.carousel-container');
    const carousel = new SmoothCarousel(carouselElement);
});
