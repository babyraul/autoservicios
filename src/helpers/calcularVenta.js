import {
    decimalAdjust,
    ICBPER as TasaICBPERGlobal,
    IGV as TasaIGVGlobal,
    IVAP as TasaIVAPGlobal,
    TRIBUTO
} from "../global";


export function setPreciosYDescuento(item, TasaIGV = TasaIGVGlobal, TasaICBPER = TasaICBPERGlobal, TasaIVAP = TasaIVAPGlobal) {
    let Tributos = String(item.Tributos);

    const {
        ValorUnitario,
        DescuentoSI,
        TasaISC,
    } = item;

    const PrecioConISC = Tributos.includes(TRIBUTO.ISC)
        ? ValorUnitario * (1 + TasaISC)
        : ValorUnitario

    const PrecioConIGV = Tributos.includes(TRIBUTO.IGV)
        ? PrecioConISC * (1 + TasaIGV)
        : PrecioConISC

    const PrecioConIVAP = Tributos.includes(TRIBUTO.IVAP)
        ? PrecioConIGV * (1 + TasaIVAP)
        : PrecioConIGV

    const PrecioVenta = Tributos.includes(TRIBUTO.ICBPER)
        ? PrecioConIVAP + TasaICBPER
        : PrecioConIVAP

    const Descuento = DescuentoSI
        * (Tributos.includes(TRIBUTO.ISC) ? (1 + TasaISC) : 1)
        * (Tributos.includes(TRIBUTO.IGV) ? (1 + TasaIGV) : 1)
        * (Tributos.includes(TRIBUTO.IVAP) ? (1 + TasaIVAP) : 1)

    return {
        ...item,
        PrecioConISC,
        PrecioConIGV,
        PrecioConIVAP,
        PrecioVenta,
        Descuento,
    }
}