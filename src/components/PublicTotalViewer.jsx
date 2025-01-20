import React from "react";
import { Link } from 'react-router-dom';
import '../styles/panel1.css';
import { decimalAdjust } from "../global";

const PublicTotalViewer = ({ totales, items, alias, clientData, prev, next, buttonText = "CONTINUAR", useLink = true, onClick }) => {
    return <>
        { !!prev && <Link to={prev} className="btn-back2">ATRAS</Link> }
        <div className="total-container2">
            <h2 className="total2">TOTAL A PAGAR</h2>
            <h2 className="precio-total2">S/ {decimalAdjust('round', totales.totalMonto, -1)}</h2>
        </div>

        {
            items.length >= 0 && (
                useLink ? <Link to={next} className="btn-continue2" state={{ items, totales, alias, clientData }}>{buttonText}</Link> :
                <button role="button" onClick={onClick} className="btn-continue2">{buttonText}</button>
            )
        }
    </>
}

export default PublicTotalViewer;
