import { ruta } from "./variables.js";
import { urlAPIAlmacenes } from "./configuracion.js";

let contenedorInformacion;

function mostrarMasInformacion(id) {
    fetch(urlAPIAlmacenes + '/api/v3/tipoarticulo/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        contenedorInformacion = document.getElementById('contenedorTiposDeArticulo');
        contenedorInformacion.style.display = "block";
        data.forEach(item => {
            var informacion = document.createElement("label");
            informacion.textContent = item.tipo + ' - ' + item.nombre;
            contenedorInformacion.appendChild(informacion);
        });
    })
}

function aplicarIngles() {
    document.cookie = "lang=en;path=/"
    location.reload()
}
  
function aplicarEspanol(){
    document.cookie = "lang=es;path=/"
    location.reload()
}

$('#idiomaDelSistema').click(function(){
    if(document.cookie.indexOf("lang=en") !== -1){
        aplicarEspanol()
    } else {
        aplicarIngles()
    }
});

document.getElementById('informacionArticulos').addEventListener('click', function(event) {
    if (event.target.classList.contains('botonMasInfo')) {
        let id = event.target.id;
        mostrarMasInformacion(id);
    }
});

$(document).ready(function () {
    if(document.cookie.indexOf("lang=en") !== -1){
        $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUK.png)')
    } else {
        $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUruguay.png)')
    }

    Promise.all([fetch('/' + ruta), fetch('/json/elementos.json')])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((data) => {
        const idioma = data[0];
        const arrayDeIdioma = idioma[1]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[1]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            texto.textContent = arrayDeIdioma[posicion]
        }
    })

    fetch(urlAPIAlmacenes + '/api/v3/articulos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const cuerpoDeLaTabla = document.getElementById('informacionArticulos');

        if (data != null) {
            data.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                  <td>${item.idArticulo}</td>
                  <td>${item.nombre}</td>
                  <td>${item.anioCreacion}</td>
                  <td><button class="botonMasInfo" id="${item.idArticulo}">Info.</button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });
        } else {
            cuerpoDeLaTabla.style.display = "none";
        }
    })
    .catch(error => {
        document.getElementById('contenedorArticulos').style.display = "none";
        contenedorMensajeDeError.style.display = "Block";
    })
});