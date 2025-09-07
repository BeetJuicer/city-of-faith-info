
// Initialize navbar functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
});

// Initialize navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (!navbar || !mobileMenuToggle || !navbarNav) {
        console.error('Navbar elements not found');
        return;
    }
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link, .download-nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            navbarNav.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Handle download button click to scroll to download section
    const downloadBtn = document.querySelector('.download-nav-btn');
    if (downloadBtn && downloadBtn.getAttribute('href') === '#download') {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadSection = document.querySelector('.download-section');
            if (downloadSection) {
                downloadSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}