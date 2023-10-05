let autoresCienciaFiccion = []; // Variable para almacenar los datos del JSON
let carrito = [];


// Función para mostrar los elementos del JSON
function mostrarElementos() {
    if (autoresCienciaFiccion.length >= 3) {
        const elementos = autoresCienciaFiccion.slice(0, 12);
        const elementosContainer = document.getElementById('elementos-container');
        elementosContainer.innerHTML = '';

        elementos.forEach(elemento => {
            const elementoHTML = document.createElement('div');
            elementoHTML.classList.add('col-md-4');
            elementoHTML.innerHTML = `
                <div class="card m-3">
                    <img src="${elemento.foto}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nombre}</h5>
                        <p class="card-text">Precio: $${elemento.precio}</p>
                        <p class="card-text">Cantidad Disponible: ${elemento.cantidad}</p>
                        <button class="btn btn-primary" onclick="agregarAutorAlCarro('${elemento.nombre}')">Agregar al Carrito</button>
                    </div>
                </div>
            `;

            elementosContainer.appendChild(elementoHTML);
        });
    } else {
        alert('No hay suficientes elementos en el JSON para mostrar.');
    }
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


cargarAutoresCienciaFiccion();



// Función para actualizar el conteo de productos en el ícono del carrito
function actualizarConteoCarrito() {
    const enlaceCarrito = document.getElementById('mostrarCarrito');
    const conteoProductos = Object.keys(carrito).length;
    enlaceCarrito.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrito (${conteoProductos})`;
}

// Agregar un manejador de eventos al ícono del carrito para abrir el modal
document.getElementById('mostrarCarrito').addEventListener('click', function () {
    actualizarConteoCarrito(); // Actualizar el conteo antes de mostrar el modal
    carritoIcono(); // Esta función debe mostrar los productos en el modal
    $('#carritoModal').modal('show'); // Mostrar el modal
});

// Función para mostrar el carrito en el modal
function carritoIcono() {
    const carritoModal = document.getElementById('carritoModal');
    const carritoContenido = document.getElementById('carritoContenido');
    carritoContenido.innerHTML = ''; // Limpiar contenido anterior

    let carritoHTML = '<ul class="list-group">'; // Abre una lista desordenada

    for (const autor in carrito) {
        const producto = carrito[autor];
        const subtotal = (producto.precio * producto.cantidad).toFixed(2);

        carritoHTML += `
            <li class="list-group-item">
                ${autor}, Cantidad: ${producto.cantidad}, Precio: $${subtotal}
                <button class="btn btn-danger btn-sm ms-2" onclick="eliminarDelCarrito('${autor}')">Eliminar</button>
            </li>
        `;
    }

    carritoHTML += '</ul>'; // Cierra la lista desordenada

    if (Object.keys(carrito).length === 0) {
        carritoHTML = "El carrito está vacío.";
    }

    carritoContenido.innerHTML = carritoHTML;

    // Mostrar la ventana emergente del carrito
    const carritoModalInstance = new bootstrap.Modal(carritoModal);
    carritoModalInstance.show();
}

// Función para eliminar un elemento del carrito
function eliminarDelCarrito(nombre) {
    if (carrito.hasOwnProperty(nombre)) {
        delete carrito[nombre];
        carritoIcono(); // Actualizar la vista del carrito
        actualizarConteoCarrito(); // Actualizar el conteo en el ícono del carrito
    }
}


// Función para ver el carrito utilizando Toastify


function verCarrito() {
    let carritoHTML = "Carrito de Compras:";

    for (const autor in carrito) {
        carritoHTML += ` ${autor}, Cantidad: ${carrito[autor].cantidad}, Precio: $${(carrito[autor].precio * carrito[autor].cantidad).toFixed(2)}<br>`;
    }

    if (carritoHTML === "Carrito de Compras:") {
        carritoHTML += " El carrito está vacío.";
    }

    Toastify({
        text: carritoHTML,
        duration: 0,
        gravity: "top",
        position: "center",
        style: {
            background: "#007bff",
            color: "#fff"
        },
        stopOnFocus: true,
        close: true,
    }).showToast();
}





// Función para agregar un autor al carrito usando Toastify
function agregarAutorAlCarro(nombre) {

    if (typeof autoresCienciaFiccion === 'object' && autoresCienciaFiccion.length > 0) {
        const autorEncontrado = autoresCienciaFiccion.find(autor => autor.nombre === nombre);
        if (autorEncontrado) {
            if (!carrito.hasOwnProperty(nombre)) {
                carrito[nombre] = {
                    precio: autorEncontrado.precio,
                    cantidad: 0
                };
            }

            if (autorEncontrado.cantidad > 0) {
                carrito[nombre].cantidad++;
                autorEncontrado.cantidad--;

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
        }
    } else {
        alert('Los datos de autoresCienciaFiccion no se han cargado correctamente.');
    }
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


// Función para ver el carrito en el HTML
function verCarrito() {
    const carritoContenidoHTML = document.getElementById('carritoContenidoHTML');
    carritoContenidoHTML.innerHTML = ''; // Limpiar contenido anterior

    let carritoHTML = "Carrito de Compras:";

    for (const autor in carrito) {
        carritoHTML += `<p>${autor}, Cantidad: ${carrito[autor].cantidad}, Precio: $${(carrito[autor].precio * carrito[autor].cantidad).toFixed(2)}</p>`;
    }

    if (carritoHTML === "Carrito de Compras:") {
        carritoHTML += " El carrito está vacío.";
    }

    carritoContenidoHTML.innerHTML = carritoHTML;
}



// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Llama a la función para cargar el carrito desde localStorage al cargar la página
cargarCarritoDesdeLocalStorage();





// Función para mostrar el mensaje de agradecimiento con Toastify
function showThankYouMessage() {
    Toastify({
        text: "¡Muchas gracias por su contacto!",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "center",
        backgroundColor: "green",
        stopOnFocus: true
    }).showToast();
}

// Agregar un manejador de eventos para el formulario
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const formData = new FormData(event.target);

    // Convertir los datos del formulario a un objeto JSON
    const formDataJSON = {};
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    // Simular el envío de datos a un servidor (usando JSONPlaceholder como ejemplo)
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataJSON)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);
            showThankYouMessage();
        })
        .catch(error => {
            console.error("Error al enviar el formulario:", error);
        });
});
