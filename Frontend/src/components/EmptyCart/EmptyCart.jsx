import { assets } from "../../assets/assets"

import "./EmptyCard.css"
const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <img src={assets.empty_cart} className="empty-cart-img" />
            <h3>Your cart is currently empty</h3>
            <p>Start shopping to add items to your cart</p>

        </div>
    )
}

export default EmptyCart
