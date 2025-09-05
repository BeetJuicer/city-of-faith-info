async function loadNavbar() {
    try {
        const response = await fetch('components/navbar.html');
        const html = await response.text();
        document.getElementById('navbar-container').innerHTML = html;
        initializeNavbar();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Initialize navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarNav = document.getElementById('navbarNav');
    
    if (!navbar || !mobileMenuToggle || !navbarNav) return;
    
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
    
    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
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

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);