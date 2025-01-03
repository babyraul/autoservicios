import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { TIPO_STOCK } from "../global";

import { setPreciosYDescuento } from "../helpers/calcularVenta";
import PublicProduct from "./PublicProduct";

import '../styles/panel1.css';


const PublicProductPicker = ({ onChooseProduct }) => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProductos = async (q) => {
        const req = await fetch(`/api/preVentas/?search=${q}&idTipoStock=${TIPO_STOCK.CON_COMPROBANTE}`);
        const data = await req.json();
    
        const products = data.productos.filter(d => {
            const itemCalculado = setPreciosYDescuento(d);
            return itemCalculado.PrecioVenta > 0;
        }).map((d) => {
            const itemCalculado = setPreciosYDescuento(d);
            return {
                ...d,
                Precio: itemCalculado.PrecioVenta,
                PrecioReferencial: itemCalculado.PrecioVenta,
                Gratuito: parseInt(d.Gratuito),
            };
        });
    
        setProducts(products);
    };

    useEffect(() => {
        fetchProductos("");
    }, []);

    const debounceSearch = useCallback(debounce(fetchProductos, 500), []);

    const handleSearch = (e) => {
        const value = e.target.value.trim();
    
        setSearchTerm(value);
        debounceSearch(value);
    };

    return <>
        <input type="text" placeholder="Buscar" className="input" value={searchTerm} onChange={handleSearch} autoFocus/>

        <div className="productos">
            { products.map((p, i) => <PublicProduct key={i} product={p} onChooseProduct={() => onChooseProduct(p)} />) }
        </div>
    </>
}

export default PublicProductPicker;
