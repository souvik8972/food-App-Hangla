import animationData from "../../assets/Animation - 1719403182443 (1).json"
import Lottie from "lottie-react"

import "./EmptyCard.css"
const EmptyCart = () => {
    return (
        <div className="empty-cart">
        <div className="lottie-container">
            <Lottie animationData={animationData}/>
            </div>
            <h3>Your cart is currently empty</h3>
            <p>Start shopping to add items to your cart</p>

        </div>
    )
}

export default EmptyCart
