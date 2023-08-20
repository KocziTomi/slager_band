---
---

$(document).ready(function () {

    function reset_video_size(video_width){
        //better use jquery selectors: owl.items() and $(owl.items()) give problems, don't know why
        var items = $('.owl-item:not([data-video])');
        var videos = $('.owl-video-wrapper');
        var v_height = 0;
      
        //user-defined width ELSE, width from inline css (when owl.autoWidth == false), 
        //ELSE, computed innerwidth of the first element.
        var v_width = (video_width) ? video_width : ((items.css('width') != 'auto') ? items.css('width') : items.innerWidth());
      
        items.each(function(){
          var h = $(this).innerHeight();
          if(h > v_height) v_height = h;
        });
      
        
        videos.css({ 'height':v_height, 'width':v_width });
    };

    $('#gallery-onpage').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 5000,
        nav: true,
        dots: false,
        touchDrag: false,
        mouseDrag: false,
        video:true,
        checkVisible: false,
        onInitialized: function(){ reset_video_size(); },
        onResized: function(){ reset_video_size(); },
        onTranslate: function() {
            $('.owl-item').find('video').each(function() {
                this.pause();
            });
        },
        responsiveRefreshRate: 100,
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
        const mediaArray = {{ site.data.gallery.media | jsonify }}
        const mediaArrayLength = mediaArray.length
        const targetIndex = e.target.id - 1

        let html = ''

        for (let i = targetIndex; i < mediaArrayLength; i++) {
            if(mediaArray[i].video) {
                html += 
                `<div class="video-container not-visible">
                    <iframe
                        width="1257" 
                        height="707"
                        id=${mediaArray[i].id}
                        src="${mediaArray[i].url}"
                        title="${mediaArray[i].title}"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                </div>`
            } else {
                html += `<div class="item"><img class="owl-lazy not-visible" data-src="${mediaArray[i].url}" alt="picture_${mediaArray[i].alt}" id="${mediaArray[i].id}" /></div>`
            }
        }

        for (let i = 0; i < targetIndex; i++) {
            if(mediaArray[i].video) {
                html += 
                `<div class="video-container not-visible">
                    <iframe
                        width="1257" 
                        height="707"
                        id=${mediaArray[i].id}
                        src="${mediaArray[i].url}"
                        title="${mediaArray[i].title}"
                        frameborder="0"
                        allowfullscreen
                    ></iframe>
                </div>`
            } else {
                html += `<div class="item"><img class="owl-lazy not-visible" data-src="${mediaArray[i].url}" alt="picture_${mediaArray[i].alt}" id="${mediaArray[i].id}" /></div>`
            }
        }

        $('#gallery-modal').append(html)

        $('#gallery-modal').on('initialize.owl.carousel', function () {
            $('#gallery-modal').hide().fadeIn()
            $('#gallery-modal').find('.not-visible').addClass('visible')
            $('#gallery-modal').find('.not-visible').removeClass('not-visible')
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
    })
})


$(document).on('show.bs.modal', '#exampleModal', function (e) {
    if (window.innerWidth <= 1024) {
        return e.preventDefault();
    }
})

$('#exampleModal')
.unbind()
.on('hide.bs.modal', function () {
    $('#gallery-modal').empty()
    $('#gallery-modal').trigger('destroy.owl.carousel');
})