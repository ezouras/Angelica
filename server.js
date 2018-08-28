const express=require('express');
const path = require('path');
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const hbs = require('hbs');

/*var fs=require('fs');
var http=require("http");
var fsTest=fs.readFileSync("./public/readme.txt");
console.log("file sync is: ",fsTest);
*/

const app= express();

//set variables for sending email
var emailSent,buttonPressed,waiting;
var playIntro=true;
resetContactButtons();

const port = process.env.PORT || 3000;
app.set("view engine",'hbs')
app.use(express.static(__dirname + '/public'));;
hbs.registerPartials(__dirname+"/views/partials");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(request, response) {
  playIntro=true;
 response.render('index.hbs', {
   playIntro
 });

});

app.get('/index', function(request, response) {
 response.render('index.hbs', {
   playIntro
 });

});


app.get("/contact",(req,res)=>{
  res.render('contact.hbs',{
    buttonPressed,
    waiting
  });
  playIntro=false;

});

app.post("/contact",(req,res)=>{
  playIntro=false;
  res.render('index.hbs', {
    playIntro
  });
});



//** listen **//
app.listen(port,()=>{
  console.log("server up!");
});


/*var httpServer=http.createServer(app);
console.log("httpsserver is:",httpServer);

httpServer.listen(port);
console.log("Express HTTP server listening on port ",httpServer.address().port);
*/


//** functions **/
function resetContactButtons(){
  emailSent=false;
  buttonPressed=false;
  waiting=true;
}
