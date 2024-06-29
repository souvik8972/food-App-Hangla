/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import "./Login.css"
import axios from "axios"
import { StoreContext } from "../../context/StoreContext"
import { toast } from "react-toastify"

const Login = ({ setLoginBtn}) => {
    let {url,setToken}=useContext(StoreContext)
    const [loginState, setLoginState] = useState("Login")
    //login
    let [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    const onInfoChangerHandler = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUserDetails((pre) => ({ ...pre, [name]: value }))
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (loginState === "Login") {
            newUrl = `${newUrl}/api/user/login`;
        } else if (loginState === "Sign up") {
            newUrl = `${newUrl}/api/user/signup`;
        }

        try {
            const response = await axios.post(newUrl, userDetails);
            toast.success(response.data.message);
            localStorage.setItem("token", response.data.token);
            setToken(response.data.token);
            setLoginBtn(false);
            // Additional handling of successful login/signup
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with an error status code
                toast.error(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request made but no response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
            }
        }
    };


    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-heading">
                    <h1>{loginState}</h1>
                </div>
                <div className="cross"><img
                    onClick={() => { setLoginBtn(false) }}
                    src={assets.cross_icon}

                /></div>
                <div className="login-form-container">

                    <form className="login-form" onSubmit={submitHandler} >

                        <div className="user-information">
                            {loginState === "Sign up" ? <><label htmlFor="username">Username</label>
                                <input type="text" id="username" placeholder="Username" name="username" onChange={onInfoChangerHandler} value={userDetails.username} /></> : <></>}

                            <label htmlFor="email" >Email</label>
                            <input type="email" className="email" name="email" placeholder="Email" onChange={onInfoChangerHandler} value={userDetails.email} />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" className="password" name="password" onChange={onInfoChangerHandler} value={userDetails.password} />
                        </div>
                        <div className="login-button">
                            <button className="btn" type="submit">{loginState}</button>
                        </div>
                        <div className="checkbox-container">
                            <input required type="checkbox" id="remember-me" name="remember-me" />
                            <p>By clicking, you accept the privacy policy.</p>

                        </div>

                    </form>

                    <div className="switch-state-container">
                        {loginState == "Login" ? <p>Don't have an account? <span onClick={() => setLoginState("Sign up")} id="signup">Sign up</span></p> : <p>Already have an account? <span onClick={() => { setLoginState("Login") }} id="login">Login here</span></p>}


                    </div>



                </div>




            </div>

        </div>
    )
}

export default Login
