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
// back-to-top.js
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.querySelector(".backToTopBtn");

    function checkScrollPosition() {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    }

    // اسکرول نرم به بالای صفحه
    backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    checkScrollPosition();
});
// script.js - consolidated and fixed
// Handles nav sticky blur and back-to-top visibility + smooth scroll

document.addEventListener("DOMContentLoaded", () => {
    // NAV / SCROLL
    const nav = document.getElementById("mainNav");
    const banner = document.querySelector(".topBanner");

    function checkScroll() {
        if (!nav) return;
        const threshold = banner
            ? Math.max(8, banner.offsetHeight - nav.offsetHeight)
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

    // BACK TO TOP
    function setupBackToTop(backToTopBtn) {
        if (!backToTopBtn) return;

        function checkScrollPosition() {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }

        backToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        window.addEventListener("scroll", checkScrollPosition, { passive: true });
        checkScrollPosition();
    }

    // Try immediate setup (if button already in DOM)
    const existingBtn = document.querySelector(".backToTopBtn");
    if (existingBtn) {
        setupBackToTop(existingBtn);
    } else {
        // If the button might be injected later (e.g. moved into footer), observe DOM and init once it appears
        const observer = new MutationObserver((mutations, obs) => {
            const btn = document.querySelector(".backToTopBtn");
            if (btn) {
                setupBackToTop(btn);
                obs.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Safety: stop observing after 10s to avoid leaking observers
        setTimeout(() => observer.disconnect(), 10000);
    }
});