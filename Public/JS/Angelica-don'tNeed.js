$(document).ready(function(){

  //get position of box:

var introBox = $( ".video-box" );
console.log(introBox);
//position of box
var boxPosition = introBox.offset();
var boxHeight=introBox.height();
var boxWidth=introBox.width();
console.log("height is", boxHeight);
console.log("width is ", boxWidth);
document.documentElement.style.setProperty('--box-height', boxHeight);
document.documentElement.style.setProperty("--box-width",boxWidth);

//clip before box

//clip after box


//dark static. background image is invisible.
//small white circle in the middle. angelica inside.
//
//inside circle is lighter static with angelica behind it.
//
//
//glitch circle.
//expand cirlce and fade out static.


/*setTimeout(function()
  {

    $( "#intro" ).addClass( "hide" );
    $("#mainBlock").removeClass("hide");

  }, 100000);
  */







});

/* show main page for one second glitch , fade,
and then show static */
