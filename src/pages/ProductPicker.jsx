import React, { useState, useEffect } from 'react';
import '../styles/panel1.css';
import logo from '../assets/images/mifacturaperublanco.png';
import PublicProductPicker from '../components/PublicProductPicker';
import PublicProductsSummary from '../components/PublicProductsSummary';
import PublicTotalViewer from '../components/PublicTotalViewer';
import { calcTotal, calcularTotales } from '../global';
import { isNumber } from 'lodash';
import { FindPrecioEspecial, FindPrecioFamiliar, FindPrecioMenor, FindPrecioPorMayor, GetPrecioCosto, getPrecioPorMayor } from '../helpers/preciosPreventa';
import { useLocation } from 'react-router-dom';

const ProductPicker = () => {
    const [items, setItems] = useState([]);
    const [totales, setTotales] = useState({});

    const location = useLocation();

    const removeItem = (product) => {
        const filteredItems = items.filter((item) => item.IdPresentacion !== product.IdPresentacion);
        setItems(filteredItems);
    };

    useEffect(() => {
        const {items, totales} = location.state || {};

        if (Array.isArray(items) && !!totales) {
            setItems(items);
            setTotales(totales);
        }
    }, [])

    useEffect(() => {
        const _calculated = calcularTotales(items);
    
        setTotales({
            Gravado: _calculated.gravados,
            Inafecto: _calculated.inafectos,
            Exonerado: _calculated.exonerados,
            IGVPreventa: _calculated.gravados * 0.18,
            Gratuitas: _calculated.gratuitos,
            totalMonto: _calculated.total,
            ICBPERPreventa: _calculated.icbper,
            redondeo: _calculated.redondeo,
        });
    }, [items]);

    const onChooseProduct = (product) => {
        let currentItems = [...items];
        const productPosition = currentItems.indexOfObject(product, "IdPresentacion");
    
        let descuentoPersonal = 0;

        if (productPosition !== -1) {
            currentItems[productPosition].Cantidad++;
            FindPrecioPorMayor([], currentItems[productPosition]);
            currentItems[productPosition].Total = calcTotal(currentItems[productPosition]) - currentItems[productPosition].Descuento;
        } else {
            FindPrecioPorMayor([], product);
            product.Descuento = product.Descuento + descuentoPersonal;
    
            currentItems.push({
                ...product,
                Cantidad: 1,
                PrecioVenta: product.PrecioVenta,
                Total: product.PrecioVenta,
                PrecioEspecial: FindPrecioEspecial([], product),
                PrecioFamiliar: FindPrecioFamiliar([], product),
                PrecioCosto: GetPrecioCosto([], product),
                PrecioMenor: FindPrecioMenor([], product),
                precioMayor: getPrecioPorMayor([], product),
                checked: isNumber(product.checked) ? product.checked : 0,
                oldPrecios: [product.PrecioVenta],
                initialAfectGrat: product.IdAfectacionIgv,
                oldCants: [1],
                NombreProducto: product.descripcion,
                Descuento: 0
            });
        }

        setItems([...currentItems]);
    };

    const onUpdateQuantity = (index, value) => {
        const currentItems = [...items];
    
        currentItems[index].Cantidad = Number(value);
        currentItems[index].Total = calcTotal(currentItems[index]) - currentItems[index].Descuento
        setItems([...currentItems]);
    }

    return <>
        <div className="navbar2">
            <div className="navbar-left2">
                <img src={logo} alt="Mi Factura Perú" className="logo" />
            </div>
        </div>
        <div className="content">
            <div className="section-left2">
                <PublicProductPicker onChooseProduct={onChooseProduct} onRemoveItem={removeItem} />
            </div>

            <div className="section-right2">
                <PublicProductsSummary items={items} onUpdateQuantity={onUpdateQuantity} onRemoveItem={removeItem} />
            </div>
        </div>
        <footer className="footer2">
            <PublicTotalViewer prev="/" next="/cliente" totales={totales} items={items} buttonText="CONTINUAR"/>
        </footer>
    </>
}

export default ProductPicker;
