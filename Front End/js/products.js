async function obtenerProductos() {
    try {
        const response = await fetch('http://localhost:5000/productos/'); // Cambia la URL si es necesario
        const productos = await response.json();
        mostrarProductosAleatorios(productos); // Llama a la función para mostrar productos aleatorios
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function mostrarProductosAleatorios(productos) {
    // Mezclar el array de productos y limitar a 6
    const productosAleatorios = productos.sort(() => 0.5 - Math.random());
    
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = ''; // Limpiar el catálogo antes de mostrar nuevos productos

    productosAleatorios.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        // Añadir la imagen
        const imagen = document.createElement('img');
        imagen.src = producto.foto;
        productoDiv.appendChild(imagen);

        const nombre = document.createElement('a');
        nombre.textContent = producto.nombreProd; // Cambia 'nombre' a 'nombreProd'
        nombre.href = `product.html?id=${producto.codProd}`;
        productoDiv.appendChild(nombre);

        const precio = document.createElement('p');
        precio.classList.add('precio');
        // Verificar si el producto tiene descuento
        if (producto.descuento) {
            // Calcular el precio original
            const precioOriginal = (producto.precio / (1 - (producto.porcentajeDescuento / 100))).toFixed(2);
            precio.innerHTML = `
                <span class="precio-original">$${precioOriginal}</span> <br>
                <span class="precio"> $${producto.precio.toFixed(2)}</span>
            `;
        } else {
            precio.textContent = `$${producto.precio.toFixed(2)}`; // Mostrar precio normal
        }

        productoDiv.appendChild(precio);
        catalogo.appendChild(productoDiv);
    });
}

function cerrarMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.classList.remove('show'); // Quitar la clase que muestra el menú
    setTimeout(() => {
        menu.style.display = 'none'; // Ocultar el menú después de la animación
    }, 300); // Esperar el tiempo de la animación
}

// Función para mostrar el menú
function toggleMenu() {
    const menu = document.getElementById('menuDesplegable');
    if (menu.style.display === 'block') {
        cerrarMenu();
    } else {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.classList.add('show');
        }, 10);
    }
}

// Llamar a la función para obtener productos
document.addEventListener('DOMContentLoaded', obtenerProductos);