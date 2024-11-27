// Función para cerrar el menú
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

// Función para cargar productos desde la API
async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:5000/productos/');
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
    }
}

// Función para mostrar productos en la tabla
function mostrarProductos(productos) {
    const tableBody = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar nuevos productos

    productos.forEach(producto => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = producto.codProd; // Código del producto
        row.insertCell(1).textContent = producto.nombreProd; // Nombre del producto
        row.insertCell(2).textContent = `$${producto.precio.toFixed(2)}`; // Precio del producto
        row.insertCell(3).textContent = producto.stock; // Stock del producto

        // Crear una celda para las acciones
        const actionsCell = row.insertCell(4);
        const actionsContainer = document.createElement('div'); // Contenedor para las acciones
        actionsContainer.className = 'actions-container'; // Clase para el contenedor

        // Crear un botón para editar el producto
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Ícono de lápiz
        editButton.onclick = () => editarProducto(producto.codProd); // Define la función de edición
        editButton.className = 'edit-button';
        actionsContainer.appendChild(editButton); // Agregar botón de editar al contenedor

        // Crear un botón para eliminar el producto
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Ícono de papelera
        deleteButton.onclick = () => eliminarProducto(producto.codProd); // Define la función de eliminación
        deleteButton.className = 'delete-button';
        actionsContainer.appendChild(deleteButton); // Agregar botón de eliminar al contenedor

        actionsCell.appendChild(actionsContainer); // Agregar contenedor de acciones a la fila
    });
}

// Función para editar producto
function editarProducto(codProd) {
    fetch(`http://localhost:5000/productos/${codProd}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el producto');
            }
            return response.json();
        })
        .then(producto => {
            // Llenar el formulario con los datos del producto
            document.getElementById('editCodProd').value = producto.codProd;
            document.getElementById('editNombreProd').value = producto.nombreProd;
            document.getElementById('editPrecio').value = producto.precio;
            document.getElementById('editStock').value = producto.stock;
            document.getElementById('editTipoProducto').value = producto.tipoProducto;
            document.getElementById('editPlataforma').value = producto.plataforma;
            document.getElementById('editDescripcion').value = producto.descProd;

            // Mostrar el modal
            document.getElementById('editProductModal').style.display = "block";
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            alert('Error al cargar los datos del producto. Por favor, intenta de nuevo más tarde.');
        });
}

// Función para guardar cambios en el producto
async function guardarCambiosProducto() {
    const codProd = document.getElementById('editCodProd').value;
    const nombreProd = document.getElementById('editNombreProd').value;
    const precio = parseFloat(document.getElementById('editPrecio').value);
    const stock = parseInt(document.getElementById('editStock').value);
    const tipoProducto = document.getElementById('editTipoProducto').value;
    const plataforma = document.getElementById('editPlataforma').value;
    const descProd = document.getElementById('editDescripcion').value;

    const productoActualizado = {
        codProd,
        nombreProd,
        precio,
        stock,
        tipoProducto,
        plataforma,
        descProd
    };

    try {
        const response = await fetch(`http://localhost:5000/productos/${codProd}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        alert('Producto actualizado con éxito');
        cerrarModal(); // Cerrar el modal
        cargarProductos(); // Recargar la lista de productos
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto. Por favor, intenta de nuevo más tarde.');
    }
}

// Función para eliminar producto
async function eliminarProducto(codProd) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
            const response = await fetch(`http://localhost:5000/productos/${codProd}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            alert('Producto eliminado con éxito');
            cargarProductos(); // Recargar la lista de productos
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto. Por favor, intenta de nuevo más tarde.');
        }
    }
}

// Función para mostrar el modal de creación de producto
function mostrarModalCrearProducto() {
    document.getElementById('createProductModal').style.display = "block";
}

// Función para cerrar el modal de creación de producto
function cerrarModalCrearProducto() {
    document.getElementById('createProductModal').style.display = "none";
}

// Función para crear un nuevo producto
async function crearProducto() {
    const codProd = document.getElementById('createCodProd').value;
    const nombreProd = document.getElementById('createNombreProd').value;
    const tipoProducto = document.getElementById('createTipoProducto').value;
    const plataforma = document.getElementById('createPlataforma').value;
    const precio = parseFloat(document.getElementById('createPrecio').value);
    const descuento = document.getElementById('createDescuento').value === 'true';
    const porcentajeDescuento = parseFloat(document.getElementById('createPorcentajeDescuento').value) || 0;
    const foto = document.getElementById('createFoto').value;
    const combo = document.getElementById('createCombo').value === 'true';
    const descProd = document.getElementById('createDescripcion').value;
    const hayStock = document.getElementById('createHayStock').value === 'true';
    const stock = parseInt(document.getElementById('createStock').value);

    const producto = {
        codProd,
        nombreProd,
        tipoProducto,
        plataforma,
        precio,
        descuento,
        porcentajeDescuento,
        foto,
        combo,
        descProd,
        hayStock,
        stock
    };

    try {
        const response = await fetch('http://localhost:5000/productos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Producto creado:', data);
            alert('Producto creado con éxito');
            cerrarModalCrearProducto(); // Cerrar el modal después de crear el producto
            // Aquí puedes agregar lógica para actualizar la interfaz de usuario, como recargar la lista de productos
        } else {
            const error = await response.json();
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto: ' + error.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud: ' + error.message);
    }
}

// Manejar el envío del formulario
document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    crearProducto(); // Llamar a la función para crear producto
});

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('createProductModal');
    if (event.target === modal) {
        cerrarModalCrearProducto();
    }
}

// Evento para manejar el envío del formulario de edición
document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    guardarCambiosProducto(); // Llamar a la función para guardar cambios
});

// Evento para manejar el envío del formulario de creación
document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    crearProducto(); // Llamar a la función para crear producto
});

// Cargar productos al iniciar la página
window.onload = cargarProductos;