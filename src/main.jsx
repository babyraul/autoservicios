import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import Panel1 from './components/panel1';
import Panel2 from './components/panel2';
import Panel3 from './components/panel3';  
import Panel4 from './components/panel4';

import ProductPicker from './pages/ProductPicker';
import IdentifyClient from './pages/IdentifyClient.jsx';
import Checkout from './pages/Checkout.jsx';
import Completed from './pages/Completed.jsx';

Array.prototype.indexOfObject = function (searchElement, key) {
  let a = this;
  for (let i = 0; i < a.length; i++) {
      if (String(a[i][key]) === String(searchElement[key]))
          return i
  }
  return -1;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/productos" element={<ProductPicker />} />
      <Route path="/cliente" element={<IdentifyClient />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/completado" element={<Completed />} />
      <Route path="/panel1" element={<Panel1 />} />
      <Route path="/panel2" element={<Panel2 />} />
      <Route path="/panel3" element={<Panel3 />} /> 
      <Route path="/panel4" element={<Panel4 />} />
    </Routes>
  </BrowserRouter>
);