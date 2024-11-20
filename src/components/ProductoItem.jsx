import React, { useEffect, useState } from 'react';
import menosIcon from '../assets/images/menos.png'; // Icono de menos

const ProductoItem = ({ nombre, cantidad, precioUnitario, totalPrecio, onDecrementar }) => {
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
        <div className="lista-producto">
            {products.length > 0 && products.map((imageUrl, index) => (
                <div className="producto" key={index}>
                    <div className="img-producto">
                        <img src={imageUrl} alt={`Producto ${index + 1}`} className="producto-imagen" />
                    </div>
                    <div className="lista-producto-container">
                        <div className="producto-nombre4">{nombre}</div>
                        <div className="producto-detalle4">
                            <div className="cantidad4">
                                <h3>{cantidad}</h3>
                            </div>
                            <div className="precio-unitario4">
                                <h3>S/ {precioUnitario}</h3>
                            </div>
                            <div className="total-precio4">
                                <h3>S/ {totalPrecio}</h3>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={onDecrementar}>
                        <img src={menosIcon} alt="MENOS" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductoItem;
