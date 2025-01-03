import { decimalAdjust } from "../global";


const PublicSelectedItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const updateQuantity = (quantity) => {
        if (typeof onUpdateQuantity != "function") {
            return;
        }

        onUpdateQuantity(quantity);
    };

    return (
        <div className="Producto-item2">
            <button type="button">
                <img
<<<<<<< HEAD
                    src="../images/menos.png"
=======
                    src={item.UrlImagen}
>>>>>>> a14ed231377135a7fae674c4b287bb503d0267e1
                    alt="MENOS"
                    onClick={() => {
                        if (item.Cantidad <= 1) {
                            if (typeof onRemoveItem === "function") {
<<<<<<< HEAD
                                onRemoveItem(item); // Llama a la función para eliminar el producto
=======
                                onRemoveItem(item);
>>>>>>> a14ed231377135a7fae674c4b287bb503d0267e1
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
<<<<<<< HEAD
            <button type="button">
                <img
                    src="../images/mas2.png"
                    alt="MAS"
                    onClick={() => {
                        updateQuantity(item.Cantidad + 1);
                    }}
                />
            </button>
        </div>
    );
};
=======
            <button type="button"><img src="../images/mas2.png" alt="MAS" onClick={() => {
                updateQuantity(item.Cantidad + 1)
            }}/></button>
        </div>
    )
}
>>>>>>> a14ed231377135a7fae674c4b287bb503d0267e1

export default PublicSelectedItem;