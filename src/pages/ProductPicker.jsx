import { useState, useEffect } from 'react';
import '../styles/panel1.css';
import logo from '../assets/images/mifacturaperublanco.png';
import PublicProductPicker from '../components/PublicProductPicker';
import PublicProductsSummary from '../components/PublicProductsSummary';
import PublicTotalViewer from '../components/PublicTotalViewer';
import { calcTotal, calcularTotales } from '../global';
import { isNumber } from 'lodash';
import { FindPrecioEspecial, FindPrecioFamiliar, FindPrecioMenor, FindPrecioPorMayor, GetPrecioCosto, getPrecioPorMayor } from '../helpers/preciosPreventa';
import { useLocation, useNavigate  } from 'react-router-dom';

const ProductPicker = () => {
    const [items, setItems] = useState([]);
    const [totales, setTotales] = useState({});
    const [alias, setAlias] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const navigate = useNavigate();
    const location = useLocation();

    const removeItem = (product) => {
        const filteredItems = items.filter((item) => item.IdPresentacion !== product.IdPresentacion);
        setItems(filteredItems);
    };

    useEffect(() => {
        const { items, totales } = location.state || {};

        if (Array.isArray(items) && !!totales) {
            setItems(items);
            setTotales(totales);
        }
    }, [location.state]);

    useEffect(() => {
        const _calculated = calcularTotales(items);
        setTotales({
            Gravado: _calculated.gravados,
            Inafecto: _calculated.inafectos,
            Exonerado: _calculated.exonerados,
            IGVPreventa: _calculated.gravados * 0.18,
            Gratuitas: _calculated.gratuitos,
            totalMonto: _calculated.total,
            ICBPERPreventa: _calculated.icbper,
            redondeo: _calculated.redondeo,
        });
    }, [items]);

    const onChooseProduct = (product) => {
        let currentItems = [...items];
        const productPosition = currentItems.indexOfObject(product, "IdPresentacion");

        let descuentoPersonal = 0;

        if (productPosition !== -1) {
            currentItems[productPosition].Cantidad++;
            FindPrecioPorMayor([], currentItems[productPosition]);
            currentItems[productPosition].Total = calcTotal(currentItems[productPosition]) - currentItems[productPosition].Descuento;
        } else {
            FindPrecioPorMayor([], product);
            product.Descuento = product.Descuento + descuentoPersonal;

            currentItems.push({
                ...product,
                Cantidad: 1,
                PrecioVenta: product.PrecioVenta,
                Total: product.PrecioVenta,
                PrecioEspecial: FindPrecioEspecial([], product),
                PrecioFamiliar: FindPrecioFamiliar([], product),
                PrecioCosto: GetPrecioCosto([], product),
                PrecioMenor: FindPrecioMenor([], product),
                precioMayor: getPrecioPorMayor([], product),
                checked: isNumber(product.checked) ? product.checked : 0,
                oldPrecios: [product.PrecioVenta],
                initialAfectGrat: product.IdAfectacionIgv,
                oldCants: [1],
                NombreProducto: product.descripcion,
                Descuento: 0
            });
        }

        setItems([...currentItems]);
    };

    const onUpdateQuantity = (index, value) => {
        const currentItems = [...items];
        currentItems[index].Cantidad = Number(value);
        currentItems[index].Total = calcTotal(currentItems[index]) - currentItems[index].Descuento;
        setItems([...currentItems]);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleContinue = () => {
        setIsModalOpen(false);
        navigate('/cliente');
    }

    return (
        <>
            <div className="navbar2">
                <div className="navbar-left2">
                    <img src={logo} alt="Mi Factura Perú" className="logo" />
                </div>
            </div>
            <div className="content6">
                <div className="section-left2">
                    <PublicProductPicker onChooseProduct={onChooseProduct} onRemoveItem={removeItem} onUpdateAlias={a => setAlias(a)} />
                </div>

                <div className="section-right2">
                    <PublicProductsSummary items={items} onUpdateQuantity={onUpdateQuantity} onRemoveItem={removeItem} />
                </div>
                <button type='button' onClick={handleOpenModal} >ver modal</button>
            </div>
            <footer className="footer2">
                <PublicTotalViewer
                    prev="/"
                    next="/cliente"
                    totales={totales}
                    items={items}
                    alias={alias}
                    buttonText="CONTINUAR"
                    onClick={handleOpenModal}
                />
            </footer>

            {isModalOpen && (
                <div className="modal-confirm">
                    <div className="modal-contenido">
                        <h3 className='title-modal'>Resumen de Productos Seleccionados</h3>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.NombreProducto}</strong>
                                    <p>Cantidad: <strong>{item.Cantidad}</strong></p>
                                    <p>Precio Unitario: <strong>S/ {item.PrecioVenta}</strong></p>
                                    <p>Total: <strong>S/ {item.Total}</strong></p>
                                    <p>Observación: <strong>{item.observacion}</strong></p>
                                </li>
                            ))}
                        </ul>
                        <div className="modal-acciones">
                            <button onClick={handleCloseModal}>CANCELAR</button>
                            <button onClick={handleContinue}>CONFIRMAR</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default ProductPicker;
