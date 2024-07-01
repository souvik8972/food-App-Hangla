import { assets } from "../../assets/assets"
import "./Footer.css"

const Footer = () => {
    return (
        <>
            <div className="footer-container" id="footer-container">
                
            
                
                <div className="left-footer">
                    <h2 className="footer-heading logo-name">Hangla.com</h2>
                    <p className="description-footer">
                        Hangla Food Company brings you a delightful selection of dishes, crafted with passion and care. From local favorites to exotic treats, our menu promises a culinary journey that satisfies every palate. Enjoy the convenience of ordering online and indulge in flavors that define comfort and excellence.

                    </p>
                    <div className="link-image">

                        <a href="#"><img src={assets.facebook_icon} /></a>
                        <a href="#"><img src={assets.linkedin_icon} /></a>
                        <a href="#"><img src={assets.twitter_icon} /></a>
                    </div>


                </div>
                <div className="middle-footer">
                    <h3 className="footer-heading">Company</h3>
                    <ul>
                        <li> Home</li>
                        <li> About us</li>

                        <li> Delivery</li>

                        <li> Privacy policy</li>

                    </ul>
                </div>

                <div className="right-footer">
                    <h3 className="footer-heading">Get in Touch</h3>
                    <ul>
                        <li>+91 8617885752</li>
                        <li>support@hangla.com</li> 
                    </ul>
                </div>



            </div>

            <p className="copyRight">Copyright 2024 @ Hangla.com -All Right Reserved.</p>
        </>
    )
}

export default Footer
