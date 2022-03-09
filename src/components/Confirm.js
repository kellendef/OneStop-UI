import React from 'react'
import Subtotal from './Subtotal'

export default function Confirm(props){
    const order = props.order;
    console.log(order)

    const orderConfirm = [];
    for(var i = 0; i < order.items.length; i++){
        orderConfirm.push(<li key={i} className="confirm"> Item: {order.items[i]}  <br /> Quantity: {order.quantities[i]}<br /><hr /><br /></li>)
    }

    return(
    <div>
    <h1 className = "confirm">Your Order: </h1>
    <ul>
        {orderConfirm}
    </ul>
    <br />
        <Subtotal currentSubtotal = {props.total}/>
    </div>
    )
    
}