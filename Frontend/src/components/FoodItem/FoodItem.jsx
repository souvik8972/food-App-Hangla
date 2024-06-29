/* eslint-disable react/prop-types */
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";


const FoodItem = ({ itemId, name, image, price, description }) => {
    const { cartItems, addToCart, deleteFromCart, successNotify,url } = useContext(StoreContext);

    
    

    const handleAddToCart = (itemId) => {
        addToCart(itemId);
        successNotify("Added To Cart");
    }
    const handleRemoveCart=(itemId)=>{
        deleteFromCart(itemId);
        successNotify("Removed From Cart")
    }

    return (
        <div className="food-item-container">
        
            <div className="food-item-img-container">
                <img src={`${url}/public/uploads/${image}`} alt={name} className="food-item-img" />
                {!cartItems[itemId] ? (
                    <img
                        className="add"
                        src={assets.add_icon_white}
                        alt="Add item"
                        onClick={() => handleAddToCart(itemId)}
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            src={assets.remove_icon_red}
                            alt="Remove item"
                            onClick={() => handleRemoveCart(itemId) }
                        />
                        <p>{cartItems[itemId]}</p>
                        <img
                            src={assets.add_icon_green}
                            alt="Add item"
                            onClick={() => handleAddToCart(itemId)}
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info-container">
                <div className="food-item-name-rating">
                    <p className="foodName">{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default FoodItem;
