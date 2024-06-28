/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react"
import { assets } from "../../assets/assets"
import "./Login.css"

const Login = ({  setLoginBtn }) => {
    const [loginState,setLoginState]=useState("Login")
    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-heading">
                    <h1>{loginState}</h1>
                </div>
                <div className="cross"><img
                    onClick={() => { setLoginBtn (false)}}
                src={assets.cross_icon}

                /></div>
                <div className="login-form-container">

                    <form className="login-form" >

                        <div className="user-information">
                            {loginState === "Sign up" ? <><label htmlFor="username">Username</label>
                                <input type="text" id="username" placeholder="Username" name="username" /></>:<></>}
                            
                            <label htmlFor="email" >Email</label>
                            <input type="email" className="email" placeholder="Email" />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Password" className="password" name="password" />
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
                        {loginState == "Login" ? <p>Don't have an account? <span onClick={()=>setLoginState("Sign up")} id="signup">Sign up</span></p> : <p>Already have an account? <span onClick={()=>{setLoginState("Login")}} id="login">Login here</span></p>}

                        
                    </div>
                    


                </div>




            </div>

        </div>
    )
}

export default Login
