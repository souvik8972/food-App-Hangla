/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../../context/StoreContext"
import "./Order.css"
import axios from "axios"
import { assets } from "../../../assets/assets"
import NoOrders from "../../NoOrders/NoOrders"

const Order = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/orders", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            setData(response.data.data)
        } catch (error) {
            console.error("Error fetching orders:", error)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className="order-container">
            <h2>My Orders</h2>
            {data.length === 0 ? (
                <NoOrders/>
            ) : (
                <div className="my-order-container">
                    {data.map((order, index) => (
                        <div className="my-orders" key={index}>
                            <img src={assets.parcel_icon} alt="parcel icon" />
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return `${item.name} x ${item.quantity}`;
                                    } else {
                                        return `${item.name} x ${item.quantity}, `;
                                    }
                                })}
                            </p>
                            <p>Rs. {order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><b>{order.status}</b></p>
                            <button className="btn">Track Order</button>
                            <button className="btn">Cancel</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Order
