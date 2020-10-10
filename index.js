/*
*Primary file for the API
*/
// Dependecies 

var http = require('http');
var https = require ('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var _data = require('./lib/data')


//TESTING
// @TODO delete this
_data.create('test', 'newFile', {'foo' : 'bar'}, function(err){
    console.log('this was the error', err);
});

// Instantiate the http server
var httpServer = http.createServer(function(req, res) {
    unifiedServer(req, res);      
});


// Start the http server
    httpServer.listen(config.httpPort, function(){
    console.log("The server is listening on port "+ config.httpPort);  
});

// Instantiate the https server
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem') 
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
    unifiedServer(req, res);      
});

// Start the https server
    httpsServer.listen(config.httpsPort, function(){
    console.log("The server is listening on port "+ config.httpsPort); 
});

// All the server logic for tboth the http and https server
var unifiedServer = function (req, res){
    
    //Get the URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object from a url
    var queryStringObject = parsedUrl.query;

    //Get the http method
    var method = req.method.toLowerCase();

    //Get the headers as an object
    var headers = req.headers

    // Get the payload if any
    var decoder = new StringDecoder('utf-8');

    //buffer is just a placeholder for a string
    var buffer = '';

    // function to decode the stream
    req.on('data', function(data){
        buffer += decoder.write(data);
    });

    // function to end the decoded stream payload
    req.on('end', function(){
        buffer += decoder.end();

 // Choose the handler this request should go to, if one is not found use the not found handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound 

        // construct the data onbject to send to handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer 
              
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload){
            // Use the status code callback by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200

            // use the payload called back by the handler or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload from an object to a string
            var payloadString = JSON.stringify(payload); 

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);

             //Send the response
         res.end(payloadString);

         
        //Log the request path
    console.log(`Returning this response :`, statusCode, payloadString);

        });
    });
}

// Define our handlers
var handlers ={};

// Ping handler
handlers.ping = function(data, callback){
    callback(200);
}

/*
// Sample handler
handlers.sample = function (data, callback){
    // Callback a http status code and a payload object
    callback(406, {'name': "sample handler"})
};
*/


// Not found handler
handlers.notFound = function(data, callback){
    callback(404 )
};

//Define a request router
var router = {
    'ping': handlers.ping
}