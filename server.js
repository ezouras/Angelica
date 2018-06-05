const express=require('express');
const path = require('path');
const app= express();


const port = process.env.PORT || 3000;
const indexFile=path.join(__dirname + '/Public/index.html');
console.log("directory to index is: ",indexFile);

app.get('/', function(request, response) {
response.sendFile(indexFile);
});

app.use(express.static(__dirname + '/Public'));


app.listen(port,()=>{
  console.log("server up!");
});
