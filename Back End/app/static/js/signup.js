const fotoInput = document.getElementById('foto-perfil');
const eliminarFotoBtn = document.getElementById('eliminar-foto');
let imageUrl = ''; // Variable para almacenar la URL de la imagen

// Manejar el cambio en el input de archivo
fotoInput.addEventListener('change', function() {
    if (fotoInput.files.length > 0) {
        eliminarFotoBtn.style.display = 'inline'; // Mostrar botón de eliminar

        const file = fotoInput.files[0]; // Obtener el primer archivo
        const reader = new FileReader(); // Crear un nuevo FileReader

        // Definir la función que se ejecutará cuando se haya leído el archivo
        reader.onload = function(e) {
            imageUrl = e.target.result; // Esta es la URL en base64
            console.log('URL de la imagen:', imageUrl); // Mostrar la URL en consola
        };

        // Leer el archivo como una URL de datos (base64)
        reader.readAsDataURL(file);
    }
});

// Manejar el clic en el botón de eliminar
eliminarFotoBtn.addEventListener('click', function() {
    fotoInput.value = ''; // Limpiar el input de archivo
    eliminarFotoBtn.style.display = 'none'; // Ocultar botón de eliminar
    imageUrl = ''; // Limpiar la URL de la imagen
});

const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const signupPasswordInput = document.getElementById('signup-password');
const signupEyeIcon = document.getElementById('signup-eyeIcon');
toggleSignupPassword.addEventListener('click', function () {
    const type = signupPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    signupPasswordInput.setAttribute('type', type);
    
    signupEyeIcon.classList.toggle('fa-eye');
    signupEyeIcon.classList.toggle('fa-eye-slash');
});

// Manejar el envío del formulario
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar el envío por defecto del formulario

    const formData = new FormData(signupForm); // Obtener los datos del formulario

    // Convertir FormData a un objeto para JSON
    const data = {
        IDUsuario: formData.get('nombre-usuario').trim(),
        Nombre: formData.get('nombre').trim(),
        Correo: formData.get('correo').trim(),
        Contraseña: formData.get('contraseña').trim(),
        Celular: formData.get('celular').trim(),
        Direccion: formData.get('direccion').trim(),
        Edad: parseInt(formData.get('edad')),
        TipoUsuarioId: formData.get('tipo-usuario').trim(),
        fotoPerfil: imageUrl // Asignar la URL de la imagen
    };

    try {
        const response = await fetch('http://localhost:5000/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // Convertir el objeto a JSON
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Usuario registrado:', result);
            alert('Registro exitoso');
            // Redirigir o limpiar el formulario según sea necesario
            window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
        } else {
            const error = await response.json();
            console.error('Error al registrar usuario:', error);
            alert('Error en el registro: ' + error.message);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red: ' + error.message);
    }
});

// Cargar tipos de usuario al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:5000/tipo_usuarios/');
        const tiposUsuario = await response.json();

        const tipoUsuarioSelect = document.getElementById('tipo-usuario');
        tiposUsuario.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.IDType;
            option.textContent = tipo.Tipo;
            tipoUsuarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar tipos de usuario:', error);
    }
});