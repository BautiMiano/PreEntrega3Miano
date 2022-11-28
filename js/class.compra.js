class Compra {
    constructor(carrito) {
        this.carrito = carrito
    }
    obtenerSubtotal() {
        if (carrito.length > 0) {
            return this.carrito.reduce((acc, envase)=> acc + envase.precio, 0).toFixed(2)
        } else {
            return 'Error inesperado'
        }
    }
    confirmarCompra() {
        if (this.obtenerSubtotal() !== 'Error inesperado') {
            return `✅ Confirmamos el pago de $ ${this.obtenerSubtotal()}. \n Muchas gracias por su compra!`
        } else {
            return `⛔️ Error en la transacción.`
        }
    }
}