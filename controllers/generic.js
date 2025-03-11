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



async function toxicityPost ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:toxicityPost():Started' );

        const testString               =   req.body.testString;

        logger.debug( applicationName + ':generic:toxicityPost():Test String:[' + testString + '].' );        
        const analysis                 =   await toxicityIF( testString, 0.5 );
        console.log('antwoord', JSON.stringify(analysis, null, 2));
        res.render( 'toxicity', { currentVersions:versionInformation, classification:analysis, sentence: testString} );
        logger.trace( applicationName + ':generic:toxicityPost():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:toxicityPost():An exception occurred :[' + ex + '].' );
    }
}



function toxicityGet ( req,res )
{   try
    {  logger.trace( applicationName + ':generic:toxicityGet():Started' );
       res.render( 'toxicity', { currentVersions:versionInformation, } );
       logger.trace( applicationName + ':generic:toxicityGet():Done' );
    }
    catch ( ex )
    {   logger.exception( applicationName + ':generic:toxicityGet():An exception occurred :[' + ex + '].' );
    }
}




async function toxicitytestHandler ( req,res )
{   try
    {   logger.trace( applicationName + ':generic:toxicitytestHandler():Started' );

        switch ( req.method )
        {   case 'POST' :   toxicityPost( req,res );
                            break;
            case 'GET'  :   toxicityGet( req,res );
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
           case '/toxicity'                              :   toxicitytestHandler( req,res  );
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
