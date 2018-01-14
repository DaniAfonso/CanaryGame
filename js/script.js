var nombre;
var correo;
var dificultad;
var imagenes = [];

$(function () {
  $("#draggable1").draggable({
    snap: true
  });
  $("#draggable2").draggable({
    snap: ".ui-widget-header"
  });
  $("#draggable3").draggable({
    snap: ".ui-widget-header",
    snapMode: "outer"
  });
  $("#draggable4").draggable({
    grid: [20, 20]
  });
  $("#draggable5").draggable({
    grid: [80, 80]
  });
});


/**** Formulario modal, nuevo usuario. */

function jugar() {

  var dialogFormulario, form, dialogDificultad,
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
    }
    return valid;
  }

  dialogFormulario = $("#dialog-form").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Crear un usuario": addUser,
      Cancel: function () {
        dialogFormulario.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
      dialogDificultad.dialog("open");
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
    console.log("Empezar a jugar!!!");

    dialogDificultad.dialog("close");
  };

  function elegirDificultad(e) {
    console.log("Elegir dificiltad");
    console.log(e.id);
    if (e.id == "facil") {
      dificultad = 4;
    } else if (e.id == "normal") {
      dificultad = 7;
    } else if (e.id == "dificil") {
      dificultad = 9;
    }

    aleatoriosSinRepetir();
    recorrerCarpeta();
  }

  dialogDificultad = $("#dialog-dificultad").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Jugar": empezarJuego,
      Cancel: function () {
        dialogDificultad.dialog("close");
      }
    },
    close: function () {
      form[0].reset();
      allFields.removeClass("ui-state-error");
    }
  });

  //dialogFormulario.dialog("open");
};

//Crea un array de objetos aleatorios sin repetirse
function aleatoriosSinRepetir() {
  luck = [];
  do {
    var item = Math.floor(Math.random() * dificultad);
    if (luck.indexOf(item) === -1) {
      luck.push(item);
    }
  } while (luck.length != dificultad);
  console.log(luck);
};

function recorrerCarpeta() {
  var folder = "././img/";

  $.ajax({
    url: folder,
    success: function (data) {
      $(data).find("a").attr("href", function (i, val) {
        if (val.match(/\.(jpe?g|png|gif)$/)) {
          $("body").append("<img src='" + folder + val + "'>");
          console.log(val);
        }
      });
    }
  });
  console.log("Las imagenes son: " + imagenes);
  //$("#imagen1").attr("src", "6.jpg");
};

jugar();
recorrerCarpeta();