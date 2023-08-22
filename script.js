let carrito = [];

function checkAvailability() {
    const nombreProducto = prompt("Ingresa el nombre del producto que buscas");

    switch (nombreProducto) {
        case "1":
        case "2":
        case "3":
            alert(`${nombreProducto} Lo tenemos!`);
            break;
        default:
            alert(`${nombreProducto} Por el momento, está agotadísimo`);
    }
}

function calcularTotal() {
    const precio = parseFloat(prompt("Ingresa el precio"));
    const cantidad = parseInt(prompt("Ingresa la cantidad"));

    if (isNaN(precio) || isNaN(cantidad)) {
        alert("Ingresa valores numéricos válidos para precio y cantidad.");
        return;
    }

    const total = precio * cantidad;
    alert(`Precio Total: $${total.toFixed(2)}`);
}

function agregarAlCarro() {
    let agregarProducto = true;

    while (agregarProducto) {
        const nombreProducto = prompt("¿Qué producto quieres agregar al carrito?");
        carrito.push(nombreProducto);
        console.log(`${nombreProducto} Listo! Agregado al carrito!`);

        const confirmacion = prompt("¿Deseas agregar otro producto al carrito? (Sí/No)").toLowerCase();
        if (confirmacion !== "si") {
            agregarProducto = false;
        }
    }
}

function displayCart() {
    console.log("Carrito de Compras:", carrito);
    alert(`Carrito de Compras: ${carrito.join(', ')}`);
}

