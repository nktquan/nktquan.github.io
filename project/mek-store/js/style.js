/**
 * Created by nktquan@gmail.com
 */

$( document ).ready(function() {
    $('.home-slider').owlCarousel({
        items:1,
        loop: true,
        autoplay: 1000,
        smartSpeed:200
    });
    $('.top-product-slider').owlCarousel({
        loop: true,
        autoplay: 1000,
        items:1,
        smartSpeed:200
    });

    $('.featured-product').owlCarousel({
        loop: true,
        autoplay: 1000,
        nav: true,
        smartSpeed:200,
        responsive : {
            0 : {},
            480 : {
                items:2
            },
            768 : {
                items:2
            },
            992 : {
                items:3
            }
        }
    });

    $('.product-cate-slider').owlCarousel({
        loop: true,
        nav: true,
        smartSpeed:200,
        responsive : {
            0 : {},
            480 : {
                items:2
            },
            768 : {
                items:3
            },
            992 : {
                items:5
            }
        }
    });

    $('.blog-slider').owlCarousel({
        loop: true,
        autoplay: 1000,
        items:3,
        smartSpeed:200,
        responsive : {
            0 : {},
            480 : {
                items:2
            },
            768 : {
                items:2
            },
            992 : {
                items:3
            }
        }
    });

    var $featured_pd = $('.featured-product').data('owl.carousel');
    $('.featured .featured-menu li .nav-link').click(function () {
        $featured_pd.onResize();
    });
});


$( document ).ready(function() {
    $('.search-box .dropdown-menu').on("click.bs.dropdown", function (e) {
        e.stopPropagation();
    });
    $('#totop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 300);
    });
    $('#open-cart').click(function () {
        $('.cart-box').addClass('open');
        $('.overlay').addClass('open');
    });
    $('.cart-box .close-btn').click(function () {
        $('.cart-box').removeClass('open');
        $('.overlay').removeClass('open');
    });
});