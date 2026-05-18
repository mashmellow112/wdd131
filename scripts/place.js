/**
 * Madagascar Client-side Controller
 * Manages calculations and modification logging
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch parameters dynamically from the static UI layers
    const tempElement = document.getElementById("temperature");
    const windElement = document.getElementById("wind-speed");
    const chillDisplay = document.getElementById("wind-chill");

    const t = parseFloat(tempElement.textContent);
    const v = parseFloat(windElement.textContent);

    /**
     * 2. SINGLE-LINE CALCULATE WIND CHILL FUNCTION
     * Metric Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
     */
    const calculateWindChill = (temp, speed) => (13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16))).toFixed(1);

    // 3. Conditional execution gateway wrapper validation checks
    if (t <= 10 && v > 4.8) {
        chillDisplay.textContent = `${calculateWindChill(t, v)} °C`;
    } else {
        chillDisplay.textContent = "N/A";
    }

    // 4. Populate dynamic baseline global values inside footer elements
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified-date").textContent = document.lastModified;
});