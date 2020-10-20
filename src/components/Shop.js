import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
import RightPanel from "./rightPanel";
import LeftPanel from "./leftPanel";

const Shop = (props) => {
  const { items } = props;
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [coupon, setCoupon] = useState(0);

  const checkPresence = (item, newCart) => {
    for (let i of newCart) {
      if (i.name === item.name) {
        return true;
      }
    }
    return false;
  };
  const addItem = (item) => {
    // console.log(cart.filter((j) => j.name === item.name));
    let newCart = cart;
    if (cart.length > 0) {
      if (checkPresence(item, newCart)) {
        for (let i of newCart) {
          if (i.name === item.name) {
            i.quantity += 1;
            i.totalPrice = i.price * i.quantity;
            calcSubTotal(cart, coupon);
          }
        }
      } else {
        for (let i of items) {
          if (i.name === item.name) {
            newCart.push({ ...item, quantity: 1, totalPrice: item.price });
            calcSubTotal(cart, coupon);
          }
        }
      }
      setCart(newCart);
    } else {
      for (let i of items) {
        if (i.name === item.name) {
          newCart.push({ ...item, quantity: 1, totalPrice: item.price });
          setCart(newCart);
          calcSubTotal(cart, coupon);
        }
      }
    }
  };

  const removeItem = (item) => {
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      let newCart = cart;
      for (let i in newCart) {
        let cartItem = newCart[i];
        if (cartItem.name === item.name && cartItem.quantity >= 1) {
          cartItem.quantity -= 1;
          cartItem.totalPrice = cartItem.price * cartItem.quantity;
          if (cartItem.quantity === 0) {
            newCart.splice(i, 1);
          }
        }
        setCart(newCart);
        calcSubTotal(cart, coupon);
        console.log(newCart);
      }
    }
  };

  const calcSubTotal = (newCart, tempCoupon) => {
    console.log(tempCoupon);
    if (newCart !== undefined && newCart !== null && newCart !== []) {
      let total = 0;
      newCart.forEach((i) => (total += i.totalPrice));
      if (tempCoupon === 15) {
        total -= (total * 15) / 100;
        console.log(total);
      } else if (tempCoupon === 25) {
        total -= (total * 25) / 100;
        console.log(total);
      }
      console.log(total);
      setSubTotal(total);
    }
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
    calcSubTotal(cart, event.target.value);
  };

  return (
    <div>
      <Grid className="GridRoot">
        <LeftPanel items={items} addItem={addItem} removeItem={removeItem} />
        {/* <Divider orientation="vertical" /> */}
        <RightPanel
          cart={cart}
          coupon={coupon}
          handleCouponChange={handleCouponChange}
          subTotal={subTotal}
        />
      </Grid>
    </div>
  );
};

export default Shop;
