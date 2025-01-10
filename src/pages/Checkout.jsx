import '../styles/panel3.css';
import logo from '../assets/images/mifacturaperublanco.png';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { decimalAdjust } from "../global";
import menosIcon from '../assets/images/menos.png';
import masIcon from '../assets/images/mas2.png';
import bolsa from '../assets/images/bolsa-reciclave.png';
import PublicTotalViewer from "../components/PublicTotalViewer";

const Checkout = () => {
    const location = useLocation();

    const { items: initialItems, totales: initialTotales, alias, docType, docNumber, clientData } = location.state || {};

    const [items, setItems] = useState(initialItems || []);
    const [totales, setTotales] = useState(initialTotales || { totalMonto: 0 });

    const eliminarItem = (index) => {
        const newItems = [...items];
        const existingProduct = newItems[index];

        if (existingProduct.Cantidad > 1) {
            // Reducir la cantidad y recalcular el total del producto
            existingProduct.Cantidad -= 1;
            existingProduct.Total = decimalAdjust("round", existingProduct.Cantidad * existingProduct.Precio, -2);
        } else {
            // Si la cantidad es 1, eliminar el producto
            newItems.splice(index, 1);
        }

        // Recalcular el total general
        const newTotalMonto = newItems.reduce((acc, item) => acc + item.Total, 0);

        setItems(newItems);
        setTotales({ ...totales, totalMonto: newTotalMonto });
    };

    const agregarPromocion = () => {
        const productoPromocional = {
            descripcion: "Bolsa",
            unidadMedida: "unidad",
            Cantidad: 1,
            Precio: 0.2,
            Total: 0.2,
        };

        const existingIndex = items.findIndex(
            (item) => item.descripcion === productoPromocional.descripcion
        );

        let newItems;
        if (existingIndex !== -1) {
            // Si ya existe el producto, actualizamos su cantidad y total
            newItems = [...items];
            const existingProduct = newItems[existingIndex];
            existingProduct.Cantidad += 1;
            existingProduct.Total = decimalAdjust("round", existingProduct.Cantidad * existingProduct.Precio, -2);
        } else {
            // Si no existe, lo agregamos como un nuevo producto
            newItems = [...items, productoPromocional];
        }

        const newTotalMonto = newItems.reduce((acc, item) => acc + item.Total, 0);

        setItems(newItems);
        setTotales({ ...totales, totalMonto: newTotalMonto });
    };
    return <div>
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
                    <div className='productos-scroll'>
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className="lista-producto">
                                    <div className="img-producto">
                                        <img src={item.UrlImagen} alt="img producto" />
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
                            </div>
                        )) }
                    </div>
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
                    <div className='productos-scroll'>
                        {items.map((item, index) => (
                            <div className="lista-producto" key={index}>
                                <div className="img-producto">
                                    <img src={bolsa} alt="img producto" />
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
                                <button type="button" onClick={() => agregarPromocion(index)}>
                                    <img src={masIcon} alt="MAS" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="footer">
                <PublicTotalViewer prev={null} next="/completado" totales={totales} items={items} alias={alias} clientData={clientData} buttonText="CONTINUAR" />
            </footer>
        </div>
    </div>;
};
export default Checkout;