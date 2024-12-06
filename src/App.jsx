import React, { useState, useEffect } from 'react';
import './App.css'; 
import logo from './assets/images/mifacturaperublanco.png'; 
import logoempresa from './assets/images/campos_logo.png';
import video from './assets/images/Copia_CAMPOS_PRODUCTOS.mp4';
import { Link } from 'react-router-dom';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCookies();
  }, []);

  const fetchCookies = async () => {
    try {
      await fetch("api/auth/login", {
        body: JSON.stringify({
          password: "soporte520.",
          username: "autoservicio"
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });

      const req = await fetch("/api/auth/sesion");

      if (!req.ok) {
        throw new Error(await req.text());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="navbar1">
        <div className="navbar-left1">
          <img src={logo} alt="Mi Factura Perú" className="logo" />
        </div>
      </div>
      <div className="main">
        <img
          src={logoempresa}
          alt="LOGO EMPRESA"
          className="logo-empresa"
          onClick={openModal}
        />
      </div>

      {isModalOpen && (
        <div
          className="modal"
          onDoubleClick={closeModal}
        >
          <div className="modal-content">
            <video width="100%" height="100%" autoPlay loop muted>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <footer className="footer1">
        <Link to="/productos" className="btn-continue1">CONTINUAR</Link>
      </footer>
    </div>
  );
}

export default App;
