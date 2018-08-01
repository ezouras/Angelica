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
var wideScreen=true;
var makeup="makeup";
var photo="photo"
var bannerPhotoId="port-banner-photo";
var boxPhotoClass="bAnimate-photo";
var bannerMakeupId="port-banner-makeup";
var boxMkupClass="bAnimate-mkup";
var boxesGrown=false;


$(document).ready(function(){

  $animation_elements.push({element:$("#port-banner-contactMe"),isSection:false});
  $animation_elements.push({element:$("#port-banner-aboutMe"),isSection:false});
  $window=$(window);
  $window.on('scroll', check_if_in_view);
  $window.on('scroll resize', check_if_in_view);
  resetBoxVisibility();
  if($window.width()<850)
  wideScreen=false;

/* are you on a device?*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  $animation_elements.push({element:$("#makeup"),isSection:true});
  $animation_elements.push({element:$("#photo"),isSection:true});
    activateClick();
}
else{
  activateHover();
}

 $("#port-banner-contactMe").click(()=>{
   window.location = "/contact";
 });

});//end jquery


function activateHover(){
  //swap portfolio banner for box samples on hover - makeup//
  $("#makeup").hover(()=>{
    growBoxes(makeup);
  },()=>{
    shrinkBoxes(makeup);
  });
  //swap portfolio banner for box samples on hover - photo section//
  $("#photo").hover(()=>{
    growBoxes(photo);
  },()=>{
    shrinkBoxes(photo);
  });
    /* animate and make sample larger upon hover */
  $( ".bInner" ).mouseenter(function(e){
      setBoxValues(getId(this),"current");
      growSingleBox(getId(this));
  });
  /* make box sample smaller when hover leave */
   $( ".bInner" ).mouseleave(function(e){
     setBoxValues(getId(this),"last");
     shrinkSingleBox(getId(this));
   });
}

function activateClick(){
  $(".bInner").click((e)=>{
    //shrinkSingleBox(lastMainBox)
    setBoxValues(getId(e.target),"current");
    growSingleBox(getId(e.target));
    shrinkSingleBox(getId(lastMainBox));
    setBoxValues(getId(e.target),"last");
  });


};


function shrinkSingleBox(boxId){
  //setBoxValues(boxId,"last");
  $("#"+lastMainBox).css( "border", "none");
  animateShrink("#"+lastMainBox);
  setPostBackgroundColor("#"+lastOverlay);
}

function growSingleBox(boxId){
  //setBoxValues(boxId,"current");
  setPreBackgroundColor(currentOverlay);
  $("#" +currentMainBox).css( "border", "1px solid red" );
  animateGrow("#"+currentMainBox);
  $("#"+currentOverlay).css( "background-color", "rgba(0,0,0,0)");

}

function growBoxes(makeupOrPhoto){
    $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","growHeight");
    $("#"+setBannerIDBoxClass(makeupOrPhoto).bannerId).css("animation-name","shrinkWidth");
    $(".bInner-"+makeupOrPhoto).css("display","inline-block");
}



function shrinkBoxes(makeupOrPhoto){
  $("#"+setBannerIDBoxClass(makeupOrPhoto).bannerId).css("animation-name","growWidth");
  $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","shrinkHeight");
  $(".bInner-"+makeupOrPhoto).css("display","none");

}


function setBannerIDBoxClass(makeupOrPhoto){
  if(makeupOrPhoto===makeup){
    return{bannerId:bannerMakeupId,boxClass:boxMkupClass};
  }
  return {bannerId:bannerPhotoId,boxClass:boxPhotoClass};
}


function resetBoxVisibility(){
if ( !wideScreen){
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
  /*if ( $window.width() <= 1030 &&  $window.height() <= 1400){
    $(element).css( "border", "none");
         $("#"+lastMainBox).animate({
         width: "90%",
         height:"10%"
       }, 300);

  }
  else{
  */

    $(element).css( "border", "none");
    $("#"+lastMainBox).animate({
         width: "25%",
         height:"90%"
       }, 300);

    $(".bAnimate").css("background-size","cover");

  }


function check_if_in_view(){
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this.element);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if(this.isSection)
    {
      if((element_top_position>window_top_position)&&
          (element_bottom_position < window_bottom_position)){
            growBoxes(getId($element));
          }
      else{
        shrinkBoxes(getId($element));
      }
    }
    else{
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    }

});
}
