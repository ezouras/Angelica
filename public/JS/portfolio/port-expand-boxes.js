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
  $window=$(window);


  $window.on('scroll', check_if_in_view);
  $window.on('scroll resize', check_if_in_view);
  resetBoxVisibility();


  //swap portfolio banner for box samples on hover - makeup//
  $("#makeup").hover(()=>{
    animatePortBannerHover(false,"port-banner-makeup","shrinkWidth");
    if ($window.width() <= 812){
      animatePortBannerHover(true,"bAnimate-mkup","growWidth");
    }
    else{
    animatePortBannerHover(true,"bAnimate-mkup","growHeight");
    }
  },
  ()=>{
    animatePortBannerHover(false,"port-banner-makeup","growWidth");
    if ($window.width() <= 812){
      animatePortBannerHover(true,"bAnimate-mkup","shrinkWidth");
    }
    else{
      animatePortBannerHover(true,"bAnimate-mkup","shrinkHeight");
    }
  });


  //swap portfolio banner for box samples on hover - photo section//
  $("#photo").hover(()=>{
    animatePortBannerHover(false,"port-banner-photo","shrinkWidth");
    if ($window.width() <= 812){
      animatePortBannerHover(true,"bAnimate-photo","growWidth");
    }
    else{
    animatePortBannerHover(true,"bAnimate-photo","growHeight");
    }
  },
  ()=>{
    animatePortBannerHover(false,"port-banner-photo","growWidth");
    if ($window.width() <= 812){
      animatePortBannerHover(true,"bAnimate-photo","shrinkWidth");
    }
    else{
      animatePortBannerHover(true,"bAnimate-photo","shrinkHeight");
    }
  });

  /* animate and make sample larger upon hover */
  $( ".bInner" ).mouseenter(function(e){
    var boxID=getId(this);
    setBoxValues(boxID,"current");
    setPreBackgroundColor(currentOverlay);
    $("#" +currentMainBox).css( "border", "1px solid red" );
    animateGrow("#"+currentMainBox);
    $("#"+currentOverlay).css( "background-color", "rgba(88, 0, 0, .2)");
  });

/* make box sample smaller when hover leave */
 $( ".bInner" ).mouseleave(function(e){
  var boxID=getId(this);
  setBoxValues(boxID,"last");
  $("#"+lastMainBox).css( "border", "none");
  animateShrink("#"+lastMainBox);
  setPostBackgroundColor("#"+lastOverlay);
 });

 $("#port-banner-contactMe").click(()=>{
   window.location = "/contact";
 });

});//end jquery

function isMkup(string){
  if(string===mkupMainBoxPostText)
  return true;
  else {
    return false;
  }
}

function animatePortBannerHover(isClass,port,animationName){
  var elementString;
  if(isClass){
    $('.'+port).css("animation-name",animationName);
  }
  else{
  $("#"+port).css("animation-name",animationName);
  }

}

function resetBoxVisibility(){
if ($window.width() <= 812){
    $(".bAnimate").css("animation-name","shrinkWidth");
  }
  else{
    $(".bAnimate").css("animation-name","shrinkHeight");
  }
}

function getId(element){
  return $(element).attr('id');
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
$(".bAnimate").css("background-size","100% 100%");
}


function animateShrink(element){
  if ($window.width() <= 812){
    $(element).css( "border", "none");
         $("#"+lastMainBox).animate({
         width: "90%",
         height:"10%"
       }, 300);

  }
  else{

    $(element).css( "border", "none");
         $("#"+lastMainBox).animate({
         width: "25%",
         height:"90%"
       }, 300);

  }

  $(".bAnimate").css("background-size","cover");

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
