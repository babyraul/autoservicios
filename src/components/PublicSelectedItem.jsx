import { decimalAdjust } from "../global";
import imenos from "../assets/images/menos.png"
import imas from "../assets/images/mas2.png"


const PublicSelectedItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const updateQuantity = (quantity) => {
        if (typeof onUpdateQuantity != "function") {
            return;
        }

        onUpdateQuantity(quantity);
    };

    return (
        <div className="Producto-item2">
            <button className="button-menos" type="button">
                <img
                    src={imenos}
                    alt="MENOS"
                    onClick={() => {
                        if (item.Cantidad <= 1) {
                            if (typeof onRemoveItem === "function") {
                                onRemoveItem(item);
                            }
                            return;
                        }
                        updateQuantity(item.Cantidad - 1);
                    }}
                />
            </button>
            <div className="lista-producto2">
                <div className="producto-nombre2">{`${item.descripcion} ${item.unidadMedida}`}</div>
                <div className="producto-detalles">
                    <div className="cantidad">
                        <h3>{item.Cantidad}</h3>
                    </div>
                    <div className="precio-unitario">
                        <h3>S/ {decimalAdjust("round", item.Precio, -2)}</h3>
                    </div>
                    <div className="total-precio">
                        <h3>S/ {decimalAdjust("round", item.Total, -2)}</h3>
                    </div>
                </div>
            </div>
            <button className="button-mas" type="button"><img src={imas} alt="MAS" onClick={() => {
                updateQuantity(item.Cantidad + 1)
            }}/></button>
        </div>
    )
}

export default PublicSelectedItem;