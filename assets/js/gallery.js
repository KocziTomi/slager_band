$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        margin: 10,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 5,
            },
        },
        navText: [
            '<span class="fa fa-chevron-left fa-2x"></span>',
            '<span class="fa fa-chevron-right fa-2x"></span>',
        ],
    })
})
