import { useEffect, useState } from "react";
import '../styles/panel4.css';
import logo from '../assets/images/mifacturaperublanco.png';
import PublicTotalViewer from "../components/PublicTotalViewer";
import { useLocation, useNavigate } from "react-router";
import { printTicket } from "../helpers/ticket";

const Completed = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items, totales, alias, docNumber, clientData } = location.state || {};
    const [clientName, setClientName] = useState("");
    const [ticket, setTicket] = useState();

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/autoservicios/"
        }, 30_000);

        return () => clearTimeout(timer);
    }, [navigate])

    useEffect(() => {
        if (!clientData) {
            return;
        }

        if (clientData.IdTipoDocumento == 1) {
            setClientName(`${clientData.PrimerNombre} ${clientData.SegundoNombre} ${clientData.ApellidoPaterno} ${clientData.SegundoNombre}`)
        } else {
            setClientName(`${clientData.RazonSocial}`)
        }
    }, [clientData]);

    useEffect(() => {
        const task = async () => {
            const payload = {
                detalles: items.map((item) => ({
                    IdPresentacion: item.IdPresentacion,
                    IdProducto: item.IdProducto,
                    EsFacturable: item.EsFacturable,
                    ValorUnitario: item.ValorUnitario,
                    Gratuito: item.Gratuito,
                    Descuento: item.Descuento,
                    IdAfectacionIgv: item.IdAfectacionIgv,
                    IdStock: item.IdStock,
                    IdTipoStock: item.IdTipoStock,
                    Precio: item.Precio,
                    TipoCambio: item.TipoCambio,
                    IdAlmacen: item.IdAlmacen,
                    PrecioReferencial: item.PrecioReferencial,
                    PrecioVenta: item.PrecioVenta,
                    Cantidad: item.Cantidad,
                    Total: item.Total,
                })),
                IdTipoDocumentoSunat: 1,
                IdCliente: clientData?.IdCliente,
                Total: totales.totalMonto,
                alias: alias,
            };

            const req = await fetch("/api/pre-invoice/add/v2", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!req.ok) {
                alert("Ocurrió un error al registrar el pedido")

                return;
            }

            const data = await req.json();

            //
            console.log(data)

            setTicket(`PV-${data.IdPreventa}`)
            detallePreventa(data.IdPreventa)
        }

        task()
    }, [])

    const detallePreventa = async (preventa) => {
        const req = await fetch(`/api/gestionpreventas/preventa/${preventa}`)
        const data = await req.json();
        printTicket(data.respuesta[0]);
    }

    return <div>
        <header className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="Mi Factura Perú" className="logo" />
            </div>
        </header>
        <div className='main5'>
            <div className="ticket">
                <div className="titulo">Pase a algunas de nuestras cajas su código de pago es :</div>
                <div className="numero">
                    <h2 className='numero-tickect5'>{ticket}</h2>
                </div>
            </div>
        </div>
        {
            docNumber !== "99999999" && <section className="cliente">
                <h2 className="nombre-left">{ clientName }</h2>
                <h2 className="nombre-right">{ docNumber }</h2>
            </section>
        }
        <footer className="footer5">
            <PublicTotalViewer prev={null} next="/" totales={totales} items={items} useLink={false} buttonText="IMPRIMIR" onClick={() => printTicket({}, )}/>
        </footer>
    </div>
}

export default Completed;
