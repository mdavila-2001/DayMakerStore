const fotoInput = document.getElementById('foto-perfil');
const eliminarFotoBtn = document.getElementById('eliminar-foto');
let imageUrl = '';

fotoInput.addEventListener('change', function() {
    if (fotoInput.files.length > 0) {
        eliminarFotoBtn.style.display = 'inline';

        const file = fotoInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imageUrl = e.target.result;
            console.log('URL de la imagen:', imageUrl);
        };
        reader.readAsDataURL(file);
    }
});

// Manejar el clic en el botón de eliminar
eliminarFotoBtn.addEventListener('click', function() {
    fotoInput.value = '';
    eliminarFotoBtn.style.display = 'none';
    imageUrl = '';
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

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(signupForm);

    const data = {
        IDUsuario: formData.get('nombre-usuario').trim(),
        Nombre: formData.get('nombre').trim(),
        Correo: formData.get('correo').trim(),
        Contraseña: formData.get('contraseña').trim(),
        Celular: formData.get('celular').trim(),
        Direccion: formData.get('direccion').trim(),
        Edad: parseInt(formData.get('edad')),
        TipoUsuarioId: formData.get('tipo-usuario').trim(),
        fotoPerfil: imageUrl
    };

    try {
        const response = await fetch('http://localhost:5000/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Usuario registrado:', result);
            alert('Registro exitoso');
            window.location.href = 'login.html';
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