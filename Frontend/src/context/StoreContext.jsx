/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
const StoreContext = createContext(null);
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StoreContextProvider = ({ children }) => {
    let url = "http://localhost:3000"
    const [food_list, setFood_list] = useState([])
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")

    let getFoodList = async () => {
        let response = await axios.get(`${url}/api/food/all/foods`)
    
        setFood_list(response.data.data)
    }

    //

//decode token 
    const decodeToken = (token) => {
        // Example function to decode JWT, actual implementation depends on your token format
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    };

    //auto log out 
    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token to get expiration time, then compare with current time
            const tokenExp = decodeToken(token).exp;
            const currentTime = Math.floor(Date.now() / 1000); // in seconds

            if (tokenExp < currentTime) {
                // Token expired, logout user
                // logout();
                localStorage.removeItem('token');
            }
        }
    }


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

    const loadCartData = async (token) => {
        if (token) {
            try {
                const res = await axios.get(`${url}/api/cart/all/items`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartItems(res.data.cartItems)
                // Assuming the response contains an object with itemId and quantity
            
                
            } catch (error) {
                console.error("Failed to fetch cart items from DB:", error);
            }
        }


    }

    const successNotify = (text) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
    }

    const addToCart = async (itemId) => {
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
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                }
            })
        }
    };

    const deleteFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCartItems = { ...prev };

            // Decrement the quantity or remove the item if its quantity is 1
            if (updatedCartItems[itemId] === 1) {
                delete updatedCartItems[itemId];
            } else {
                updatedCartItems[itemId] -= 1;
            }

            return updatedCartItems;
        });

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                }
            });
        }
    };

    //load 
    useEffect(() => {
        getFoodList()

        if (localStorage.getItem("token")) {
            checkTokenExpiration()
            
            setToken(localStorage.getItem("token"));
            loadCartData(localStorage.getItem("token"))
        }
        
        

    }, [token])


    // Define the context value here. You can add state and functions as needed.
    const contextValue = {
        food_list,
        addToCart,
        cartItems,
        deleteFromCart,
        successNotify,
        totalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreContextProvider };
