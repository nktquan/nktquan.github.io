new WOW().init();
$(".button-collapse").sideNav();
$(window).scroll(function(){
    if($(window).scrollTop() > 300){
        $('nav').addClass('appear');
    } else {
        $('nav').removeClass('appear');
    }
});
$(function(){
    $(".product-button").click(function(){
        $.scrollTo($("#product"), { duration: 20});
    });
});
$(document).ready(function(){
    $('.slider').slider({full_width: true});
    $('.scrolly').scrolly();
    $('.modal-trigger').leanModal();
    $('#modal1').openModal();
    $('#modal1').closeModal();
    $('.fixed-action-btn').openFAB();
    $('.fixed-action-btn').closeFAB();
    $('.parallax').parallax();
});
$(window).load(function(){
    $('.loader').css('display', 'none');
    $('.container-fluid').css('opacity',1);
});