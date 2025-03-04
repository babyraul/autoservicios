import { useEffect, useState } from "react";
import '../styles/panel2.css';
import logo from '../assets/images/mifacturaperublanco.png';
import imgScan from '../assets/images/img_scan_dni.png';
import { Link, useLocation } from 'react-router-dom';


const IdentifyClient = () => {
    const location = useLocation();
    const { items, totales, alias } = location.state || {};
    const [docType, setDocType] = useState("1");
    const [docNumber, setDocNumber] = useState("99999999")
    const [clientData, setClientData] = useState(null);
    const [clientName, setClientName] = useState("");

    useEffect(() => {
        if (typeof docNumber !== 'string') {
            return;
        }
        
        if (docNumber.length === 8 && /^\d{8}$/.test(docNumber)) {
            setDocType("1");
            return;
        }
        
        if (docNumber.length === 11 && /^(10|20)\d{9}$/.test(docNumber)) {
            setDocType("6");
            return;
        }
        
        setDocType("1");
    }, [docNumber])

    useEffect(() => {
        const fetchDefaultClient = async () => {
            const client = await fetchClient();
            setClientData(client);
        }

        fetchDefaultClient()
    }, [])

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
        if (docNumber.length < 8) {
            return;
        }

        if (docNumber.length == 8 && (docNumber.startsWith('20') || docNumber.startsWith('10'))) {
            return;
        }

        const search = async () => {
            let client = null;

            if (docType == "1" && docNumber.length == 8) {
                client = await fetchClient();
            } else if (docType == "6" && docNumber.length == 11) {
                client = await fetchClient();
            }

            if (client == null) {
                const newClient = await fetchFromSource();

                let apPaterno = "", apMaterno = "", primerNombre = "", segundoNombre = "";

                if (newClient.name.includes(", ")) {
                    const [apellidos, nombres] = newClient.name.split(", ")
                    
                    const apellidoSpaceIndex = apellidos.indexOf(" ")
                    apPaterno = apellidos.substring(0, apellidoSpaceIndex)
                    apMaterno = apellidos.substring(apellidoSpaceIndex + 1, apellidos.length)

                    const nombresSpaceIndex = nombres.indexOf(" ")
                    primerNombre = nombres.substring(0, nombresSpaceIndex)
                    segundoNombre = nombres.substring(nombresSpaceIndex + 1, nombres.length)
                }

                await registerClient({
                    "IdCliente": "1",
                    "IdTipoCliente": "1",
                    "IdTipoPersona": docNumber.length === 11 && docNumber.startsWith("20") ? "2" : "1",
                    "IdTipoDocumento": docType,
                    "NroTipoDocumento": docNumber,
                    "RazonSocial": docNumber.length === 11 ? newClient.name : "",
                    "NombreComercial": docNumber.length === 11 ? newClient.name : "",
                    "ApellidoPaterno": apPaterno,
                    "ApellidoMaterno": apMaterno,
                    "PrimerNombre": primerNombre,
                    "SegundoNombre": segundoNombre,
                    "Ubigeo": newClient.ubigeo,
                    "Direccion": newClient.address,
                    "Telefono": "",
                    "Celular": "",
                    "CorreoElectronico": "",
                    "PersonaContacto": "",
                    "BuenContribuyente": "No",
                    "AgentePercepcion": "No",
                    "AgenteRetencion": "No",
                    "Prico": "No",
                    "DAOT": "No",
                    "CIIU": null,
                    "IdTipoMoneda": null,
                    "LineaCredito": null,
                    "FormaPago": null,
                    "EstadoSunat": newClient.status === 'ACTIVO' ? 'Activo' : null,
                    "Situacion": newClient.condition === 'HABIDO' ? 'Habido' : null,
                    "IdEmpresa": 1,
                    "Estado": "Activo",
                    "Zona": "",
                    "Descuento": "0"
                });

                client = await fetchClient();
            }

            if (!client) {
                return;
            }

            setClientData(client)
        }

        search();
    }, [docNumber, docType])

    const registerClient = async (client) => {
        try {
            const req = await fetch("/api/clientes", {
                method: "POST",
                body: JSON.stringify(client),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!req.ok) {
                throw new Error(await req.text())
            }
        } catch (e) {
            console.error(e)
        }
    }

    const fetchFromSource = async () => {
        try {

            const docTypeMap = {
                "1": "DNI",
                "6": "RUC"
            }

            const req = await fetch(`https://prorucdni.mifacturaperu.com/documentos/buscar/${docTypeMap[docType]}/${docNumber}`, {
                headers: {
                    "Authorization": `Bearer 60e5b0d7bd24e8fa2dcefa1bf3550f6b020c0948`
                }
            });

            if (!req.ok) {
                throw new Error(await req.text())
            }

            const data = await req.json();

            return data;
        } catch (e) {
            console.error(e)
        }
    }

    const fetchClient = async () => {
        try {
            const req = await fetch(`/api/preVentas/traerCliente/${docNumber}`);

            if (!req.ok) {
                throw new Error(await req.text())
            }

            const data = await req.json();

            if (!Array.isArray(data)) {
                throw new Error("Se esperaba una respuesta distinta")
            }

            if (data.length === 0) {
                throw new Error("No se han encontrado resultados")
            }

            return data[0]
        } catch (e) {
            console.error(e)
        }

        return null;
    }

    const onChangeDocType = (event) => {
        setDocType(event.target.value);
    };

    const addNumber = (number) => {
        setDocNumber(docNumber + number)
        setClientData(null)
    };
    
    const removeAll = () => {
        setDocNumber("")
        setClientData(null)
    };

    return <>
        <div>
            <header className="navbar">
                <div className="navbar-left">
                <img src={logo} alt="Mi Factura Perú" className="logo" />
                </div>
            </header>
            <main>
                <div className="identification-form">
                    <label>
                        <input
                            type="radio"
                            value="1"
                            checked={docType == "1"}
                            onChange={onChangeDocType}
                        />
                        DNI
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="6"
                            checked={docType == "6"}
                            onChange={onChangeDocType}
                        />
                        RUC
                    </label>
                </div>

                <input
                    className="id-number"
                    type="text"                    
                    value={docNumber}
                    placeholder="NUMERO DOCUMENTO"
                    required
                    readOnly
                    autoFocus
                />
                
                <Link
                    to="/checkout"
                    className="omitir"
                    state={{ items, totales, docType, docNumber }}
                >
                    OMITIR ESTE PASO
                </Link>
            
                
                <div className="teclado-numerico-container">
                    <div className="teclado-numerico">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''].map((num, index) => (
                        <button key={index} type="button" onClick={() => addNumber(num.toString())}>
                            {num}
                        </button>
                        ))}
                    </div>
                    <div className="acciones">
                        <button type="button" onClick={removeAll}>Limpiar</button>
                    </div>
                </div>
            </main>
            <footer className="footer3">
                <Link to="/productos" className="btn-back3" state={{ items, totales, clientData }}>ATRAS</Link>
                { (docNumber.length == 8 || docNumber.length == 11) && !!clientData &&<>
                    <div className="cliente3">
                        <h2><span className="static-text">Cliente:</span> { clientName }</h2>
                        <h2><span className="static-text">Nº Documento:</span> { docNumber }</h2>
                    </div>
                    <Link
                        to="/checkout"
                        className="btn-continue3"
                        state={{ items, totales, alias, docType, docNumber, clientData, }}
                    >
                        CONTINUAR
                    </Link> 
                </> }
            </footer>
        </div>
    </>
}

export default IdentifyClient;
