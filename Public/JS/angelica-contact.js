var button = document.querySelector(".submitButton");
console.log(button);
var bannerLink=document.querySelector("#port-banner-message");
console.log(bannerLink);

//var backdrop=document.querySelector(".backdrop");
var inputCollection = document.getElementsByTagName('input');
console.log(inputCollection);
var message=document.getElementById("message");
console.log(message);
document.body.style.cursor  = 'default';

bannerLink.addEventListener("click",()=>{
  location.href = "/index";

});


button.addEventListener("click",()=>{
  location.href = "/index";
});


var breakException={
  disableButton: function(){
    button.setAttribute("disabled","");
  }
};

//turn html collection into an array:
var inputElements = Array.prototype.slice.call(inputCollection);
inputElements.push(message);


inputElements.forEach((input,index)=>{
    input.addEventListener("keyup",(e)=>{
      checkFormValidity();
    });
    input.addEventListener("blur",(e)=>{
    checkFormValidity();
  });
});

function checkFormValidity(){
  try{
      inputElements.forEach((input,index)=>{
      if(!input.checkValidity())throw breakException;
      button.removeAttribute("disabled");
      if(input.value=='')
      button.setAttribute("disabled");
    });
  } catch(e){
    e.disableButton();
  }
};
