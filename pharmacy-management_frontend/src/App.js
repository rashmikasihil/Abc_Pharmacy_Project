import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'; 
import ItemsList from './components/Items/ItemsList';
import AddItem from './components/Items/AddItem';
import EditItem from './components/Items/EditItem';
import InvoicesList from './components/Invoices/InvoicesList';
import AddInvoice from './components/Invoices/AddInvoice';
import EditInvoice from './components/Invoices/EditInvoice';
import './Apps.css'; 
import Footer from './components/Footer';
import LogoImage from './Image/logo.png';

function App() {
  return (
    <Router>
      <div>
              <nav className="navbar">
          <div className="navbar-logo">
            <img className="f_logo" src={LogoImage} alt="Logo" />
          </div>
          <ul>
            <li>
              <Link to="/home"><b>Home</b></Link>
            </li>
            <li>
              <Link to="/items"><b>Items</b></Link>
            </li>
            <li>
              <Link to="/invoices"><b>Invoices</b></Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/items/add" element={<AddItem />} />
          <Route path="/items/edit/:id" element={<EditItem />} />
          <Route path="/invoices" element={<InvoicesList />} />
          <Route path="/invoices/add" element={<AddInvoice />} />
          <Route path="/invoices/edit/:id" element={<EditInvoice />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
