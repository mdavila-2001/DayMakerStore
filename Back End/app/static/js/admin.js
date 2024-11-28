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

function mostrarProductos(productos) {
    const tableBody = document.getElementById('productos-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    productos.forEach(producto => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = producto.codProd;
        row.insertCell(1).textContent = producto.nombreProd;
        row.insertCell(2).textContent = `$${producto.precio.toFixed(2)}`;
        row.insertCell(3).textContent = producto.stock;
        
        const actionsCell = row.insertCell(4);
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'actions-container';

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.onclick = () => editarProducto(producto.codProd);
        editButton.className = 'edit-button';
        actionsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = () => eliminarProducto(producto.codProd);
        deleteButton.className = 'delete-button';
        actionsContainer.appendChild(deleteButton);

        actionsCell.appendChild(actionsContainer);
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
            document.getElementById('editCodProd').value = producto.codProd;
            document.getElementById('editNombreProd').value = producto.nombreProd;
            document.getElementById('editPrecio').value = producto.precio;
            document.getElementById('editStock').value = producto.stock;
            document.getElementById('editTipoProducto').value = producto.tipoProducto;
            document.getElementById('editPlataforma').value = producto.plataforma;
            document.getElementById('editDescripcion').value = producto.descProd;

            document.getElementById('editProductModal').style.display = "block";
        })
        .catch(error => {
            console.error('Error al obtener el producto:', error);
            alert('Error al cargar los datos del producto. Por favor, intenta de nuevo más tarde.');
        });
}

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
        cerrarModal();
        cargarProductos();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto. Por favor, intenta de nuevo más tarde.');
    }
}

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
            cargarProductos();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto. Por favor, intenta de nuevo más tarde.');
        }
    }
}

function mostrarModalCrearProducto() {
    document.getElementById('createProductModal').style.display = "block";
}

function cerrarModalCrearProducto() {
    document.getElementById('createProductModal').style.display = "none";
}

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
            cerrarModalCrearProducto();
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

document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    crearProducto();
});

window.onclick = function(event) {
    const modal = document.getElementById('createProductModal');
    if (event.target === modal) {
        cerrarModalCrearProducto();
    }
}

document.getElementById('editProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    guardarCambiosProducto();
});

document.getElementById('createProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    crearProducto();
});

window.onload = cargarProductos;