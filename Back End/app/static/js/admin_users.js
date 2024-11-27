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
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    setTimeout(() => {
        menu.classList.toggle('show'); // Alternar la clase que muestra el menú
    }, 10);
}

// Función para mostrar el modal de creación de usuario
function mostrarModalCrearUsuario() {
    document.getElementById('createUserModal').style.display = "block";
}

// Función para cerrar el modal de creación de usuario
function cerrarModalCrearUsuario() {
    document.getElementById('createUserModal').style.display = "none";
}

// Función para cerrar el modal de edición de usuario
function cerrarModal() {
    document.getElementById('editUserModal').style.display = "none";
}

// Función para obtener la lista de usuarios y mostrarlos en la tabla
async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:5000/usuarios/');
        const usuarios = await response.json();
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Función para mostrar usuarios en la tabla
function mostrarUsuarios(usuarios) {
    const tableBody = document.getElementById('usuarios-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar nuevos usuarios

    usuarios.forEach(usuario => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = usuario.IDUsuario; // ID del usuario
        row.insertCell(1).textContent = usuario.Nombre; // Nombre del usuario
        row.insertCell(2).textContent = usuario.Correo; // Correo del usuario
        row.insertCell(3).textContent = usuario.TipoUsuarioId; // Tipo de usuario

        // Crear una celda para las acciones
        const actionsCell = row.insertCell(4);
        const actionsContainer = document.createElement('div'); // Contenedor para las acciones
        actionsContainer.className = 'actions-container'; // Clase para el contenedor

        // Crear un botón para editar el usuario
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Ícono de lápiz
        editButton.onclick = () => editarUsuario(usuario.IDUsuario); // Define la función de edición
        editButton.className = 'edit-button';
        actionsContainer.appendChild(editButton); // Agregar botón de editar al contenedor

        // Crear un botón para eliminar el usuario
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Ícono de papelera
        deleteButton.onclick = () => eliminarUsuario(usuario.IDUsuario); // Define la función de eliminación
        deleteButton.className = 'delete-button';
        actionsContainer.appendChild(deleteButton); // Agregar botón de eliminar al contenedor

        actionsCell.appendChild(actionsContainer); // Agregar contenedor de acciones a la fila
    });
}

// Función para editar un usuario
async function editarUsuario(idUsuario) {
    try {
        const response = await fetch(`http://localhost:5000/usuarios/${idUsuario}`);
        const usuario = await response.json();

        // Llenar el formulario con los datos del usuario
        document.getElementById('editIDUsuario').value = usuario.IDUsuario;
        document.getElementById('editNombre').value = usuario.Nombre;
        document.getElementById('editCorreo').value = usuario.Correo;
        document.getElementById('editTipoUsuario').value = usuario.TipoUsuarioId;

        // Mostrar el modal
        document.getElementById('editUserModal').style.display = "block";
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}

// Función para guardar los cambios de un usuario editado
async function guardarCambiosUsuario() {
    const idUsuario = document.getElementById('editIDUsuario').value;
    const nombre = document.getElementById('editNombre').value;
    const correo = document.getElementById('edit Correo').value;
    const tipoUsuario = document.getElementById('editTipoUsuario').value;

    const usuarioActualizado = {
        IDUsuario: idUsuario,
        Nombre: nombre,
        Correo: correo,
        TipoUsuarioId: tipoUsuario
    };

    try {
        const response = await fetch(`http://localhost:5000/usuarios/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioActualizado)
        });

        if (response.ok) {
            cerrarModal();
            obtenerUsuarios();
        } else {
            console.error('Error al actualizar el usuario:', response.statusText);
        }
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
    }
}

// Función para eliminar un usuario
async function eliminarUsuario(idUsuario) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
            const response = await fetch(`http://localhost:5000/usuarios/${idUsuario}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                obtenerUsuarios(); // Actualizar la lista de usuarios después de eliminar
            } else {
                console.error('Error al eliminar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    obtenerUsuarios(); // Cargar la lista de usuarios al inicio
    document.getElementById('menuToggle').addEventListener('click', toggleM3enu); // Agregar evento al botón de menú
    document.getElementById('createUserButton').addEventListener('click', mostrarModalCrearUsuario); // Agregar evento al botón de crear usuario
    document.getElementById('closeCreateUserModal').addEventListener('click', cerrarModalCrearUsuario); // Agregar evento al cerrar modal
    document.getElementById('closeEditUserModal').addEventListener('click', cerrarModal); // Agregar evento al cerrar modal de edición
});