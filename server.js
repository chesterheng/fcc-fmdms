'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const cors = require('cors');

// require and use "multer"...

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "upfile") is used to retrieve the uploaded file
  const upfile = req.files.upfile;
  //console.log(upfile);
  
  res.json({
      name: upfile.name,
      type: upfile.mimetype,
      size: upfile.data.length
    });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});