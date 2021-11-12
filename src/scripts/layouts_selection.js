$(function () {
  $(".RangeSlider").slider({
    range: true,
    min: 625,
    max: 2925,
    values: [625, 2925],
    slide: function (event, ui) {
      console.log("Slide");
    },
    classes: {
      "ui-slider-handle": "RangeSlider_handle",
      "ui-slider-range": "RangeSlider_range"
    }
  });
});