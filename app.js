// server.js
var express = require('express');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var app = express();
var subpath = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json'}));

// //app.use("/v1", subpath);

var api = require('./app/session/api'); //can waka dipake
require('./app/routes')(app);


var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('dist'));

swagger.setApiInfo({
    title: "example API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "chandraocest@gmail.com",
    license: "",
    licenseUrl: ""
});

app.get('/api-docs', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

//set api-docs
swagger.configureSwaggerPaths('/', 'api-docs.json', '');



//configure the API domain
var domain = '10.14.206.217';
if(argv.domain !== undefined) 
    domain = argv.domain;
else 
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

// Configure the API port
var port = 8080;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

var applicationUrl = "http://" + domain + ":" + port + "";
swagger.configure(applicationUrl, '1.0.0');

var server = app.listen(port, domain, function() {
    var host = server.address().address
    var port = server.address().port
    //console.log("Example app listening at http://%s:%s", host, port);
});