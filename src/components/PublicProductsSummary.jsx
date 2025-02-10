import React, { useState }  from "react";
import '../styles/panel1.css';
import PublicSelectedItem from "./PublicSelectedItem";

const PublicProductsSummary = ({ items, onUpdateQuantity, onRemoveItem }) => {
    const [productos, setProductos] = useState(items);
    const handleAddObservation = (index, observation) => {
        const nuevosProductos = [...productos];

        if (nuevosProductos[index]) {
            nuevosProductos[index].observacion = observation;
            setProductos(nuevosProductos);
        } else {
            console.error("Índice no válido:", index);
        }
    };
    return (
        <>
            <div className="fijado-titulo2">
                <p></p>
                <p>CANTIDAD</p>
                <p>P.UNITARIO</p>
                <p>TOTAL</p>
                <p></p>
            </div>
            <div className="movimiento-productos2">
                {items.map((item, index) => (
                    <PublicSelectedItem
                        key={index}
                        item={item}
                        onUpdateQuantity={(quantity) => onUpdateQuantity(index, quantity)}
                        onRemoveItem={onRemoveItem} 
                        onAddObservation={(item, observation) => handleAddObservation(index, observation)}
                    />
                ))}
            </div>
        </>
    );
};

export default PublicProductsSummary;