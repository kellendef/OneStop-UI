import React from 'react';

export default function Submit(props){
    function handleSubmit(order, comments){
        //reformat state to a nicer format for backend processing
        let tempItems = order.items;
        let tempQuantities = order.quantities;
        const formattedOrder = [];
        for(var i = 0; i < tempItems.length; i++){
            formattedOrder.push({item: tempItems[i], quantity: tempQuantities[i]})
        }
        var submitObj = {'order': formattedOrder, 'comments': comments}
        console.log(submitObj);
        //send formatted data to api and display thank you / error message
        fetch('/order/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitObj)
        }).then(status =>{
            if(!status.ok){
                throw Error(status.statusText)
            }
            else{
                props.submitFunction('ok'); // call this to route to the thank you page
            }
        }).catch(error => {
            console.log(error);
            props.submitFunction(error);
        })
    }
    return(
    <div className='submitButton'>
        <button onClick={()=>handleSubmit(props.currentOrder, props.comments)}>Submit</button>
    </div>
    )
}
