/* eslint-disable react/prop-types */
// import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = ({ setLoginBtn }) => {
    const container = useRef();
    const spans = useRef([]);
    const [isActive, setIsActive] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(container.current, {
            opacity: 0,
            y: -20,
            duration: .9,
            delay: 0.6
        }, "ani");

        tl.from(".middle", {
            opacity: 0,
            y: -20,
            duration: .9,
            delay: 0.6

        }, "ani"),
            tl.from(".right", {
                opacity: 0,
                y: -20,
                duration: .9,
                delay: 0.6


            }, "ani"),

            []


    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Scroll to the section if the URL has a hash
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.slice(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="left">
                <Link to="/#head" className="logo-link">
                    <h1 className="logo" ref={container}>
                        <IoFastFoodOutline />
                        <span className="span" ref={el => spans.current[0] = el}>H</span>
                        <span className="span" ref={el => spans.current[1] = el}>a</span>
                        <span className="span" ref={el => spans.current[2] = el}>n</span>
                        <span className="span" ref={el => spans.current[3] = el}>g</span>
                        <span className="span" ref={el => spans.current[4] = el}>l</span>
                        <span className="span" ref={el => spans.current[5] = el}>a</span>


                    </h1>
                </Link>
            </div>
            <div className="middle">
                <ul>
                    <li>
                        <Link to="/#head" onClick={() => setIsActive("home")} className={isActive === "home" ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/#menu-container" onClick={() => setIsActive("menu")} className={isActive === "menu" ? "active" : ""}>
                            Menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/#footer-container" onClick={() => setIsActive("about")} className={isActive === "about" ? "active" : ""}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/#app-download-container" onClick={() => setIsActive("mobile-app")} className={isActive === "mobile-app" ? "active" : ""}>
                            Mobile App
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="right">
                {/* <IoIosSearch className="search" /> */}
                <div className="cart-section">
                    <Link to="/cart">
                        <CiShoppingCart className="cart" />
                        <div className="dot"></div>
                    </Link>
                </div>
                <button onClick={() => setLoginBtn(true)} className="sign-up-btn">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Navbar;
