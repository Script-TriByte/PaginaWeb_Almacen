/*
$('#idiomaDelSistema').css('background-image', 'url(/img/banderaUK.png)');
$('#idiomaDelSistema').css('background-image', 'url(/img/banderaUruguay.png)');
*/

import { ruta } from "./variables.js";

function revelarPreviewArticulos(){
    $(".contenedorAccesoAListas").css("background-image", "url(/img/BGArticulos.png)");
    $("#iconoListadoArticulos").attr("src", "/img/iconoArticuloHover.png");
    $("#botonListaPaquetes").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
}

function revelarPreviewPaquetes(){
    $(".contenedorAccesoAListas").css("background-image", "url(/img/BGPaquetes.png)");
    $("#iconoListadoPaquetes").attr("src", "/img/iconoPaqueteHover.png");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
}

function revelarPreviewLotes(){
    $(".contenedorAccesoAListas").css("background-image", "url(/img/BGLotes.png)");
    $("#iconoListadoLotes").attr("src", "/img/iconoLoteHover.png");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaPaquetes").css("opacity", "50%");
}

function restaurarBody(){
    $(".contenedorAccesoAListas").css("background-image", "url(/img/BGAlmacen.png)");

    $("#iconoListadoArticulos").attr("src", "/img/iconoArticulo.png");
    $("#botonListaArticulos").css("opacity", "100%");
    
    $("#iconoListadoPaquetes").attr("src", "/img/iconoPaquete.png");
    $("#botonListaPaquetes").css("opacity", "100%");

    $("#iconoListadoLotes").attr("src", "/img/iconoLote.png");
    $("#botonListaLotes").css("opacity", "100%");
}

$("#botonListaArticulos").mouseover(function() {
    revelarPreviewArticulos();
});

$("#botonListaArticulos").mouseout(function() {
    restaurarBody();
});

$("#botonListaPaquetes").mouseover("mouseover", function() {
    revelarPreviewPaquetes();
});

$("#botonListaPaquetes").mouseout(function() {
    restaurarBody();
});

$("#botonListaLotes").mouseover(function() {
    revelarPreviewLotes();
});

$("#botonListaLotes").mouseout(function() {
    restaurarBody();
});

$(document).ready(function () {
    Promise.all([fetch(ruta), fetch('./elementos.json')])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((data) => {
        const idioma = data[0];
        const arrayDeIdioma = idioma[0]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[0]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            texto.textContent = arrayDeIdioma[posicion]
        }
    })

    function aplicarIngles() {
        document.cookie = "lang=en"
        location.reload()
      }
      
      function aplicarEspanol(){
        document.cookie = "lang=es"
        location.reload()
      }
});