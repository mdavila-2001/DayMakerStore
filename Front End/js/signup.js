const fotoInput = document.getElementById('foto-perfil');
        const eliminarFotoBtn = document.getElementById('eliminar-foto');

        fotoInput.addEventListener('change', function() {
            if (fotoInput.files.length > 0) {
                eliminarFotoBtn.style.display = 'inline'; // Mostrar botón de eliminar
            }
        });

        eliminarFotoBtn.addEventListener('click', function() {
            fotoInput.value = ''; // Limpiar el input de archivo
            eliminarFotoBtn.style.display = 'none'; // Ocultar botón de eliminar
        });