(function($){
	var
	_trungFunction = function(){
		$('.t-header .nav-expand-btn').click(function(){
	    	$('.t-header').toggleClass('expanded');
	    });

	    $('.t-header').addClass('stick2top');

		$('#resetPassBtn').click(function(){
			$('.t-popup#resetPass-step1').fadeIn();
			$('#notice').text("");
			$("input#input-email").parent().show();
			$(".form-text-p").show();
			$("button#button-reset").show();
		});
		$('#closePopup').click(function(){
			$('.t-popup#resetPass-step1').fadeOut();
		});
	    
	    
	},
	_validateEmailInput = function(){
		var elem = $('input#input-email');
		elem.data('oldVal', elem.val());
		elem.bind("propertychange change click keyup input paste", function(event){
			if (elem.data('oldVal') != elem.val()) {
				elem.data('oldVal', elem.val());
				if(elem.val() != ''){
					if(!_validateEmail(elem.val())){
						elem.parent().addClass('error');
					}else{
						elem.parent().removeClass('error');
					}
				} else {
					elem.parent().removeClass('error');
				}
			}
		});
	},
	_validateEmail = function (email){
		var value = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(value);
	},
	_validate = function (formData, jqForm, options) {
		if (readCookie("language") == "en")
			$('#notice').text("Sending.....");
		else
			$('#notice').text("Đang gửi.....");
	},
	_response = function(responseText, statusText, xhr, $form)  {
		if(responseText.message == true){
			if (readCookie("language") == "en")
				$('#notice').text("Success! Please check your email!.....");
			else
				$('#notice').text("Gửi thành công! Bạn hãy kiểm tra lại email của bạn.....");
			$('input#input-email').val('');
			$("input#input-email").parent().fadeOut();
			$(".form-text-p").hide();
			$("button#button-reset").hide();
		} else {
			if (readCookie("language") == "en")
				$('#notice').text("Wrong email!!");
			else
				$('#notice').text("Sai email!!!");
		}

	},
		readCookie = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
	},
	resetPass = function(){
		$('button#button-reset').click(function(){
			if( $('input#input-email').val()==''){
				return;
			}

			if( !_validateEmail($('input#input-email').val())){
				$('input#input-email').parent().addClass('error');
				return;
			}
			$('form#form-reset').ajaxSubmit({
				url:'/login/reset-pass',
				dataType:  'json',
				beforeSubmit:  _validate,
				success:       _response
			});
		});
	}
	;
	$.booking_step2 = {};
	$.booking_step2.init = function(options){
		_trungFunction();
		_validateEmailInput();
		resetPass();
		
	};
	
})(jQuery);