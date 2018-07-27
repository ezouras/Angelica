var bColor;
//makeup box IDs
var mkupMainBoxPostText="-mkup";
var mkupOverlayPostText="-layer-mkup";
var mkupAbsoluteBoxPreText="innerAbMU-";

//photography box IDs
var photoMainBoxPostText="-photo";
var photoOverlayPostText="-layer-photo";
var photoAbsoluteBoxPreText="innerAbPH-";
var currentMainBox;
var currentAbsoluteBox;
var currentOverlay;
var lastMainBox;
var lastAbsoluteBox;
var lastOverlay;
var $animation_elements=[];
var $window;

$(document).ready(function(){
  //get banners that slide in when in view. slide out when out of view.
  $animation_elements.push($("#port-banner-aboutMe"));
  $animation_elements.push($("#port-banner-aboutMe").children());
  $animation_elements.push($("#port-banner-contactMe"));
  console.log($animation_elements);
  $window=$(window);


  $window.on('scroll', check_if_in_view);
  $window.on('scroll resize', check_if_in_view);

  //animate portfolio banner//
  $(".portfolio").hover(()=>{
    $(".port-banner").css("animation-name","shrinkWidth");
    $(".bAnimate").css("animation-name","growHeight");
  },()=>{
      $(".port-banner").css("animation-name","growWidth");
    $(".bAnimate").css("animation-name","shrinkHeight")
  });

  $( ".bInner" ).mouseenter(function(e){
    var boxID=getBoxId(this);
    setBoxValues(boxID,"current");
    setPreBackgroundColor(currentOverlay);
    $("#" +currentMainBox).css( "border", "1px solid red" );
    animateGrow("#"+currentMainBox);
    $("#"+currentOverlay).css( "background-color", "rgba(88, 0, 0, .2)");
  });


 $( ".bInner" ).mouseleave(function(e){
  var boxID=getBoxId(this);
  setBoxValues(boxID,"last");
  $("#"+lastMainBox).css( "border", "none");
  animateShrink("#"+lastMainBox);
  setPostBackgroundColor("#"+lastOverlay);
 });

 $("#port-banner-contactMe").click(()=>{
   window.location = "/contact";
 });

});//end jquery

function getBoxId(boxElement){
  return $(boxElement).attr('id');
}

function setBoxValues(innerMainBoxID,timing){
  //innerAbMU-1
  var type=innerMainBoxID.substring(7,9);
  var id=innerMainBoxID[innerMainBoxID.length-1];
  if(timing==="current")
  {
    if(type==="MU")
    {
      currentMainBox="b"+id+mkupMainBoxPostText;
      currentOverlay="b"+id+mkupOverlayPostText;
    }
    else{
    currentMainBox="b"+id+photoMainBoxPostText;
    currentOverlay="b"+id+photoOverlayPostText;
  }
  }else{
    if(type==="MU")
    {
      lastMainBox="b"+id+mkupMainBoxPostText;
      lastOverlay="b"+id+mkupOverlayPostText;
    }
    else{
      lastMainBox="b"+id+photoMainBoxPostText;
      lastOverlay="b"+id+photoOverlayPostText;
    }
}
  return;
}


function setPreBackgroundColor(selection){
  bColor=$("#"+selection).css("background-color");
}

function setPostBackgroundColor(element){
  $(element).css( "background-color",bColor);
}


function animateGrow(element){
  $(element).animate({
  width: "90%",
  height:"90%"
  },
  300,
  $.bez([0.685, 0.595, 0.020, 0.720]));
}

function animateShrink(element){
  $(element).css( "border", "none");
       $("#"+lastMainBox).animate({
       width: "25%",
       height:"90%"
     }, 300);

}

function check_if_in_view(){

  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
  ;
}
