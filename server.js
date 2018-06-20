const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

//API FILE FOR INTERECTING WITH MONOGODB
const api = require('./server/routes/api');


//PARSER
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


//ANGULAR DIST OUTPUT FOLDER
app.use(express.static(path.join(__dirname,'dist')));

//API LOCATION
app.use('/api',api);

//SEND ALL OTHER REQUEST TO ANGULAR APP
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

//SET PORT
const port = process.env.port || '3000';
app.set('port',port);

const server = http.createServer(app);

server.listen(port,()=>{console.log('Running on localhost : ${port}')});
