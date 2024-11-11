// Función para cargar el logo en la pantalla
function loadLogo() {
    // Crear el contenedor del logo
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';

    // Crear el círculo
    const circle = document.createElement('div');
    circle.className = 'circle';

    // Crear el texto principal
    const mainText = document.createElement('div');
    mainText.className = 'main-text';
    mainText.textContent = 'Space Conquest';

    // Crear el subtítulo
    const subText = document.createElement('div');
    subText.className = 'sub-text';
    subText.textContent = 'Earthly Revolution, Towards The Great Cosmos';

    // Agregar el círculo y textos al contenedor
    logoContainer.appendChild(circle);
    logoContainer.appendChild(mainText);
    logoContainer.appendChild(subText);

    // Agregar el contenedor al body
    document.body.appendChild(logoContainer);
}

// Cargar el logo al iniciar la página
window.onload = loadLogo;
