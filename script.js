let carrito = [];
const productosDisponibles = [
    { nombre: "Brandon Sanderson", precio: 10, cantidad: 5 },
    { nombre: "Mass Effect", precio: 15, cantidad: 3 },
    { nombre: "Garden Of The Moons", precio: 20, cantidad: 7 }
];

function checkAvailability() {
    const nombreProducto = prompt("Ingresa el nombre del producto que buscas");
    const productoEncontrado = productosDisponibles.find(producto => producto.nombre === nombreProducto);

    if (productoEncontrado) {
        mostrarMensaje(`${nombreProducto} Lo tenemos! Precio: $${productoEncontrado.precio}`);
    } else {
        mostrarMensaje(`${nombreProducto} Por el momento, está agotadísimo`);
    }
}

function agregarAlCarro(nombreProducto) {
    const productoEncontrado = productosDisponibles.find(producto => producto.nombre === nombreProducto);

    if (productoEncontrado && productoEncontrado.cantidad > 0) {
        carrito.push(productoEncontrado);
        productoEncontrado.cantidad--; // Disminuir la cantidad disponible
        mostrarMensaje(`${nombreProducto} Listo! Agregado al carrito!`);
    } else {
        mostrarMensaje(`${nombreProducto} no está disponible.`);
    }
}

function calcularTotal() {
    const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);
    mostrarMensaje(`Total de la compra: $${totalCarrito.toFixed(2)}`);
}

function mostrarCarrito() {
    let carritoHTML = "<h2>Carrito de Compras:</h2>";
    carrito.forEach(producto => {
        carritoHTML += `<p>Nombre: ${producto.nombre}, Precio: $${producto.precio}</p>`;
    });
    mostrarMensaje(carritoHTML);
}

function mostrarMensaje(mensaje) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = mensaje;
}

// Event Listeners para botones
document.getElementById('checkAvailabilityButton').addEventListener('click', checkAvailability);
document.getElementById('addToCartButton').addEventListener('click', function () {
    const nombreProducto = prompt("¿Qué producto quieres agregar al carrito?");
    agregarAlCarro(nombreProducto);
});
document.getElementById('showCartButton').addEventListener('click', mostrarCarrito);
document.getElementById('calculateTotalButton').addEventListener('click', calcularTotal);
