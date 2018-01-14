//Crea un array de objetos aleatorios con repeticion o sin ella
function numerosAleatorios(cantidadNumeros, numeroMaximo, repetidos) {
    var luck = [];
    do {
        var item = Math.floor(Math.random() * numeroMaximo);
        if (luck.indexOf(item) === -1) {
            luck.push(item);
        } else if (repetidos) {
            luck.push(item);
        }
    } while (luck.length != cantidadNumeros);
    return luck;
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
};

/*
function recorrerCarpeta() {
  var dir = "./img/canarias/";

  //var dir = "Src/themes/base/images/";
  var fileextension = ".jpg";
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
      console.log("Llega a entrar: ");
      //List all .png file names in the page
      $(data).find("a:contains(" + fileextension + ")").each(function () {
        var filename = this.href.replace(window.location.host, "").replace("http://", "");
        $("body").append("<img src='" + dir + filename + "'>");
      });
    }
  });
  console.log("Las imagenes son: " + imagenes);
  //$("#imagen1").attr("src", "6.jpg");
};
*/