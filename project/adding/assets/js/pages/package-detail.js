(function ($) {
    var
        isClick = false,
        _trungFunction = function () {
            $('.t-header .nav-expand-btn').click(function () {
                $('.t-header').toggleClass('expanded');
            });


            $('.t-header').addClass('stick2top');

            setSize();
            function scrollToAnchor(target,timeout){
                var pixel = 110;
                if(! $('.t-section.convenience-sect').hasClass('stick2top')){
                    pixel = 430 - 40;
                }
                $('html,body').animate({
                    scrollTop: target.offset().top-pixel
                }, timeout);
            }
            $(window).load(function () {
                setTimeout(function () {
                    if (location.hash) {
                        var hash = window.location.hash.substring(1);
                        scrollToAnchor($('#' + hash),300);
                    }
                },1);
            });
            $('a[href*=#]:not([href=#])').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                  var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                      scrollToAnchor(target,1000);
                    return false;
                  }
                }
            });
            $('html').waypoint(function(direction) {
                if (direction=='down') {
                    $('.t-section.convenience-sect').addClass('stick2top');
                    $('.convenience-items-wrap').css({'max-height': $(window).height()-130});
                } else {
                   // $('.t-section.convenience-sect').removeClass('stick2top');
                    $('.convenience-items-wrap').slideDown().css({'max-height': 'none'});
                }
            }, {
                offset: -260
            });

            $('.concenience-item-exp-btn').click(function(){
                $('.convenience-items-wrap').slideToggle();
                $(this).toggleClass('up');
            });
            $(window).resize(function () {
                setSize();
            });

            var winH = $(window).height();
            function setSize() {
                winH = $(window).height();
                $('.setSizeImg img').each(function(){
                    var $this = $(this), $imgParent = $(this).parent();
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

        _stringFormatCurrency = function (num) {
            var string = num.toString();
            var new_string = "";
            var dem = 1;
            for (var i = string.length - 1; i >= 0; i--) {
                new_string += string.charAt(i);
                if (dem % 3 == 0 && i != 0) {
                    new_string += ".";
                }
                dem++;
            }
            var final_string = "";
            for (var i = new_string.length - 1; i >= 0; i--) {
                final_string += new_string.charAt(i);
            }
            return final_string;
        };

    $.package_detail = {};
    $.package_detail.init = function (options) {

        _trungFunction();

        $('.package-r2-price').find("span").each(function () {
            var elem = $(this);
            var price = elem.text();
            elem.text(_stringFormatCurrency(price));
        });
    };

})(jQuery);