(function($){
	var
	_trungFunction = function(){
		$('.t-header .nav-expand-btn').click(function(){
	    	$('.t-header').toggleClass('expanded');
	    });


	    $('.t-header').addClass('stick2top');

	    $('.form-expand-btn').click(function(){
	    	$('.t-contact-form-wrapper').toggleClass('form-expanded');
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
	},
	_validateEmailInput = function(){
		 $('.phuong-email').each(function() {
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
	_validateEmail = function (email){
		var value = email.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(value);
	},
	_validate = function (formData, jqForm, options) {
	 	for (var i=0 ; i < formData.length ; i++){
	 		var value = formData[i].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(formData[i].name == 'email'){
				
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
	 		$('.t-form-elements').fadeOut('slow',function(){
	 			$('.t-form-notify').fadeIn('slow',function(){
	 				$('.t-form-notify').fadeOut('slow',function(){
	 					$('.t-form-elements').fadeIn();
	 				});
	 				
	 			});
	 		});
	 		$('input[type="text"]').val('');
	 		$('textarea').val('');
	 		
	 	} else if(responseText.message.status == 'error') {
			$('.t-alert').show();
			$('.t-alert').html(responseText.message.message);
		} else {
			$('input[name=email]').parent().addClass('error');
		}
	}
	;
	
	$.contact = {};
	$.contact.init = function(options){
		_trungFunction();
		_validateEmailInput();
		$('#contact-form').submit(function() { 
		    $(this).ajaxSubmit({
		    	url: 'contact-us/contact',
		    	dataType:  'json',
		    	beforeSubmit:  _validate,
		        success:       _response

			}); 
		    return false; 
		});
	};
	
})(jQuery);