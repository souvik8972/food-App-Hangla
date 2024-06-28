import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../../context/StoreContext";
import EmptyCart from "../../EmptyCart/EmptyCart";
import { useNavigate } from "react-router-dom";




const Cart = () => {
  const navigate=useNavigate()
  
  const { totalCartAmount,food_list, cartItems, deleteFromCart, successNotify } = useContext(StoreContext);
  let shippingCharge =totalCartAmount()*(0.06)
  const handleDelete=(itemId)=>{
    deleteFromCart(itemId);
    successNotify("Removed Successful")
  }
  const cartItemsArray = food_list.filter(item => cartItems[item._id]);

  return (
    <div className="cart-items-container">
      {cartItemsArray.length === 0 ? (
        <EmptyCart/>
      ) : (
        <>
          <div className="cart-items-title">
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <div className="cart-items">
            {cartItemsArray.map((item) => (
              <div key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <button onClick={() => handleDelete(item._id)} className="delete-button">X</button>
              </div>
            ))}
          </div>
            <div className="bottom-cart-Container">
              <div className="card-left-bottom">
                <h3>Cart Total</h3>
                <div className="subtotal">
                  <p>Subtotal:</p>
                  <p>${totalCartAmount()}</p>
                </div>
                <div className="shipping">
                  <p>Shipping:</p>
                  <p>${shippingCharge}</p>
                </div>
                <div className="total">
                  <p>Total:</p>
                  <p>${totalCartAmount()+shippingCharge}</p>
                </div>
                <button onClick={()=>{navigate("/order")}}>Proceed To Pay</button>
              </div>

              <div className="card-right-bottom">
                <h4>Have Any Promo Code</h4>
                <input type="text" placeholder="Enter Promo Code" />
                <button>Apply</button>
              </div>
            </div>


        </>
      )}
    </div>
  );
};

export default Cart;
