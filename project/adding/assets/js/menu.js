function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*60 * 60 * 24 * 365 * 20));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +"; path=/";
}
$('.t-change-language').click(function(){
	setCookie("language",$(this).data("code"),365);
});


(function($){
    $('.t-header .main-menu > li.has-submenu').hover(function(){
        if (!$(this).is("#location-menu")) {
            $('.t-header').addClass('submenu-active');
        }
        $(this).addClass('submenu-active');
    },function(){
        $(this).removeClass('submenu-active');
        $(this).parents('.t-header').removeClass('submenu-active');
    });


})(jQuery);