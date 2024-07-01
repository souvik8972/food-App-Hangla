import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="menu-container" id="menu-container">
            <h2>Explore Our Menu</h2>
            <p>Feel free to choose the taste that best matches your current mood and enjoy the experience!</p>
            <div className="explore-menu-list">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F9ECE7" fillOpacity="1" d="M0,32L48,48C96,64,192,96,288,133.3C384,171,480,213,576,192C672,171,768,85,864,58.7C960,32,1056,64,1152,80C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                {menu_list.map((item, index) => {
                    const { menu_image, menu_name } = item;
                    return (
                        <div key={index} className="menu-item" onClick={()=>{setCategory(prev=>prev==menu_name?"All":menu_name)}}>

                            <img src={menu_image} alt={menu_name} className={ category==menu_name? "active" : ""} />

                            <h3 className={category == menu_name ? "active-text" : ""}>{menu_name}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExploreMenu;
