import axios from "axios";
import { useEffect, useState } from "react";
import "./Items.css";


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";

const Items = () => {
  const url = "http://localhost:3000";
  const [foodData, setFoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/all/foods`);
      let data = response.data.data;
      setFoodData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false); // Always hide loading indicator when fetch completes
    }
  };

  const deleteBtnHandler = async (id) => {
    try {
      const res = await axios.delete(`${url}/api/food/delete/${id}`);
      if(res){
        toast.success("delete successfully")
      }
      // Optionally, update UI after successful deletion
      setFoodData(foodData.filter(food => food._id !== id));
    } catch (error) {
      console.error("Error deleting item: ", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  return (
    <div className="item-show-container">
      <h3>All items</h3>
      <div className="header-container">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Description</p>
        <p>Price</p>
        <p>Action</p>
      </div>
      {loading ? (
        <Skeleton count={20} height={50}  />
      ) : (
        <div className="food-items-display">
            {foodData.length === 0 ? <h5 className="No-items">no items present</h5> : (
              foodData.map((food) => (
                <div className="food-details" key={food._id}>
                  <img src={`${url}/public/uploads/${food.image}`} alt={food.name} />
                  <p className="food-name">{food.name}</p>
                  <p className="food-category">{food.category}</p>
                  <p className="food-description">{food.description}</p>
                  <p className="food-price">{food.price}</p>
                  <button onClick={() => deleteBtnHandler(food._id)} className="delete-item-btn">X</button>
                </div>
              ))
      )}
          
        </div>
      )}
    </div>
  );
};

export default Items;
