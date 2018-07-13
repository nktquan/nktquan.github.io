(function($){
	var
	_trungFunction = function(){
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

		setSize();
		$(window).resize(function () {
			setSize();
		});

		function setSize() {

			$('.t-event-list .event-thumb img').each(function(){
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

		$(document).on('click', '#apply-cv', function () {
			$('#apply-career-form').fadeIn();
			$('input[name=career_id]').val($(this).data('id'));
		});
		$('#close-candidate').click(function(){
			$('#apply-career-form').fadeOut();
		});

	},
	pagination = function(){
		$('.load-more-btn').click(function(){
			var href = $(this).attr('href');
			if (typeof getUrlParameter('k')  !== "undefined" && href.split('&').length == 1){
				var array = href.split("?");
				href = array[0]+'?k='+getUrlParameter('k')+'&'+array[1];
			}
			$.ajax({
				url: href,
				success: function(resp) {
					$('.career-list').append(resp.html);
					href = href.slice(0,-1);
					href +=resp.page;
					$('.load-more-btn').attr('href',href);
					if(resp.isLast){
						$('.load-more-btn').hide();
					}
				},
			});
			return false;
		});
	},
	getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	},
	_validateEmail = function (email){
		var value = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(value);
	},
	validateFileInput = function(file){
		$('#input-candidate').change(function(){
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
	submitResume = function(file){
		$('#button-candidate').click(function(){
			var filename = $('#input-candidate').val();
			if(filename == ''){
				return;
			}
			if(!validateFile(file,filename,$('#input-candidate'))){
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
			$("#response").text("Uploading....");

			$('#form-candidate').ajaxSubmit({
				url:'/career/upload',
				success:function(){
					$("#response").text("Done..");
				},
			});
		});
	}
	;
	$.career = {};
	$.career.init = function(options){
		_trungFunction();
		_validateEmailInput();
		_validatePhoneInput()
		pagination();
		validateFileInput(options.file);
		submitResume(options.file);
	};
	
})(jQuery);