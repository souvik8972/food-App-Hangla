/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import "./Verify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

const Verify = () => {
    const navigate = useNavigate(); // Changed to useNavigate
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const order_id = searchParams.get('order_id');
    const { url } = useContext(StoreContext);

    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, order_id });

            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
            navigate("/");
        }
    };

    useEffect(() => {
        verifyPayment();
    }, []); // No need to include verifyPayment in the dependency array because it doesn't depend on any external variables

    return (
        <div className="verify-container">
            <p>Verifying payment...</p>
            <ScaleLoader
                color="#e05d33"
                height={50}
                loading
            />
        </div>
    );
};

export default Verify;
