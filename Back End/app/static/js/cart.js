function abrirCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.classList.add("open"); // Agrega la clase para mostrar el sidebar
    mostrarCarrito(); // Llama a la función para mostrar los productos en el carrito
}

function cerrarCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.classList.remove("open"); // Quita la clase para ocultar el sidebar
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContenido = document.getElementById('carrito-contenido');

    carritoContenido.innerHTML = ''; // Limpiar el contenido actual

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