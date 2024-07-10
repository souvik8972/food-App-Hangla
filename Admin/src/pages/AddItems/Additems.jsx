import  { useRef, useState } from 'react';
import { assets } from '../../assets/assets.js';
import "./Additems.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const categories = [
  "Salad",
  "Rolls",
  "Deserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles"
];

const Additems = () => {
  const url = "https://food-app-hangla-backend.onrender.com";
  const [selectedImage, setSelectedImage] = useState(null);
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const categoryRef = useRef("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('price', Number(priceRef.current.value));
    formData.append('category', categoryRef.current.value);
    formData.append('image', selectedImage);

    try {

      const response = await axios.post(`${url}/api/food/add`, formData);

      
  
      if (response.status === 201) {
        toast.success("food added successfully")
        nameRef.current.value="";
        descriptionRef.current.value=""
        priceRef.current.value=""
        categoryRef.current.value=""
        setSelectedImage(null)
      }
      // Reset form fields and selectedImage state if needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="addItems-container">
      <form className="form-section" onSubmit={submitHandler} encType="multipart/form-data">
        <div className="add-image">
          <p>Upload Image</p>
          <label htmlFor="image" className="selectedImage">
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
            ) : (
              <img src={assets.upload_area} alt="Upload Area" />
            )}
          </label>
          <input
            type="file"
            name="image"
            id="image"
            hidden
            onChange={(e) => setSelectedImage(e.target.files[0])}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" ref={nameRef} name="name" id="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea ref={descriptionRef} name="description" id="description" rows="4" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={categoryRef} required>
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.toLowerCase().replace(' ', '_')}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" ref={priceRef} name="price" id="price" step="0.01" required />
        </div>

        <button type="submit" className='dd-items'>Add Item</button>
      </form>
    </div>
  );
}

export default Additems;
