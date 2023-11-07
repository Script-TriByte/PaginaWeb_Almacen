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
    }

    function setSpanish() {
        $('#acercaDe').text('ACERCA DE');
        $('#contacto').text('CONTACTO');
        $('#cerrarSesion').text('CERRAR SESIÓN');
    }

    $('#idiomaDelSistema').click(function () {
        toggleLanguage();
    });

    $('#idiomaDelSistema').dblclick(function () {
        toggleLanguage();
    });
});