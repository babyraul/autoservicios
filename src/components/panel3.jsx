import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/panel3.css';
import logo from '../assets/images/mifacturaperublanco.png'; 
import productoImg from '../assets/images/ajinomen-removebg-preview.png';
import menosIcon from '../assets/images/menos.png';
import masIcon from '../assets/images/mas2.png';
import lecheImg from '../assets/images/leche-removebg-preview.png';

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
                    <div className='productos-scroll'>
                        {[...Array(10)].map((_, index) => (
                            // nuevo componente
                            <div className="lista-producto" key={index}>
                                <div className="img-producto">
                                    <img src={productoImg} alt="img producto" />
                                </div>
                                <div className='lista-producto-container'>
                                    <div className='producto-nombre4'>AJI-NO-MEN</div>
                                    <div  className='producto-detalle4'>
                                        <div className="cantidad4">
                                            <h3>1</h3>
                                        </div>
                                        <div className="precio-unitario4">
                                            <h3>S/ 10.30</h3>
                                        </div>
                                        <div className="total-precio4">
                                            <h3>S/ 10.30</h3>
                                        </div>
                                    </div>
                                </div>
                                <button type="button">
                                    <img src={menosIcon} alt="MENOS" />
                                </button>
                            </div>
                            // nuevo componente
                        ))}
                    </div>
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
                    <div className="productos-promo-scroll">
                        <div className="lista-producto-promo-general">
                            {[...Array(12)].map((_, index) => (
                                <div className="lista-producto-promo-content" key={index}>
                                    <div className="img-producto">
                                        <img src={lecheImg} alt="img producto" />
                                    </div>
                                    <div className="lista-producto-promo">
                                        <div className="nombre-prunitario4">
                                            <p className="nombre-producto4">AJI-NO-MEN</p>
                                            <h3 className="precio-producto4">S/ 10.30</h3>
                                        </div>
                                    </div>
                                    <button type="button">
                                        <img src={masIcon} alt="MAS" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
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