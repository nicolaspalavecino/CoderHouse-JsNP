class Varita {
    constructor(madera, nucleo, valorFijo) {
        this.madera = parseInt(madera)
        this.nucleo = parseInt(nucleo)
        this.valorFijo = parseFloat(valorFijo)
    }
    prVarita () {
        let resultado = ((this.madera + this.nucleo) * this.valorFijo).toFixed(0)
            return resultado
    }
}

class VaritaDiseñada {
    constructor(dmadera, dnucleo, dvalor) {
        this.dmadera = dmadera
        this.dnucleo = dnucleo
        this.dvalor = parseInt(dvalor)
    }
}