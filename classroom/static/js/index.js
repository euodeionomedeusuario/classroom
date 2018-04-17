/*index.js*/

/**/


var PROTOCOL = window.location.protocol + "//";
var PORT = ":" + window.location.port;
var HOSTNAME = window.location.hostname + PORT;

$(document).ready(function(){
  /*Inicialzando collapse button*/
  $(".button-collapse").sideNav();

  /*Habilitando modal*/
  $(".modal-trigger").leanModal();


  /*registrando-se em nova turma*/
  $("#btn-signup-in-class").click(function(event) {
    var classId = $("#modal-class-id").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/invites/",
      type: "POST",
      success: function(event){
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/");
      }
    });
  });

  $("#btn-create-class").click(function(event) {
    console.log(PROTOCOL + HOSTNAME);

    var name = $("#name").val();
    var description = $("#description").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/",
      type: "POST",
      data: {name: name, description: description},
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/");
      }
    });
  });
});
