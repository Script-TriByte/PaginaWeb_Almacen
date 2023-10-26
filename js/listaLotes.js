import { urlAPIAlmacenes } from "../js/configuracion.js";

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