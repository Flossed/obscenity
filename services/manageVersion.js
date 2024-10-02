const {logger}                         = require( '../services/generic' );
const {applicationName}                = require( '../services/generic' );


const { execSync }                     = require( 'child_process' );
const {dbName}                         = require( './generic' );

const   getTagCommand                  =   'git tag -n10 ';
const   getCurrentTagCommand           =   'git describe --tags --abbrev=0';
const   currentVersions                 =   {};


function getCurrentTag()
{   try
    {   const currentTag                   =   execSync( getCurrentTagCommand ).toString().split( '\n' );        
        return currentTag;
    }
    catch ( ex )
    {   logger.exception( applicationName + ':index:getCurrentTag:An exception Occured:[' + ex + ']' );
        return ["no tags available"];
    }

}

function getCurrentVersions ()
{   try
    {   logger.trace( applicationName + ':index:getCurrentVersions:Started ' );

        const tagList                      =   execSync( getTagCommand ).toString().split( '\n' );
        const currentTag                   =   getCurrentTag();
        currentVersions.tagList            =   tagList;
        currentVersions.dbName             =   dbName;
        currentVersions.currentTag         =   currentTag;


        logger.trace( applicationName + ':index:getCurrentVersions:Done ' );
        return currentVersions;
    }
    catch ( ex )
    {   logger.exception( applicationName + ':index:getCurrentVersions:An exception Occured:[' + ex + ']' );
    }
}


module.exports                         =   { getCurrentVersions};
