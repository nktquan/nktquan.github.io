/**
 * Created by nktquan@gmail.com on 1/11/18.
 */

$( document ).ready(function() {
    $('.btn-toggle').click(function () {
        $('.navbar-nav').addClass('open');
    });
    $('.btn-close').click(function () {
        $('.navbar-nav').removeClass('open');
    });

    $('.view-more').click(function () {
        $(this).parent().toggleClass('open');
    });
});