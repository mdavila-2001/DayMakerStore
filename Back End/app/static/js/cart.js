function abrirCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.classList.add("open");
    mostrarCarrito();
}

function cerrarCarrito() {
    const sidebar = document.getElementById("sidebar-carrito");
    sidebar.classList.remove("open");
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