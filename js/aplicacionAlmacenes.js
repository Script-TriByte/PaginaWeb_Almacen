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
        $('#listaArticulos').text('List of Articles');
        $('#listaPaquetes').text('List of Packages');
        $('#listaLotes').text('List of Lots');
        $('#acercaDe').text('ABOUT');
        $('#contacto').text('CONTACT');
        $('#ubicacion').text('Current Warehouse');
        $('#cerrarSesion').text('LOG OUT');
    }

    function setSpanish() {
        $('#listaArticulos').text('Lista de Artículo');
        $('#listaPaquetes').text('Lista de Paquetes');
        $('#listaLotes').text('Lista de Lotes');
        $('#acercaDe').text('ACERCA DE');
        $('#contacto').text('CONTACTO');
        $('#ubicacion').text('Almacen Actual');
        $('#cerrarSesion').text('CERRAR SESIÓN');
    }

    $('#idiomaDelSistema').click(function () {
        toggleLanguage();
    });

    $('#idiomaDelSistema').dblclick(function () {
        toggleLanguage();
    });
});