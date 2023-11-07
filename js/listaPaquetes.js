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

$(document).ready(function () {
    var currentLanguage = 'es';

    function toggleLanguage() {
        if (currentLanguage === 'es') {
            currentLanguage = 'en';
            setEnglish();
        } else {
            currentLanguage = 'es';
            setSpanish();
        }

        if (currentLanguage === 'es') {
            $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUruguay.png)');
        } else {
            $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUK.png)');
        }
    }


    function setEnglish() {
        $('#acercaDe').text('ABOUT');
        $('#contacto').text('CONTACT');
        $('#cerrarSesion').text('LOG OUT');
        $('#barraDeBusqueda').attr('placeholder', 'Search Package');
        $('#filtroBusqueda').text('Search Filter: ');
        $('#codigoIdentificador').text('Identifier Code');
        $('#codigoDeBulto').text('Package Code');
        $('#tipoDeArticulo').text('Article Type');
        $('#idArticulo').text('Article ID: ');
        $('#cantidadArticulos').text('Quantity of Items: ');
        $('#botonCrearPaquete').text('Embal Package');
        $('#cancelarArmado').text('Cancel Arming');
    }

    function setSpanish() {
        $('#acercaDe').text('ACERCA DE');
        $('#contacto').text('CONTACTO');
        $('#cerrarSesion').text('CERRAR SESIÓN');
        $('#barraDeBusqueda').attr('placeholder', 'Buscar Paquete');
        $('#filtroBusqueda').text('Filtro de Búsqueda: ');
        $('#codigoIdentificador').text('Código Identificador');
        $('#codigoDeBulto').text('Código de Bulto');
        $('#tipoDeArticulo').text('Tipo de Artículo');
        $('#idArticulo').text('ID del Artículo: ');
        $('#cantidadArticulos').text('Cantidad de Artículos: ');
        $('#botonCrearPaquete').text('Embalsar Paquete');
        $('#cancelarArmado').text('Cancelar Armado');
    }

    $('#idiomaDelSistema').click(function () {
        toggleLanguage();
    });

    $('#idiomaDelSistema').dblclick(function () {
        toggleLanguage();
    });
});