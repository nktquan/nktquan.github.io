/**
 * Created by nktquan@gmail.com on 8/24/16.
 */

$(document).ready(function(){
    $('.menu-toggle').click(function () {
        $('body').addClass('open');
    });
    $('.menu-mb .close').click(function () {
        $('body').removeClass('open');
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('.pd-slider').owlCarousel({
        loop:true,
        dot:true,
        items:1,
        autoplay: true,
    });
    $('.slider').owlCarousel({
        loop:true,
        dot:true,
        items:1,
        autoplay: true,
    });
    $('.news-slider').owlCarousel({
        loop:true,
        nav:true,
        autoplay: true,
        margin: 30,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });
    $('.rlpd-list').owlCarousel({
        loop:true,
        nav:true,
        autoplay: true,
        margin: 30,
        autoplaySpeed: 1000,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
    $('.dropdown-menu').click(function(e) {
        if (e.target.nodeName !== 'BUTTON') e.stopPropagation();
    });
    $('.map').click(function () {
        $('.map iframe').css("pointer-events", "auto");
    });

    $( ".map" ).mouseleave(function() {
        $('.map iframe').css("pointer-events", "none");
    });

    $('#productSlider').lightSlider({
        gallery: true,
        item: 1,
        loop:true,
        slideMargin: 0,
        thumbItem: 6,
        auto: true,
        speed: 400
    });

});