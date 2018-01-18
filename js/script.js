var nombre;
var correo;
var dificultad = 0;
var puntos = 0;
var cantidadMaxima = 11;
var coor = [];
var moda = new Modales();

$(document).ready(function () {
  moda.dialogFormulario.dialog("open");
});

function crearImagen() {
  $("li").remove();
  for (let index = 0; index < dificultad; index++) {
    $("#gallery").append("<li class='ui-widget-content ui-corner-tr'> <img class ='imagen' src='' alt=''> </li>");
  }
  eleccionImagenes();
};

/*
function eleccionImagenes() {
  cor = [];
  let islasMinimas = numerosAleatorios(4, 6, false);
  let item = [];
  for (let i = 0; i < dificultad; i++) {
    let fotoAux = Math.floor(Math.random() * cantidadMaxima);
    if (i >= islasMinimas.length) {
      let islaAux = Math.floor(Math.random() * 7);
      item[i] = [islaAux, fotoAux];
    } else
      item[i] = [islasMinimas[i], fotoAux];
    if (cor.indexOf(item[i]) === -1) {
      
      cor.push(item[i]);
    } else {
      i--;
      console.log("Hola entra")
    }
  }
  
  console.log(cor);
  console.log(cor[0]);
  console.log(cor[0][0]);
  console.log(cor[0][1]);
  
  displayNoneIslas();
  rellenarImagenes();
}
*/

function eleccionImagenes() {
  cor = [];
  let islasMinimas = numerosAleatorios(4, 6, false);
  let item = {
    isla: 0,
    foto: 0
  };
  for (let i = 0; i < dificultad; i++) {
    let fotoAux = Math.floor(Math.random() * cantidadMaxima);
    if (i >= islasMinimas.length) {
      let islaAux = Math.floor(Math.random() * 7);
      item = {
        isla: islaAux,
        foto: fotoAux
      };
    } else
      item = {
        isla: islasMinimas[i],
        foto: fotoAux
      };
    if (include(cor, item)) {
      i--;

    } else {
      cor.push(item);

    }
  }
  displayNoneIslas();
  rellenarImagenes();
}

function include(arr, obj) {
  return (arr.indexOf(obj) != -1);
}

function displayNoneIslas() {
  $("path").each(function (i, element) {
    $(element).css("display", "none");
    $("#cajasIslas").children().eq(i).css("display", "none");
  })
}

function rellenarImagenes() {
  let islas = ["fuerte", "elHier", "laGome", "granCa", "lanzar", "laPalm", "teneri"];
  let path = "./img/canarias/";
  let extension = ".jpg";
  let $imgs = $(".imagen");

  $(".imagen").each(function (i) {
    $(this).attr("src", path + islas[cor[i].isla] + "/" + islas[cor[i].isla] + "_" + cor[i].foto + extension);
    $("path").eq(cor[i].isla).css("display", "initial");
    $("#cajasIslas").children().eq(cor[i].isla).css("display", "initial");
  });

  inicializarDraggable();
};

function fin() {
  toastr.success('Has acabado la partida con: ' + puntos + ' puntos.');
  moda.hola();
}

function acierto() {
  puntos += +20;
  $("#puntos").text("Puntos: " + puntos);
  toastr.success('Has ganado 20 puntos');
}

function fallo() {
  puntos += -10;
  $("#puntos").text("Puntos: " + puntos);
  toastr.error('Has perdido 10 puntos');
}

function hacerTrampas() {
  puntos += -30;
  $("#puntos").text("Puntos: " + puntos);
  toastr.error('Has perdido 30 puntos por tramposo');
}

function inicializarDraggable() {

  // There's the gallery and the trash
  var $gallery = $("#gallery"),
    $conteIsla = $(".conteIsla");

  // Let the gallery items be draggable
  $("li", $gallery).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the trash be droppable, accepting the gallery items
  $conteIsla.each(function () {
    $(this).droppable({
      accept: "#gallery > li",
      drop: function (event, ui) {
        let rutaImg = ui.draggable[0].children[0].attributes[1].value;
        let islaImg = rutaImg.slice(15, 21);
        let islaCont = $(this)[0].id;
        console.log("Imagen: " + islaImg);
        //console.log("Isla: " + islaCont);
        if (islaCont == islaImg) {
          deleteImage(ui.draggable, $(this));
          acierto();
          console.log($("#gallery > li").length)
          if ($("#gallery > li").length == 2) {
            fin();
          }
        } else {
          fallo();
        }
      }
    })
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: ".conteIsla li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function (event, ui) {
      recycleImage(ui.draggable);
      hacerTrampas();
    }
  });

  // Image deletion function
  function deleteImage($item, $contIsla) {
    $item.fadeOut(function () {
      var $list = $("ul", $contIsla).length ?
        $("ul", $contIsla) :
        $("<ul class='miniatura gallery ui-helper-reset'/>").appendTo($contIsla);

      $item.find("a.ui-icon-trash").remove();
      $item.appendTo($list).fadeIn(function () {
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

  function recycleImage($item) {
    $item.fadeOut(function () {
      $item
        .find("a.ui-icon-refresh")
        .remove()
        .end()
        .css("width", "auto")
        .find("img")
        .css("height", "240px")
        .end()
        .appendTo($gallery)
        .fadeIn();
    });
  }

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

  // Resolve the icons behavior with event delegation
  $("ul.gallery > li").on("click", function (event) {
    var $item = $(this),
      $target = $(event.target);
    /*
        if ($target.is("a.ui-icon-trash")) {
          deleteImage($item);
        } else */
    if ($target.is("a.ui-icon-zoomin")) {
      viewLargerImage($target);
    }
    /*
    if ($target.is("a.ui-icon-refresh")) {
      recycleImage($item);
    } */
    return false;
  });
};