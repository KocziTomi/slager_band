---
---

$(document).ready(function () {
    $('#gallery-onpage').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        dots: false,
        touchDrag: false,
        mouseDrag: false,
        responsive: {
            0: {
                items: 1,
            },
            1000: {
                items: 3,
            },
        },
        navText: [
            '<span class="fa fa-chevron-left fa-2x"></span>',
            '<span class="fa fa-chevron-right fa-2x"></span>',
        ],
    })



    
    $('#gallery-onpage .item').on('click', function (e) {

        $('#gallery-modal').empty()
        const media = {{ site.data.gallery.media | jsonify }}
       
        const picturesArray = media.pictures
        const picturesArrayLength = media.pictures.length
        const targetIndex = e.target.id - 1

        let html = ''

        for (let i = targetIndex; i < picturesArrayLength; i++) {
            html += `<div class="item"><img class="owl-lazy" data-src="${picturesArray[i].url}" alt="picture_${picturesArray[i].alt}" id="${picturesArray[i].id}" /></div>`
        }

        for (let i = 0; i < targetIndex; i++) {
            html += `<div class="item"><img class="owl-lazy" data-src="${picturesArray[i].url}" alt="picture_${picturesArray[i].alt}" id="${picturesArray[i].id}" /></div>`
        }

        $(html).appendTo('#gallery-modal')

        $('#gallery-modal').on('initialized.owl.carousel', function () {
            $('#gallery-modal').fadeIn()
        })

        $('#gallery-modal').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            touchDrag: false,
            mouseDrag: false,
            singleItem: true,
            dots: false,
            lazyLoad: true,
            responsive: {
                0: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
            navText: [
                '<span class="fa fa-chevron-left fa-2x"></span>',
                '<span class="fa fa-chevron-right fa-2x"></span>',
            ],
        })

        $('#exampleModal')
            .unbind()
            .on('hidden.bs.modal', function () {
                $('#gallery-modal').data('owl.carousel').destroy()
            })
    })

})


$(document).on('show.bs.modal', '#exampleModal', function (e) {
    console.log('HI')
    if (window.innerWidth <= 1024) {
        return e.preventDefault();
    }
})