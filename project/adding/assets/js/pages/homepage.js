(function($){
	var

	_trungFunction = function(){
		var windowH = $(window).height();
		var heroH = $('.home-hero-sect').height();
		// var windowW = $(window).width();
		// var $heroContent = $('.hero-content');

		$('.home-hero-sect.t-section + section').css('margin-top',windowH);

		setTimeout(function(){ 
			$('.home-hero-slide .hero-heading span:first-child').addClass('animation-go');
		}, 500);
		setTimeout(function(){ 
			$('.home-hero-slide .hero-heading span:last-child').addClass('animation-go');
		}, 900);
		setTimeout(function(){ 
			$('.home-hero-slide .hero-heading+p').addClass('animation-go');
		}, 1300);

		setTimeout(function(){ 
			$('.home-hero-slide .nav-home').addClass('animation-go');
		}, 1600);

		var TAnimatecontroller = $.superscrollorama({triggerAtCenter:false}); 
		TAnimatecontroller.addTween('.home-reg-sect.t-section', TweenMax.to( $('.hero-content'), .5, {css:{opacity: 0}}),200,(-(2*windowH)/3));

		TAnimatecontroller.addTween('.home-reg-sect.t-section', TweenMax.from( $('.reg-title-wrap.brand-shape1'), .5, {css:{opacity: 0, transform: 'translate(0, 50px)'}}),200,-windowH);
		TAnimatecontroller.addTween('.home-reg-sect.t-section', TweenMax.to( $('.home-hero-sect .home-hero-slide'), .5, {css:{opacity: 0.2}}),700,-windowH);
		TAnimatecontroller.addTween('.t-discover-slide', TweenMax.from( $('.t-discover-slide .container'), .7, {css:{opacity: 0, transform: 'translate(0, 20px)'}}),0,(-windowH/2));
		TAnimatecontroller.addTween('.home-eventhead-sect', TweenMax.from( $('.event-title-wrap.brand-shape2'), .7, {css:{opacity: 0, transform: 'translate(0, 20px)'}}),0,(-windowH/2));
		TAnimatecontroller.addTween('.home-gallery-sect', TweenMax.from( $('.home-gallery-sect .container'), .7, {css:{opacity: 0, transform: 'translate(0, 20px)'}}),0,(-windowH/2));

		// TAnimatecontroller.addTween(
		// 	'.home-eventhead-sect',
		// 	TweenMax.to($('.home-eventhead-sect'), 1, 
		// 		{css:{'background-position': 50+'% '+100+'%'}, immediateRender:true}),
		// 	windowH,
		// 	-windowH 
		// );
		$('.home-hero-sect').slick({
			dots: true,
	        slide: '.home-hero-slide',
	        adaptiveHeight: true,
	        arrows: false,
	        autoplay: true,
	        autoplaySpeed: 3000,
	        easing: "easeInOutQuint",
	    });

	    $('.home-discover-slider').slick({
			dots: true,
	        slide: '.t-discover-slide',
	        adaptiveHeight: true,
	        arrows: false,
	        autoplay: true,
	        autoplaySpeed: 3000,
	        pauseOnHover: false,
	        easing: "easeInOutQuint",
	    });
	    
	    $('.partners-slider').slick({
			dots: true,
	        slide: '.partner-list',
	        adaptiveHeight: true,
	        arrows: false,
	        autoplay: true,
	        autoplaySpeed: 3000,
	        pauseOnHover: false,
	        easing: "easeInOutQuint",
	    });

	    $('.benefit-slider').slick({
			dots: true,
	        slide: '.benefit-list',
	        adaptiveHeight: true,
	        arrows: false,
	        autoplay: true,
	        autoplaySpeed: 3000,
	        pauseOnHover: false,
	        easing: "easeInOutQuint",
	    });

	    $('.t-header .nav-expand-btn').click(function(){
	    	$('.t-header').toggleClass('expanded');
	    });

	 

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

	    $('.home-reg-sect').waypoint(function(direction) {
			if (direction=='down') {
	      		//$('.t-header').addClass('stick2top');
	      	} else {
	      		//$('.t-header').removeClass('stick2top');
	      	};
	    }, {
			offset: '50%'
		});
		$('.home-reg-sect').waypoint(function(direction) {
			if (direction=='down') {
	      		$('.home-hero-sect.t-section').css('opacity','0');
	      	} else {
	      		$('.home-hero-sect.t-section').css('opacity','1');
	      	};
	    }, {
			offset: '-10%'
		});
		$('.explore-btn').click(function () {
	            $.fancybox({
	                padding: 0,
	                transitionIn: 'none',
	                transitionOut: 'none',
	                width: 980,
	                height: 650,
	                href: this.href.replace(new RegExp('watch\\?v=', 'i'), 'v/') + '?rel=0&autohide=1&modestbranding=0&autoplay=1&showinfo=0&hd=1&fs=1',
	                type: 'iframe',
	                helpers : { 
	                	overlay: {
		                	opacity: 1, 
		                	css: {'background-color': '#4D3F40'}
	                	}
	                } 
	            });
	            return false;
	        });
		$('.t-banner-popup .t-banner-close').click(function () {
			$(this).parents('.t-banner-popup').fadeOut();
		});
		setSize();
		
		$(window).resize(function () {
			setSize();
		});

		function setSize() {
	    	
			$('.t-event-list li .event-thumb > img').each(function(){
		    	var $this = $(this), $imgParent = $(this).parents('.event-thumb');
		    	var imgW = $this.width(), parentW = $imgParent.width();
	    		var imgH = $this.height(), parentH = $imgParent.height();
		    	var imgRatio = imgW/imgH;
		    	var parentRatio = parentW/parentH;
		    			    		
	    		if( imgRatio < parentRatio ){
	    			$this.css({'width':parentW, 'height':'auto', 'margin-top':Math.round(-((imgH/(imgW/parentW))-parentH)/2)});	    			
	    		} else {
		    		$this.css({'width':'auto', 'height':parentH, 'margin-left':Math.round(-((imgW/(imgH/parentH))-parentW)/2)});
		    	};	
	    	 
		    });
		}
		$('#submitArtworkBtn').click(function(){
			$('#submit-artwork-form').fadeIn();
		});
		$('#close-artwork').click(function(){
			$('#submit-artwork-form').fadeOut();
		});
	},
	_validateEmail = function (email){
		var value = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(value);
	},
	_validate = function (formData, jqForm, options) {
	 	for (var i=0 ; i < formData.length ; i++){
	 		var value = formData[i].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(formData[i].name == 'email-new'){
				
				if(!_validateEmail(value)){
					$('input[name='+formData[i].name+']').parent().addClass('error');
					return false;
				}
			}
		}
	    return true; 
	},
	_response = function(responseText, statusText, xhr, $form)  {

	 	if(responseText.message.status == 'success')
	 	{
	 		$('.email-input').val("");
	 	} else if(responseText.message.status == 'error') {
			$('.t-alert').show();
			$('.t-alert').html(responseText.message.message);
		} else {
			$('input[name=email]').parent().addClass('error');
		}
	},
	validateFileInput = function(file){
		$('#input-artwork').change(function(){
			var filename = $(this).val();
			validateFile(file,filename,$(this));
		});
	},
	validateFile = function(file,filename,self){
			var extension = filename.replace(/^.*\./, '');
			if (extension == filename) {
				extension = '';
			} else {
				extension = extension.toLowerCase();
			}
			if ($.inArray(extension, file.fileExtension) == -1) {
				self.parent().parent().addClass('error');
				return false;
			}else if(file.maxlength >= self[0].files[0].size  ){
				self.parent().parent().removeClass('error');
				self.prev().text(filename.replace(/C:\\fakepath\\/i, ''));
				return true;
			}else{
				self.parent().parent().addClass('error');
				return false;
			}
	},
	_validatePhone =  function (phone){
		var value = phone.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		var pattern = /^\+?[0-9 ]+$/;
		return pattern.test(value);
	},
	_validatePhoneInput = function(){
		$('.phone-validate').each(function() {
			var elem = $(this);
			elem.data('oldVal', elem.val());
			elem.bind("propertychange change click keyup input paste", function(event){
				if (elem.data('oldVal') != elem.val()) {
					elem.data('oldVal', elem.val());
					if(elem.val() != ''){
						if(!_validatePhone(elem.val()) || elem.val().length > 15){
							elem.removeClass('filled');
							elem.parent().addClass('error');
						}else{
							elem.parent().removeClass('error');
							elem.addClass('filled');
						}
					} else {
						elem.parent().removeClass('error');
						elem.removeClass('filled');
					}
				}
			});
		});
	},
	_validateEmailInput = function(){
		$('.email-validate').each(function() {
			var elem = $(this);
			elem.data('oldVal', elem.val());
			elem.bind("propertychange change click keyup input paste", function(event){
				if (elem.data('oldVal') != elem.val()) {
					elem.data('oldVal', elem.val());
					if(elem.val() != ''){
						if(!_validateEmail(elem.val())){
							elem.removeClass('filled');
							elem.parent().addClass('error');
						}else{
							elem.parent().removeClass('error');
							elem.addClass('filled');
						}
					} else {
						elem.parent().removeClass('error');
						elem.removeClass('filled');
					}
				}
			});
		});
	},
	submitArtwork = function(file){
		$('#button-artwork').click(function(){
			var filename = $('#input-artwork').val();
			if(filename == ''){
				return;
			}
			if(!validateFile(file,filename,$('#input-artwork'))){
				return;
			}
			var email = $('.email-validate').val();
			if(email == ''){
				$('input[name=email]').parent().addClass('error');
				return;
			}else{
				if(!_validateEmail(email)){
					$('input[name=email]').parent().addClass('error');
					return;
				}else{
					$('input[name=email]').parent().removeClass('error');
				}
			}
			var artwork_name = $('input[name=artwork_name]').val();
			if(artwork_name == ''){
				$('input[name=artwork_name]').parent().addClass('error');
				return;
			}else{
				$('input[name=artwork_name]').parent().removeClass('error');
			}
			var phone = $('input[name=phone]').val();
			if(phone == ''){
				$('input[name=phone]').parent().addClass('error');
				return;
			}else{
				if(!_validatePhone(phone)){
					$('input[name=phone]').parent().addClass('error');
					return;
				}else{
					$('input[name=phone]').parent().removeClass('error');
				}
			}

			$('#form-artwork').fadeOut('normal', function () {
				$("#response").text("Sending....");
				$('#form-artwork').ajaxSubmit({
					url: '/artwork-upload',
					success: function () {
						$("#response").text("Success.");
						$('#form-artwork')[0].reset();
						$(".file-name").text(file.file_name);
						setTimeout(function () {
							$("#response").text("");
							$("#response").fadeOut(1000, function () {
								$('#form-artwork').fadeIn();
							});
						}, 1000);
					},
				});
			});

		});
	},

	chooseCategory = function(){
		$('.choose-category').click(function(){
			$('input[name=category_id]').val($('.choose-category').data('id'));
			$('.art-work-type').text($(this).text()+'<span class="caret"><i class="ti-angle-down"></i></span>');
		});
	},
	_stringFormatCurrency = function (num){
		var string = num.toString();
		var new_string = "";
		var dem = 1;
		for(var i = string.length-1; i >= 0 ; i--){
			new_string += string.charAt(i);
			if(dem % 3 == 0 &&  i!=0){
				new_string += ".";
			}
			dem++;
		}
		var final_string = "";
		for(var i = new_string.length - 1; i >=0 ; i--){
			final_string += new_string.charAt(i);
		}
		return final_string;
	}
	;
	
	$.homepage = {};
	$.homepage.init = function(options){
		_validateEmailInput();
		_validatePhoneInput();
		_trungFunction();
		$('#newsletter-form').submit(function() { 
		    $(this).ajaxSubmit({
		    	url: 'newsletter',
		    	dataType:  'json',
		    	beforeSubmit:  _validate,
		        success:       _response

			}); 
		    return false; 
		});
		validateFileInput(options.file);
		submitArtwork(options.file);
		chooseCategory();

		$('.price').each(function() {
			var elem = $(this);
			var price = elem.text();
			elem.text(_stringFormatCurrency(price));
		});
	};


})(jQuery);