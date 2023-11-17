import { urlAPIAlmacenes } from "../js/configuracion.js";
import { ruta } from "./variables.js";

$("#crearLote").click(function(){
    $("#ajusteBrillo").show();
    $(".contenedorCrearLotes").show();
})

$("#cerrarContenedorCrear, #eliminarArmado").click(function(){
    $("#ajusteBrillo").hide();
    $(".contenedorCrearLotes").hide();
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

function listarLotes(){
    fetch(urlAPIAlmacenes + '/api/v3/lotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const cuerpoDeLaTabla = document.getElementById('informacionLotes');

        if (data != null) {
            data.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                  <td>${item.idLote}</td>
                  <td>${item.cantidadPaquetes}</td>
                  <td>${item.idDestino}</td>
                  <td>${item.idAlmacen}</td>
                  <td><button class="botonMasInfo cambioCursor botonAsignar" title="Asignar Chofer" value="${item.idLote}"></button></td>
                  <td><button class="botonMasInfo cambioCursor botonEliminar" title="Eliminar Lote" value="${item.idLote}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });

            const botonesMasInfo = document.querySelectorAll('.botonEliminar');

            if(botonesMasInfo.length > 0){
                Array.from(botonesMasInfo).forEach(function(boton) {
                    boton.addEventListener('click', function() {
                        let id = this.value;
                        eliminarLote(id);
                    });
                });
            }
        } 
        if (Array.isArray(data) && data.length === 0) {
            $('#mensajeInformacion').show();
        }
    })
    .catch(error => {
        document.getElementById('contenedorLotes').style.display = "none";
        $('#contenedorMensajeDeError').css('display', 'block');
    })
}

function crearLote(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/lote', {
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

function eliminarLote(id){
    fetch(urlAPIAlmacenes + '/api/v3/lote/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
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
        const arrayDeIdioma = idioma[2]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[2]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            if (texto.nodeName == "INPUT"){
                texto.placeholder = arrayDeIdioma[posicion]
            } else {
                texto.textContent = arrayDeIdioma[posicion]
            }
        }
    })

document.getElementById("formularioCrearLotes").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearLote(formData)
});
