/* eslint-disable react/prop-types */
import { createContext,  useEffect,  useState } from "react";
import { food_list } from "../assets/assets";
const StoreContext = createContext(null);
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    useEffect(()=>{
        console.log({cartItems})
    },[cartItems])

    const totalCartAmount = () => {
        let total = 0;

        for (let id in cartItems) {
            if (cartItems[id] > 0) {
                const item = food_list.find(i => i._id === id);
                if (item) {
                    total += item.price * cartItems[id];
                }
            }
        }

        return total;
    };



    const successNotify = (text) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1
            }));
        } else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }));
        }
    };

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    };
    
    // Define the context value here. You can add state and functions as needed.
    const contextValue = {
        food_list,
        addToCart,
        cartItems,
        deleteFromCart,
         successNotify,
         totalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreContextProvider };
