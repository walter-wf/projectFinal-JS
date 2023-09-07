let carrito = [];
const productosDisponibles = [ //Array de Objetos.
    { nombre: "Brandon Sanderson", precio: 10 },
    { nombre: "Mass Effect", precio: 15 },
    { nombre: "Steven Erikson", precio: 20 }
];

function checkAvailability() { //Condicional
    const nombreProducto = prompt("Ingresa el nombre del producto que buscas");

    const productoEncontrado = productosDisponibles.find(producto => producto.nombre === nombreProducto);

    if (productoEncontrado) {
        alert(`${nombreProducto} Lo tenemos! Precio: $${productoEncontrado.precio}`);
    } else {
        alert(`${nombreProducto} Por el momento, está agotadísimo`);
    }
}

function calcularTotal() {
    const precio = parseFloat(prompt("Ingresa el precio"));
    const cantidad = parseInt(prompt("Ingresa la cantidad"));

    if (isNaN(precio) || isNaN(cantidad)) {
        alert("Ingresa precio y cantidad válidos.");
        return;
    }

    const total = precio * cantidad;
    alert(`Precio Total: $${total.toFixed(2)}`);
}

function agregarAlCarro() {
    let agregarProducto = true;

    while (agregarProducto) { //Inclui un bucle para que el usuario pueda agregar productos hasta que decida no mas. 
        const nombreProducto = prompt("¿Qué producto quieres agregar al carrito?");
        const productoEncontrado = productosDisponibles.find(producto => producto.nombre === nombreProducto);

        if (productoEncontrado) {
            carrito.push(productoEncontrado);
            console.log(`${nombreProducto} Listo! Agregado al carrito!`);
        } else {
            console.log(`${nombreProducto} no está disponible.`);
        }

        const confirmacion = prompt("¿Deseas agregar otro producto al carrito? (Sí/No)").toLowerCase();
        if (confirmacion !== "si") {
            agregarProducto = false;
        }
    }
}

function displayCart() { 
    console.log("Carrito de Compras:");
    carrito.forEach(producto => {
        console.log(`Nombre: ${producto.nombre}, Precio: $${producto.precio}`);
    });

    const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);
    alert(`Carrito de Compras (Total: $${totalCarrito.toFixed(2)}):\n${carrito.map(producto => producto.nombre).join(', ')}`);
}


//  función Date y Math
function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

agregarAlCarro(); 
console.log("Fecha actual:", obtenerFechaActual()); 
