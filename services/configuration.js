/* File             : configuration.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2021
   Notes            :
   Description      :
*/
const nconf                             = require( 'nconf' );

function Config ()
{   try
    {   console.log( 'configuration:Config:Starting' );
        nconf.file( 'default', './config/default.json' );
    }
    catch ( ex )
    {   console.log( 'configuration:Config:An Exception occurred:[' + ex + ']' );
    }
}

Config.prototype.get = function ( key )
{    return nconf.get( key );
};


module.exports = new Config();



/* LOG:
*/
