document.addEventListener("DOMContentLoaded", function() {
    // Obtener las tarjetas
    const cards = document.querySelectorAll('.card');

    // Leer el JSON de provincias
    fetch('provincias.json')
        .then(response => response.json())
        .then(data => {
            // Iterar sobre las tarjetas
            cards.forEach(card => {
                // Obtener el nombre de la provincia desde el id de la tarjeta
                const nombreProvincia = card.id;

                // Encontrar la información de la provincia en el JSON
                const provincia = data.find(p => p.nombre.toLowerCase() === nombreProvincia);

                // Asignar la imagen a la tarjeta
                if (provincia) {
                    const imagen = card.querySelector('img');
                    imagen.src = provincia.imagen;
                    imagen.alt = provincia.nombre;

                    // Agregar el nombre del destino, el precio y el origen

                    const precioElement = card.querySelector('.precio');
                    precioElement.textContent = `$${provincia.precio}`;

                    const destinoElement = card.querySelector('.destino');
                    destinoElement.textContent = `Destino: ${provincia.destino}`;

                    const origenElement = card.querySelector('.origen');
                    origenElement.textContent = `Origen: ${provincia.origen}`;
                }
            });
        });
});





