import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/panel4.css';
import logo from '../assets/images/mifacturaperublanco.png';

function Panel4() {
    return (
        <div>
            <header className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Mi Factura Perú" className="logo" />
                </div>
            </header>
            <div className='main5'>
                <div className="ticket">
                    <div className="titulo">Pase a algunas de nuestras cajas su código de pago es :</div>
                    <div className="numero">
                        <h2 className='numero-tickect5'>PV-362</h2>
                    </div>
                </div>
            </div>
            <section className="cliente">
                <h2 className="nombre-left">MARIANO ANTONIO SILVA ROJAS</h2>
                <h2 className="nombre-right">758962415</h2>
            </section>
            <footer className="footer5">
                <Link to="/panel3" className="btn-back5">ATRAS</Link>
                <div className="total-container">
                    <h2 className="total">TOTAL A PAGAR</h2>
                    <h2 className="precio-total">s/ 362</h2>
                </div>
                <Link to="/" className="btn-continue5">IMPRIMIR</Link>
            </footer>
        </div>
    );
}

export default Panel4;