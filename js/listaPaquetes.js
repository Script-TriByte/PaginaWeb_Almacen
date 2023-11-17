import { urlAPIAlmacenes } from "../js/configuracion.js";
import { ruta } from "./variables.js";

let idEditarPeso = 0;

$("#crearPaquete").click(function(){
    $("#ajusteBrillo").show();
    $(".contenedorCrearPaquetes").show();
})

$("#cerrarContenedorCrear, #cancelarArmado").click(function(){
    $("#ajusteBrillo").hide();
    $(".contenedorCrearPaquetes").hide();
})

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

function listarPaquetes(){
    fetch(urlAPIAlmacenes + '/api/v3/paquetes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const cuerpoDeLaTabla = document.getElementById('informacionPaquetes');

        if (data != null) {
            data.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
<<<<<<< HEAD
                  <td>${item.idPaquete}</td>
                  <td>${item.cantidadArticulos}</td>
                  <td>${item.peso}</td>
                  <td><button class="cambioCursor botonPeso" title="Asignar Peso" value="${item.idPaquete}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });

            const botonesPeso = document.querySelectorAll('.botonPeso');

            if(botonesPeso.length > 0){
                Array.from(botonesPeso).forEach(function(boton) {
                    boton.addEventListener('click', function() {
                        idEditarPeso = this.value;
                        mostrarFormularioAsignarPeso();
                    });
                });
            }
=======
                  <td>${item.idLote}</td>
                  <td>${item.cantidadArticulos}</td>
                  <td>${item.Peso}</td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEditar" title="Editar Paquete" value="${item.idPaquete}"></button></td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEliminar" title="Eliminar Paquete" value="${item.idPaquete}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });
>>>>>>> 318322dc79521d18cf1913d56b683e42fef16db5
        } 
        if (Array.isArray(data) && data.length === 0) {
            $('#mensajeInformacion').show();
        }
    })
    .catch(error => {
        document.getElementById('contenedorPaquetes').style.display = "none";
<<<<<<< HEAD
        $('#contenedorMensajeDeError').css('display', 'block');
    });
}

function mostrarFormularioAsignarPeso(){
    $("#ajusteBrillo").show();
    $("#contenedorAsignarPeso").show();
}

function asignarPeso(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/paquete/' + idEditarPeso, {
        method: 'PUT',
=======
        contenedorMensajeDeError.style.display = "Block";
    })
}

function crearPaquete(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/paquete', {
        method: 'POST',
>>>>>>> 318322dc79521d18cf1913d56b683e42fef16db5
        body: formData
    })
    .then(response => response.json())
    .then(data => {
<<<<<<< HEAD
        if (data.status == 401 || data.status == 404 || data.status == 500){
            throw new Error(data.mensaje)
        } else {
            location.reload();
        }
=======
        if (data.status == 200 || data.status == 201) {
            return location.reload();
        }
        throw new Error(data.mensaje)
>>>>>>> 318322dc79521d18cf1913d56b683e42fef16db5
    })
    .catch(error => {
        alert(error);
    });
}

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
        const arrayDeIdioma = idioma[3]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[3]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            if (texto.nodeName == "INPUT"){
                texto.placeholder = arrayDeIdioma[posicion]
            } else {
                texto.textContent = arrayDeIdioma[posicion]
            }
        }
    })
    listarPaquetes()
});

<<<<<<< HEAD
    listarPaquetes();
});

$("#cerrarContenedorPeso").click(function() {
    $("#ajusteBrillo").hide();
    $("#contenedorAsignarPeso").hide();
});

function crearPaquete(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/paquete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 401 || data.status == 404){
            throw new Error(data.mensaje)
        } else {
            location.reload();
        }
    })
    .catch(error => {
        alert(error);
    });
}

document.getElementById("formularioCrearPaquetes").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearPaquete(formData);
});


document.getElementById("formularioAsignarPeso").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    asignarPeso(formData);
=======
$document.getElementById("formularioCrearPaquetes").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearLote(formData)
>>>>>>> 318322dc79521d18cf1913d56b683e42fef16db5
});