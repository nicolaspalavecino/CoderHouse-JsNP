// Mostrar Cards de Materiales
const containerMadera = document.querySelector("#containerMadera")
const containerNucleo = document.querySelector("#containerNucleo")

let showCards = (contenido, array)=> {
    if (array.length > 0) {
        array.forEach(elemento => {
            contenido.innerHTML +=
            `<label>
            <input type="radio" name="${elemento.grupo}" value="${elemento.valor}" id="${elemento.nombre}" class="inn" />
            <div class="tarjeta" id="tarjeta${elemento.id}">
                <div class="componente">
                    <img src="${elemento.imagen}">
                </div>
                <h4>${elemento.nombre}</h4>
                <p class="costo">$${elemento.valor}</p>
                <div class="desc">
                    <p class="descripcion">${elemento.descript}</p>
                </div>
            </div>
            </label>`
            }
        )
    }
}
showCards(containerMadera, maderas)
showCards(containerNucleo, nucleos)

// const btnVarita = document.querySelector("#btn-varita")
const valorVarita = document.querySelector("#valorVarita")
const nameMadera = document.querySelector("#nameMadera")
const nameNucleo = document.querySelector("#nameNucleo")
const finVarita = document.querySelector("div.finVarita")

const agregar = document.getElementById("agregar")


// Selección de Materiales - OPCIÓN 1 
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
    let wand = new Varita(cargarMadera().value, cargarNucleo().value, valorFijo)
        finVarita.innerHTML =             
        `<div class="alertas">
            <p>El valor de su varita de <span class="resalt">${cargarMadera().id}</span> y <span class="resalt">${cargarNucleo().id}</span> es: </p>
            <p class="resalt">$${wand.prVarita()}</span></p>
        </div>`
        alertSeleccion.innerHTML = ""
}

// Presupuesto Varita ("Diseñar varita")
let presupuestoVarita = ()=> {
    if (cargarDatos(cargarMadera().value, cargarNucleo().value)){
        presupuesto()
        agregar.innerHTML = 
        `<button class="btn-addcanasta" id="addVarita">
            <div>
                <img src="./img/Botones/btnbg.png">
                <p>+ CANASTA</p>
            </div> 
        </button>`
        let addwand = document.getElementById("addVarita")
        addwand.addEventListener("click", plusVarita)
    } else {
        alert("Por favor, complete todos los datos necesarios.")
    }
}

// dom boton agegar


// Interacción con Botón
const btnVarita = document.querySelector("#btn-varita")
btnVarita.addEventListener("click", presupuestoVarita)

// Producto final y Carrito
const canastaDiagon = []
let plusVarita = ()=> {
    let valorFinal = (parseInt(cargarMadera().value)+(parseInt(cargarNucleo().value)))*valorFijo
    let dvarita = new VaritaDiseñada(cargarMadera().id, cargarNucleo().id, valorFinal)
    canastaDiagon.push(dvarita)
    //
    localStorage.setItem("Canasta Diagon", JSON.stringify(canastaDiagon))
    console.clear
    console.table(canastaDiagon)
    canastaHTML()
}

// let addwand = document.getElementById("addVarita")
// addwand.addEventListener("click", plusVarita) // plusVarita() -> Ejecuta directamente la función (???)

// Ingresar Producto al Carrito del HTML
// let tablaCarrito = (v)=> {
// return      `<tr>
//                 <td>Varita de ${v.dmadera} y ${v.dnucleo} </td>
//                 <td>$${v.dvalor}</td>
//                 <td><button class="quitar" id="${v.dmadera}-${v.dnucleo}"> X </button></td>
//             </tr>`
//             let btneliminar = document.getElementById(`${v.dmadera}-${v.dnucleo}`)
//             btnDelete.push(btneliminar)
//             btneliminar.addEventListener("click", deleteCanasta)
// }


let canastaHTML = ()=> {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const canastaDiagon = JSON.parse(localStorage.getItem("Canasta Diagon"))
    if (canastaDiagon.length > 0) {
        canastaDiagon.forEach(v => {
            // tablaHTML += tablaCarrito(v)
            tablaHTML +=
            `<tr>
                <td>Varita de ${v.dmadera} y ${v.dnucleo} </td>
                <td>$${v.dvalor}</td>
                <td class="del"><button class="quitar quitar2" id="${v.dmadera}-${v.dnucleo}"> X </button></td>
            </tr>`   
        })
        tbody.innerHTML = tablaHTML
        let btneliminar = document.querySelectorAll("button.quitar.quitar2")
        console.table(btneliminar)
        // debugger
        btneliminar.forEach(btn => {
            btn.addEventListener("click", deleteCanasta)
            let btnx = btnDelete.some(x => x.id === btn.id)
            if (btnx === false){
                btnDelete.push(btn)
            }
        })
    totalCanasta.innerHTML = `<p>Total a pagar: $${sumaCanasta()}</p>`
    }
} // Funciona bien


// Suma del Total del Carrito
const totalCanasta = document.getElementById("totalCanasta")

let sumaCanasta = ()=> {
    let sumaTotal = 0
    if (canastaDiagon.length > 0) {
        canastaDiagon.forEach(v => {
            sumaTotal += v.dvalor 
        })
    return sumaTotal
    }
}


// Quitar Productos del Carrito

// const botonQuitar = document.querySelector("button.quitar")
// const botonQuitar = document.querySelector('input[name="quitar"]:checked')
// botonQuitar.addEventListener("click", deleteCanasta)

const btnDelete = []

let deleteCanasta = ()=> {
    debugger
    btnDelete.forEach(btn => { 
        btn.addEventListener("click", ()=> {
        //     let indicex = canastaDiagon.findIndex((y)=> y.id === btn.id) // Asignarle al indicex el valor del index del y cuyo id coincida con eliminado.
        //     canastaDiagon.splice(indicex,1)
        console.log(btn.id)
        })
    })
}
