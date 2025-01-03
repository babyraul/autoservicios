import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/panel3.css';
import logo from '../assets/images/mifacturaperublanco.png'; 
import ProductosScroll from './ProductosScroll';
import ProductosPromoScroll from './ProductosPromoScroll';

const Panel3 = () => {
    return (
        <div>
            <header className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Mi Factura Perú" className="logo" />
                </div>
            </header>
            <div className='main4'>
                <section className="section-left">
                    <div className='fijado'>
                        <h2 className="title">SELECCIONADOS</h2>
                        <div className="titulo-productos">
                            <p></p>
                            <p>CANTIDAD</p>
                            <p>PRECIO UNITARIO</p>
                            <p>TOTAL</p>
                            <p></p>
                        </div>
                    </div>
                    <ProductosScroll /> 
                </section>
                <section className="section-right">
                    <div className="fijado2">
                        <h2 className="title">EN PROMOCION</h2>
                        <div className="titulo-productos">
                            <p></p>
                            <p></p>
                            <p>PRODUCTO PRECIO</p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                    <ProductosPromoScroll /> 
                </section>
            </div>
            <footer className="footer">
                <Link to="/panel2" className="btn-back">ATRAS</Link>
                <div className="total-container">
                    <h2 className="total">TOTAL A PAGAR</h2>
                    <h2 className="precio-total">s/ 362</h2>
                </div>
                <Link to="/panel4" className="btn-continue">CONTINUAR</Link>
            </footer>
        </div>
    );
};

export default Panel3;