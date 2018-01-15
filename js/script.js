var nombre;
var correo;
var dificultad;
var cantidadMaxima = 11;
var imagenes = [];

function crearImagen() {
  $("#gallery").children().remove();
  for (let index = 0; index < dificultad; index++) {
    $("#gallery").append("<li class='ui-widget-content ui-corner-tr'> <img class ='imagen' src='' alt=''> </li>");
  }
  rellenarImagenes();
};

function rellenarImagenes() {
  let numeroFotos = numerosAleatorios(dificultad, cantidadMaxima, false);
  let numeroIslas = numerosAleatorios(dificultad, 7, true);
  let islas = ["teneri", "laGome", "elHier", "laPalm", "granCa", "fuerte", "lanzar"];
  let path = "./img/canarias/";
  let extension = ".jpg";
  let $imgs = $(".imagen");
  let contador = 0;

  $(".imagen").each(function () {
    $(this).attr("src", path + islas[numeroIslas[contador]] + "/" + islas[numeroIslas[contador]] + "_" + contador + extension);
    contador++;
  });

  inicializarDraggable();
};

function inicializarDraggable() {

  // There's the gallery and the trash
  var $gallery = $("#gallery"),
    $trash = $(".conteIsla");

  // Let the gallery items be draggable
  $("li", $gallery).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the trash be droppable, accepting the gallery items
  $trash.droppable({
    accept: "#gallery > li",
    drop: function (event, ui) {
      deleteImage(ui.draggable);
    }
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: "#trash li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function (event, ui) {
      recycleImage(ui.draggable);
    }
  });

  // Image deletion function
  var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";

  function deleteImage($item) {
    $item.fadeOut(function () {
      var $list = $("ul", $trash).length ?
        $("ul", $trash) :
        $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

      $item.find("a.ui-icon-trash").remove();
      $item.append(recycle_icon).appendTo($list).fadeIn(function () {
        $item
          .animate({
            width: "48px"
          })
          .find("img")
          .animate({
            height: "36px"
          });
      });
    });
  }

  // Image recycle function
  //var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";

  function recycleImage($item) {
    $item.fadeOut(function () {
      $item
        .find("a.ui-icon-refresh")
        .remove()
        .end()
        .css("width", "auto")
        //.append(trash_icon)
        .find("img")
        .css("height", "240px")
        .end()
        .appendTo($gallery)
        .fadeIn();
    });
  }
  /*
    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage($link) {
      var src = $link.attr("href"),
        title = $link.siblings("img").attr("alt"),
        $modal = $("img[src$='" + src + "']");

      if ($modal.length) {
        $modal.dialog("open");
      } else {
        var img = $("<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />")
          .attr("src", src).appendTo("body");
        setTimeout(function () {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1);
      }
    }
  */
  // Resolve the icons behavior with event delegation
  $("ul.gallery > li").on("click", function (event) {
    var $item = $(this),
      $target = $(event.target);
    /*
        if ($target.is("a.ui-icon-trash")) {
          deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
          viewLargerImage($target);
        } 
        */
    if ($target.is("a.ui-icon-refresh")) {
      recycleImage($item);
    }

    return false;
  });
};


juego();