$(document).ready(function(){

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   console.log("on a device!");
   $('.pimg1').css("background-attachment","scroll");
   $('.pimg2').css("background-attachment","scroll");
   $('.pimg3').css("background-attachment","scroll");
   $('.pimg1-nointro').css("background-attachment","scroll");

  }

  $(window).scroll(function() {
    var scrolledY = $(window).scrollTop();
    $('.pimg1').css('background-position', 'center' + ((scrolledY)) + 'px');
    $('.pimg2').css('background-position', 'center' + ((scrolledY)) + 'px');
    $('.pimg3').css('background-position', 'center' + ((scrolledY)) + 'px');
    $('.pimg1-nointro').css('background-position', 'center' + ((scrolledY)) + 'px');
  });


});
