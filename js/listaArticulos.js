import { ruta } from "./variables.js";
import { urlAPIAlmacenes } from "./configuracion.js";

let contenedorInformacion;

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

function cambiarIdioma(){
    Promise.all([fetch('/' + ruta), fetch('/json/elementos.json')])
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((data) => {
        const idioma = data[0];
        const arrayDeIdioma = idioma[1]
        const arrayDeTextos = data[1];
        const arrayDeTextos2 = arrayDeTextos[1]

        for (let posicion = 0; posicion < Object.keys(arrayDeTextos2).length; posicion++){
            let texto = document.getElementById(arrayDeTextos2[posicion])
            if (texto.nodeName == "INPUT"){
                texto.placeholder = arrayDeIdioma[posicion]
            } else {
                texto.textContent = arrayDeIdioma[posicion]
            }   
        }
    })
}

function listarArticulos(){
    fetch(urlAPIAlmacenes + '/api/v3/articulos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const cuerpoDeLaTabla = document.getElementById('informacionArticulos');

        if (data != null) {
            data.forEach(item => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                  <td>${item.idArticulo}</td>
                  <td>${item.nombre}</td>
                  <td>${item.anioCreacion}</td>
                  <td><button class="botonMasInfo cambioCursor" id="botonInformacion" value="${item.idArticulo}">Info.</button></td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEditar" title="Editar Artículo" value="${item.idArticulo}"></button></td>
                  <td><button class="botonMasInfo cambioCursor" id="imagenBotonEliminar" title="Eliminar Artículo" value="${item.idArticulo}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });
        } 
        if (Array.isArray(data) && data.length === 0) {
            $('#mensajeInformacion').show();
        }
    })
    .catch(error => {
        document.getElementById('contenedorArticulos').style.display = "none";
        contenedorMensajeDeError.style.display = "Block";
    })
}

function crearArticulo(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/articulo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 200 || data.status == 201) {
            return location.reload();
        }
        throw new Error(data.mensaje)
    })
    .catch(error => {
        alert(error);
    });
}

$(document).ready(function () {
    if(document.cookie.indexOf("lang=en") !== -1){
        $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUK.png)')
    } else {
        $('#idiomaDelSistema').css('background-image', 'url(/img/banderaUruguay.png)')
    }

    cambiarIdioma();

    listarArticulos();
});

$("#crearArticulo").click(function() {
    $("#ajusteBrillo").show();
    $("#contenedorCrear").show();
});

$("#cerrarContenedorCrear").click(function() {
    $("#ajusteBrillo").hide();
    $("#contenedorCrear").hide();
});

$("#botonBuscar").click(function(){
    $("#formularioBuscarArticulos").attr("action", "/articulos/buscar");
});

$("#botonCrearAlmacenes").click(function(){
    $("#formularioCrearArticulos").attr("action", "/articulos/crear");
});

$("#imagenBotonEditar").click(function() {
    $("#ajusteBrillo").show();
    $(".ArticuloAModificar").show();
    $("#formularioModificarArticulos").attr("action", "api/v2/articulos/" +  valorInput);
});

$("#cerrarContenedorModificar").click(function() {
    $("#ajusteBrillo").hide();
    $(".ArticuloAModificar").hide();
});

$("#imagenBotonEliminar").click(function() {
    $("#ajusteBrillo").show();
    $(".ArticuloAEliminar").show();
    $("#formularioEliminarArticulos").attr("action", "api/v2/articulos/" +  valorInput);
});

$("#cerrarContenedorEliminar").click(function() {
    $("#ajusteBrillo").hide();
    $(".ArticuloAEliminar").hide();
});

function mostrarMasInformacion(id) {
    fetch(urlAPIAlmacenes + '/api/v3/tipoarticulo/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        contenedorInformacion = document.getElementById('contenedorTiposDeArticulo');
        contenedorInformacion.style.display = "block";
        data.forEach(item => {
            var informacion = document.createElement("label");
            informacion.textContent = item.tipo + ' - ' + item.nombre;
            contenedorInformacion.appendChild(informacion);
        });
    })
}

document.getElementById("formularioCrearArticulos").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearArticulo(formData)
});