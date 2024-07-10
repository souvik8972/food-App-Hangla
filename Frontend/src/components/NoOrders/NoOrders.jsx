
import animationData from "../../assets/noOrders.json"
import Lottie from "lottie-react"
import "./NoOrders.css"

const NoOrders = () => {
    return (
        <div className="empty-orders">
            <div className="lottie-container">
                <Lottie animationData={animationData} />
            </div>
            <h3>No Orders present</h3>
            

        </div>
    )
}

export default NoOrders
