/*users.js*/

/**/


var PROTOCOL = window.location.protocol + "//";
var PORT = ":" + window.location.port;
var HOSTNAME = window.location.hostname + PORT;

$(document).ready(function(){
  /*Inicializando o botão collapse*/
  $(".button-collapse").sideNav();

  /*atualizando informações pessoais do usuário*/
  $("#btn-update-user").click(function(event){
    var userId = $("#user-id").val();
    var name = $("#name").val();
    var email = $("#email").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/users/" + userId + "/",
      type: "PUT",
      data: {"name": name, "email": email},
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/");

      }
    });
  }); /*fim*/


});
