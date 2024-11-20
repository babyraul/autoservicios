import React, { useEffect, useState } from 'react';
import menosIcon from '../assets/images/menos.png';


const ProductosScroll = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/uploads');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.files);
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
        <div className="productos-scroll">
            {products.map((imageUrl, index) => (
                <div className="lista-producto" key={index}>
                    <div className="img-producto">
                        <img src={imageUrl} alt={`Producto ${index + 1}`} />
                    </div>
                    <div className="lista-producto-container">
                        <div className="producto-nombre4">AJI-NO-MEN</div>
                        <div className="producto-detalle4">
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
            ))}
        </div>
    );
};

export default ProductosScroll;
