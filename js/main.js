const tbody = document.querySelector("tbody")

//Guardar y Recuperar el Carrito con LocalStorage + JSON
const carrito = []
const guardarCarrito = ()=> (carrito.length > 0) && localStorage.setItem("CarritoEnvases", JSON.stringify(carrito))
const recuperarCarrito = ()=> JSON.parse(localStorage.getItem("CarritoEnvases")) || []
carrito.push(...recuperarCarrito())

//Armar la tabla HTML dinámica
const armarTablaHTML = (envase)=> {
    return `<tr>
                <td><h3>${envase.imagen}</h3></td>
                <td>${envase.tipo}</td>
                <td>$ ${envase.precio}</td>
                <td>
                    <button id="${envase.codigo}" class="button button-outline" title="Agregar al carrito">🛒</button>
                </td>
            </tr>`
}

//Cargar los productos en la tabla HTML

const cargarEnvases = (array)=> {
    let tablaHTML = ""
        if (array.length > 0) {
            array.forEach((envase) => tablaHTML += armarTablaHTML(envase))
        } else {
            tablaHTML = "<h2 class='error-envases'>Error al cargar los envases.</h2>"
        }
        tbody.innerHTML = tablaHTML
}

//Activar el evento CLICK por cada botón dinámico generado
const activarClickBotonesAdd = ()=> {
    const botonesAdd = document.querySelectorAll("button.button.button-outline")
        botonesAdd.forEach(btn => {
            btn.addEventListener("click", (e)=> {
                let resultado = buscarEnvase(e.target.id)
                    carrito.push(resultado)
                    guardarCarrito()
            })
        })
}

cargarEnvases(envases)
activarClickBotonesAdd()

const buscarEnvase = (codigo)=> envases.find(envase => envase.codigo === parseInt(codigo))

function comprar() {
    let codigo = prompt(mensajeInicial)
        if (!parseInt(codigo)) {
            alert("⛔️ Error en el código ingresado.")
            return 
        }
        let envaseElegido = buscarEnvase(codigo)
            carrito.push(envaseElegido)
        let respuesta = confirm("¿Deseas llevar otro envase?")
        if (respuesta) {
            comprar()
        } else {
            finalizarCompra()
        }
}

function verCarrito() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito)
        alert(`El costo total es de $ ${shopping.obtenerSubtotal()}`)
    } else {
        alert("El carrito está vacío!")
    }
}

const btnVerCarrito = document.querySelector("button#verCarrito")
btnVerCarrito.addEventListener("click", verCarrito)