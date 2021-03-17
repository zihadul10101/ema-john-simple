import React, { useEffect, useState } from 'react';
import fakeData from '../../ema/fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../ema/utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../ema/images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory()
  const handleProceedCheckout = () => {
    //console.log('order placed');
    history.push('/shipment');
  }

  const removeProduct = (productKey) => {
    // console.log('remove clicked',productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }
  useEffect(() => {
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    //console.log(cartProducts);
    setCart(cartProducts);
  }, [])

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={happyImage} alt="" />
  }
  return (

    <div className="twin-container">

      <div className="product-container">
        {
          cart.map(pd => <ReviewItems
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}></ReviewItems>)
        }
        {
          thankyou
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;