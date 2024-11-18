import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/panel1.css';
import logo from '../assets/images/mifacturaperublanco.png';


function Panel1() {
    return (
        <div>
            <div className="navbar2">
                <div className="navbar-left2">
                    <img src={logo} alt="Mi Factura Perú" className="logo" />
                </div>
            </div>
            <div className="content">
                <div className="section-left2">
                    <input type="text" placeholder="Buscar" className="input" />
                    <div className="categoria-container">
                        <button className="categoria">P. CAMPOS</button>
                        <button className="categoria">BEBIDA</button>
                        <button className="categoria">SNACK</button>
                        <button className="categoria">LIMPIEZA</button>
                    </div>
                    <div className="productos">
                        {Array(16).fill().map((_, index) => (
                            <div className="producto" key={index}>
                                <div className="producto-info">
                                    <img src={`../images/sporade.png`} alt={`Producto ${index + 1}`} className="producto-imagen" />
                                </div>
                                <div className="producto-precio-container">
                                    <p className="producto-precio">S/ 10.00</p>
                                    <h3 className="producto-nombre">Producto {index + 1}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-right2">
                    <div className="fijado-titulo2">
                        <p></p>
                        <p>CANTIDAD</p>
                        <p>PRECIO UNITARIO</p>
                        <p>TOTAL</p>
                        <p></p>
                    </div>
                    <div className='movimiento-productos2'>
                        {Array(14).fill().map((_, index) => (
                            <div className="Producto-item2" key={index}>
                                <button type="button"><img src="../images/menos.png" alt="MENOS" /></button>
                                <div className="lista-producto2">
                                    <div className="producto-nombre2">AJI-NO-MEN</div>
                                    <div className="producto-detalles">
                                        <div className="cantidad">
                                            <h3>1</h3>
                                        </div>
                                        <div className="precio-unitario">
                                            <h3>S/ 10.30</h3>
                                        </div>
                                        <div className="total-precio">
                                            <h3>S/ 10.30</h3>
                                        </div>
                                    </div>
                                </div>
                                <button type="button"><img src="../images/mas2.png" alt="MAS" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="footer2">
                {/* Redirige a la ruta principal (App.jsx) */}
                <Link to="/" className="btn-back2">ATRAS</Link>
                
                <div className="total-container">
                    <h2 className="total">TOTAL A PAGAR</h2>
                    <h2 className="precio-total">s/ 362</h2>
                </div>
                
                {/* Redirige a la ruta del panel2 */}
                <Link to="/panel2" className="btn-continue2">CONTINUAR</Link>
            </footer>
        </div>
    );
}

export default Panel1;