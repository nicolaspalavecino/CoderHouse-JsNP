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
const canastaDiagon = []
const btnDelete = []
const totalCanasta = document.getElementById("totalCanasta")

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

// Añadir producto al carrito // Movido hacia arriba (antes estaba abajo)
let plusVarita = ()=> {
    let valorFinal = (parseInt(cargarMadera().value)+(parseInt(cargarNucleo().value)))*valorFijo
    let dvarita = new VaritaDiseñada(cargarMadera().id, cargarNucleo().id, valorFinal)
    canastaDiagon.push(dvarita)
    localStorage.setItem("Canasta-Diagon", JSON.stringify(canastaDiagon))
    canastaHTML()
    alertaCanasta(cargarMadera().id, cargarNucleo().id)
}

// Presupuesto Varita ("Diseñar varita") // Función gatillada por BtnVarita
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
btnVarita.addEventListener("click", presupuestoVarita)

// let recuperarCanasta = ()=> {
//     if (canastaDiagon === null) {
//         localStorage.setItem("Canasta-Diagon", "")        
//         canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
//     }
// }
// recuperarCanasta()

// Suma del Total del Carrito
let sumaCanasta = ()=> {
    const canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
    let sumaTotal = 0
    if (canastaDiagon.length > 0) {
        canastaDiagon.forEach(v => {
            sumaTotal += v.dvalor 
        })
    return sumaTotal
    }
}

// Producto final y Carrito
let canastaHTML = ()=> {
    let tablaHTML = ""
    const tbody = document.querySelector("tbody")
    const canastaDiagon = JSON.parse(localStorage.getItem("Canasta-Diagon"))
    if (canastaDiagon.length > 0) {
        canastaDiagon.forEach(v => {
            tablaHTML +=
            `<tr>
                <td>Varita de ${v.dmadera} y ${v.dnucleo} </td>
                <td>$${v.dvalor}</td>
                <td class="del"><button class="quitar quitar2" id="${v.dmadera}-${v.dnucleo}"> X </button></td>
            </tr>`   
        })
        tbody.innerHTML = tablaHTML
        // let btneliminar = document.querySelectorAll("button.quitar.quitar2")
        // console.table(btneliminar)
        // btneliminar.forEach(btn => {
        //     btn.addEventListener("click", deleteCanasta)
        //     let btnx = btnDelete.some(x => x.id === btn.id)
        //     if (btnx === false){
        //         btnDelete.push(btn)
        //     }
        // })
    totalCanasta.innerHTML = `<p>Total a pagar: $${sumaCanasta()}</p>`
    }
} 
canastaHTML() // Ejecutando esta función se recupera lo del localStorage y se muestra en la tabla al recargar la página.



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
        timer: 1500
      })   
}

// ELIMINAR DEL CARRITO
const btneliminar = document.querySelectorAll('button.quitar.quitar2') //Al crearse se agrega al localStorage pero al verlo en la consola no muestra el array actualizado. Solamente se ve cuando se recarga la página.


// console.table(btneliminar)
// btneliminar.forEach(btn => {
//     btn.addEventListener("click", deleteCanasta)
//     let btnx = btnDelete.some(x => x.id === btn.id)
//     if (btnx === false){
//         btnDelete.push(btn)
//     }
// })

// let deleteCanasta = ()=> {
//     btnDelete.forEach(btn => { 
//         btn.addEventListener("click", ()=> {
//             // let indicex = canastaDiagon.findIndex((y)=> y.id === btn.id) // Asignarle al indicex el valor del index del y cuyo id coincida con eliminado.
//             // canastaDiagon.splice(indicex,1)
//         console.log(btn.id)
//         })
//     })
// }


// EJEMPLO DE LA CLASE
// function activarClickBotones() {
//     botonesAdd.forEach(btn => {
//         btn.addEventListener("click", ()=> {
//             let resultado = productos.find(prod => prod.id === parseInt(btn.id))
//                 carrito.push(resultado)
//                 localStorage.setItem("miCarrito", JSON.stringify(carrito))
//         })
//     })
// }
// activarClickBotones()

// function activarClickBotones() {
//     const buttonsDelete = document.querySelectorAll("button.button-add")
//     buttonsDelete.forEach(btn => {
//         btn.addEventListener("click", ()=> {
//             //buscar usando button.id el producto en el array carrito.
//             //hay que utilizar findIndex() porque necesitamos el índice del producto
//             //luego con el método splice(), elimino el índice recuperado del carrito.
//             //debemos declarar carrito de forma GLOBAL.
//         })
//     })
// }


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

// Quitar Productos del Carrito

// const botonQuitar = document.querySelector("button.quitar")
// const botonQuitar = document.querySelector('input[name="quitar"]:checked')
// botonQuitar.addEventListener("click", deleteCanasta)
