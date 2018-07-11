/**
 * Created by nguyenquan on 1/27/16.
 */
$( document ).ready(function() {
    $('.categories-header .cate-toggle').click(function(){
        $(this).parent().parent().find('.categories-list').slideToggle();
    });
    $('.categories-header-2 .cate-toggle').click(function(){
        $(this).parent().parent().find('.categories-list').slideToggle();
    });
});