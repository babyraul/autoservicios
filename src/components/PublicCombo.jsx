import { decimalAdjust } from '../global';
import '../styles/panel1.css';

const PublicCombo = ({ combo, onChooseCombo }) => {
    return <div className="producto" onClick={() => onChooseCombo(combo.Detalles)}>
        <div className="producto-info">
            <img src={combo.UrlImagen} alt="No logo" className="producto-imagen" />
        </div>
        <div className="producto-precio-container">
            <p className="producto-precio">{combo.Moneda} {decimalAdjust("floor", combo.Precio, -2)}</p>
            <h3 className="producto-nombre">
                {combo.Nombre}
            </h3>
        </div>
    </div>
}

export default PublicCombo;
