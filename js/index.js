const containerMadera = document.querySelector("#containerMadera")
const containerNucleo = document.querySelector("#containerNucleo")
const valorVarita = document.querySelector("#valorVarita")
const finVarita = document.querySelector("div.finVarita")
const alertSeleccion = document.getElementById('alertSeleccion')
const valorFijo = 1.25
const btnVarita = document.querySelector("#btn-varita")
const agregar = document.getElementById("agregar")
const canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon")) || []
const totalCanasta = document.getElementById("totalCanasta")
let buy = document.querySelector("#buy")
const URLmaderas = "./Json/maderas.json"
const URLnucleos = "./Json/nucleos.json"
const maderas = []
const nucleos = []

fetch(URLmaderas)
    .then((response)=> data = response.json())
    .then((data)=> maderas.push(...data))
    .then(()=> showCards(containerMadera, maderas))

fetch(URLnucleos)
    .then((response)=> data = response.json())
    .then((data)=> nucleos.push(...data))
    .then(()=> showCards(containerNucleo, nucleos))

let showCards = (contenido, array)=> {
    if (array.length > 0) {
        array.forEach(elemento => {
            contenido.innerHTML +=
            `<label>
            <input type="radio" name="${elemento.grupo}" value="${elemento.valor}" id="${elemento.nombre}" class="inn" />
            <div class="tarjeta" id="tarjeta${elemento.id}">
                <div>
                    <img src="${elemento.imagen}">
                </div>
                <h4>${elemento.nombre}</h4>
                <p class="costo">$${elemento.valor}</p>
                <p class="descripcion">${elemento.descript}</p>
            </div>
            </label>`
            }
        )
    }
}

let cargarMadera = ()=> {
    const selectMadera = document.querySelector('input[name="wood"]:checked')
        if (selectMadera == null){
            alert("No se ha seleccionado un tipo de Madera del catálogo.")
            return selectMadera     
        } else if (selectMadera !== null){
            return selectMadera
        }
}

let cargarNucleo = ()=> {
    const selectNucleo = document.querySelector('input[name="nucleus"]:checked')
        if (selectNucleo == null){
            alert("No se ha seleccionado un tipo de Núcleo del catálogo.")
            return selectNucleo
        } else if (selectNucleo !== null){
            return selectNucleo
        }
}

let alert = (message) => {
    alertSeleccion.innerHTML =
            `<div class="alertas">
                <p>${message}</p>
                <p>Por favor, vuelva a intentarlo.</p>
            </div>`
    setTimeout(()=> {
           alertSeleccion.innerHTML = ""     
    }, 3000)
}

let randomCode = ()=>{
    return parseInt(Math.random()*1000000)
}

let prVarita = () => {
    let resultado = ((parseInt(cargarMadera().value) + parseInt(cargarNucleo().value)) * valorFijo).toFixed(0)
        return resultado
}

let presupuesto = ()=> {
    let wand = new Varitas(cargarMadera().id, cargarMadera().value, cargarNucleo().id, cargarNucleo().value, randomCode(), prVarita())
        finVarita.innerHTML =
        `<div class="alertas">
            <p>El valor de su varita de <span class="resalt">${wand.madera}</span> y <span class="resalt">${wand.nucleo}</span> es: </p>
            <p class="resalt">$${wand.valor}</span></p>
        </div>`
        alertSeleccion.innerHTML = ""
        return wand
}

let presupuestoVarita = ()=> {
    if (cargarMadera() && cargarNucleo()) {
        btnVarita.innerHTML = `<img src="./img/caldero-loading.gif">`
        setTimeout(()=>  {
            presupuesto()
            btnVarita.innerHTML = `<img src="./img/Botones/LogoVarita.png">`
            agregar.innerHTML =
            `<button class="btn-addcanasta" id="addVarita">
                <div>
                    <img src="./img/Botones/btnbg.png">
                    <p>+ CANASTA</p>
                </div>
            </button>`
            let addwand = document.getElementById("addVarita")
            addwand.addEventListener("click", plusVarita)
        }, 3500)
    }
}
btnVarita.addEventListener("click", presupuestoVarita)

let plusVarita = ()=> {
    canastaDiagon.push(presupuesto())
    localStorage.setItem("Canasta-Diagon", JSON.stringify(canastaDiagon))
    canastaHTML()
    buttonDelete()
    alertaCanasta(cargarMadera().id, cargarNucleo().id)
}

let alertaCanasta = (cmadera, cnucleo)=> {
    Swal.fire({
        imageUrl: '../img/Botones/LogoCanasta.png',
        text: 'La varita de ' + cmadera + ' y ' + cnucleo + ' fue añadida a su canasta.',
        showConfirmButton: false,
      })
}

