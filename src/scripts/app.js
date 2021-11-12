let menuHamburger = document.querySelector('.MenuHamburger');
let mobileNavigation = document.querySelector('.MobileNavigation');
let mobileMainMenu = document.querySelector('.MobileNavigation .MainMenu');
let closeMobileNavigation = document.querySelector('.MobileNavigation_closeBtn');

menuHamburger.addEventListener('click', function (e) {
  menuHamburger.classList.toggle('MenuHamburger-active');
  mobileNavigation.classList.toggle('MobileNavigation-opened');

  document.body.style.overflow = document.documentElement.clientWidth < 768 ? 'hidden' : '';

  e.preventDefault();
});


closeMobileNavigation.addEventListener('click', function (e) {
  menuHamburger.classList.remove('MenuHamburger-active');
  mobileNavigation.classList.remove('MobileNavigation-opened');
  document.body.style.overflow = '';
  e.preventDefault();
});

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  "use strict";

  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    if (this.getAttribute("href") === '#') return;

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
