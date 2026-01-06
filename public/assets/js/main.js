console.log('Nexcent scripts loaded');

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger Stat Counter if it's a stat item
            if (entry.target.classList.contains('stat-item')) {
                const counter = entry.target.querySelector('h3');
                if (counter && !counter.classList.contains('counted')) {
                    animateValue(counter);
                    counter.classList.add('counted');
                }
            }

            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Stats Counter Animation
function animateValue(obj) {
    // Remove commas for calculation
    const end = parseInt(obj.innerText.replace(/,/g, ''), 10);
    const duration = 2000;
    const start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);

        // Format with commas correctly
        obj.innerText = current.toLocaleString();

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerText = end.toLocaleString(); // Ensure final value is exact
        }
    };
    window.requestAnimationFrame(step);
}
