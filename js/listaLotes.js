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

$("#botonBuscar").click(function(){
    $("#formularioBuscarLotes").attr("action", urlAPIAlmacenes + "/api/v1/buscarLotes");
})

$("#botonCrearLote").click(function(){
    $("#formularioCrearLotes").attr("action", urlAPIAlmacenes + "/api/v1/lotes");
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

});