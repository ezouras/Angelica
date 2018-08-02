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
var boxMkupClassAbsolute="bInner-makeup";
var makeupBoxesGrown=false;
var photoBoxesGrown=false;


$(document).ready(function(){

  $animation_elements.push({element:$("#port-banner-contactMe"),isSection:false});
  $animation_elements.push({element:$("#port-banner-aboutMe"),isSection:false});
  $window=$(window);
  $window.on('scroll', check_if_in_view);
  $window.on('scroll resize', check_if_in_view);
  resetBoxVisibility();
  if($window.width()<750)
  wideScreen=false;  //if wide screen but still clkcing
  onDevice=false;  //on device but wide screen - but can't over. change absolut boxes

/* are you on a device?*/
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  onDevice=true;
  $animation_elements.push({element:$("#makeup"),isSection:true});
  $animation_elements.push({element:$("#photo"),isSection:true});
  /* set absolute inner boxes of samples to cordinate with height animation instead of
  width anination */
  if(!wideScreen){
  $(".bInner").css("width","90%");
  $(".bInner").css("height","10%");
  }
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
     clearPrevious();
     //shrinkSingleBox(getId(this));
   });
}

function activateClick(){
  $(".bInner").click((e)=>{
    clearPrevious();
    setBoxValues(getId(e.target),"current");
    growSingleBox(getId(e.target));
    setBoxValues(getId(e.target),"last");
  });


};

function clearPrevious(){
  if(lastMainBox){
    //shrink previous box
    //shrinkSingleBox(lastMainBox);
    //reset color of previous boxe
    //setBoxValues(boxId,"last");
    $("#"+lastMainBox).css( "border", "none");
    animateShrink("#"+lastMainBox);
    if(onDevice){
      animateShrink("#"+lastAbsoluteBox);
    }
    setPostBackgroundColor("#"+lastOverlay);
  }
}


/*function shrinkSingleBox(boxId){
  //setBoxValues(boxId,"last");
  $("#"+lastMainBox).css( "border", "none");
  animateShrink("#"+lastMainBox);
  if(!wideScreen){
    animateShrink("#"+lastAbsoluteBox);
  }
  setPostBackgroundColor("#"+lastOverlay);
}
*/

function growSingleBox(boxId){
//set background color of current box being grown. bcolor is set here.
  setPreBackgroundColor(currentOverlay);
  $("#" +currentMainBox).css( "border", "1px solid red" );
  animateGrow("#"+currentMainBox);
  if(!wideScreen){
    animateGrow("#"+currentAbsoluteBox);
  }
  //currentOverlay is an id for a box. set overlay to clear
  $("#"+currentOverlay).css( "background-color", "rgba(0,0,0,0)");

}

function growBoxes(makeupOrPhoto){
  if(wideScreen){
    $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","growHeight");
    }
  else{
    $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","growWidth");

  }
    $("#"+setBannerIDBoxClass(makeupOrPhoto).bannerId).css("animation-name","shrinkWidth");
    $(".bInner-"+makeupOrPhoto).css("display","inline-block");
}


function shrinkBoxes(makeupOrPhoto){
  if(wideScreen){
      $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","shrinkHeight");
}
else{

    $('.'+setBannerIDBoxClass(makeupOrPhoto).boxClass).css("animation-name","shrinkWidth");

}
  $("#"+setBannerIDBoxClass(makeupOrPhoto).bannerId).css("animation-name","growWidth");
  $(".bInner-"+makeupOrPhoto).css("display","none");

}

function resetBoxesToDefault(){
 /*animateShrink("#"+lastMainBox);
  animateShrink("#"+lastAbsoluteBox);
  setPostBackgroundColor("#"+lastOverlay);*/
  lastMainBox=undefined;
  lastAbsoluteBox=undefined;
  lastOverlay=undefined;


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
      currentAbsoluteBox="innerAbMU-"+id;
    }
    else{
    currentMainBox="b"+id+photoMainBoxPostText;
    currentOverlay="b"+id+photoOverlayPostText;
    currentAbsoluteBox="innerAbPH-"+id;
  }
  }else{
    if(type==="MU")
    {
      lastMainBox="b"+id+mkupMainBoxPostText;
      lastOverlay="b"+id+mkupOverlayPostText;
      lastAbsoluteBox="innerAbMU-"+id;
    }
    else{
      lastMainBox="b"+id+photoMainBoxPostText;
      lastOverlay="b"+id+photoOverlayPostText;
      lastAbsoluteBox="innerAbPH-"+id;
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
  $(element).css( "border", "none");
  if(!wideScreen){
    $(element).animate({
         width: "90%",
         height:"10%"
       }, 300);

  }
  else{
    //$("#"+lastMainBox).animate({
    $(element).animate({
         width: "25%",
         height:"90%"
       }, 300);

    $(".bAnimate").css("background-size","cover");

  }
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
    if(this.isSection){
      if(getId($element)==="makeup")
      {  //is makeup in view
        if((element_top_position>window_top_position)&&
            (element_bottom_position < window_bottom_position)){
              //makeupSectionInView
              if(!makeupBoxesGrown){
                  growBoxes(getId($element));
                  makeupBoxesGrown=true;
                }
              }
        else{//makeup NOT in view
          if(makeupBoxesGrown){ //if boxes have not grown then just return.
                clearPrevious();
                shrinkBoxes(getId($element));
                makeupBoxesGrown=false;
          }
        }
      }
      if(getId($element)==="photo")
      {  //is photo in view
        if((element_top_position>window_top_position)&&
            (element_bottom_position < window_bottom_position)){
              //photosectionInview
              if(!photoBoxesGrown){
                  growBoxes(getId($element));
                  photoBoxesGrown=true;
                }
              }
        else{//photo NOT in view
          if(photoBoxesGrown){ //if boxes have not grown then just return.
                resetBoxesToDefault();
                shrinkBoxes(getId($element));
                photoBoxesGrown=false;
          }
        }
      }
  }//end if in a section
  else{//not a section
      if ((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    }

});
}
