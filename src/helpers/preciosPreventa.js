import {PRECIO_MENOR, PRECIO_ESPECIAL, PRECIO_FAMILIAR, PRECIO_COSTO, PRECIO_MAYOR} from "../global"

export function FindPrecioMenor(listaProducto, item) {
    const findItemPrecioMenor = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_MENOR)
    })
    if (findItemPrecioMenor && findItemPrecioMenor.Precio) {
        return (findItemPrecioMenor.Precio)
    } else {
        return 0
    }
}

export function FindPrecioUnitario(prods, item, precioSelected) {
    let findItemPrecioUnitario = 0
    let precios = item.precios;

    switch (precioSelected) {
        case "Menor/Lista":
            findItemPrecioUnitario = precios.find(findItem => {
                return (findItem.IdPrecioPlantilla === PRECIO_MENOR)
            })
            if (findItemPrecioUnitario && findItemPrecioUnitario.Precio) {
                return (findItemPrecioUnitario.Precio)
            } else {
                return 0
            }
        case "Familiar":
            findItemPrecioUnitario = precios.find(findItem => {
                return (findItem.IdPrecioPlantilla === PRECIO_FAMILIAR)
            })
            if (findItemPrecioUnitario && findItemPrecioUnitario.Precio) {
                return (findItemPrecioUnitario.Precio)
            } else {
                return 0
            }
        case "Especial":
            findItemPrecioUnitario = precios.find(findItem => {
                return (findItem.IdPrecioPlantilla === PRECIO_ESPECIAL)
            })
            if (findItemPrecioUnitario && findItemPrecioUnitario.Precio) {
                return (findItemPrecioUnitario.Precio)
            } else {
                return 0
            }
        case "Mayor": {
            findItemPrecioUnitario = precios.find(findItem => {
                return (findItem.IdPrecioPlantilla === PRECIO_MAYOR)
            })
            if (findItemPrecioUnitario && findItemPrecioUnitario.Precio) {
                return (findItemPrecioUnitario.Precio)
            } else {
                return 0
            }
        }
    }

    return (findItemPrecioUnitario)

}

export function FindPrecioEspecial(listaProducto, item) {
    const findItemPrecioEspecial = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_ESPECIAL)
    })
    if (findItemPrecioEspecial && findItemPrecioEspecial.Precio) {
        return (findItemPrecioEspecial.Precio)
    } else {
        return 0
    }
}

export function FindPrecioFamiliar(listaProducto, item) {
    const findItemPrecioFamiliar = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_FAMILIAR)
    })
    if (findItemPrecioFamiliar && findItemPrecioFamiliar.Precio) {
        return (findItemPrecioFamiliar.Precio)
    } else {
        return 0
    }
}

export function GetPrecioCosto(listaProducto, item) {
    const findItemPrecioCosto = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_COSTO)
    })
    if (findItemPrecioCosto && findItemPrecioCosto.Precio) {
        return (findItemPrecioCosto.Precio)
    } else {
        return 0
    }
}

export function FindPrecioPorMayor(listaProducto, item) {
    const precioMenor = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_MENOR)
    })
    const precioMayor = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_MAYOR)
    })

    if (item.Cantidad >= precioMayor.CantidadPrecio && precioMayor.CantidadPrecio !== 0) {
        item.Precio = Number(Number(precioMayor.Precio).toFixed(6))
        item.precio = Number(Number(precioMayor.Precio).toFixed(6))
        item.PrecioVenta = Number(Number(precioMayor.Precio).toFixed(6))
        item.precioVenta = Number(Number(precioMayor.Precio).toFixed(6))
        item.ValorUnitario = precioMayor.ValorUnitario
        item.valorUnitario = precioMayor.ValorUnitario
    } else {
        item.Precio = Number(Number(precioMenor.Precio).toFixed(6))
        item.precio = Number(Number(precioMenor.Precio).toFixed(6))
        item.PrecioVenta = Number(Number(precioMenor.Precio).toFixed(6))
        item.precioVenta = Number(Number(precioMenor.Precio).toFixed(6))
        item.ValorUnitario = precioMenor.ValorUnitario
        item.valorUnitario = precioMenor.ValorUnitario
    }
}


export function getPrecioPorMayor(listaProducto, item) {
    const precioMayor = item.precios.find(findItem => {
        return (findItem.IdPrecioPlantilla === PRECIO_MAYOR)
    })
    if (precioMayor && precioMayor.Precio) {
        return (precioMayor.Precio)
    } else {
        return 0
    }
}
