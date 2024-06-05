import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditInvoice.css';

function EditInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [billingType, setBillingType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/invoices/${id}`)
      .then(response => {
        const data = response.data;
        setName(data.name);
        setMobileNo(data.mobile_no);
        setEmail(data.email);
        setAddress(data.address);
        setBillingType(data.billing_type);
      })
      .catch(error => console.error('Error fetching invoice:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const invoiceData = {
      name,
      mobile_no: mobileNo,
      email,
      address,
      billing_type: billingType,
    };

    axios.put(`http://localhost:8080/invoices/${id}`, invoiceData)
      .then(() => {
        setSuccessMessage('Invoice updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/invoices');
        }, 3000); // 3 seconds timeout before navigating back
      })
      .catch(error => {
        setErrorMessage('Error updating invoice. Please try again.');
        console.error('Error updating invoice:', error);
      });
  };

  return (
    <div className="container">
      <div className="add-guide-container"> 
        <h1>Edit Invoice</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="add-guide-form"> 
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Mobile No:</label>
            <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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

          <button type="submit">Update Invoice</button>
        </form>
       
      </div>
    </div>
  );
}

export default EditInvoice;
