function init()
{   let classification = document.getElementById( 'classification' ).value;
    console.log( typeof classification); 
    if ( classification.length > 0 )
    {   let classificationObj = JSON.parse( classification );
        console.log( 'classification:', classificationObj );
        /*
        let classificationItems = document.getElementById( 'classificationItems' );
        let container = document.createElement( 'span' );
        let classificationNode = document.createTextNode( 'Classification : ' + classificationObj[0].label + ' : ' + classificationObj[0].results[0].match );
        console.log( 'classification:', classificationObj );
        classificationItems.appendChild( classificationNode );
        let br = document.createElement( 'br' );
        classificationItems.appendChild( br ); */
    }


}