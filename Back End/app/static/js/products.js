async function obtenerProductos() {
    try {
        const response = await fetch('http://localhost:5000/productos/');
        const productos = await response.json();
        mostrarProductosAleatorios(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
}

function mostrarProductosAleatorios(productos) {
    const productosAleatorios = productos.sort(() => 0.5 - Math.random());
    
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    productosAleatorios.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const imagen = document.createElement('img');
        imagen.src = producto.foto;
        productoDiv.appendChild(imagen);

        const nombre = document.createElement('a');
        nombre.textContent = producto.nombreProd;
        nombre.href = `product.html?id=${producto.codProd}`;
        productoDiv.appendChild(nombre);

        const precio = document.createElement('p');
        precio.classList.add('precio');
        if (producto.descuento) {
            const precioOriginal = (producto.precio / (1 - (producto.porcentajeDescuento / 100))).toFixed(2);
            precio.innerHTML = `
                <span class="precio-original">$${precioOriginal}</span> <br>
                <span class="precio"> $${producto.precio.toFixed(2)}</span>
            `;
        } else {
            precio.textContent = `$${producto.precio.toFixed(2)}`;
        }

        productoDiv.appendChild(precio);
        productoDiv.appendChild(precio);
        
        // Añadir la plataforma
        const plataforma = document.createElement('p');
        plataforma.classList.add('plataforma');
        plataforma.textContent = `Plataforma: ${producto.plataforma}`;
        productoDiv.appendChild(plataforma);

        const contenedorBotones = document.createElement('div');
        contenedorBotones.classList.add('contenedor-botones');
        
        const botonComprar = document.createElement('button');
        botonComprar.textContent = 'Comprar';
        botonComprar.id = 'comprar';
        contenedorBotones.appendChild(botonComprar);
        
        const botonAgregarCarrito = document.createElement('button');
        botonAgregarCarrito.textContent = 'Agregar al carrito';
        botonAgregarCarrito.id = `carrito`;
        contenedorBotones.appendChild(botonAgregarCarrito);
        
        const contadorDiv = document.createElement('div');
        contadorDiv.classList.add('contador');
        contadorDiv.style.display = 'none';
        
        const botonMenos = document.createElement('button');
        botonMenos.textContent = '-';
        const contador = document.createElement('span');
        contador.textContent = '1';
        const botonMas = document.createElement('button');
        botonMas.textContent = '+';
        
        const botonBasura = document.createElement('button');
        botonBasura.innerHTML = 'X';
        botonBasura.title = "Eliminar del carrito";
        
        let cantidad = 1;

        botonMenos.onclick = () => {
            if (cantidad > 1) {
                cantidad--;
                contador.textContent = cantidad;
            }
            if (cantidad === 1) {
                botonMenos.style.display = 'inline';
            }
        };

        botonMas.onclick = () => {
            cantidad++;
            contador.textContent = cantidad;
            botonMenos.style.display = 'inline';
        };

        botonBasura.onclick = () => {
            contadorDiv.style.display = 'none';
            botonAgregarCarrito.style.display = 'block';
        };

        contadorDiv.appendChild(botonMenos);
        contadorDiv.appendChild(contador);
        contadorDiv.appendChild(botonMas);
        contadorDiv.appendChild(botonBasura);
        
        contenedorBotones.appendChild(contadorDiv);
        
        botonAgregarCarrito.onclick = () => {
            botonAgregarCarrito.style.display = 'none';
            contadorDiv.style.display = 'block';
        };
        
        productoDiv.appendChild(contenedorBotones);
        
        catalogo.appendChild(productoDiv);
    });
}

function cerrarMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.classList.remove('show');
    setTimeout(() => {
        menu.style.display = 'none';
    }, 300);
}

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

document.addEventListener('DOMContentLoaded', obtenerProductos);

function abrirCarrito() {
    document.getElementById("sidebar-carrito").style.right = "0";
    mostrarCarrito();
}

function cerrarCarrito() {
    document.getElementById("sidebar-carrito").style.right = "-300px";
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