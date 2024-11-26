import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/panel2.css';
import logo from '../assets/images/mifacturaperublanco.png'; // Asegúrate de que la ruta sea correcta
import imgScan from '../assets/images/img_scan_dni.png'; // Asegúrate de que la ruta sea correcta

function Panel2() {
  const addNumber = (number) => {
    const inputField = document.getElementById('id-number');
    if (inputField) {
      inputField.value += number;
    }
  };

  const removeAll = () => {
    const inputField = document.getElementById('id-number');
    if (inputField) {
      inputField.value = '';
    }
  };

  const search = () => {
    const inputField = document.getElementById('id-number');
    const searchValue = inputField ? inputField.value : '';

    if (searchValue) {
      console.log('Buscando: ' + searchValue);
    } else {
      alert('Por favor, ingresa un número para buscar.');
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Mi Factura Perú" className="logo" />
        </div>
      </header>
      <main>
        <form action="#" method="post" className="identification-form">
          <label>
            <input type="radio" name="id-type" value="dni" required /> DNI
          </label>
          <label>
            <input type="radio" name="id-type" value="ruc" /> RUC
          </label>
          <label>
            <input type="radio" name="id-type" value="carnet" /> CARNET EXTRANJERIA
          </label>
          <label>
            <input type="radio" name="id-type" value="pasaporte" /> PASAPORTE
          </label>
        </form>
        <input
          className="id-number"
          type="text"
          id="id-number"
          name="id-number"
          placeholder="NUMERO DOCUMENTO"
          required
          readOnly
        />
        <Link to="/panel3" className="omitir">OMITA ESTE PASO</Link>
        <div className="teclado-numerico-container">
          <div className="img-scan">
            <img src={imgScan} alt="DNI" />
          </div>
          <div className="teclado-numerico">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, index) => (
              <button key={index} type="button" onClick={() => addNumber(num.toString())}>
                {num}
              </button>
            ))}
          </div>
          <div className="acciones">
            <button type="button" onClick={removeAll}>Limpiar</button>
          </div>
        </div>
      </main>
      <footer className="footer3">
        <Link to="/productos" className="btn-back3" style={{ marginRight: '10px' }}>ATRAS</Link>
        <div className="cliente3">
          <h2><span className="static-text">Cliente:</span> MARIANO ANTONIO SILVA ROJAS</h2>
          <h2><span className="static-text">Nº Documento:</span> 758962415</h2>
        </div>
        <Link to="/panel3" className="btn-continue3">CONTINUAR</Link>
      </footer>
    </div>
  );
}

export default Panel2;