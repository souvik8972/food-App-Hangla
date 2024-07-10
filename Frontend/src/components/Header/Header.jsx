import { FaArrowRightLong } from "react-icons/fa6";
import './Header.css'; // Assuming you have additional styles in Header.css
import gsap from 'gsap';
import { useEffect } from "react";
import { assets } from "../../assets/assets"; // Assuming assets are properly imported

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
            
            

            <div className="video">
                {/* <video autoPlay loop muted>
                    <source src={assets.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
                <img  className="header-img" src={assets.header}/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fillOpacity="1" d="M0,32L48,48C96,64,192,96,288,133.3C384,171,480,213,576,192C672,171,768,85,864,58.7C960,32,1056,64,1152,80C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>

            <div className="left-container">
        
                <div className="header-text">
                    <h2>Enjoy Your <span>Food</span></h2>
                    <h2>without leaving your home</h2>
                </div>
                <div className="header-description">
                    <p>Our delicious meals are just a click away! Satisfy your cravings with our mouth-watering dishes, expertly prepared and delivered fresh to your doorstep.</p>
                </div>
                <button className='explore-btn'>Explore More <FaArrowRightLong className="arrow" /></button>
            </div>
        </div>
    );
}

export default Header;


