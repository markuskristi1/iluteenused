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

const dropdownMenuLinks = document.querySelectorAll(".dropdown-menu a");

dropdownMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
            setTimeout(() => {
                document.activeElement?.blur();
            }, 50);
        }
    });
});