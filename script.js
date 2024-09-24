document.addEventListener("DOMContentLoaded", function () {
    let menuFile = window.location.href.includes("_en.html") ? "meniu_en.html" : "meniu.html";
    let footerFile = window.location.href.includes("_en.html") ? "footer_en.html" : "footer.html";

    fetch(menuFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-placeholder").innerHTML = data;
            initializeLanguageSwitcher();
            initializeCarousel();

            const menuIcon = document.querySelector('.menu-icon');
            const navMenu = document.querySelector('nav ul');

            if (menuIcon && navMenu) {
                menuIcon.addEventListener('click', function() {
                    navMenu.classList.toggle('show');
                });
            }
        });

    fetch(footerFile)
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    function initializeLanguageSwitcher() {
        const roBtn = document.getElementById('ro');
        const enBtn = document.getElementById('en');

        if (roBtn && enBtn) {
            roBtn.addEventListener('click', function () {
                if (window.location.href.includes("_en.html")) {
                    window.location.href = window.location.href.replace("_en.html", ".html");
                }
            });

            enBtn.addEventListener('click', function () {
                if (!window.location.href.includes("_en.html")) {
                    window.location.href = window.location.href.replace(".html", "_en.html");
                }
            });
        }
    }

    function initializeCarousel() {
        if (typeof $ === 'undefined' || !$.fn.slick) {
            return;
        }

        $('.hero-carousel').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            infinite: true,
            speed: 500,
            fade: false,
            cssEase: 'linear',
            arrows: true,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 1,
            adaptiveHeight: true,
            responsive: [{ breakpoint: 768, settings: { variableWidth: false } }]
        });

        $('.room-carousel').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            dots: true,
            infinite: true,
            speed: 500,
            fade: false,
            cssEase: 'linear',
            arrows: true,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    }

    window.addEventListener('scroll', function () {
        let nav = document.querySelector('nav');
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    const faders = document.querySelectorAll('.fade-in-section');
    const appearOptions = { threshold: 0, rootMargin: "0px 0px -100px 0px" };
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
