/*
* Create and export configuration variables
*/


// Container for all the environments

var environments = {};

// Staging (default) environment

// For real live http runs on port 80 while https runs on port 443.
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
};

// Production environments

environments.production = {
    'httpPort': 5000,
    'httpsPort' : 5001,
    'envName': 'production'

};

// Determine which environment should be exported out
// Determine which environment was passed as a command-line arguement
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''; 

//Check that the current environment is the environment above, if not, default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//Export the module
module.exports = environmentToExport;