import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EditItem.css'; // Import the CSS file

function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: '',
    unit_price: '',
    item_category: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/items/${id}`);
        const fetchedItem = response.data;
        setItem({
          name: fetchedItem.name,
          unit_price: fetchedItem.unit_price,
          item_category: fetchedItem.item_category
        });
      } catch (error) {
        console.error('Error fetching item:', error.message);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/items/${id}`, item);
      if (response.status === 200) {
        setSuccessMessage('Item updated successfully!');
        setTimeout(() => {
          setSuccessMessage(''); // Clear success message after a few seconds
        }, 3000); // Adjust as needed
      } else {
        setErrorMessage('Error updating item. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error updating item. Please try again.');
      console.error('Error updating item:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  return (
    <div className="edit-item-container"> {/* Add the CSS class */}
      <h2>Edit Item</h2>
      {successMessage && <div className="success-message">{successMessage}</div>} 
      {errorMessage && <div className="error-message">{errorMessage}</div>} 
      <form onSubmit={handleSubmit} className="add-guide-form"> 
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={item.name} onChange={handleChange} />
        </div>
        <div>
          <label>Unit Price:</label>
          <input type="number" name="unit_price" value={item.unit_price} onChange={handleChange} />
        </div>
        <div>
          <label>Item Category:</label>
          <select name="item_category" value={item.item_category} onChange={handleChange}>
            <option value="">Select Item Category</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Medication">Medication</option>
            <option value="Medical Supplies">Medical Supplies</option>
            <option value="Healthcare Products">Healthcare Products</option>
          </select>
        </div>

        <button type="submit">Update Item</button>
      </form>
      
    </div>
  );
}

export default EditItem;
