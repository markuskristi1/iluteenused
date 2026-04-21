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
    const trigger = dropdown.children[0];
    const menuLinks = dropdown.querySelectorAll(".dropdown-menu a");

    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
        if (window.innerWidth <= 820) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = dropdown.classList.contains("open");

            dropdowns.forEach((item) => item.classList.remove("open"));

            if (!isOpen) {
                dropdown.classList.add("open");
            }
        }
    });

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 820) {
                dropdown.classList.remove("open");
            }
        });
    });
});

document.addEventListener("click", (event) => {
    if (window.innerWidth <= 820) {
        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("open");
            }
        });
    }
});