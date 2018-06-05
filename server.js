const express=require('express');
const path = require('path');
const app= express();


const port = process.env.PORT || 3000;
const indexFile=path.join(__dirname + '/Public/Index.html');
console.log("directory to index is: ",indexFile);

app.use(express.static(__dirname + '/Public'));
app.get('/', function(request, response) {
response.sendFile(indexFile);
});




app.listen(port,()=>{
  console.log("server up!");
});
