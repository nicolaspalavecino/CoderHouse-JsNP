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

let randomCode = ()=>{
    return parseInt(Math.random()*1000000)
}

class VaritaDiseñada {
    constructor(dmadera, dnucleo, dvalor, id) {
        this.dmadera = dmadera
        this.dnucleo = dnucleo
        this.dvalor = parseInt(dvalor)
        this.id = id
    }
}