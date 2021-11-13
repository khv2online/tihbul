import Swiper, {
  Navigation,
  Pagination,
  EffectFade
} from 'swiper';

import PerfectScrollbar from 'perfect-scrollbar';

let mapObjects = document.querySelector('.MapObjects');
if (mapObjects) {
  const mapObjectsPs = new PerfectScrollbar('.MapObjects', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });
}

const benefitsSlider = new Swiper('.BenefitsSlider', {
  modules: [Navigation, Pagination, EffectFade],

  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },

  slidesPerView: 'auto',
  spaceBetween: 20,
  slideActiveClass: 'BenefitsSlider_slide-active',

  pagination: {
    el: '.BenefitsSlider_pagination',
    clickable: true,
    bulletClass: 'SwiperPagination_bullet',
    bulletActiveClass: 'SwiperPagination_bullet-active',
  },

  navigation: {
    prevEl: '.BenefitsSlider_prev',
    nextEl: '.BenefitsSlider_next',
    disabledClass: 'SwiperBtn-disabled'
  },

  breakpoints: {
    1024: {
      spaceBetween: 48,
    },
  },
});

let layoutSectionTabsList = document.querySelector('.LayoutsSection_tabsList');
if (layoutSectionTabsList) {
  const tabsListPs = new PerfectScrollbar('.LayoutsSection_tabsList', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });
}

const layoutsSlider = [];
document.querySelectorAll(".LayoutSlider").forEach(function (item) {
  "use strict";
  layoutsSlider.push(
    new Swiper(`#${item.id} .swiper`, {
      modules: [Navigation, Pagination],

      a11y: {
        enabled: false,
      },

      slidesPerView: 1,
      spaceBetween: 16,

      pagination: {
        el: `#${item.id} .SwiperPagination`,
        bulletClass: "SwiperPagination_bullet",
        bulletActiveClass: "SwiperPagination_bullet-active",
        clickable: true,
      },

      navigation: {
        prevEl: `#${item.id} .LayoutSlider_prev`,
        nextEl: `#${item.id} .LayoutSlider_next`,
      },

      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 24,
        },
        1366: {
          slidesPerView: 2
        },
      },
    })
  );
});

// Tabs
document.querySelectorAll(".Tabs_list").forEach(function (tabList) {
  "use strict";
  tabList.querySelectorAll(".Tabs_item").forEach(function (tab, tabIndex) {
    tab.onclick = () => {
      const activeTab = tab.parentNode.querySelector(".Tabs_item-active");

      if (activeTab) {
        activeTab.classList.remove("Tabs_item-active");
      }

      tab.classList.add("Tabs_item-active");

      const parent = tab.closest(".Tabs");
      const tabsContent = parent.querySelectorAll(".Tabs_content");

      tabsContent.forEach((tabContent) => {
        tabContent.style.display = "none";
      });

      tabsContent[tabIndex].style.display = "block";

      const layoutSlider = tabsContent[tabIndex].querySelector(
        ".LayoutSlider"
        );
      if (layoutSlider) {
        layoutsSlider[tabIndex].update();
      }

      const gallerySlider = tabsContent[tabIndex].querySelector(".GallerySlider");
      if (gallerySlider) {
        gallerySliders[tabIndex].update();
      }
    };
  });
});

document.addEventListener('click', function (e) {
  let tooltip = e.target.closest('.Tooltip');

  if (!tooltip) return;

  let tooltipActive = document.querySelector('.Tooltip-active');
  if (tooltipActive && tooltipActive != tooltip) {
    tooltipActive.classList.remove('Tooltip-active');
  }

  tooltip.classList.toggle('Tooltip-active');

  let tooltipText = tooltip.querySelector('.Tooltip_text');
  let tooltipTextCoords = tooltipText.getBoundingClientRect();
  let windowWidth = document.documentElement.clientWidth;

  if ((tooltipTextCoords.left + tooltipTextCoords.width + 16) > windowWidth) {
    if (windowWidth < 768) {
      tooltipText.style.marginLeft = windowWidth - (tooltipTextCoords.left + tooltipTextCoords.width + 16) + 'px';
    } else {
      tooltipText.classList.add('Tooltip_text-right');
    }
  }

  event.preventDefault();
});

document.addEventListener('click', function (e) {
  let tooltipActive = document.querySelector('.Tooltip-active');

  if (tooltipActive && !tooltipActive.contains(e.target)) {
    tooltipActive.classList.remove('Tooltip-active');
  };
});

new Swiper(`.GallerySlider`, {
  modules: [Navigation, Pagination],

  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,

  pagination: {
    el: `.Gallery_pagination`,
    bulletClass: "SwiperPagination_bullet",
    bulletActiveClass: "SwiperPagination_bullet-active",
    clickable: true,
  },

  navigation: {
    prevEl: `.Gallery_prev`,
    nextEl: `.Gallery_next`,
  },

  breakpoints: {
    768: {
      spaceBetween: 80,
    }
  },
});

(() => {
  if (document.getElementById('infrasMap')) {
    let coords = {
      lat: 54.9800409,
      lng:  82.877835
    };

    let map = new google.maps.Map(document.getElementById('infrasMap'), {
      zoom: 16,
      center: coords,
      streetViewControl: false,
      scrollwheel: false,
    });

    let markers = JSON.parse(document.getElementById('infrasObj').textContent);

    let insertedMarkers = [];

    for (let i = 0; i < markers.length; i++) {
      let image = {
        url: markers[i].ico
      };

      let marker = new google.maps.Marker({
        position: markers[i].coords,
        map: map,
        icon: image,
        iconsType: markers[i].type,
      });

      insertedMarkers.push(marker);
    }

    var mainPin = {
      url: "/img/map_icons/bld_marker.png",
    };

    let mainMarker = new google.maps.Marker({
      position: coords,
      map: map,
      icon: mainPin,
      iconsType: "unbeatable",
    });

    insertedMarkers.push(mainMarker);

    $(".MapObject").on('click', (event) => {
      event.preventDefault();
      let $mapIcon = $(event.currentTarget);

      let $selectedMapObject = $('.MapObject-selected');

      if (!$selectedMapObject.length || ($selectedMapObject[0] !== undefined && $selectedMapObject[0] != event.currentTarget)) {
        $($selectedMapObject[0]).removeClass('MapIcon-active');
      }

      $mapIcon.addClass('MapIcon-active');

      let $mapIcons = $(".MapObject-selected");
      if (!$mapIcons.length) {
        for (let i = insertedMarkers.length - 1; i >= 0; i--) {
          insertedMarkers[i].setVisible(true);
        }
      } else {
        let activeTypes = [];
        $mapIcons.each((index, el) => {
          activeTypes.push(parseInt(el.dataset.iconsType));
        });

        for (let i = insertedMarkers.length - 1; i >= 0; i--) {
          if(insertedMarkers[i].iconsType === "unbeatable"){
            continue;
          }else if (activeTypes.includes(insertedMarkers[i].iconsType) || activeTypes[0] == 0) {
            insertedMarkers[i].setVisible(true);
          } else {
            insertedMarkers[i].setVisible(false);
          }
        }
      }
    });
  }
})();