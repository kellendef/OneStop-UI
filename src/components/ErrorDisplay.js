import React from 'react'

export default function ErrorDisplay(props){
    return(
        <div>
            <h1 className = 'error'>There was an error.</h1>
            <h1 className = 'error'>{props.error}</h1>
            <h1 className = 'error'>If this issue persists, please call the store to place your order.</h1>
        </div>
    )
}
