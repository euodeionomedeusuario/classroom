/*index.js*/

/**/

$(document).ready(function(){
  /*Inicialzando collapse button*/
  $(".button-collapse").sideNav();

  /*Habilitando modal*/
  $(".modal-trigger").leanModal();


  /*registrando-se em nova turma*/
  $("#btn-signup-in-class").click(function(event) {
    var classId = $("#modal-class-id").val();

    $.ajax({
      url: "http://127.0.0.1:8000/classroom/classes/" + classId + "/invites/",
      type: "POST",
      success: function(event){
        window.location.replace("http://127.0.0.1:8000/classroom/");
      }
    });
  });

  $("#btn-create-class").click(function(event) {
    var name = $("#name").val();
    var description = $("#description").val();

    $.ajax({
      url: "http://127.0.0.1:8000/classroom/classes/",
      type: "POST",
      data: {name: name, description: description},
      success: function(data) {
        window.location.replace("http://127.0.0.1:8000/classroom/");
      }
    });
  });
});
