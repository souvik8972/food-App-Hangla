import { useContext, useState } from 'react';
import { StoreContext } from '../../../context/StoreContext';
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const { totalCartAmount} = useContext(StoreContext);
  const shippingCharge =totalCartAmount()*0.06

  const [userDetails, setUserDetails] = useState({
    fullName: '',
    address: {
      city: '',
      street: '',
      homeNo: '',
      pincode: '',
    },
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setUserDetails({
        ...userDetails,
        address: {
          ...userDetails.address,
          [addressField]: value,
        },
      });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setUserDetails({
      fullName: '',
      address: {
        city: '',
        street: '',
        homeNo: '',
        pincode: '',
      },
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
            name="address.city"
            value={userDetails.address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={userDetails.address.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="homeNo">Home No:</label>
          <input
            type="text"
            id="homeNo"
            name="address.homeNo"
            value={userDetails.address.homeNo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="address.pincode"
            value={userDetails.address.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
      
      </form>
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
          <button className="place-proceed-to-pay-button" onClick={() => { /* Implement navigation logic */ }}>Proceed To Payment</button>
        </div>
      </div>
  
    </div>
  );
};

export default PlaceOrder;
