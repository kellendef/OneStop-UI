import React from 'react';

export default function Item(props){
    return(
        // props passed are: id(key), Name, Description, Price, inc, dec, quantity
        <div className="item">
			<h2 className="menu-subheader">Item Name: {props.name}</h2>
			<h2 className="menu-subheader">Description: {props.description}</h2>
			<h2 className="menu-subheader">Price: {props.price}</h2>
			<span><h2 className="menu-subheader">Quantity: {props.quantity}</h2><button onClick={()=> props.decrement(props.name, props.price)}>-</button><button onClick ={()=> props.increment(props.name, props.price)}>+</button></span>
            <br />
            <hr />
		</div>
    )
}