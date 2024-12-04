import React from "react";
import '../styles/panel1.css';
import PublicSelectedItem from "./PublicSelectedItem";

const PublicProductsSummary = ({ items, onUpdateQuantity, onRemoveItem }) => {
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
                    />
                ))}
            </div>
        </>
    );
};

export default PublicProductsSummary;