import React, { useEffect } from "react";
import '../styles/panel1.css';
import PublicSelectedItem from "./PublicSelectedItem";

const PublicProductsSummary = ({ items, onUpdateQuantity }) => {
    return <>
        <div className="fijado-titulo2">
            <p></p>
            <p>CANTIDAD</p>
            <p>PRECIO UNITARIO</p>
            <p>TOTAL</p>
            <p></p>
        </div>
        <div className='movimiento-productos2'>
            {items.map((item, index) => <PublicSelectedItem key={index} item={item} onUpdateQuantity={(quantity) => onUpdateQuantity(index, quantity)}/>) }
        </div>
    </>
}

export default PublicProductsSummary;
