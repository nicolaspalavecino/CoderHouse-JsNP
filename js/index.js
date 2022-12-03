// Cards de Materiales
const containerMadera = document.querySelector("#containerMadera")
const containerNucleo = document.querySelector("#containerNucleo")

// Selección de Varita
const valorVarita = document.querySelector("#valorVarita")
const nameMadera = document.querySelector("#nameMadera")
const nameNucleo = document.querySelector("#nameNucleo")
const finVarita = document.querySelector("div.finVarita")

// Interacción con Botón
const btnVarita = document.querySelector("#btn-varita")

// Canasta
const agregar = document.getElementById("agregar")
let canastaDiagon = []
const totalCanasta = document.getElementById("totalCanasta")

// Llamar a localStorage
let llamarStorage = ()=> {
    if (localStorage.length !== 0){
        canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
    }
}
llamarStorage()

// Carga de Cards en Materiales
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
showCards(containerMadera, maderas)
showCards(containerNucleo, nucleos)

// Selección de Materiales
let cargarMadera = ()=> {
    const selectMadera = document.querySelector('input[name="wood"]:checked')
        if (selectMadera == null){
            return alert("Usted no ha seleccionado un tipo de Madera del catálogo.")
        } else if (selectMadera !== null){
            return selectMadera
        }
}

let cargarNucleo = ()=> {
    const selectNucleo = document.querySelector('input[name="nucleus"]:checked')
        if (selectNucleo == null){
            return alert("Usted no ha seleccionado un tipo de Núcleo del catálogo.")
        } else if (selectNucleo !== null){
            return selectNucleo
        }
}

// Alerta de NO selección
const alertSeleccion = document.getElementById('alertSeleccion')

const alert = (message) => {
    alertSeleccion.innerHTML =
            `<div class="alertas">
               <div>${message}</div>
            </div>`
    setTimeout(()=> {
           alertSeleccion.innerHTML = ""     
    }, 3000)
}

// Código random para los productos
let randomCode = ()=>{
    return parseInt(Math.random()*1000000)
}

// Cotización de Varita
let prVarita = () => {
    let resultado = ((parseInt(cargarMadera().value) + parseInt(cargarNucleo().value)) * valorFijo).toFixed(0)
        return resultado
}

// Verificar Carga de Datos
let cargarDatos = (madera, nucleo)=> {
    if (madera > 0 && nucleo > 0){
        return true
    } else {
        return false
    }
}

// Instanciar Cotización de Varita
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

// Presupuesto Varita ("Diseñar varita") // Función gatillada por BtnVarita
let presupuestoVarita = ()=> {
    if (cargarDatos(cargarMadera().value, cargarNucleo().value)){
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
        }, 5000)
    } else {
        alert("Por favor, complete todos los datos necesarios.")
    }
}
btnVarita.addEventListener("click", presupuestoVarita)

// Añadir producto al carrito // Movido hacia arriba (antes estaba abajo )
let plusVarita = ()=> {
    canastaDiagon.push(presupuesto())
    localStorage.setItem("Canasta-Diagon", JSON.stringify(canastaDiagon))
    canastaHTML()
    buttonDelete()
    alertaCanasta(cargarMadera().id, cargarNucleo().id)
}

// Alerta de adición del producto al carrito
let alertaCanasta = (cmadera, cnucleo)=> {
    Swal.fire({
        width: 300,
        position: 'center',
        imageUrl: '../img/Botones/LogoCanasta.png',
        imageHeight: 100,
        text: 'La varita de ' + cmadera + ' y ' + cnucleo + ' fue añadida a su canasta.',
        color: '#a98754',
        showConfirmButton: false,
        background: '#291024',
        timer: 1800
      })
}

// Suma del Total del Carrito
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

// Producto final y Carrito
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
        })
        tbody.innerHTML = tablaHTML
        totalCanasta.innerHTML = `<p>Total a pagar: $${sumaCanasta()}</p>`
        btnEliminar = document.querySelectorAll("button.quitar.quitar2")
    }
}
canastaHTML() // Ejecutando esta función se recupera lo del localStorage y se muestra en la tabla al recargar la página.

// Botones ELIMINAR del carrito 
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
