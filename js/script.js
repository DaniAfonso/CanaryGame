var nombre;
var correo;
var dificultad;
var cantidadMaxima = 11;
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


juego();