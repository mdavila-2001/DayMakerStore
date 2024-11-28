function cerrarMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.classList.remove('show');
    setTimeout(() => {
        menu.style.display = 'none';
    }, 300);
}

function toggleMenu() {
    const menu = document.getElementById('menuDesplegable');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    setTimeout(() => {
        menu.classList.toggle('show');
    }, 10);
}

function mostrarModalCrearUsuario() {
    document.getElementById('createUserModal').style.display = "block";
}

function cerrarModalCrearUsuario() {
    document.getElementById('createUserModal').style.display = "none";
}

function cerrarModal() {
    document.getElementById('editUserModal').style.display = "none";
}

async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:5000/usuarios/');
        const usuarios = await response.json();
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

function mostrarUsuarios(usuarios) {
    const tableBody = document.getElementById('usuarios-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = usuario.IDUsuario;
        row.insertCell(1).textContent = usuario.Nombre;
        row.insertCell(2).textContent = usuario.Correo;
        row.insertCell(3).textContent = usuario.TipoUsuarioId;

        const actionsCell = row.insertCell(4);
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'actions-container';

        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        editButton.onclick = () => editarUsuario(usuario.IDUsuario);
        editButton.className = 'edit-button';
        actionsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.onclick = () => eliminarUsuario(usuario.IDUsuario);
        deleteButton.className = 'delete-button';
        actionsContainer.appendChild(deleteButton);
        actionsCell.appendChild(actionsContainer); 
    });
}

async function editarUsuario(idUsuario) {
    try {
        const response = await fetch(`http://localhost:5000/usuarios/${idUsuario}`);
        const usuario = await response.json();

        document.getElementById('editIDUsuario').value = usuario.IDUsuario;
        document.getElementById('editNombre').value = usuario.Nombre;
        document.getElementById('editCorreo').value = usuario.Correo;
        document.getElementById('editTipoUsuario').value = usuario.TipoUsuarioId;

        document.getElementById('editUserModal').style.display = "block";
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
    }
}

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

async function eliminarUsuario(idUsuario) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
            const response = await fetch(`http://localhost:5000/usuarios/${idUsuario}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                obtenerUsuarios();
            } else {
                console.error('Error al eliminar el usuario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    obtenerUsuarios();
    document.getElementById('menuToggle').addEventListener('click', toggleM3enu);
    document.getElementById('createUserButton').addEventListener('click', mostrarModalCrearUsuario);
    document.getElementById('closeCreateUserModal').addEventListener('click', cerrarModalCrearUsuario); 
    document.getElementById('closeEditUserModal').addEventListener('click', cerrarModal);
});