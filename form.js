document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];

    const selectElement = document.getElementById("product-name");
    if (selectElement) {
        const fragment = document.createDocumentFragment();
        
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            fragment.appendChild(option);
        });

        selectElement.appendChild(fragment);
    }

    // Dynamic Footer Logic
    const yearSpan = document.getElementById("currentyear");
    const lastModSpan = document.getElementById("lastModified");
    
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) {
        const date = new Date(document.lastModified);
        const n = (num) => num.toString().padStart(2, '0');
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${n(date.getHours())}:${n(date.getMinutes())}:${n(date.getSeconds())}`;
        
        lastModSpan.textContent = `Last modification: ${formattedDate}`;
    }
});