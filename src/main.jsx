import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import Panel1 from './components/panel1';
import Panel2 from './components/panel2';
import Panel3 from './components/panel3';  
import Panel4 from './components/panel4';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/panel1" element={<Panel1 />} />
      <Route path="/panel2" element={<Panel2 />} />
      <Route path="/panel3" element={<Panel3 />} /> 
      <Route path="/panel4" element={<Panel4 />} />
    </Routes>
  </BrowserRouter>
);