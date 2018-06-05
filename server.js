const express=require('express');
const app= express();


const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/Public'));
app.get('/', function(request, response) {
response.send('Hello World!');
});

app.listen(port,()=>{
  console.log("server up!");
});
