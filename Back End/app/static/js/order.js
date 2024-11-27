document.addEventListener('DOMContentLoaded', function() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const fotoPerfil = localStorage.getItem('fotoPerfil');

    if (nombreUsuario) {
        document.getElementById('usuario-nombre').textContent = nombreUsuario;
        document.getElementById('usuario-foto').src = fotoPerfil;
        document.getElementById('usuario-icono').src = fotoPerfil;

        // Crear un pedido automáticamente al cargar la página
        crearPedido();
    } else {
        document.getElementById('usuario-nombre').textContent = 'Invitado';
        document.getElementById('usuario-foto').src = '../static/img/invitado.png';
        document.getElementById('usuario-icono').src = '../static/img/invitado.png';
    }
});

async function crearPedido() {
    const IDUsuario = localStorage.getItem('IDUsuario'); // Asegúrate de que el ID del usuario esté almacenado en localStorage
    const NIT = '1111111'; // Puedes cambiar esto según sea necesario

    const pedidoData = {
        IDUsuario: IDUsuario,
        NIT: NIT
    };

    try {
        const response = await fetch('http://localhost:5000/pedidos/crear_pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedidoData)
        });

        if (response.ok) {
const nuevoPedido = await response.json();
            console.log('Pedido creado con éxito:', nuevoPedido);
        } else {
            console.error('Error al crear el pedido:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}