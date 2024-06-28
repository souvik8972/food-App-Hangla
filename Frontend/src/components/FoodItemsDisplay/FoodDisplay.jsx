/* eslint-disable react/prop-types */
import { useContext} from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";


const FoodDisplay = ({ category }) => {
  const contextApi = useContext(StoreContext);
  const { food_list } = contextApi;



  

  return (
    <div className="food-display-container">
      <hr />
      <h2>Some Special Dishes Near You</h2>
      
        <div className="food-display-grid">
          {food_list.map((food) => {
            if (category === "All" || category === food.category) {
              return (
                <FoodItem
                  key={food._id}
                  itemId={food._id}
                  name={food.name}
                  image={food.image}
                  price={food.price}
                  description={food.description}
                />
              );
            }
            
          })}
        </div>
    
    </div>
  );
};

export default FoodDisplay;
