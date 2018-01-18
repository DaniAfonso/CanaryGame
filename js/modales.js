/* Modales - formulario, dificultad, puntuaciones, etc. */
function Modales() {
    this.dialogFormulario;
    this.form;
    this.dialogDificultad;
    this.dialogFinal;
    this.dialogPuntos;
    this.emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    this.name = $("#name");
    this.email = $("#email");
    this.allFields = $([]).add(this.name).add(this.email);
    this.tips = $(".validateTips");

    this.inicializar();
}

Modales.prototype.inicializar = function () {
    this.dialogFormulario = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Crear un usuario": this.addUser.bind(this)
        },
        close: () => {
            this.form[0].reset();
            this.allFields.removeClass("ui-state-error");
            this.dialogDificultad.dialog("open");
        }
    });

    this.dialogDificultad = $("#dialog-dificultad").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Jugar": () => {
                this.elegirDificultad($("input[name=dificultad]:checked").val());
                this.dialogDificultad.dialog("close");
                puntos = 0;
                $("#puntos").text("Puntos: " + puntos);
            }
        },
        close: () => {
            this.form[0].reset();
            this.allFields.removeClass("ui-state-error");

        }
    });

    this.dialogFinal = $("#dialog-final").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Nueva Partida": () => {
                this.dialogFinal.dialog("close");
                this.dialogDificultad.dialog("open");
            },
            "Fin": () => {
                $("#puntosNombre").html("Nombre: " + nombre);
                $("#puntosPuntos").html("Puntos: " + puntos);
                this.dialogFinal.dialog("close");
                this.dialogPuntos.dialog("open");
            }
        },
        close: () => {
            this.form[0].reset();
            this.allFields.removeClass("ui-state-error");
        }
    });

    this.dialogPuntos = $("#dialog-puntos").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Jugar": () => {
                this.dialogPuntos.dialog("close");
                this.dialogDificultad.dialog("open");
            }
        },
        close: () => {
            this.form[0].reset();
            this.allFields.removeClass("ui-state-error");
        }
    });

    this.form = this.dialogFormulario.find("form").on("submit", (event) => {
        event.preventDefault();
        this.addUser();
    });

    $("#changeDif").button().on("click", () => {
        this.dialogDificultad.dialog("open");
    });
    /*
        $("#facil, #normal, #dificil").button().on("click", () => {
            this.elegirDificultad($("#facil, #normal, #dificil").button());
        });
    */

}
Modales.prototype.updateTips = function (t) {
    this.tips
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        tips.removeClass("ui-state-highlight", 1500);
    }, 500);
}
Modales.prototype.checkLength = function (o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips("La longitud del " + n + " debe estar comprendida entre " +
            min + " y " + max + ".");
        return false;
    } else {
        return true;
    }
}
Modales.prototype.checkRegexp = function (o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    } else {
        return true;
    }
}

Modales.prototype.addUser = function () {
    var valid = true;
    $(this.allFields).removeClass("ui-state-error");

    valid = valid && this.checkLength(this.name, "nombre", 3, 100);
    valid = valid && this.checkLength(this.email, "email", 6, 80);

    valid = valid && this.checkRegexp(this.name, /^[a-z]([a-z_\s])+$/i, "El nombre de usuario solo puede contener letras y espacios.");
    valid = valid && this.checkRegexp(this.email, this.emailRegex, "daniFenomeno@gmail.com");

    if (valid) {
        nombre = this.name.val();
        correo = this.email.val();
        $("#users tbody").append("<tr>" +
            "<td>" + this.name.val() + "</td>" +
            "<td>" + this.email.val() + "</td>" +
            "</tr>");
        this.dialogFormulario.dialog("close");
        toastr.info('Bienvenido ' + nombre + '!');
        $("#nombreJugador").text(nombre);
    }
    return valid;
}

Modales.prototype.empezarJuego = function () {
    if (dificultad != 0) {
        this.dialogDificultad.dialog("close");
        puntos = 0;
        $("#puntos").text("Puntos: " + puntos);
    } else {
        toastr.error("Debes elegir una dificultad!")
    }
};

Modales.prototype.elegirDificultad = function (e) {
    /*
    if (e.id == "facil") {
        dificultad = 4;
    } else if (e.id == "normal") {
        dificultad = 7;
    } else if (e.id == "dificil") {
        dificultad = 9;
    }
    */
    dificultad = e;
    crearImagen();
};

Modales.prototype.hola = function () {
    this.dialogFinal.dialog("open");
}