/* File             : toxicityIF.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2025
   Description      :
   Notes            :
*/

const tf                                =   require( '@tensorflow/tfjs' );
const {logger,applicationName}          =   require( '../services/generic' );
const toxicity                          =   require( '@tensorflow-models/toxicity' );


async function toxicityIF  ( testString , threshold )
{   try
    {   logger.trace( applicationName + ':toxicityIF():Started' );        
        const analysis                 =   await toxicity.load( threshold );
        console.log( 'Analysis:',  analysis  );
        const classification           =   await analysis.classify( testString );
        logger.trace( applicationName + ':toxicityIF():Done' );
        return classification;
    }
    catch ( ex )
    {   logger.exception( applicationName + ':toxicityIF():An exception occurred :[' + ex + '].' );
    }
}


module.exports.toxicityIF               =   toxicityIF;


/* LOG:
*/
