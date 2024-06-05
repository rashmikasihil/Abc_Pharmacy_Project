import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './InvoicesList.css';

function InvoicesList() {
  const [invoices, setInvoices] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/invoices')
      .then(response => setInvoices(response.data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  const deleteInvoice = (id) => {
    axios.delete(`http://localhost:8080/invoices/${id}`)
      .then(() => {
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        setSuccessMessage('Invoice deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // 3 seconds timeout before clearing success message
      })
      .catch(error => console.error('Error deleting invoice:', error));
  };

  return (
    <div className="container">
      <h1>INVOICES</h1><br/>
      <p>
Efficient invoicing necessitates capturing customer's name, mobile, email, address, and billing type for streamlined communication and accurate transactions.</p>
      <div style={{ textAlign: 'left' }}>
        <Link to="/invoices/add" className="add-invoice-link">Add Invoice</Link>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Address</th>
            <th>Billing Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.name}</td>
              <td>{invoice.mobile_no}</td>
              <td>{invoice.email}</td>
              <td>{invoice.address}</td>
              <td>{invoice.billing_type}</td>
              <td className="actions">
                <Link to={`/invoices/edit/${invoice.id}`} className="edit-link">Edit</Link>
                <button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesList;
