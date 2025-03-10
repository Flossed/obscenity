/* File             : generic.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2024
   Description      :
   Notes            :

*/
const {logger,applicationName}          = require( '../services/generic' );
const { getCurrentVersions }            = require( '../services/manageVersion' );
const { toxicityIF }                    = require( '../services/toxicityIF' );
const versionInformation                = getCurrentVersions();



async function aboutHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:aboutHandler():Started' );
        res.render( 'about' , { currentVersions:versionInformation, } );
        logger.trace( applicationName + ':generic:aboutHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:aboutHandler():An exception occurred :[' + ex + '].' );
    }
}



async function unknownHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:unknownHandler():Started' );
        res.render( 'unknown', { currentVersions:versionInformation, } );
        logger.trace( applicationName + ':generic:unknownHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:unknownHandler():An exception occurred :[' + ex + '].' );
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



async function toxicitytestPost ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:toxicitytestPost():Started' );

        const testString               =   req.body.testString;

        logger.debug( applicationName + ':generic:toxicitytestPost():Test String:[' + testString + '].' );
        console.log( testString );
        const antwoord                 =   await toxicityIF( testString, 0.5 );
        console.log('antwoord', JSON.stringify(antwoord, null, 2));
        res.render( 'toxicitytest', { currentVersions:versionInformation, classification:antwoord } );
        logger.trace( applicationName + ':generic:toxicitytestPost():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:toxicitytestPost():An exception occurred :[' + ex + '].' );
    }
}



function toxicitytestGet ( req,res )
{   try
    {  logger.trace( applicationName + ':generic:toxicitytestGet():Started' );
       res.render( 'toxicitytest', { currentVersions:versionInformation, } );
       logger.trace( applicationName + ':generic:toxicitytestGet():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:toxicitytestGet():An exception occurred :[' + ex + '].' );
    }
}




async function toxicitytestHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:toxicitytestHandler():Started' );

        switch ( req.method )
        {   case 'POST' :   toxicitytestPost( req,res );
                            break;
            case 'GET'  :   toxicitytestGet( req,res );
                            break;
            default     :   break;
        }

        logger.trace( applicationName + ':generic:toxicitytestHandler():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:toxicitytestHandler():An exception occurred :[' + ex + '].' );
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
           case '/toxicitytest'                          :   toxicitytestHandler( req,res  );
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
