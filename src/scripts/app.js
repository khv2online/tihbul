import PerfectScrollbar from 'perfect-scrollbar';

const mapObjectsPs = new PerfectScrollbar('.MapObjects', {
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
});

let menuHamburger = document.querySelector('.MenuHamburger');
let mobileNavigation = document.querySelector('.MobileNavigation');
let mobileMainMenu = document.querySelector('.MobileNavigation .MainMenu');
let closeMobileNavigation = document.querySelector('.MobileNavigation_closeBtn');

function slideToggle(elem) {
  if (elem.offsetHeight < elem.scrollHeight) {
    elem.style.maxHeight = `${elem.scrollHeight}px`;
  } else {
    elem.style.maxHeight = '';
  }
}

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

(() => {
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
})();

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  "use strict";

  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
