import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ItemsList.css';  // Import the CSS file

function ItemsList() {
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
        setSuccessMessage('Item deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Adjust as needed
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div className="container">
      <h1>ITEMS</h1><br/>
      <p>Item management requires capturing name, unit price, and category for efficient organization, pricing, and inventory tracking in business operations.</p>
      <div style={{ textAlign: 'left' }}>
        <Link to="/items/add" className="add-item-link">Add Item</Link>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Item Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.unit_price}</td>
              <td>{item.item_category}</td>
              <td className="actions">
                <Link to={`/items/edit/${item.id}`} className="edit-link">Edit</Link>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemsList;
