// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const hoverTargets = document.querySelectorAll('.hover-target');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover-active');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover-active');
        });
    });
}

// Magnetic Button Effect
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const position = elem.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Strength of the magnetic pull
        const strength = elem.getAttribute('data-strength') || 20;

        elem.style.transform = `translate(${x / position.width * strength}px, ${y / position.height * strength}px)`;
    });

    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translate(0px, 0px)';
        elem.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        setTimeout(() => {
            elem.style.transition = '';
        }, 500);
    });
});

// Scroll Reveal Animations
function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal-text, .reveal-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach((reveal) => {
        observer.observe(reveal);
    });
}

// Initial Page Load Animations
document.addEventListener("DOMContentLoaded", () => {
    // Trigger reveals for elements immediately visible
    setTimeout(() => {
        const immediateReveals = document.querySelectorAll('#home .reveal-text');
        immediateReveals.forEach(el => el.classList.add('active'));
    }, 100);

    initScrollReveals();
});
