// nav-scroll.js
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mainNav");
    const banner = document.querySelector(".topBanner");

    function checkScroll() {
        const threshold = banner
            ? Math.max(8, banner.offsetHeight - (nav ? nav.offsetHeight : 0))
            : 8;

        if (window.scrollY > threshold) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    document.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    checkScroll();
});
