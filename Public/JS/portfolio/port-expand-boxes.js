$(document).ready(function(){

  //get #portfolio element.
  $("#portfolio").hover(()=>{
    $("#port-banner").css("animation-name","shrinkWidth");
    $(".bAnimate").css("animation-name","growHeight");
  },()=>{
      $("#port-banner").css("animation-name","growWidth");
    $(".bAnimate").css("animation-name","shrinkHeight")
  });

/////*****  sample rectangle animation *****/////

  //when mousing over a rectangle sample, expand it

  $( ".bInner" ).mouseenter(function(e) {
    var boxSelection=getBoxSelection($(this).attr('class').split(" "));
    $(boxSelection).css( "border", "3px solid red" );
    //$(boxSelection).css("animation","grow .5s ease");
    $(boxSelection).animate({
    width: "75%",
    height:"120%"
    },
    300,
    $.bez([0.685, 0.595, 0.020, 0.720]));

  });

  //when leaving a sample rectangle, animate the shape to it's default size.
 $( ".bInner" ).mouseleave(function(e) {
   var boxSelection=getBoxSelection($(this).attr('class').split(" "));
       $(boxSelection).css( "border", "none");
       $(boxSelection).animate({
       width: "25%",
       height:"100%"
     }, 300);
 });

});//end jquery


function getBoxSelection(classList){
  var position=classList.filter(value=>value.includes("p"));
  position=position[0].replace(/\D/g,'');
  return ".b"+position;
}
