import React, { useEffect, useState } from 'react';
import masIcon from '../assets/images/mas2.png'; // Icono de más

const ProductoPromoItem = ({ nombre, precio, onAgregar }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/uploads');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.files); // Accede a la propiedad 'files' del JSON
                } else {
                    console.error('Error al obtener los productos');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="lista-producto-promo-content">
            {products.length > 0 && products.map((imageUrl, index) => (
                <div className="producto-promo" key={index}>
                    <div className="img-producto">
                        <img src={imageUrl} alt={`Producto promocional ${index + 1}`} />
                    </div>
                    <div className="lista-producto-promo">
                        <div className="nombre-prunitario4">
                            <p className="nombre-producto4">{nombre}</p>
                            <h3 className="precio-producto4">S/ {precio}</h3>
                        </div>
                    </div>
                    <button type="button" onClick={onAgregar}>
                        <img src={masIcon} alt="MAS" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductoPromoItem;
