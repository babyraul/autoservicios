import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { TIPO_STOCK } from "../global";

import { setPreciosYDescuento } from "../helpers/calcularVenta";
import PublicProduct from "./PublicProduct";

import '../styles/panel1.css';
import PublicCombo from "./PublicCombo";


const PublicProductPicker = ({ onChooseProduct, alias, onUpdateAlias }) => {
    const [products, setProducts] = useState([]);
    const [combos, setCombos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCombos = async (q) => {
        const req = await fetch(`/api/combos`);
        const combos = await req.json();

        if (q == "") {
            setCombos(combos);
        } else {
            setCombos(combos.filter(c => c.Nombre.includes(q)));
        }
    }

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
        fetchCombos("");
    }, []);

    const debounceSearch = useCallback(debounce((q) => {
        fetchProductos(q)
        fetchCombos(q)
    }, 500), []);

    const handleSearch = (e) => {
        const value = e.target.value.trim();
    
        setSearchTerm(value);
        debounceSearch(value);
    };

    const onChooseCombo = (productos) => {
        onChooseProduct(...productos)
    }

    return <>
        <div className="input-container">
            <input type="text" placeholder="Buscar" className="input" value={searchTerm} onChange={handleSearch} autoFocus/>
            <input type="text" placeholder="Alias" className="input" value={alias || ""} onChange={(e) => onUpdateAlias(e.target.value)}/>
        </div>

        <div className="productos">
            { combos.map((c, i) => <PublicCombo key={i} combo={c} onChooseCombo={onChooseCombo} />)} 
            { products.map((p, i) => <PublicProduct key={i} product={p} onChooseProduct={() => onChooseProduct(p)} />)}
        </div>
    </>
}

export default PublicProductPicker;
