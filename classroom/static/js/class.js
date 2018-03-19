/*class.js*/

/**/

$(document).ready(function() {
  /*Habilitando o uso de efeitos do Materialize nos selects*/
  $('select').material_select();

  /*Inicialzando collapse button*/
  $(".button-collapse").sideNav();

  /*Habilitando modal*/
  $(".modal-trigger").leanModal();

  function isRetroativeDate(date) {
    var currentDate = new Date();

    if (date >= currentDate) {
      return false;
    } else {
      return true;
    }
  }

  $("#btn-remove-task").click(function(event){
    var classId = $("#class-id").val();
    var taskId = $(this).siblings("#task-id").val();

    $.ajax({
      url: "http://127.0.0.1:6543/classroom/tasks/" + taskId + "/",
      type: "DELETE",
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/classes/" + classId + "/");
      }
    });
  });

  $("#btn-share-class").click(function(event){
    var classId = $("#class-id").val();
    var email = $("#modal-class-email").val();

    $.ajax({
      url: "http://127.0.0.1:6543/classroom/classes/" + classId + "/participants/",
      type: "PUT",
      data: {"email": email},
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/classes/" + classId + "/");
      }
    });
  });

  $("#share-class-modal").click(function(event){
    var classId = $("#class-id").val();

    $("#modal-class-id").text(classId);
  });


  /*editando turma*/
  $("#btn-edit-class").click(function(event){
    var classId = $("#class-id").val();
    var name = $("#modal-class-name").val();
    var description = $("#modal-class-description").val();

    $.ajax({
      url: "http://127.0.0.1:6543/classroom/classes/" + classId + "/",
      type: "PUT",
      data: {"name": name, "description": description},
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/classes/" + classId + "/");
      }
    });
  });

  /*apagando turma*/
  $("#btn-remove-class").click(function(event){
    var classId = $("#class-id").val();

    $.ajax({
      url: "http://127.0.0.1:6543/classroom/classes/" + classId + "/",
      type: "DELETE",
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/");
      }
    });
  });

  /*carregando todos os questionários criados*/
  $("#btn-new-task-modal").click(function(event){
    $.ajax({
      url: "http://127.0.0.1:6543/classroom/tests/",
      type: "GET",
      success: function(data){
        for(index in data) {
          $("#test").append($("<option />").text(data[index]["name"]).attr("value", data[index]["_id"]));
        }

        /*Habilitando o uso de efeitos do Materialize nos selects*/
        $('select').material_select();
      }
    });
  });

  /*Criando uma nova tarefa*/
  $("#btn-create-task").click(function(event) {
    var deadline = $("#deadline").val();

    if(isRetroativeDate(deadline) == false) {
      var classId = $("#class-id").val();
      var title = $("#title").val();
      var description = $("#description").val();
      var deadline = $("#deadline").val();
      var test = $("#test :checked").val();

      $.ajax({
        url: "http://127.0.0.1:6543/classroom/tasks/",
        type: "POST",
        data: {title: title, description: description, deadline: deadline, classId: classId, test: test},
        success: function(data) {
          window.location.replace("http://127.0.0.1:6543/classroom/classes/" + classId);
        }
      });
    } else {
      $("#modal-new-task-error").css("display", "block").css("color", "red").text("Escolha um prazo válido!");
    }
  });
});
