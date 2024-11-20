import React, { useEffect, useState } from 'react';
import masIcon from '../assets/images/mas2.png';


const ProductosPromoScroll = () => {
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
        <div className="productos-promo-scroll">
            <div className="lista-producto-promo-general">
                {products.map((imageUrl, index) => (
                    <div className="lista-producto-promo-content" key={index}>
                        <div className="img-producto">
                            <img src={imageUrl} alt={`Producto ${index + 1}`} />
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
    );
};

export default ProductosPromoScroll;
