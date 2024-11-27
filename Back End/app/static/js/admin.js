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
        const response = await fetch('http://localhost:5000/productos/'); // Cambia la URL si es necesario
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
        actionsContainer.appendChild(editButton); // Agregar el botón al contenedor

        // Crear un botón para eliminar el producto
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Ícono de basurero
        deleteButton.onclick = () => eliminarProducto(producto.codProd); // Define la función de eliminación
        deleteButton.className = 'delete-button'; // Clase para el botón de eliminar
        actionsContainer.appendChild(deleteButton); // Agregar el botón al contenedor

        actionsCell.appendChild(actionsContainer); // Agregar el contenedor de acciones a la celda
    });
}

function editarProducto(codProd) {
    // Obtener los datos del producto desde la API
    fetch(`http://localhost:5000/productos/${codProd}`)
        .then(response => response.json())
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
        .catch(error => console.error('Error al obtener el producto:', error));
}

function cerrarModal() {
    document.getElementById('editProductModal').style.display = "none";
}

// Llamar a la función para cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);