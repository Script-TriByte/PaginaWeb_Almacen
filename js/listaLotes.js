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
        $('#barraDeBusqueda').attr('placeholder', 'Search Lot');
        $('#filtroBusqueda').text('Search Filter: ');
        $('#codigoIdentificador').text('Identifier Code');
        $('#codigoDeBulto').text('Package Code');
        $('#tipoDeArticulo').text('Article Type');
        $('#idLote').text('Lot ID: ');
        $('#cantidadPaquetes').text('Number of Packages: ');
        $('#destino').text('Destination: ');
        $('#almacen').text('Store: ');
        $('#botonCrearLote').text('Embalm Lot');
        $('#eliminarArmado').text('Delete Assembly');
    }

    function setSpanish() {
        $('#acercaDe').text('ACERCA DE');
        $('#contacto').text('CONTACTO');
        $('#cerrarSesion').text('CERRAR SESIÓN');
        $('#barraDeBusqueda').attr('placeholder', 'Buscar Lote');
        $('#filtroBusqueda').text('Filtro de Búsqueda: ');
        $('#codigoIdentificador').text('Código Identificador');
        $('#codigoDeBulto').text('Código de Bulto');
        $('#tipoDeArticulo').text('Tipo de Artículo');
        $('#idLote').text('ID del Lote: ');
        $('#cantidadPaquetes').text('Cantidad de Paquetes: ');
        $('#destino').text('Destino: ');
        $('#almacen').text('Almacén: ');
        $('#botonCrearLote').text('Embalsar Lote');
        $('#eliminarArmado').text('Eliminar Armado');
    }

    $('#idiomaDelSistema').click(function () {
        toggleLanguage();
    });

    $('#idiomaDelSistema').dblclick(function () {
        toggleLanguage();
    });
});