document.addEventListener("DOMContentLoaded", () => {
    // Get the current count from localStorage, default to 0 if not set
    let reviewCount = Number(window.localStorage.getItem("reviewSubmissions")) || 0;

    // Increment the count
    reviewCount++;

    // Update localStorage and UI
    window.localStorage.setItem("reviewSubmissions", reviewCount);
    document.getElementById("review-counter").textContent = reviewCount;
    document.getElementById("currentyear").textContent = new Date().getFullYear();
});