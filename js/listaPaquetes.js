import { urlAPIAlmacenes } from "../js/configuracion.js";

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