// Mobile Menu Toggle
document.querySelector('.lg\\:hidden').addEventListener('click', function() {
    const menu = document.querySelector('.lg\\:flex');
    menu.classList.toggle('hidden');
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'translate-y-10');
        backToTopButton.classList.add('opacity-100', 'translate-y-0');
    } else {
        backToTopButton.classList.remove('opacity-100', 'translate-y-0');
        backToTopButton.classList.add('opacity-0', 'translate-y-10');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initial check for scroll position
if (window.scrollY > 300) {
    backToTopButton.classList.remove('opacity-0', 'translate-y-10');
    backToTopButton.classList.add('opacity-100', 'translate-y-0');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.lg\\:flex');
    const menuButton = document.querySelector('.lg\\:hidden');
    
    if (!menu.contains(e.target) && !menuButton.contains(e.target) && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        const menu = document.querySelector('.lg\\:flex');
        menu.classList.remove('hidden');
    }
});
