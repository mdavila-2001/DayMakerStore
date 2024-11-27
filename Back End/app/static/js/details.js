// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Función para obtener los detalles del producto
async function obtenerDetallesProducto() {
    try {
        const response = await fetch(`http://localhost:5000/productos/${productId}`); // Cambia la URL si es necesario
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        const producto = await response.json();

        // Mostrar los detalles del producto
        mostrarDetallesProducto(producto);
    } catch (error) {
        document.getElementById('product-details').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Función para mostrar los detalles del producto en el HTML
function mostrarDetallesProducto(producto) {
    const originalPrice = producto.descuento ? (producto.precio / (1 - (producto.porcentajeDescuento / 100))).toFixed(2) : producto.precio;

    document.title = producto.nombreProd;
    document.getElementById('header-title').textContent = producto.nombreProd;

    document.getElementById('product-details').innerHTML = `
        <div class="product-container">
            <img src="${producto.foto}" alt="${producto.nombreProd}" id="product-image">
            <div class="product-info">
                <h2 id="product-title">${producto.nombreProd}</h2>
                <p class="price">Precio: $<span id="discounted-price">${producto.precio.toFixed(2)}</span></p>
                ${producto.descuento ? `<p class="original-price">Precio Original: $<span>${originalPrice}</span></p>` : ''}
                <button id="comprar">Comprar</button>
                <button id="carrito">Agregar al Carrito</button>
            </div>
        </div>
        <hr>
        <p class="description" id="product-description">${producto.descProd}</p>
        <p class="platform" id="product-platform">Plataforma: <span>${producto.plataforma}</span></p>
    `;

    // Agregar eventos a los botones
    document.getElementById('comprar').addEventListener('click', showError);
    document.getElementById('carrito').addEventListener('click', function() {
        const producto = {
            codProd: productId, // Suponiendo que productId ya está definido
            nombreProd: producto.nombreProd,
            precio: producto.precio
        };
        agregarAlCarrito(producto);
    });

    // Agregar eventos a los botones
    document.getElementById('comprar').addEventListener('click', showError);
    document.getElementById('carrito').addEventListener('click', showError);
}

// Función para mostrar el mensaje de error
function showError() {
    alert("Error: Debes iniciar sesión para realizar una compra o agregar productos al carrito.");
}

function agregarAlCarrito(producto) {
    carrito.push(producto); // Agregar el producto al carrito
    mostrarCarrito();
    localStorage.setItem('carrito', JSON.stringify(carrito));
    abrirCarrito(); // Mostrar el sidebar
}

let carrito = []; // Array para almacenar los productos en el carrito

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto); // Agregar el producto al carrito
    mostrarCarrito(); // Actualizar el sidebar con los productos del carrito
}

// Función para mostrar el carrito en el sidebar
function mostrarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = ''; // Limpiar el contenido anterior

    carrito.forEach(producto => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${producto.nombreProd} - $${producto.precio.toFixed(2)}`;
        carritoItems.appendChild(itemDiv);
    });
}

// Función para finalizar la compra (puedes personalizarla)
function finalizarCompra() {
    alert("Compra finalizada!");
    // Aquí puedes agregar la lógica para enviar el carrito al servidor
}

document.addEventListener('DOMContentLoaded', function() {
    // Cargar el carrito desde localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Convertir de JSON a objeto
        mostrarCarrito(); // Mostrar los productos en el carrito
    }
});

// Llamar a la función para obtener los detalles del producto al cargar la página
document.addEventListener('DOMContentLoaded', obtenerDetallesProducto);