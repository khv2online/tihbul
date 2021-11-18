$(function () {
  $(".RangeSlider").each(function(index, elem) {
    let rangeSliderElement = elem.closest('.RangeSliderElement');
    let rangeSliderElementFrom = rangeSliderElement.querySelector('.RangeSliderElement_input-from');
    let rangeSliderElementTo = rangeSliderElement.querySelector('.RangeSliderElement_input-to');

    let defaultFromValue = Number(rangeSliderElementFrom.dataset.defaultValue) || 0;
    let defaultToValue = Number(rangeSliderElementTo.dataset.defaultValue) || 1000;

    $(elem).slider({
      range: true,
      min: Number(rangeSliderElementFrom.min),
      max: Number(rangeSliderElementTo.max),
      values: [defaultFromValue, defaultToValue],

      slide: function (event, ui) {
        rangeSliderElementFrom.value = ui.values[0];
        rangeSliderElementTo.value = ui.values[1];
      },

      create: function (event, ui) {
        rangeSliderElementFrom.value = defaultFromValue;
        rangeSliderElementTo.value = defaultToValue;
      },

      classes: {
        "ui-slider-handle": "RangeSlider_handle",
        "ui-slider-range": "RangeSlider_range"
      }
    });
  });

  document.addEventListener('input', function (e) {
    let rangeSliderInput = e.target;

    if (!rangeSliderInput.matches('.RangeSliderElement_input')) return;

    let rangeSliderElement = rangeSliderInput.closest('.RangeSliderElement');
    let rangeSlider = rangeSliderElement.querySelector('.RangeSlider');
    let rangeInputFrom = rangeSliderElement.querySelector('.RangeSliderElement_input-from');
    let rangeInputTo = rangeSliderElement.querySelector('.RangeSliderElement_input-to');

    $(rangeSlider).slider( "option", "values", [rangeInputFrom.value, rangeInputTo.value] );
  });

  document.addEventListener('click', function (e) {
    let filterResetLink = e.target.closest('.Filter_resetLink');

    if (!filterResetLink) return;

    let filter = filterResetLink.closest('.Filter');
    let rangeSliderElements = filter.querySelectorAll('.RangeSliderElement');

    for (let rangeSliderElement of rangeSliderElements) {
      let rangeSlider = rangeSliderElement.querySelector('.RangeSlider');
      let rangeInputFrom = rangeSliderElement.querySelector('.RangeSliderElement_input-from');
      let rangeInputTo = rangeSliderElement.querySelector('.RangeSliderElement_input-to');

      rangeInputFrom.value = rangeInputFrom.dataset.defaultValue;
      rangeInputTo.value = rangeInputTo.dataset.defaultValue;

      $(rangeSlider).slider( "option", "values", [rangeInputFrom.dataset.defaultValue, rangeInputTo.dataset.defaultValue] );
    }

    e.preventDefault();
  });
});