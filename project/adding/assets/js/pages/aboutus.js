(function($){
	var
	_trungFunction = function(){

		var windowH = $(window).height();
		var heroH = $('.home-hero-sect').height();
		//-- Animation script --
		setTimeout(function(){ 
				$('.reg-title-wrap.brand-shape1 .sect-title').addClass('animated-element animation-go fade fromBottom');
		 }, 600);
		var TAnimatecontroller1 = $.superscrollorama({triggerAtCenter:false}); 
		// TAnimatecontroller1.addTween('.home-reg-sect.t-section', TweenMax.from( $('.reg-title-wrap.brand-shape1 .sect-title'), .5, {css:{opacity: 0, transform: 'translate(0, 30px)'}}),500,-windowH);

		TAnimatecontroller1.addTween('.about-enjoy-sect.t-section', TweenMax.from( $('.about-headline1-wrap'), .5, {css:{opacity: 0, transform: 'translate(0, 30px)'}}),500,-windowH/2);

		TAnimatecontroller1.addTween('.about-joinus-sect.t-section', TweenMax.from( $('.joinus-brand-shape'), .5, {css:{opacity: 0, transform: 'translate(0, 30px)'}}),0,-windowH/2);
		//-- End of Animation script -- 

		$('.about-joinus-slider').slick({
				dots: true,
		        slide: '.about-joinus-slide',
		        adaptiveHeight: true,
		        arrows: false,
		        autoplay: true,
		        autoplaySpeed: 3000,
	        	easing: "easeInOutQuint",
		    });

	    $('.about-feature-slider').slick({
			dots: true,
	        slide: '.about-feature-slide',
	        adaptiveHeight: true,
	        arrows: false,
	        autoplay: true,
	        autoplaySpeed: 3000,
	        easing: "easeInOutQuint",
	    });
	    $('.t-header .nav-expand-btn').click(function(){
	    	$('.t-header').toggleClass('expanded');
	    });

	    $('.t-header').addClass('stick2top');

	    $('a[href*=#]:not([href=#])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		});
	}
	;
	
	$.aboutus = {};
	$.aboutus.init = function(options){
		_trungFunction();
		
	};
	
})(jQuery);