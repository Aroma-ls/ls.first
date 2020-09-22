window.addEventListener('load', function () {
    var slider = document.querySelector('.sli_a');
    var sli_b = document.querySelector('.sli_b');
    var sliderbar = document.querySelector('#sliderbar');
    slider.addEventListener('mouseover', function () {
        sliderbar.className = 'sliderbar';
        animate(sli_b, 0, 15);
    })
    slider.addEventListener('mouseleave', function () {
        animate(sli_b, -790, 15, function () {
            sliderbar.className = '';
        });
    })
})