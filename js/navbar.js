
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
    
    // Handle download button click
    const downloadBtn = document.querySelector('.download-nav-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we're on the home page
            const downloadSection = document.querySelector('#download');
            const isHomePage = window.location.pathname === '/' || 
                            window.location.pathname === '/index.html' ||
                            window.location.pathname.endsWith('/');
            
            if (downloadSection && isHomePage) {
                // We're on home page and download section exists, scroll to it
                downloadSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // We're on a different page, navigate to home with hash
                // Get the base URL from the download button's href attribute
                const baseUrl = this.getAttribute('href');
                window.location.href = baseUrl;
            }
        });
    }
}

// For Jekyll multi-page sites
function setActiveNavState() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        
        // Check if current page matches link
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath.includes('home')) ||
            currentPath.includes(link.getAttribute('data-page'))) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setActiveNavState);