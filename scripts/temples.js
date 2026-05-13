/* temples.js – Temple Album Application Logic */

/**
 * Temple Album – JavaScript Module
 * Handles: Dynamic footer, Hamburger menu toggle
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    initDynamicFooter();
    initHamburgerMenu();
});

/**
 * Dynamically update the copyright year and last modified date in the footer.
 */
function initDynamicFooter() {
    const yearSpan = document.getElementById('year');
    const timestampSpan = document.getElementById('last-modified-timestamp');

    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    if (timestampSpan) {
        const lastModified = document.lastModified;
        const date = new Date(lastModified);

        // Format: MM/DD/YYYY HH:MM:SS (24-hour format)
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        timestampSpan.textContent = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }
}

/**
 * Initialize hamburger menu toggle functionality.
 * - Toggles navigation visibility on mobile
 * - Transforms hamburger icon to 'X' when active
 * - Manages aria-expanded attribute for accessibility
 */
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');

    if (!hamburgerBtn || !mainNav) return;

    hamburgerBtn.addEventListener('click', function () {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.classList.toggle('active');
        mainNav.classList.toggle('open');
    });

    // Close menu when a navigation link is clicked
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            hamburgerBtn.classList.remove('active');
            mainNav.classList.remove('open');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            hamburgerBtn.focus();
        }
    });
}
