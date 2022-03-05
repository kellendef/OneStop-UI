import React from 'react';

export default function Subtotal(props){
    return(
        <div>
		    <h3 className="subtotal">Subtotal: ${props.currentSubtotal}</h3>
	    </div>
    )
    
}