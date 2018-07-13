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

		$( '#event-list' ).masonry( { 
			itemSelector: '.event-item',
			percentPosition: true
		} );

		setSize();
		$(window).resize(function () {
			setSize();
		});

		$(document).load(function () {
			setSize();
		});

		function setSize() {
	    	
			$('.event-item .event-thumb img').each(function(){
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
	},
		pagination = function () {

			$('.load-more-btn').click(function () {
				var href = $(this).attr('href');
				if (typeof getUrlParameter('k') !== "undefined" && href.split('&').length == 1) {
					var array = href.split("?");
					href = array[0] + '?k=' + getUrlParameter('k') + '&' + array[1];
				}
				$.ajax({
					url: href,
					success: function (resp) {
						$('#event-list').append(resp.html);
						$('#event-list').masonry('reloadItems');
						$('#event-list').masonry('layout');
						href = href.slice(0, -1);
						href += resp.page;
						$('.load-more-btn').attr('href', href);
						if (resp.isLast) {
							$('.load-more-btn').hide();
						};
						setTimeout(function(){ setSize1(); }, 1000);
					},
				});
				return false;
			});

			function setSize1() {
				$('.event-item .event-thumb img').each(function(){
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
	}
	;
	
	$.event_main = {};
	$.event_main.init = function(options){
		_trungFunction();
		pagination();
	};
	
})(jQuery);