const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

if (slides.length > 1) {
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 3500);
}

// SCROLL BUTTON
const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollBtn.classList.add("show");
        } else {
            scrollBtn.classList.remove("show");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// MOBILE DROPDOWN
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
    const trigger = dropdown.children[0]; // Hinnakiri link
    const menuLinks = dropdown.querySelectorAll(".dropdown-menu a");

    let openedOnce = false;

    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
        if (window.innerWidth <= 820) {

            if (!dropdown.classList.contains("open")) {
                // ESIMENE KLIK → ava dropdown
                event.preventDefault();

                dropdowns.forEach(item => item.classList.remove("open"));
                dropdown.classList.add("open");

                openedOnce = true;
            } else {
                // TEINE KLIK → lase link toimida (/hinnakiri)
                openedOnce = false;
            }
        }
    });

    // Kui vajutatakse alamlinki → sulge dropdown
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 820) {
                dropdown.classList.remove("open");
                openedOnce = false;
            }
        });
    });
});

// klik väljaspool → sulge
document.addEventListener("click", (event) => {
    if (window.innerWidth <= 820) {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
            }
        });
    }
});