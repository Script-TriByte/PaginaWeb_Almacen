import { urlAPIAlmacenes } from "../js/configuracion.js";
import { ruta } from "./variables.js";

$("#crearPaquete").click(function(){
    $("#ajusteBrillo").show();
    $(".contenedorCrearPaquetes").show();
})

$("#cerrarContenedorCrear, #cancelarArmado").click(function(){
    $("#ajusteBrillo").hide();
    $(".contenedorCrearPaquetes").hide();
})

$("#botonBuscar").click(function(){
    $("#formularioBuscarPaquetes").attr("action", urlAPIAlmacenes + "/api/v1/buscarPaquetes");
})

$("#botonCrearPaquete").click(function(){
    $("#formularioCrearPaquetes").attr("action", urlAPIAlmacenes + "/api/v1/paquetes");
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
                  <td>${item.idLote}</td>
                  <td>${item.cantidadArticulos}</td>
                  <td>${item.Peso}</td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEditar" title="Editar Paquete" value="${item.idPaquete}"></button></td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEliminar" title="Eliminar Paquete" value="${item.idPaquete}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });
        } 
        if (Array.isArray(data) && data.length === 0) {
            $('#mensajeInformacion').show();
        }
    })
    .catch(error => {
        document.getElementById('contenedorPaquetes').style.display = "none";
        contenedorMensajeDeError.style.display = "Block";
    })
}

function crearPaquete(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/paquete', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 200 || data.status == 201) {
            return location.reload();
        }
        throw new Error(data.mensaje)
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

$document.getElementById("formularioCrearPaquetes").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearLote(formData)
});