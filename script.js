document.addEventListener("DOMContentLoaded", function() {
    // Obtener las tarjetas
    const cards = document.querySelectorAll('.card');

    // Leer el JSON de provincias
    const url = 'https://mocki.io/v1/cabf8116-c704-42ad-84ff-8e53aaae70d8';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Función de filtro
            function filtrarTarjetas(destinosMostrar) {
                cards.forEach(card => {
                    const nombreProvincia = card.id;
                    const mostrar = destinosMostrar.includes(nombreProvincia);
                    card.style.display = mostrar ? 'block' : 'none';
                });
            }

            // Asignar eventos a los botones de filtros rápidos
            const inviernoButton = document.getElementById('inviernoButton');
            const veranoButton = document.getElementById('veranoButton');
            const visitadaButton = document.getElementById('visitadaButton');

            inviernoButton.addEventListener('click', function() {
                const destinosMostrar = data.filter(d => d.invierno).map(d => d.nombre);
                filtrarTarjetas(destinosMostrar);
            });

            veranoButton.addEventListener('click', function() {
                const destinosMostrar = data.filter(d => d.verano).map(d => d.nombre);
                filtrarTarjetas(destinosMostrar);
            });

            visitadaButton.addEventListener('click', function(){
                const destinosMostrar = data.filter(d => d.visitada).map(d => d.nombre);
                filtrarTarjetas(destinosMostrar);
            })

            // Restablecer todas las tarjetas cuando se hace clic en "Mostrar Todos"
            document.getElementById('mostrarTodos').addEventListener('click', function() {
                cards.forEach(card => {
                    card.style.display = 'block';
                });
            });
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

                    // Agregar el nombre del destino y el precio
                    const precioElement = card.querySelector('.precio');
                    precioElement.textContent = `$${provincia.precio}`;

                    const destinoElement = card.querySelector('.destino');
                    destinoElement.textContent = `Destino: ${provincia.destino}`;

                    const origenElement = card.querySelector('.origen');
                    origenElement.textContent = `Origen: ${provincia.origen}`;

                    // Agregar detalles del paquete turístico
                    const backContent = card.querySelector('.back');
                    backContent.innerHTML = `
                        <h3>Paquete a ${provincia.destino}</h3>
                        <p>${provincia.texto}</p>
                        <p>Estadia: ${provincia.duracion}</p>
                        
                            ${provincia.incluye.map(item => `<li>${item}</li>`).join('')}
                        
                            <button class="contratar-button" onclick="window.location.href='suscripcion.html'">Comprar</button>
                    `;
                }
            });
        });
});

function buscar(){
    let origen = document.getElementById('origen').value;
    let destino = document.getElementById('destino').value;


    if (origen != 'seleccion' && destino != 'selecciondestino') {
        window.location.href='suscripcion.html'
    }
    
}


var form = document.getElementById("my-form");
var submitButton = document.getElementById("submit-button");

function hasSubmittedForm() {
  return localStorage.getItem('hasSubmittedForm') === 'true';
}

function setSubmittedFlag() {
  localStorage.setItem('hasSubmittedForm', 'true');
}

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");

  if (hasSubmittedForm()) {
    status.innerHTML = "Ya has enviado el formulario.";
    return;
  }

  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Gracias por contactarnos, te escribiremos pronto";
      form.reset();
      setSubmittedFlag(); 
      submitButton.disabled = true; 
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Parece que hay un problema"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Parece que hay un problema"
  });
}

form.addEventListener("submit", handleSubmit);

    

function redireccionar() {
    window.location.href = 'index.html';

}








