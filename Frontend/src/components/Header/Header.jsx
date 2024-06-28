import { FaArrowRightLong } from "react-icons/fa6";
import './Header.css';
import gsap from 'gsap';

import { useEffect } from "react";

const Header = () => {
    useEffect(() => {
        gsap.from('.header-text', {
            y: -30,
            opacity: 0,
            delay: 0.8
        });
        
    }, []);
    return (
        <div className="header-container" id="head">
        <img className='header-image' src='./image/header.jpeg'/>
        
            <div className="left-container">
                <div className="header-text">
                    <h2>Enjoy Your <span>Food</span></h2>
                    <h2>without leaving your home</h2>
                </div>
                <div className="header-description">
                    <p>our delicious meals are just a click away! Satisfy your cravings with our mouth-watering dishes, expertly prepared and delivered fresh to your doorstep</p>
                </div>
                <button className='explore-btn'>Explore More <FaArrowRightLong className="arrow"/></button>
            </div>
        </div>
    );
}

export default Header;
