/**
 * Created by nktquan@gmail.com on 7/8/16.
 */

var container = document.querySelector('#pinBoot');
var masonry = new Masonry(container, {
    itemSelector: '.white-panel',
    no_columns: 3,
    columnWidth: 310
});

$('.menu-toggle').click(function () {
    $('body').addClass('menu-open');
})
$('.toggle-navbar .close-btn').click(function () {
    $('body').removeClass('menu-open');
})
$('.service .bottom .right .hide-content .show').click(function () {
    $('.service .bottom .right .hide-content .dropdown').slideDown();
});
$('.service .bottom .right .hide-content .dropdown .close-box').click(function () {
    $('.service .bottom .right .hide-content .dropdown').slideUp();
});