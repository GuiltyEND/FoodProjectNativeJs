const express = require('express');
const path = require('path');
const ejs = require('ejs');
var bodyParser = require('body-parser');
const multer = require('multer')



const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const filePath = "db.json";
const fs = require('fs');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(request, response) {
   
  response.render('index')
})

app.get("/db.json", function(request, response){
  const content = fs.readFileSync(filePath,"utf8" );
  const menu = JSON.parse(content);
  response.send(menu);
});

app.post('/addFormRequest',multer().none(),function(request,response,next){
  
  const content = fs.readFileSync(filePath,"utf8" );
  const data = JSON.parse(content);
  console.log(request.body)
  data.requests.push(request.body)
  fs.writeFile(filePath,JSON.stringify(data), err => {
    if (err) {
      console.error(err);
    }
  });
  response.send(JSON.stringify(request.body));

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
