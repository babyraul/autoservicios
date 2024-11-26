import React from "react";
import { decimalAdjust } from "../global";


const PublicSelectedItem = ({ item, onUpdateQuantity }) => {
    const updateQuantity = (quantity) => {
        if (typeof onUpdateQuantity != "function") {
            return;
        }

        onUpdateQuantity(quantity)
    }

    return <div className="Producto-item2">
        <button type="button"><img src="../images/menos.png" alt="MENOS" onClick={() => {
            if (item.Cantidad <= 1) {
                return;
            }

            updateQuantity(item.Cantidad - 1)
        }}/></button>
        <div className="lista-producto2">
            <div className="producto-nombre2">{`${item.descripcion} ${item.unidadMedida}`}</div>
            <div className="producto-detalles">
                <div className="cantidad">
                    <h3>{ item.Cantidad }</h3>
                </div>
                <div className="precio-unitario">
                    <h3>S/ {decimalAdjust("round", item.Precio, -2)}</h3>
                </div>
                <div className="total-precio">
                    <h3>S/ {decimalAdjust("round", item.Total, -2)}</h3>
                </div>
            </div>
        </div>
        <button type="button"><img src="../images/mas2.png" alt="MAS" onClick={() => {
            updateQuantity(item.Cantidad + 1)
        }}/></button>
    </div>
}

export default PublicSelectedItem;
