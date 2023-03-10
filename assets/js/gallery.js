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
        const media = {
            pictures: [
                {
                    id: '1',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=1',
                    alt: '1',
                },
                {
                    id: '2',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=2',
                    alt: '2',
                },
                {
                    id: '3',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=3',
                    alt: '3',
                },
                {
                    id: '4',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=4',
                    alt: '4',
                },
                {
                    id: '5',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=5',
                    alt: '5',
                },
                {
                    id: '6',
                    url: 'http://via.placeholder.com/350x200/FECA57/FFF.jpg?text=6',
                    alt: '6',
                },
            ],
            videos: [],
        }

        const picturesArray = media.pictures
        const picturesArrayLength = media.pictures.length
        const targetIndex = e.target.id - 1

        let html = ''

        for (let i = targetIndex; i < picturesArrayLength; i++) {
            html +=
                '<div class="item"> <img src="' +
                picturesArray[i].url +
                '" alt="' +
                picturesArray[i].alt +
                ' id="' +
                picturesArray[i].id +
                '"" /></div>'
        }

        for (let i = 0; i < targetIndex; i++) {
            html +=
                '<div class="item"> <img src="' +
                picturesArray[i].url +
                '" alt="' +
                picturesArray[i].alt +
                ' id="' +
                picturesArray[i].id +
                '"" /></div>'
        }

        $(html).appendTo('#gallery-modal')

        $('#gallery-modal').on('initialized.owl.carousel', function () {
            $('#loader').fadeOut('slow')
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

        //

        $('#exampleModal')
            .unbind()
            .on('hidden.bs.modal', function () {
                $('#gallery-modal').data('owl.carousel').destroy()
            })
    })
})
