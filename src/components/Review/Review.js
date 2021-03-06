import React, { useEffect, useState } from 'react';
import fakeData from '../../ema/fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../ema/utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Review = () => {
  const [cart, setCart] = useState([]);


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
  return (
    <div className="twin">

      <div className="product-container">
        {
          cart.map(pd => <ReviewItems
            key={pd.key}
            removeProduct={removeProduct}
            product={pd}></ReviewItems>)
        }
        <div className="cart-container">
          <Cart cart={cart}></Cart>
        </div>
      </div>
    </div>
  );
};

export default Review;