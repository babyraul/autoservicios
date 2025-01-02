import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx';

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
  <BrowserRouter basename="/autoservicios">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/productos" element={<ProductPicker />} />
      <Route path="/cliente" element={<IdentifyClient />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/completado" element={<Completed />} />
    </Routes>
  </BrowserRouter>
);