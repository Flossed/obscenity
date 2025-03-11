/* File             : todo.js
   Author           : Daniel S. A. Khan
   Copywrite        : Daniel S. A. Khan (c) 2024
   Description      : Browser side javascript for the todo list of the property project.
   Notes            :

*/
function populateTable ( table, dataRows,map )
{   try
    {   const row                  = table.insertRow();
        for ( const element of dataRows )
        {   console.log( 'populate table element :['+  element + ']' );
            console.log( 'typeof table element :['+  typeof element + ']' );

            const cell                 = row.insertCell();
            const textNode                                                   =   document.createTextNode( element );

            cell.appendChild( textNode );

            if ( element === true )
            {   cell.style.backgroundColor   = '#FF8074';
            }
            else
            {            cell.style.backgroundColor   = '#B4FF74';
            }
            cell.style.fontWeight        = 'bold';
            cell.style.margin            = '2px';
            cell.style.padding           = '2px';
            cell.style.height            = '50px';
            cell.style.width             = '400px';
            cell.style.textAlign         = 'center';
            cell.style.border            = '4px solid black';

        }
    }
    catch ( ex )
    {    console.log( 'todolist:populateTable: An exception occurred:[' + ex + '].' );
    }
}


function  createTableHeader ( Table, map, tableName, rows )
{   try
    {   const header                   = Table.createTHead();
        const row                      = header.insertRow( 0 );
        const tableHeader              =  map ;

        for ( const element of tableHeader )
        {   const cell                 =   row.insertCell();
            const textNode             =   document.createTextNode( element );
            cell.appendChild( textNode );
            cell.style.backgroundColor   = '#a9becc';
            cell.style.fontWeight        = 'bold';
            cell.style.margin            = '2px';
            cell.style.padding           = '2px'
            cell.style.height            = '50px';
            cell.style.width             = '400px';
            cell.style.textAlign         = 'center';
            cell.style.border            = '4px solid black';
        }
        return header;
    }
    catch ( ex )
    {    console.log( 'todolist:populateTable: An exception occurred:[' + ex + '].' );
    }
}



function clearTable ( Table )
{   try
    {   if ( Table !== null )
        {   while ( Table.firstChild )
            {   Table.removeChild( Table.firstChild );
            }
        }
    }
    catch ( ex )
    {   console.log( 'todolist:clearTable: An exception occurred:[' + ex + '].' );
    }
}


function createTable ( tableName, rows, map )
{   try
    {   if ( rows.length > 0 )
        {   const tableAnchor              = document.getElementById( tableName );
            const tableElement             = document.createElement( 'TABLE' );
            const tableHeader              = createTableHeader( tableElement, map, tableName, rows );
            clearTable( tableAnchor );
            tableElement.appendChild( tableHeader );
            populateTable( tableElement, rows,map );
            tableAnchor.appendChild( tableElement );
        }
        else
        {   clearTable( document.getElementById( tableName ) );
        }
    }
    catch ( ex )
    {    console.log( 'todolist:CreateTable: An exception occurred:[' + ex + '].' );
    }
}


function createToxicityData ( data )
{  try
    {   console.log( 'classification', data );
        const tableHeaders = data.map( element => element.label );
        const classification = data.map( element => element.results[0].match ) ;
        createTable ( 'toxicityTable', classification, tableHeaders );
    }
    catch ( ex )
    {   console.log( 'todolist:createToxicityData: An exception occurred:[' + ex + '].' );
    }

}



function init ()
{   const classification = document.getElementById( 'classification' ).value;
    const sentence = document.getElementById( 'sentence' ).value;

    if ( classification.length > 0 )
    {   const classificationObj = JSON.parse( classification );
        document.getElementById( 'toxicityTable' ).style.visibility = 'visible';
        document.getElementById( 'spinner' ).style.visibility = 'hidden';
        
        createToxicityData( classificationObj );
    }
    else
    {   console.log( 'No data found' );
    }

    if ( sentence.length > 0 )
        {   const sentenceObj = JSON.parse( sentence );
            const toxicitySentence = document.getElementById( 'toxicitySentence' );
            toxicitySentence.style.visibility = 'visible';
            toxicitySentence.style.fontWeight = 'bold';
            toxicitySentence.style.margin = '2px';
            toxicitySentence.style.padding = '2px';
            toxicitySentence.style.height = '50px';
            toxicitySentence.style.width = '400px';
            toxicitySentence.style.textAlign = 'center';
            
            toxicitySentence.innerHTML = sentenceObj;
        }
        else
        {   console.log( 'No data found' );
        }

    printToxSentence( classificationObj );
}

function spinnerOn ()
{   document.getElementById( 'spinner' ).style.visibility = 'visible';
    document.getElementById( 'toxicityTable' ).style.visibility = 'hidden';
    document.getElementById( 'toxicityForm' ).style.visibility = 'hidden';
}

init();

