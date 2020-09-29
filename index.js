/*
*Primary file for the API
*/

// Dependecies

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all request with a string
var server = http.createServer(function(req, res){

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

 //
//Send the response
    res.end('Hello World\n');

//Log the request path
console.log(`Request is recieved with payload:`, buffer);
})

 
});

// Start the server and listen to port 3000
    server.listen(3000, function(){
    console.log("The server is listening on port 3000")
});


// Define our handlers
var handlers ={};

// Sample handler
handlers.sample = function (data, callback){

};

// Not found handler
handlers.notFound = function(data, callback){


};


//Define a request router
var router = {
    'smaple': handlers.sample
}