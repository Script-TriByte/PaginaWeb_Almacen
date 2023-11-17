import { ruta } from "./variables.js";
import { urlAPIAlmacenes } from "./configuracion.js";

function revelarPreviewArticulos(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGArticulos.png)");
    $("#iconoListadoArticulos").attr("src", "./img/iconoArticuloHover.png");
    $("#botonListaPaquetes").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
    $("#botonTiposArticulos").css("opacity", "50%");
    $("#botonDestinos").css("opacity", "50%");
}

function revelarPreviewPaquetes(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGPaquetes.png)");
    $("#iconoListadoPaquetes").attr("src", "./img/iconoPaqueteHover.png");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
    $("#botonTiposArticulos").css("opacity", "50%");
    $("#botonDestinos").css("opacity", "50%");
}

function revelarPreviewLotes(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGLotes.png)");
    $("#iconoListadoLotes").attr("src", "./img/iconoLoteHover.png");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaPaquetes").css("opacity", "50%");
    $("#botonTiposArticulos").css("opacity", "50%");
    $("#botonDestinos").css("opacity", "50%");
}

function revelarPreviewTiposArticulos(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGTipoArticulo.png)");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaPaquetes").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
    $("#botonDestinos").css("opacity", "50%");
}

function revelarPreviewDestinos(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGSeguimiento.png)");
    $("#botonListaArticulos").css("opacity", "50%");
    $("#botonListaPaquetes").css("opacity", "50%");
    $("#botonListaLotes").css("opacity", "50%");
    $("#botonTiposArticulos").css("opacity", "50%");
}

function restaurarBody(){
    $(".contenedorAccesoAListas").css("background-image", "url(./img/BGAlmacen.png)");

    $("#iconoListadoArticulos").attr("src", "./img/iconoArticulo.png");
    $("#botonListaArticulos").css("opacity", "100%");
    
    $("#iconoListadoPaquetes").attr("src", "./img/iconoPaquete.png");
    $("#botonListaPaquetes").css("opacity", "100%");

    $("#iconoListadoLotes").attr("src", "./img/iconoLote.png");
    $("#botonListaLotes").css("opacity", "100%");

    $("#botonTiposArticulos").css("opacity", "100%");

    $("#botonDestinos").css("opacity", "100%");
}

function aplicarIngles() {
    document.cookie = "lang=en"
    location.reload()
    }
      
function aplicarEspanol(){
    document.cookie = "lang=es"
    location.reload()
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

$("#botonTiposArticulos").mouseover(function() {
    revelarPreviewTiposArticulos();
});

$("#botonTiposArticulos").mouseout(function() {
    restaurarBody();
});

$("#botonDestinos").mouseover(function() {
    revelarPreviewDestinos();
});

$("#botonDestinos").mouseout(function() {
    restaurarBody();
});

$('#idiomaDelSistema').click(function(){
    if(document.cookie.indexOf("lang=en") !== -1){
        aplicarEspanol()
    } else {
        aplicarIngles()
    }
});

$("#botonTiposArticulos").click(function() {
    $("#ajusteBrillo").show();
    $("#contenedorCrearTipos").show();
});

$("#cerrarContenedorCrear").click(function() {
    $("#ajusteBrillo").hide();
    $("#contenedorCrearTipos").hide();
});

$("#botonDestinos").click(function() {
    $("#ajusteBrillo").show();
    $("#contenedorCrearDestinos").show();
});

$("#cerrarContenedorDestinos").click(function() {
    $("#ajusteBrillo").hide();
    $("#contenedorCrearDestinos").hide();
});

function crearTipoArticulo(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/tipoarticulo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 401 || data.status == 404){
            throw new Error(data)
        } else {
            location.reload();
        }
    })
    .catch(error => {
        alert(error);
    });
}

function crearDestino(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/destino', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 401 || data.status == 404){
            throw new Error(data)
        } else {
            location.reload();
        }
    })
    .catch(error => {
        alert(error);
    });
}

$(document).ready(function () {
    if(document.cookie.indexOf("lang=en") !== -1){
        $('#idiomaDelSistema').css('background-image', 'url(./img/banderaUK.png)')
    } else {
        $('#idiomaDelSistema').css('background-image', 'url(./img/banderaUruguay.png)')
    }
    Promise.all([fetch(ruta), fetch('./json/elementos.json')])
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
});

document.getElementById("formularioCrearTiposArticulos").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearTipoArticulo(formData)
});

document.getElementById("formularioCrearDestinos").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearDestino(formData)
});