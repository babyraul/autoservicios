import React, { useEffect, useState } from 'react';

const ListaProductosp1 = () => {
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
        <div className="productos">
            {products.map((imageUrl, index) => (
                <div className="producto" key={index}>
                    <div className="producto-info">
                        <img src={imageUrl} alt={`Producto ${index + 1}`} className="producto-imagen" />
                    </div>
                    <div className="producto-precio-container">
                        <p className="producto-precio">S/ 10.00</p>
                        <h3 className="producto-nombre">Producto {index + 1}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaProductosp1;
