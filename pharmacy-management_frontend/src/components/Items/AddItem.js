import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddItem.css'; // Import the CSS file

function AddItem() {
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/items', {
        name,
        unit_price: parseFloat(unitPrice),
        item_category: itemCategory
      });
      
      if (response.status === 200) {
        setSuccessMessage('Item added successfully!');
        setName('');
        setUnitPrice('');
        setItemCategory('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/items');
        }, 3000);
      } else {
        setErrorMessage('Error adding item. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error adding item. Please try again.');
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="add-item-container">
      <div className="form-container">
        <h1>Add Item</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="add-item-form" onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Unit Price:</label>
            <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
          </div>
          <div>
            <label>Item Category:</label>
            <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
              <option value="">Select Item Category</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Medication">Medication</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Healthcare Products">Healthcare Products</option>
            </select>
          </div>

          <button type="submit">Add Item</button>
        </form>
      </div>
      
    </div>
    
  );
}

export default AddItem;
