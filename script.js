let carrito = [];
let autoresCienciaFiccion = [] // Variable para almacenar los datos del JSON

// Función para mostrar los elementos del JSON
function mostrarElementos() {
    // Tu código para mostrar elementos aquí
}

// Función para cargar los datos desde el JSON
function cargarAutoresCienciaFiccion() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            autoresCienciaFiccion = data;
            mostrarElementos(); 
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}

// Llama a la función para cargar los datos desde el JSON
cargarAutoresCienciaFiccion();




// Función para agregar un autor al carrito
function agregarAutorAlCarro(nombre) {
    // Verifica que autoresCienciaFiccion y carrito estén definidos y contengan datos
    if (typeof autoresCienciaFiccion === 'object' && Object.keys(autoresCienciaFiccion).length > 0) {
        if (autoresCienciaFiccion.hasOwnProperty(nombre)) {
            if (!carrito.hasOwnProperty(nombre)) {
                carrito[nombre] = {
                    precio: autoresCienciaFiccion[nombre].precio,
                    cantidad: 0
                };
            }

            if (autoresCienciaFiccion[nombre].cantidad > 0) {
                carrito[nombre].cantidad++;
                autoresCienciaFiccion[nombre].cantidad--;

                Toastify({
                    text: `Agregado ${nombre} al carrito`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "#007bff" 
                    },
                    stopOnFocus: true,
                }).showToast();

                // Mostrar mensaje en un elemento HTML con el id "mensaje"
                document.getElementById('mensaje').innerText = `Agregado ${nombre} al carrito`;

            } else {
                Toastify({
                    text: `${nombre} no está disponible`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    style: {
                        backgroundColor: "#ff0000"
                    },
                    stopOnFocus: true,
                }).showToast();

                // Mostrar mensaje en un elemento HTML con el id "mensaje"
                document.getElementById('mensaje').innerText = `${nombre} no está disponible.`;
            }
        } else {
            Toastify({
                text: `${nombre} no está en la lista de autores`,
                duration: 2000,
                gravity: "top",
                position: "center",
                style: {
                    backgroundColor: "#ff0000"
                },
                stopOnFocus: true,
            }).showToast();

            /* // Mostrar mensaje en un elemento HTML con el id "mensaje"
            document.getElementById('mensaje').innerText = `${nombre} no está en la lista de autores.`; */
        }
    } else {
        alert('Los datos de autoresCienciaFiccion no se han cargado correctamente.'); 
    }
}


function mostrarMensaje(Agregado) {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "#007bff"
        },
        stopOnFocus: true,
    }).showToast();
}

function calcularTotal() {
    let totalCarrito = 0;

    for (const autor in carrito) {
        totalCarrito += carrito[autor].precio * carrito[autor].cantidad;
    }

    Toastify({
        text: `Total de la compra: $${totalCarrito.toFixed(2)}`,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "#007bff" 
        },
        stopOnFocus: true,
    }).showToast();

    mostrarMensaje(`Total de la compra: $${totalCarrito.toFixed(2)}`);
}

function mostrarCarrito() {
    let carritoHTML = "Carrito de Compras:";
    
    for (const autor in carrito) {
        carritoHTML += ` ${autor}, $${(carrito[autor].precio * carrito[autor].cantidad).toFixed(2)}`;
    }

    Toastify({
        text: carritoHTML,
        duration: 0,
        gravity: "top",
        position: "center",
        style: {
            background: "#007bff" 
        },
        stopOnFocus: true,
        close: true,
    }).showToast();
}


                                                                                //Tienda//

// Función para decrementar la cantidad
function decrementQuantity(inputId) {
    const quantityInput = document.getElementById(inputId);
    let quantity = parseInt(quantityInput.value);
    
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
}

// Función para incrementar la cantidad
function incrementQuantity(inputId) {
    const quantityInput = document.getElementById(inputId);
    let quantity = parseInt(quantityInput.value);
    
    quantity++;
    quantityInput.value = quantity;
}



function agregarAlCarrito(producto, precio) {
  
    if (carrito.hasOwnProperty(producto)) {
        carrito[producto].cantidad++;
    } else {
        carrito[producto] = {
            precio: precio,
            cantidad: 1
        };
    }

  
    mostrarMensaje(`Agregado ${producto} al carrito`);
}


function mostrarMensaje(mensaje) {
   
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: "#007bff"
        },
        stopOnFocus: true,
    }).showToast();
}




// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoContenido = document.getElementById('carritoContenido');
    carritoContenido.innerHTML = '';

    let totalCarrito = 0;

    for (const producto in carrito) {
        const { precio, cantidad } = carrito[producto];
        const subtotal = precio * cantidad;
        totalCarrito += subtotal;

        const productoHTML = `
            <div>
                <p>${producto} - Cantidad: ${cantidad} - Precio: $${precio.toFixed(2)} - Subtotal: $${subtotal.toFixed(2)}</p>
            </div>
        `;

        carritoContenido.innerHTML += productoHTML;
    }

    carritoContenido.innerHTML += `
        <hr>
        <p>Total de la compra: $${totalCarrito.toFixed(2)}</p>
    `;

    $('#carritoModal').modal('show'); 
}

