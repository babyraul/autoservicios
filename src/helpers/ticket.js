import { jsPDF } from 'jspdf';
import { Style, Section } from "./clasesImpresion";
import 'jspdf-autotable';

const printBlob = sURL => {
    const oHiddFrame = document.createElement("iframe");
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.visibility = "hidden";
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
    setTimeout(() => document.body.removeChild(oHiddFrame), 60000) // Eliminar `iframe` luego de 1m, para liberar RAM
}


export const printTicket = async (info) => {
    const sessionReq = await fetch(`/api/auth/sesion`)
    const session = await sessionReq.json();

    const mmPageSize = [80, 3276];

    const ptPageSize = mmPageSize.map(coord => coord * 2.83465);
    var doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: ptPageSize
    });

    /** EMPRESA**/
    const EmpresaTittleStyle = new Style(14, "bold", 1, 'center');
    const EmpresaTittleSection = new Section(
        doc,
        4,
        5,
        EmpresaTittleStyle,
        74
    );

    EmpresaTittleSection.write(session.RazonSocial.toUpperCase());

    const HoraStyle = new Style(10, "normal", 1, 'center');
    const HoraSection = new Section(
        doc,
        4,
        EmpresaTittleSection.endY + 3,
        HoraStyle,
        EmpresaTittleSection.width
    );

    const horaCreacion = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    HoraSection.write(`HORA: ${horaCreacion}`);

    const ComprobanteStyle = new Style(10, "bold", 1.3, 'center');
    const ComprobanteSection = new Section(
        doc,
        3,
        HoraSection.endY + 1,  
        ComprobanteStyle,
        EmpresaTittleSection.width,
        null,
        1
    );

    ComprobanteSection.write("TICKET DE VENTA");
    ComprobanteSection.drawBorder(false, true);

    const ComprobanteCodigoStyle = new Style(14, "bold", 1, 'center');
    const ComprobanteCodigoSection = new Section(
        doc,
        4,
        ComprobanteSection.endY + 3.2,
        ComprobanteCodigoStyle,
        ComprobanteSection.width
    );

    ComprobanteCodigoSection.write(`PV-${info.IdPreventa}`);

    const lineStartX = ComprobanteCodigoSection.x;
    const lineEndX = ComprobanteCodigoSection.x + ComprobanteCodigoSection.width;
    const lineY = ComprobanteCodigoSection.endY + 3.2;

    doc.line(lineStartX, lineY, lineEndX, lineY);

    const usuarioStyle = new Style(8, "normal", 1);
    const usuarioSection = new Section(
        doc,
        4,
        ComprobanteSection.endY + 12,
        usuarioStyle,
        ComprobanteSection.width
    );

    usuarioSection.write(`DOC: ${info.NroTipoDocumento}`);
    usuarioSection.write(`CLIENTE: ${info.RazonSocial}`);
    usuarioSection.write(` `);

    doc.autoPrint();
    printBlob(doc.output("bloburl"));
}
