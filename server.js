const express=require('express');
const bodyParser=require("body-parser");
const nodemailer = require("nodemailer");
const fs=require("fs");
const hbs = require('hbs');


const port = process.env.PORT || 3000;
const app= express();

app.use(express.static(__dirname +'/Public'));

app.listen(port,()=>{
  console.log("Server is up");
});
