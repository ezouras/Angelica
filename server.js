const express=require('express');
const path = require('path');
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const hbs = require('hbs');

const app= express();

//set variables for sending email
var emailSent,buttonPressed,waiting;
var playIntro=true;
resetContactButtons();

const port = process.env.PORT || 3000;
//const indexFile=path.join(__dirname + '/Public/Index.html');

console.log("play intro is: ",playIntro);
app.set("view engine",'hbs')
app.use(express.static(__dirname + '/Public'));;
hbs.registerPartials(__dirname+"/Views/partials");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function(request, response) {
  playIntro=true;
//response.sendFile(indexFile);
console.log("in get /");
 response.render('index.hbs', {
   playIntro
 });

});

app.get('/index', function(request, response) {
  console.log("in get index");
//response.sendFile(indexFile);
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


//** functions **/
function resetContactButtons(){
  emailSent=false;
  buttonPressed=false;
  waiting=true;
}

/*

*****;







// POST. this gets called when hitting the button:

  /* you will put the output string in the email */

/*  const output =`
  <h2>Contact details are as follows:</h2>
  <p>
    <h3>Name:</h3><b> ${req.body.fname} ${req.body.lname}</b>
    <br>
    <h3>Email:</h3><b> ${req.body.email}</b>
    <br>
    <h3>Message:</h3><b>${req.body.message}</b>
  </p>
  `;

  const outputText=`
  Name: ${req.body.fname} ${req.body.lname}
  Email: ${req.body.email}
  Message: ${req.body.message}`;

  let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bossyappstest@gmail.com', // generated ethereal user
            pass: 'B0ssyAPpsT3st', // generated ethereal password
        },
    }); /* end of transporter creation */

    // setup email data with unicode symbols

    /*let mailOptions = {
        from: 'bossyappstest@gmail.com',
        to: 'ezouras@hotmail.com', // list of receivers
        subject: 'Message From Angelica Website', // Subject line
        text: outputText, // plain text body
        html: output // html body
    }; /* end of mailOptions creation */

    // send mail with defined transport object
    /*transporter.sendMail(mailOptions, (error, info) => {
      if(error)
      {
        res.render('contact.hbs',{
            buttonPressed:true,
            waiting:false,
            emailSent:false
        });
        resetContactButtons();
        return;
      }
      //if message sent correctly render page differently
      res.render('contact.hbs',{
      buttonPressed:true,
      waiting:false,
      emailSent:true
      });
      resetContactButtons();

      }); //finished sending Message
  });/* end post message */
