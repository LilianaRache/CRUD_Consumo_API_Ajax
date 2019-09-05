$(document).ready(function() {

  // MUESTRA TABLA
  var funcionVer = function() {
    $.ajax({
      "url": "https://apirocks.herokuapp.com/api/v1/products",
      "method": "get",
      "success": function(data) {
        $("#tabla").empty()
        data.forEach(function(producto) {
          $(`#tabla`).append(`<tr>
              <td>${producto.id}</td>
              <td>${producto.name}</td>
              <td>${producto.price}</td>
              <td>
                <button type="reset" name="button" class="delete" id="delete_${producto.id}">Eliminar</button>
              </td>
              <td>
                <button type="button" class="btn btn-primary edit" id="edit_${producto.id}" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Editar</button>
              </td>
            </tr>`)
        })
      }
    }) // CIERRA AJAX GET

  } // CIERRA FUNCIONVER

  funcionVer();

  //BORRAR
  $(document).on("click", ".delete", function(e) {
    e.preventDefault()
    var id_td = $(this).attr("id")

    $.ajax({
      type: "DELETE",
      url: 'https://apirocks.herokuapp.com/api/v1/products/' + id_td.replace("delete_", ""),
      data: {
        _method: 'delete'
      },
      "success": function(data) {
        $("#" + id_td).parent().parent().remove();
      }
    });

  }) // CIERRA BORRAR(document)

  // ABRE EDITH
  $(document).on("click", ".edit", function(e) {

    e.preventDefault();
    console.log($(this).attr("id").replace("edit_", ""));

    $.ajax({
      type: "get",
      url: "https://apirocks.herokuapp.com/api/v1/products/" + $(this).attr("id").replace("edit_", ""),
      "success": function(data) {
        console.log(data);
        $("#proname_editar").val(data.name);
        $("#precio_editar").val(data.price);
        $("#escondido").val(data.id);
      }

    })
  }) // CIERRA DOCUMET EDIT


  // ACTUALIZAR
  $("#botonactu").on("click", function(e) {
    e.preventDefault();
    producto_nuevo = {
      "name": $("#proname_editar").val(),
      "price": $("#precio_editar").val()
    }
    $.ajax({
      type: "PUT",
      url: "https://apirocks.herokuapp.com/api/v1/products/" + $("#escondido").val(),
      data: JSON.stringify(producto_nuevo),
      "success": function(data) {
        console.log(data);
        funcionVer();
        $("#salir").click();
      },
      dataType: 'json',
      contentType: "application/json"
    })
  }) // CIERRA ACTUALIZAR




  //FORMULARIO
  $("form").on("submit", function(e) {
    e.preventDefault()
    $name = $("#name")
    $price = $("#price")

    if ($name.val() === "" || $price.val() === "") {
      alert("Caracoles @! , llena todos tus datos...")
    }
    producto = {
      name: $name.val(),
      price: $price.val()
    }

    $.ajax({
      type: "POST",
      url: 'https://apirocks.herokuapp.com/api/v1/products',
      data: JSON.stringify(producto),
      success: function(data) {
        funcionVer();
        $name.val("")
        $price.val("")
      },
      dataType: 'json',
      contentType: "application/json"
    });

  }) //CIERRA EL FORM









}) //CIERRA DOCUMENT
