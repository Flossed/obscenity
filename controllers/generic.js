/* File             : generic.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2024
   Description      :
   Notes            :

*/
const errorCatalog                      = require( '../services/errorCatalog' );
const {logger,applicationName}          = require( '../services/generic' );
const { getCurrentVersions }            = require( '../services/manageVersion' );
const versionInformation                = getCurrentVersions();

async function unknownHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:unknownHandler():Started' );
        console.log( req );
        logger.error( applicationName + ':generic:unknownHandler():Unknown Path:[' + req.path + '].' );
        res.render( 'unknown' );
        logger.trace( applicationName + ':generic:unknownHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:unknownHandler():An exception occurred :[' + ex + '].' );
    }
}


async function aboutHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:aboutHandler():Started' );
        res.render( 'about' , { currentVersions:versionInformation, });
        logger.trace( applicationName + ':generic:aboutHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:aboutHandler():An exception occurred :[' + ex + '].' );
    }
}


async function homeHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:homeHandler():Started' );
        res.render( 'main', { currentVersions:versionInformation, }  );
        logger.trace( applicationName + ':generic:homeHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:homeHandler():An exception occurred :[' + ex + '].' );
    }
}


async function errorHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:errorHandler():Started' );
        res.render( 'errorPage' );
        logger.trace( applicationName + ':generic:errorHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:errorHandler():An exception occurred :[' + ex + '].' );
    }
}


function findTerm ( originalString, searchString )
{   try
    {   if ( originalString.includes( searchString ) )
        {   return originalString;
        }
        return null;
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:findterm():An exception occurred :[' + ex + '].' );
        return null;
    }

}


/* --------------------------- Public Functions   ----------------------------*/
async function main ( req, res )
{   try
    {   logger.trace( applicationName + ':generic:main():Started' );

        switch ( req.originalUrl )
        {  case '/'                                      :   homeHandler ( req,res );
                                                             break;
           case '/about'                                 :   aboutHandler( req,res );
                                                             break;
           case '/error'                                 :   errorHandler( req,res );
                                                             break;
           default                                       :   unknownHandler( req,res );
                                                             break;
        }
        logger.trace( applicationName + ':generic:main():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:main():An exception occurred: [' + ex + '].' );
    }
}


module.exports.main                     = main;
/* LOG:
*/
