document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    // Verifica si el formulario existe antes de agregar el evento
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Evitar el envío por defecto del formulario

            const formData = new FormData(loginForm); // Obtener los datos del formulario

            const data = {
                IDUsuario: formData.get('username').trim(),
                Contraseña: formData.get('password').trim()
            };

            try {
                const response = await fetch('http://localhost:5000/usuarios/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Inicio de sesión exitoso:', result);
                    localStorage.setItem('token', result.token); // Almacenar el token
                    window.location.href = 'catalog.html'; // Redirigir a la página de catálogo
                } else {
                    const error = await response.json();
                    console.error('Error al iniciar sesión:', error);
                    alert('Error en el inicio de sesión: ' + error.message);
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('Error de red: ' + error.message);
            }
        });
    } else {
        console.error('El formulario de inicio de sesión no se encontró en el DOM.');
    }

    // Funcionalidad para mostrar/ocultar la contraseña
    if (togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    } else {
        console.error('Elementos para el toggle de contraseña no se encontraron en el DOM.');
    }
});