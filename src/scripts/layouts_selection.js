$(function () {
  $(".RangeSlider").each(function(index, elem) {
    // console.log(index, $(elem));
    // console.log(index, $(this));

    // console.log(elem);

    let rangeSliderElement = elem.closest('.RangeSliderElement');
    let rangeSliderElementFrom = rangeSliderElement.querySelector('.RangeSliderElement_from');
    let rangeSliderElementTo = rangeSliderElement.querySelector('.RangeSliderElement_to');

    let minValue = Number(rangeSliderElement.dataset.minValue);
    let maxValue = Number(rangeSliderElement.dataset.maxValue);
    let startMinValue = Number(rangeSliderElement.dataset.startMinValue);
    let startMaxValue = Number(rangeSliderElement.dataset.startMaxValue);

    $(elem).slider({
      range: true,
      min: minValue,
      max: maxValue,
      values: [startMinValue, startMaxValue],
      slide: function (event, ui) {
        rangeSliderElementFrom.textContent = ui.values[0];
        rangeSliderElementTo.textContent = ui.values[1];
      },
      create: function (event, ui) {
        rangeSliderElementFrom.textContent = startMinValue;
        rangeSliderElementTo.textContent = startMaxValue;
      },
      classes: {
        "ui-slider-handle": "RangeSlider_handle",
        "ui-slider-range": "RangeSlider_range"
      }
    });
  });

  // $(".RangeSlider").slider({
  //   range: true,
  //   min: 625,
  //   max: 2925,
  //   values: [625, 2925],
  //   slide: function (event, ui) {
  //     console.log("Slide");
  //   },
  //   classes: {
  //     "ui-slider-handle": "RangeSlider_handle",
  //     "ui-slider-range": "RangeSlider_range"
  //   }
  // });
});