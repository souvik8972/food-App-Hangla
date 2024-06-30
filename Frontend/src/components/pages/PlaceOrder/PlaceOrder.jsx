import { useContext, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import "./PlaceOrder.css";
import axios from 'axios';

const PlaceOrder = () => {
  const { token,url,totalCartAmount, food_list, cartItems } = useContext(StoreContext);
  const shippingCharge = totalCartAmount() * 0.06

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    city: '',
    street: '',
    homeNo: '',
    pincode: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDetails(pre => {
      return { ...pre, [name]: value }
    })

  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a copy of the item to avoid mutating the original item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let amount=totalCartAmount()
    console.log(amount + (amount * 0.02),"amount")

    let payload={
      address:userDetails,
      items:orderItems,
      amount:Math.floor(amount+(amount*0.02))
    }
    try {
      const response=await axios.post(`${url}/api/order/place-order`,payload,{headers:{
        "Authorization": 'Bearer '+token
      }})
      console.log(response.data.session_url)
      if(response.data.success==true) {

        window.location.href = response.data.session_url
      }

      
    } catch (error) {
      console.log(error)
      
    }



    console.log(orderItems); // Log the orderItems array to the console

    setUserDetails({
      fullName: '',
      city: '',
      street: '',
      homeNo: '',
      pincode: '',
      phone: '',
    });
  };


  return (
    <div className='place-order-outer-container'>
      <div className="place-order-container">
        <h2>Enter Your Details</h2>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={userDetails. street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="homeNo">Home No:</label>
            <input
              type="text"
              id="homeNo"
              name="homeNo"
              value={userDetails.homeNo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={userDetails.pincode}
              onChange={handleInputChange}
              required
            />
          </div>
          
      
      <div className="place-bottom-cart-container">
        <div className="place-card-left-bottom">
          <h3>Cart Total</h3>
          <div className="place-subtotal">
            <p>Subtotal:</p>
            <p>${totalCartAmount()}</p>
          </div>
          <div className="place-shipping">
            <p>Shipping:</p>
            <p>${shippingCharge}</p>
          </div>
          <div className="place-total">
            <p>Total:</p>
            <p>${totalCartAmount() + shippingCharge}</p>
          </div>
        
        </div>
      </div>
      <button className="place-proceed-to-pay-button" type="submit" >Proceed To Payment</button>

    </form>
      </div>

    </div>
  );
};

export default PlaceOrder;
