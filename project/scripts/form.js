document.addEventListener("DOMContentLoaded", () => {
    // Data: Array of Objects
    const products = [
        { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
        { id: "fc-2050", name: "power laces", averagerating: 4.7 },
        { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
        { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
        { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
    ];

    // Function 1: Populate Product Dropdown
    const populateProducts = (productList) => {
        const selectElement = document.getElementById("product-name");
        if (selectElement) {
            const fragment = document.createDocumentFragment();
            
            // Use Array Method: forEach
            productList.forEach(product => {
                const option = document.createElement("option");
                option.value = product.id;
                // Template literal used for content
                option.textContent = `${product.name}`;
                fragment.appendChild(option);
            });

            selectElement.appendChild(fragment);
        }
    };

    // Function 2: Update Footer with template literals
    const setLastModified = () => {
        const yearSpan = document.getElementById("currentyear");
        const lastModSpan = document.getElementById("lastModified");

        if (yearSpan) {
            yearSpan.textContent = `${new Date().getFullYear()}`;
        }

        if (lastModSpan) {
            const date = new Date(document.lastModified);
            const n = (num) => `${num}`.padStart(2, '0');
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${n(date.getHours())}:${n(date.getMinutes())}:${n(date.getSeconds())}`;
            lastModSpan.textContent = `Last modification: ${formattedDate}`;
        }
    };

    // Function 3: Implement localStorage for form submission count
    const trackFormSubmissions = () => {
        let submissionCount = localStorage.getItem('formSubmissions');
        if (submissionCount) {
            submissionCount = parseInt(submissionCount) + 1;
        } else {
            submissionCount = 1;
        }
        localStorage.setItem('formSubmissions', submissionCount);
        console.log(`Form submitted ${submissionCount} times.`); // For demonstration
    };

    // Execution
    populateProducts(products);
    setLastModified();

    // Example of how you might call trackFormSubmissions on form submission
    // const reviewForm = document.getElementById('review-form'); // Assuming your form has this ID
    // if (reviewForm) {
    //     reviewForm.addEventListener('submit', trackFormSubmissions);
    // }
});