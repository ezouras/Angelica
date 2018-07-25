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

$(document).ready(function(){

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
  width: "100%",
  height:"120%"
  },
  300,
  $.bez([0.685, 0.595, 0.020, 0.720]));
}

function animateShrink(element){
  $(element).css( "border", "none");
       $("#"+lastMainBox).animate({
       width: "25%",
       height:"100%"
     }, 300);

}
