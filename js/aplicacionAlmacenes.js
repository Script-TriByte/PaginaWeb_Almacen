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