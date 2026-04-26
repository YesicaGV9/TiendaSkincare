const btnAgregar = document.querySelectorAll(".agregar-carrito")
const listaCarrito = document.getElementById("listaCarrito")
const total = document.getElementById("total")
const vaciar = document.getElementById("btnVaciar")


let sumaTotal = 0
let cantidadbadge = 0

function updateBadge() {
    let badge = document.getElementById("badge")
    badge.textContent = cantidadbadge
}

function agregarDentroCarrito(nombre, precio){
    let nuevoItem = document.createElement("li")
    let mensaje = document.createElement("p")
    mensaje.textContent = nombre + precio.toLocaleString("es-CO")
    let btnEliminar = document.createElement("button")
    btnEliminar.innerHTML = '<i class="fa-regular fa-trash-can" style="color: #dc3545;"></i>'

    btnEliminar.addEventListener("click", function(){
        listaCarrito.removeChild(nuevoItem)
        sumaTotal -= precio
        cantidadbadge -= 1
        updateBadge()
        total.textContent = "Total: $" + sumaTotal
    })

    nuevoItem.appendChild(mensaje)
    nuevoItem.appendChild(btnEliminar)
    listaCarrito.appendChild(nuevoItem)
    sumaTotal += precio
    cantidadbadge += 1
    updateBadge()
    total.textContent = "Total: $" + sumaTotal.toLocaleString("es-CO")
}

// Este es el evento
// parseInt como int, para transformar string en numbre por eso me daba error(hay para float)
btnAgregar.forEach(function (botones) {
    botones.addEventListener("click", function () {
        let nomnbre = botones.dataset.nombre
        let precio = parseInt(botones.dataset.precio)

      agregarDentroCarrito(nomnbre, precio)
    })
})

// para vaciar carrito completo
vaciar.addEventListener("click", function () {
    listaCarrito.innerHTML = ""
    sumaTotal = 0


    cantidadbadge =0
    updateBadge()
    total.textContent = "Total: $0"
})