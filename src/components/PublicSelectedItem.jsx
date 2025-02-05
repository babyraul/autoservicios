import React, { useState } from "react";
import { decimalAdjust } from "../global";
import imenos from "../assets/images/menos.png"
import imas from "../assets/images/mas2.png"


const PublicSelectedItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [observation, setObservation] = useState(item.observacion || "");

    const updateQuantity = (quantity) => {
        if (typeof onUpdateQuantity != "function") {
            return;
        }

        onUpdateQuantity(quantity);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    }

    const handleObservationChange = (e) => {
        setObservation(e.target.value);
    }

    const handleSubmitObservation = () => {
        if (typeof onAddObservation === "function") {
            onAddObservation(item, observation);
        }
        handleCloseModal();
    }


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
            <div className="lista-producto2" onClick={handleOpenModal}>
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content2">
                        <h3>AGREGA UNA OPSERVACION</h3>
                        <textarea
                            value={observation}
                            onChange={handleObservationChange}
                            placeholder="ESCRIBE"
                            rows={4}
                        />
                        <div className="modal-actions">
                            <button className="action-modal2" onClick={handleObservationChange } value={"llevar"}>LLEVAR</button>
                            <button className="action-modal2" onClick={handleSubmitObservation && handleCloseModal}>GUARDAR</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PublicSelectedItem;