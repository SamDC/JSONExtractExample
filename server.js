// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var request    = require('request');
var json2csv   = require('nice-json2csv');
var fs         = require('fs');
var https      = require('https');

// https://taster-pilots.api.bbci.co.uk/projects?apikey=ljSVS15CyEbMZBYDfd1cwA5AWXB1JfGu
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// Generate all CSVs (accessed at GET http://localhost:8080/api/extract1)
router.get('/extract1', function(req, res) {
    
    request('https://remote.api.endpoint.you.want.to.call.goes.here', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
        //console.log(response);
        var result = JSON.parse(body);
          
        //define header so it is fixed order
        var jsonOut = json2csv.convert(result, ["column1","column2","column3"]);
  
        fs.writeFile('result.csv', jsonOut, function(err) {
            if (err) throw err;
            console.log('result csv saved');
        });
      }
    })
    
	res.json({ message: 'welcome to the extract1 api endpoint. Check the project folder to see the generated file if it has been a success.' });	
});

//Second API route which authenticates to the remote api via a certificate.
router.get('/extract2', function(req, res) {
    res.json({ message: 'welcome to the extract2 api endpoint. Check the project folder to see the generated file if it has been a success.' });
    
    var headers = {
	'accept': '*/%'
    };
 
    var options = {
        uri: 'https://remote.api.endpoint.you.want.to.call.goes.here',
        headers: headers,
        method: 'GET',
        key: fs.readFileSync('privateKey.pem'), //place the pem files in the project directory to use.
        cert: fs.readFileSync('publicCert.pem'),
        passphrase: 'your_pass_phrase',
        agent: false,
        rejectUnauthorized: false
    };
    
    request.get(options, function (error, response, body) {
        
        console.log(response);
        
        fs.writeFile('result2.csv', utf8String, function(err) {
            if (err) throw err;
            console.log('result2 saved');
        });
    });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
