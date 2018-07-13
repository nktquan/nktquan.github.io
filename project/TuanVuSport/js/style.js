/**
 * Created by nktquan@gmail.com on 4/4/18.
 */

$(document).ready(function(){
    $('.pd-slider1').owlCarousel({
        loop: true,
        responsiveClass: true,
        dots: false,
        autoplay:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });
    $('.pbc2-slider').owlCarousel({
        loop: true,
        responsiveClass: true,
        autoplay:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });

    $('.bcyc_thumb_all').owlCarousel({
        loop: true,
        responsiveClass: true,
        responsive:{
            0:{
                items:1,
                dots: false,
                nav:true
            },
            600:{
                items:1,
                nav:true,
                dots: false,
            },
            1000:{
                items:1,
                nav:true,
                dots: false,
                loop:false
            }
        }
    });

    $('.news_related_thumb').owlCarousel({
        loop: true,
        autoplay:true,
        responsiveClass: true,
        responsive: {
	        	0: {
	        		items: 1,
	        		nav:false,
	        		autoplay:false,
	        	},
	        	480: {
	        		items: 1,
	        		nav:false,
	        	},
	        	768: {
	        		items: 2,
	        		nav:false,
	        	},
	        	1024: {
	        		items: 4,
	        		nav:false,
	        	}
        }
    });

    $('.pd-box-slider').owlCarousel({
        loop: true,
        autoplay: true,
        dots: true,
        items:1
    });

    $(window).scroll(function () {
        var $this = $(this);
        var $menu_scroll = $('.menu-scroll');
        if ($this.scrollTop() > 300) {
            $menu_scroll.show();
        } else {
            $menu_scroll.hide();
        }
    });

    $('.scroll-top').click(function () {
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    });

	$("#tbl_shopping_cart tbody").find("tr").each(function(){
		var that = $(this);
		$(this).find(".addtocart_quantity_main").find(".btn_decrement").click(function(){
			addtocartQuantityCalculator(that.find(".addtocart_quantity"), 'decrement');
		})
		$(this).find(".addtocart_quantity_main").find(".btn_increment").click(function(){
			addtocartQuantityCalculator(that.find(".addtocart_quantity"), 'increment');
		})
	});

});
function addtocartQuantityCalculator(domEle, type){
	var quantity = parseInt(domEle.val());
	// Nếu như click vào '-'
	if(type == 'decrement'){
		if(quantity > 1) domEle.val(quantity - 1);

	}
	// Nếu như click vào '+'
	else{
		domEle.val(quantity + 1);
	}
}

function moveScrollTop(){
	var opts	= {
		top		: 0,
		margin	: 0,
		object	: null,
		duration	: 400,
		callback	: false
	};
	if(typeof(arguments[0]) != "undefined"){
		if(arguments[0] instanceof $) opts.object	= arguments[0];
		else if(typeof(arguments[0]) == "function") opts.callback = arguments[0];
		else if(typeof(arguments[0]) == "object") $.extend(opts, arguments[0]);
		if(opts.object != null) opts.top	= opts.object.offset().top;
	}
	$("body, html").animate({ scrollTop: (opts.top - opts.margin < 0 ? 0 : opts.top - opts.margin) }, opts.duration).promise().then(opts.callback);
}

$('.menu-btn').click(function () {
    $('.main-menu').addClass('open');
});
$('.close-btn').click(function () {
    $('.main-menu').removeClass('open');
});
$('.show-hide-btn').click(function () {
    $('.show-hide-btn').toggleClass('show-form');
    $('.filter-form').toggle();
});