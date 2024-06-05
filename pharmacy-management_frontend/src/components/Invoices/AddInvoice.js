import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddInvoice.css'; // Import the CSS file

function AddInvoice() {
  const [customerName, setCustomerName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billingType, setBillingType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation
    const validationErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(customerName)) {
      validationErrors.customerName = 'Customer name must contain only alphabetic characters and spaces.';
    }
    if (!/^\d{10}$/.test(mobileNo)) {
      validationErrors.mobileNo = 'Mobile number must be a 10-digit number.';
    }
    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post('http://localhost:8080/invoices', {
        name: customerName,
        mobile_no: mobileNo,
        email,
        address,
        billing_type: billingType
      });
      setSuccessMessage('Invoice added successfully!');
      setCustomerName('');
      setMobileNo('');
      setEmail('');
      setAddress('');
      setBillingType('');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/invoices');
      }, 3000);
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  return (
    <div className="container">
      <div className="add-guide-container">
        <h1>Add Invoice</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="add-guide-form">
          <div className="form-group">
            <label>Customer Name:</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            {errors.customerName && <span className="error-message">{errors.customerName}</span>}
          </div>
          <div className="form-group">
            <label>Mobile No:</label>
            <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            {errors.mobileNo && <span className="error-message">{errors.mobileNo}</span>}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
        <label>Billing Type:</label>
        <select value={billingType} onChange={(e) => setBillingType(e.target.value)}>
          <option value="">Select Billing Type</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
          <option value="BankPay">BankPay</option>
        </select>
      </div>
          <button type="submit">Add Invoice</button>
        </form>
        
      </div>
    </div>
  );
}

export default AddInvoice;
