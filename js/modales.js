/* Modales - formulario, dificultad, puntuaciones, etc. */
function modales() {
    var dialogFormulario, form, dialogDificultad, dialogFinal, dialogPuntos,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        name = $("#name"),
        email = $("#email"),
        allFields = $([]).add(name).add(email),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("La longitud del " + n + " debe estar comprendida entre " +
                min + " y " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "nombre", 3, 100);
        valid = valid && checkLength(email, "email", 6, 80);

        valid = valid && checkRegexp(name, /^[a-z]([a-z_\s])+$/i, "El nombre de usuario solo puede contener letras y espacios.");
        valid = valid && checkRegexp(email, emailRegex, "daniFenomeno@gmail.com");

        if (valid) {
            nombre = name.val();
            correo = email.val();
            $("#users tbody").append("<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + email.val() + "</td>" +
                "</tr>");
            dialogFormulario.dialog("close");
            toastr.info('Bienvenido ' + nombre + '!');
            $("#nombreJugador").text(nombre);
        }
        return valid;
    }

    dialogFormulario = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Crear un usuario": addUser
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
            dialogDificultad.dialog("open");
        }
    });

    dialogDificultad = $("#dialog-dificultad").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Jugar": empezarJuego
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    dialogFinal = $("#dialog-final").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Jugar": empezarJuego
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    dialogPuntos = $("#dialog-puntos").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Jugar": empezarJuego
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialogFormulario.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    $("#changeDif").button().on("click", function () {
        dialogDificultad.dialog("open");
    });

    $("#facil, #normal, #dificil").button().on("click", function () {
        elegirDificultad(this);
    });

    function empezarJuego() {
        if (dificultad != 0) {
            dialogDificultad.dialog("close");
            puntos = 0;
            $("#puntos").text("Puntos: " + puntos);
        } else {
            toastr.error("Debes elegir una dificultad!")
        }
    };

    function elegirDificultad(e) {
        if (e.id == "facil") {
            dificultad = 4;
        } else if (e.id == "normal") {
            dificultad = 7;
        } else if (e.id == "dificil") {
            dificultad = 9;
        }
        crearImagen();
    };

    function hola() {
        console.log("Hola!!!!!");
    }
    dialogFormulario.dialog("open");
};