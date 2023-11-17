import { ruta } from "./variables.js";
import { urlAPIAlmacenes } from "./configuracion.js";

let contenedorInformacion;
let idEditarArticulo = 0;

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
                  <td><button class="botonMasInfo cambioCursor botonInfo" title="Ver mas informacion" value="${item.idArticulo}">Info.</button></td>
                  <td><button class="botonMasInfo cambioCursor botonEditar" title="Editar Artículo" value="${item.idArticulo}"></button></td>
                  <td><button class="botonMasInfo cambioCursor botonEliminar"  title="Eliminar Artículo" value="${item.idArticulo}"></button></td>
                `;
                cuerpoDeLaTabla.appendChild(fila);
            });

            const botonesMasInfo = document.querySelectorAll('.botonInfo');

            if(botonesMasInfo.length > 0){
                Array.from(botonesMasInfo).forEach(function(boton) {
                    boton.addEventListener('click', function() {
                        let id = this.value;
                        mostrarMasInformacion(id);
                    });
                });
            }

            const botonesEditar = document.querySelectorAll('.botonEditar');

            if(botonesEditar.length > 0){
                Array.from(botonesEditar).forEach(function(boton) {
                    boton.addEventListener('click', function() {
                        idEditarArticulo = this.value;
                        mostrarFormularioModificarArticulos();
                    });
                });
            }

            const botonesEliminar = document.querySelectorAll('.botonEliminar');

            if(botonesEliminar.length > 0){
                Array.from(botonesEliminar).forEach(function(boton) {
                    boton.addEventListener('click', function() {
                        const id = this.value;
                        eliminarArticulo(id);
                    });
                });
            }
        } 
        if (Array.isArray(data) && data.length === 0) {
            $('#mensajeInformacion').show();
        }
    })
    .catch(error => {
        document.getElementById('contenedorArticulos').style.display = "none";
        $('#contenedorMensajeDeError').css('display', 'block');
    })
}

function mostrarFormularioModificarArticulos(){
    $("#ajusteBrillo").show();
    $(".ArticuloAModificar").show();
}

function crearArticulo(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/articulo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 401 || data.status == 404){
            throw new Error(data.mensaje)
        }
        location.reload();
    })
    .catch(error => {
        alert(error);
    });
}

function modificarArticulo(formData) {
    fetch(urlAPIAlmacenes + '/api/v3/articulo/' + idEditarArticulo, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == 401 || data.status == 404 || data.status == 500){
            throw new Error(data.mensaje)
        }
        location.reload();
    })
    .catch(error => {
        alert(error);
    });
}

function eliminarArticulo(id){
    fetch(urlAPIAlmacenes + '/api/v3/articulo/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
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

$("#cerrarContenedorModificar").click(function() {
    $("#ajusteBrillo").hide();
    $(".ArticuloAModificar").hide();
});

async function mostrarMasInformacion(id) {
    const respuestaInfo = await fetch(urlAPIAlmacenes + '/api/v3/tipoarticulo/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })

    const data = await respuestaInfo.json();

    contenedorInformacion = document.getElementById('contenedorTiposDeArticulo');
    contenedorInformacion.style.display = "block";
    $("#ajusteBrillo").show();
    data.forEach(item => {
        var informacion = document.createElement("label");
        informacion.className = "labelTipoArticulo";
        informacion.textContent = item.tipo + ' - ' + item.nombre;
        contenedorInformacion.appendChild(informacion);
    });
}

$("#cerrarContenedorTipos").click(function() {
    $("#ajusteBrillo").hide();
    $("#contenedorTiposDeArticulo").hide();
    document.querySelectorAll(".labelTipoArticulo").forEach(label => {
        label.remove();
    });
});

document.getElementById("formularioCrearArticulos").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    crearArticulo(formData)
});

document.getElementById("formularioModificarArticulos").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    modificarArticulo(formData)
});