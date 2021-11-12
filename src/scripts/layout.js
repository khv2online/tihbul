import Swiper, {
  Navigation,
  Pagination,
  EffectFade
} from 'swiper';


const layousSlider = new Swiper(`.LayoutSlider_swiper`, {
  modules: [Navigation, Pagination],

  a11y: {
    enabled: false,
  },

  slidesPerView: 1,
  spaceBetween: 16,

  pagination: {
    el: `.LayoutSlider_pagination`,
    bulletClass: "SwiperPagination_bullet",
    bulletActiveClass: "SwiperPagination_bullet-active",
    clickable: true,
  },

  navigation: {
    prevEl: `.LayoutSlider_prev`,
    nextEl: `.LayoutSlider_next`,
  },

  breakpoints: {
    768: {
      slidesPerView: "auto",
      spaceBetween: 24,
    },
    1366: {
      slidesPerView: 4
    },
  },
});

// Apartment Tabs
document.querySelectorAll(".ApartmentTabs_list").forEach(function (apartmentTabList) {
  "use strict";
  apartmentTabList.querySelectorAll(".ApartmentTabs_item").forEach(function (tab, tabIndex) {
    tab.onclick = () => {
      const activeTab = tab.parentNode.querySelector(".ApartmentTabs_item-active");

      if (activeTab) {
        activeTab.classList.remove("ApartmentTabs_item-active");
      }

      tab.classList.add("ApartmentTabs_item-active");

      const parent = tab.closest(".ApartmentTabs");
      const tabsContent = parent.querySelectorAll(".ApartmentTabs_content");

      tabsContent.forEach((tabContent) => {
        tabContent.style.display = "none";
      });

      tabsContent[tabIndex].style.display = "block";
    };
  });
});