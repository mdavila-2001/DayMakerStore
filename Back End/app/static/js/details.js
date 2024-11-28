// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Función para obtener los detalles del producto
async function obtenerDetallesProducto() {
    try {
        const response = await fetch(`http://localhost:5000/productos/${productId}`);
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        const producto = await response.json();
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
    document.getElementById('carrito').addEventListener('click', showError);
}

function showError() {
    alert("Error: Debes iniciar sesión para realizar una compra o agregar productos al carrito.");
}

function abrirCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.style.right = "0";
    mostrarCarrito();
}

function cerrarCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.style.right = "-300px";
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenido = document.getElementById('carrito-contenido');

    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const productoDiv = document.createElement('div');
            productoDiv.textContent = `Código: ${item.codProd}, Cantidad: ${item.cantidad}`;
            carritoContenido.appendChild(productoDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerDetallesProducto();

    document.querySelector('.menu-hamburguesa').addEventListener('click', toggleMenu);
    document.querySelector('.acciones button').addEventListener('click', abrirCarrito);
});