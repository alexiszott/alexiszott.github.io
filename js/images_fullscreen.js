// Sélectionne toutes les images avec la classe "open-fullscreen"
const images = document.querySelectorAll('.open-fullscreen');
const fullscreenContainer = document.getElementById('fullscreen-container');
const fullscreenImage = document.getElementById('fullscreen-image');
const closeFullscreen = document.getElementById('close-fullscreen');

// Ajoute un événement de clic sur chaque image
images.forEach((image) => {
    image.addEventListener('click', () => {
        // Change l'image dans le conteneur de plein écran
        fullscreenImage.src = image.src;
        // Affiche le conteneur de plein écran
        fullscreenContainer.classList.remove('hidden');
        // Bloque le scroll de la page
        document.body.classList.add('no-scroll');
    });
});

// Fermer le mode plein écran
closeFullscreen.addEventListener('click', () => {
    fullscreenContainer.classList.add('hidden');
    fullscreenImage.src = "";  // Remet à zéro l'image après fermeture
    // Réactive le scroll de la page
    document.body.classList.remove('no-scroll');
});
