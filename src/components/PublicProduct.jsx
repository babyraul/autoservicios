import '../styles/panel1.css';
import { decimalAdjust } from "../global";

const PublicProduct = ({ product, onChooseProduct }) => {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) : text;
    };
    return <div className="producto" onClick={onChooseProduct}>
        <div className="producto-info">
<<<<<<< HEAD
            <img src={`../images/Cheese-Tris.png`} alt="No logo" className="producto-imagen" />
=======
            <img src={product.UrlImagen} alt="No logo" className="producto-imagen" />
>>>>>>> a14ed231377135a7fae674c4b287bb503d0267e1
        </div>
        <div className="producto-precio-container">
            <p className="producto-precio">{product.moneda} {decimalAdjust("floor", product.precio, -2)}</p>
            <h3 className="producto-nombre">
                {truncateText(`${product.descripcion} ${product.unidadMedida}`, 50)}
            </h3>
        </div>
    </div>
}

export default PublicProduct;