let sumaCanasta = ()=> {
    let canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
    let sumaTotal = 0
    if (canastaDiagon.length > 0) { 
        canastaDiagon.forEach(v => {
            sumaTotal += v.valor
        })
    return sumaTotal
    }
}

let btnEliminar = document.querySelectorAll("button.quitar.quitar2")

let comprar = () => {
    if (canastaDiagon.length > 0){
        Swal.fire({
            customClass: {popup:"forms"},
            imageUrl: '../img/gringotts.png',
            title: 'Total a pagar: $' + sumaCanasta(),
            html:
            '<p>Complete los siguientes datos para finalizar:</p>' +
            '<input placeholder="Nombre" id="swal-input1" class="swal2-input">' +
            '<input placeholder="Apellido" id="swal-input2" class="swal2-input">' +
            '<input placeholder="Email" id="swal-input3" class="swal2-input">' +
            '<input placeholder="Telefono" id="swal-input4" class="swal2-input">' +
            '<input placeholder="Dirección" id="swal-input5" class="swal2-input">' +
            '<input placeholder="Código postal" id="swal-input6" class="swal2-input">' +
            '<select id="swal-input7" class="swal2-input">' +
                '<option value="" hidden>Medio de pago</option>' +
                '<option value="credito">Tarjeta de crédito</option>' +
                '<option value="debito">Tarjeta de débito</option>' +
                '<option value="efectivo">Pago en efectivo</option>' +
            '</select>',
            showConfirmButton: true,
            confirmButtonText: "Confirmar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }) .then ((result)=>{       
            if (result.isConfirmed) {
                let nombre = document.getElementById('swal-input1').value.trim().toUpperCase()
                let apellido = document.getElementById('swal-input2').value.trim().toUpperCase()
                let mail = document.getElementById('swal-input3').value.trim()
                let telefono = document.getElementById('swal-input4').value.trim()
                let direccion = document.getElementById('swal-input5').value.trim()
                let codigoPostal = document.getElementById('swal-input6').value.trim()
                let medioPago = document.getElementById('swal-input7').value
                if (nombre === "" || apellido === "" || mail === "" || telefono === "" || direccion === "" || codigoPostal === "" || medioPago === "") {
                    Swal.fire({
                        imageUrl: '../img/LogoCruz.gif',
                        text: 'Por favor, rellene todos los campos.',
                        showConfirmButton: false,
                    })
                    setTimeout( () => {
                        comprar()
                        return
                    },3000)
                } else {
                    let compra = [nombre, apellido, mail, telefono, direccion, codigoPostal, medioPago]
                    localStorage.setItem(nombre, JSON.stringify(compra))
                    Swal.fire({
                        imageUrl: '../img/LogoCheck.gif',
                        text: ' Su pedido está en camino ¡Gracias por comprar en nuestra Tienda!',
                        showConfirmButton: false,
                    })
                    setTimeout( ()=> {
                        localStorage.clear("Canasta Diagon")
                        location.reload()
                    },6500)
                }
            } else if (result.isDismissed) {
                Swal.fire({
                    imageUrl: '../img/LogoAlert.gif',
                    text: 'La operación fue cancelada',
                    showConfirmButton: false,
                })
            }
        });
    }
}

let canastaHTML = ()=> {
    if (canastaDiagon.length > 0){
        let tablaHTML = ""
        const tbody = document.querySelector("tbody")
        let canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
        canastaDiagon.forEach(v => {
            tablaHTML +=
            `<tr>
                <td>Varita de ${v.madera} y ${v.nucleo}</td>
                <td>$${v.valor}</td>
                <td class="del"><button class="quitar quitar2" id="${v.id}"> X </button></td>
            </tr>`
            buy.innerHTML = 
            `<button class="btn-addcanasta" id="btnComprar">
                <div>
                    <img src="./img/Botones/btnbg.png">
                    <p>COMPRAR</p>
                </div>
            </button>`
            let btnComprar = document.getElementById("btnComprar")
            btnComprar.addEventListener("click", comprar)
        })
        tbody.innerHTML = tablaHTML
        totalCanasta.innerHTML = `<p>Total a pagar: $${sumaCanasta()}</p>`
        btnEliminar = document.querySelectorAll("button.quitar.quitar2")
    }
}
canastaHTML() 

let buttonDelete = ()=> {
    btnEliminar.forEach(btn => {
        btn.addEventListener("click", ()=>{
            let encontrado = canastaDiagon.findIndex(diseño => diseño.id === parseInt(btn.id))
            canastaDiagon.splice(encontrado,1)
            localStorage.setItem("Canasta-Diagon", JSON.stringify(canastaDiagon))
            canastaHTML()
            location.reload()
        })
    })
}
buttonDelete()


