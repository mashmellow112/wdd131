// --- Core Data Structures (Objects & Arrays) ---
const localGems = [
    { name: "Whispering Pines Trail", type: "nature", cost: 0, rating: 4.8 },
    { name: "The Foundry Coffee House", type: "food", cost: 8, rating: 4.5 },
    { name: "Echo Canyon Lookout", type: "nature", cost: 0, rating: 4.9 },
    { name: "Old Town History Vault", type: "museum", cost: 12, rating: 4.2 }
];

const dailyTips = [
    "Pack reusable water bottles to minimize impact on country park trails.",
    "Visit local artisan markets on Tuesday mornings for lower crowds.",
    "Always check trail condition logs before venturing off-grid."
];

// --- Initialization Execution Hook ---
document.addEventListener("DOMContentLoaded", () => {
    setupGlobalFooterDetails();
    setupMobileNavigation();
    
    // Page-specific routing conditions
    if (document.getElementById("dynamic-tip")) displayDailyTip();
    if (document.getElementById("directory-grid")) renderDirectory(localGems);
    if (document.getElementById("membership-form")) handleFormProcessing();
    if (document.querySelector(".lazy-image")) handleLazyLoading();
    setupScrollReveal();
});

// --- Function 1: Global UI Formatting ---
function setupGlobalFooterDetails() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) yearElement.textContent = `${new Date().getFullYear()}`;
    
    const modificationElement = document.getElementById("last-modified");
    if (modificationElement) {
        modificationElement.textContent = `${document.lastModified}`;
    }
}

// --- Function 2: Mobile Menu Interactions ---
function setupMobileNavigation() {
    const toggleBtn = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });
    }
}

// --- Function 3: LocalStorage Manipulation ---
function displayDailyTip() {
    const container = document.getElementById("dynamic-tip");
    let targetIndex = localStorage.getItem("savedTipIndex");

    if (!targetIndex) {
        targetIndex = Math.floor(Math.random() * dailyTips.length);
        localStorage.setItem("savedTipIndex", targetIndex);
    }

    // Exclusively using template literals for DOM string output
    container.innerHTML = `💡 <strong>Explorer Note:</strong> ${dailyTips[parseInt(targetIndex)]}`;
}

// --- Function 4: Functional Array Methods & Dynamic Grid Rendering ---
function renderDirectory(dataset) {
    const grid = document.getElementById("directory-grid");
    if (!grid) return;

    grid.innerHTML = ""; // Clear existing grid space
    
    // Higher-order array loop engine parsing objects
    dataset.forEach(item => {
        const itemCard = document.createElement("div");
        itemCard.className = "card reveal";
        itemCard.innerHTML = `
            <h3>📍 ${item.name}</h3>
            <p>Category: ${item.type.toUpperCase()}</p>
            <p>Estimated Cost: ${item.cost === 0 ? "FREE" : `$${item.cost}`}</p>
            <p>Community Rating: ⭐ ${item.rating}</p>
        `;
        grid.appendChild(itemCard);
    });

    setupFilterControls();
    setupScrollReveal(); // Re-run for dynamic items
}

// --- Function 5: Filter Routing (Conditional Branching) ---
function setupFilterControls() {
    const allBtn = document.getElementById("filter-all");
    const freeBtn = document.getElementById("filter-free");

    if (allBtn && freeBtn) {
        allBtn.onclick = () => {
            allBtn.classList.add("active");
            freeBtn.classList.remove("active");
            renderDirectory(localGems);
        };

        freeBtn.onclick = () => {
            freeBtn.classList.add("active");
            allBtn.classList.remove("active");
            // Array Method Filter Implementation
            const filtered = localGems.filter(gem => gem.cost === 0);
            renderDirectory(filtered);
        };
    }
}

// --- Function 6: Form Events Processing ---
function handleFormProcessing() {
    const form = document.getElementById("membership-form");
    const feedback = document.getElementById("form-feedback");

    if (form && feedback) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Halt document reload pattern
            const userName = document.getElementById("username").value;

            feedback.className = `card highlight-card reveal active`;
            feedback.innerHTML = `🎉 Thank you for registering, <strong>${userName}</strong>! Your explorer account has been successfully generated.`;
            form.reset();
        });
    }
}

// --- Function 7: Intersection Observer (Lazy Loading Integration) ---
function handleLazyLoading() {
    const lazyImages = document.querySelectorAll(".lazy-image");

    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add("loaded");
                    observer.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    }
}

// --- Function 8: Scroll Reveal Engine ---
function setupScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));
}