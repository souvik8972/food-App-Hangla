import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

// eslint-disable-next-line react/prop-types
const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="menu-container" id="menu-container">
            <h2>Explore Our Menu</h2>
            <p>Feel free to choose the taste that best matches your current mood and enjoy the experience!</p>
            <div className="explore-menu-list">
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
