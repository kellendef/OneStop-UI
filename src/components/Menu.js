import {React, useState, useEffect} from 'react';
import Item from './Item';
import Subtotal from './Subtotal';
import Submit from './Submit';
import ErrorDisplay from './ErrorDisplay';
//import data from '../data';


export default function Menu(){
    const [menu, setMenu] = useState([]); //state for menu. To be passed to item components as props. 
    const [subtotal, setSubtotal] = useState(0); //state for subtotal. To be passed to subtotal component to show total in real time
    const [comments, setComments] = useState(''); //state for comments and special requests 
    const [order, setOrder] = useState({items: [], quantities: []}); //state for food items and quantities
    const [submitted, setSubmitted] = useState(false)
    const [isError, setIsError] = useState({status: false, error: ''})

    useEffect(()=> {        
            fetch('/order/order-form')  //use the useEffect hook to call the api and get the menu data
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                else throw Error(response.statusText)
            })
            //.then(data => data.json())
            .then(data => setMenu(data))     //set the menu state to api data
            .then(data => console.log(data))
            .catch(error => {
                console.log(error)
                setIsError({status: true, error: error.toString()})
            })
            
        },[]);

    function submit(res){
        if(res === 'ok'){
        setSubmitted(true);
        setIsError({status: false, error: ''})
        }
        else{
            setIsError({status: true, error: res.toString()})
        }
    }

    function incrementQuantity(itemName, price){
        const index = order.items.findIndex(element => element === itemName);
        console.log(index);
        if(index === -1){
            let names = [...order.items, itemName]
            let quantities = [...order.quantities, 1]
            setOrder(() => ({
                items: names,
                quantities: quantities
            }))
        }
        else{
            let quantity = order.quantities[index];
            quantity += 1;
            let names = [...order.items]
            let quantities = [...order.quantities]
            quantities[index] = quantity
            setOrder(() => ({
                items: names,
                quantities: quantities
            }))
        }
        setSubtotal(prev => prev+price)
    }

    function decrementQuantity(itemName, price){
        const index = order.items.findIndex(element => element === itemName);
        console.log(index);
        if(index === -1){
            let names = [...order.items, itemName]
            let quantities = [...order.quantities, 0]
            setOrder(() => ({
                items: names,
                quantities: quantities
            }))
        }
        else{
            let quantity = order.quantities[index];
            if(quantity > 0){
                setSubtotal(prev => prev-price)
                }
            quantity === 0 ? quantity = 0 : quantity -= 1;
            let names = [...order.items]
            let quantities = [...order.quantities]
            quantities[index] = quantity
            setOrder(() => ({
                items: names,
                quantities: quantities
            }))
        }
    }

    function modificationHandler(e){    //this function handles the controlled textarea component for user comments and requests
        setComments(e.target.value);
    }

    const menuElements = menu.map((element)=> (<Item key={element._id} 
                                                       name={element.Name} 
                                                       description={element.Description} price={element.Price} 
                                                       quantity={order.quantities[order.items.indexOf(element.Name)] || 0}
                                                       increment={incrementQuantity}
                                                       decrement={decrementQuantity}/>))

    return(
      <div className="menu-box">
        { submitted === false && isError.status === false &&
            <div>
            {menuElements}
            <Subtotal currentSubtotal = {subtotal}/>
            <h3 id = 'commentTitle'>Comments and modifications: </h3>
            <p id = 'commentInstructions'>(e.g. "one cheeseburger no pickle, one cheeseburger no pickle no onion")</p>
            <textarea id ='comments' onChange={modificationHandler} value={comments}></textarea>
            <Submit currentOrder = {order} comments={comments} submitFunction={submit}/>
            </div> }

            { submitted === true && 
            <div>
            <h1 className = 'submitText'>Thank you for your order!</h1>
            </div> }

            {isError.status === true && 
            <div>
                <ErrorDisplay error = {isError.error} />
            </div>
            }
            
        </div>
    )
}