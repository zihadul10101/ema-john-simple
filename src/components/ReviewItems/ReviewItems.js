import React from 'react';

const ReviewItems = (props) => {
   // console.log(props);
   const {name, quantity,key} =props.product;
   const reviewItemStyle={
       borderBottom:'1px solid lightgray',
       marginBottom:'5px',
       paddingBottom:'5px',
       marginLeft:'200px'
   };
    return (
        <div style={reviewItemStyle} className="review-item">
            <h2 className="product-name">{name}</h2>
            <p>Quantity: {quantity}</p>
            <br/>
            <button 
            onClick={() =>props.removeProduct(key)}
             className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItems;