/*
*Primary file for the API
*/

// Dependecies

var http = require('http');
// The server should respond to all request with a string
var server = http.createServer(function(req, res){
    res.end('Hello World\n');
});

// Start the server and listen to port 3000
    server.listen(3000, function(){
    console.log("The server is listening on port 3000")
});