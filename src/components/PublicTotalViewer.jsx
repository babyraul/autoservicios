import React from "react";
import { Link } from 'react-router-dom';
import '../styles/panel1.css';
import { decimalAdjust } from "../global";

const PublicTotalViewer = ({ totales, items, clientData, prev, next }) => {
    return <>
        { !!prev && <Link to={prev} className="btn-back2">ATRAS</Link> }
        <div className="total-container2">
            <h2 className="total2">TOTAL A PAGAR</h2>
            <h2 className="precio-total2">S/ {decimalAdjust('round', totales.totalMonto, -1)}</h2>
        </div>

        {
            items.length >= 0 && <Link to={next} className="btn-continue2" state={{ items, totales, clientData }}>CONTINUAR</Link>
        }
    </>
}

export default PublicTotalViewer;
