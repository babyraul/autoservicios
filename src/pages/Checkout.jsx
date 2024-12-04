import React, { useState } from "react";
import '../styles/panel3.css';
import logo from '../assets/images/mifacturaperublanco.png';
import { Link, useLocation } from 'react-router-dom';
import productoImg from '../assets/images/ajinomen-removebg-preview.png';
import { decimalAdjust } from "../global";
import menosIcon from '../assets/images/menos.png';
import masIcon from '../assets/images/mas2.png';
import lecheImg from '../assets/images/leche-removebg-preview.png';
import PublicTotalViewer from "../components/PublicTotalViewer";

const Checkout = () => {
    const location = useLocation();
    const { items: initialItems, totales: initialTotales, docType, docNumber, clientData } = location.state || {};

    const [items, setItems] = useState(initialItems || []);
    const [totales, setTotales] = useState(initialTotales || { totalMonto: 0 });

    const eliminarItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);

        const newTotalMonto = newItems.reduce((acc, item) => acc + item.Total, 0);

        setItems(newItems);
        setTotales({ ...totales, totalMonto: newTotalMonto });
    };

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
                        {items.map((item, index) => (
                            <div className="lista-producto" key={index}>
                                <div className="img-producto">
                                    <img src={productoImg} alt="img producto" />
                                </div>
                                <div className='lista-producto-container'>
                                    <div className='producto-nombre4'>{`${item.descripcion} ${item.unidadMedida}`}</div>
                                    <div className='producto-detalle4'>
                                        <div className="cantidad4">
                                            <h3>{item.Cantidad}</h3>
                                        </div>
                                        <div className="precio-unitario4">
                                            <h3>S/ {decimalAdjust("round", item.Precio, -2)}</h3>
                                        </div>
                                        <div className="total-precio4">
                                            <h3>S/ {decimalAdjust("round", item.Total, -2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => eliminarItem(index)}>
                                    <img src={menosIcon} alt="MENOS" />
                                </button>
                            </div>
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
                <Link></Link>
                <Link></Link>
                <Link></Link>
                <PublicTotalViewer prev={null} next="/completado" totales={totales} items={items} clientData={clientData} />
            </footer>
        </div>
    );
};

export default Checkout;
