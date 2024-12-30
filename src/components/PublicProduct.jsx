import '../styles/panel1.css';
import { decimalAdjust } from "../global";

const PublicProduct = ({ product, onChooseProduct }) => {
    return <div className="producto" onClick={onChooseProduct}>
        <div className="producto-info">
            <img src={product.UrlImagen} alt="No logo" className="producto-imagen" />
        </div>
        <div className="producto-precio-container">
            <p className="producto-precio">{product.moneda} {decimalAdjust("floor", product.precio, -2)}</p>
            <h3 className="producto-nombre">{product.descripcion} {product.unidadMedida}</h3>
        </div>
    </div>
}

export default PublicProduct;
