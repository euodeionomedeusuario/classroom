/*class.js*/

/**/

var PROTOCOL = window.location.protocol + "//";
var HOSTNAME = window.location.hostname;

$(document).ready(function() {
  /*Habilitando o uso de efeitos do Materialize nos selects*/
  $('select').material_select();

  /*Inicialzando collapse button*/
  $(".button-collapse").sideNav();

  /*Habilitando modal*/
  $(".modal-trigger").leanModal();

  $("#btn-left-class").click(function(event){
    var classId = $("#class-id").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/participants/",
      type: "DELETE",
      success: function(event){
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom");
      }
    });
  });

  $("#btn-create-warning").click(function(event){
    var classId = $("#class-id").val();
    var title = $("#modal-warning-title").val();
    var description = $("#modal-warning-description").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/warnings/",
      type: "POST",
      data: {"title": title, "description": description, "created_at": new Date()},
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/");
      }
    });

  });

  function isRetroativeDate(deadline) {
    var date = new Date(deadline);
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
      url: PROTOCOL + HOSTNAME + "/classroom/tasks/" + taskId + "/",
      type: "DELETE",
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/");
      }
    });
  });

  $("#btn-share-class").click(function(event){
    var classId = $("#class-id").val();
    var email = $("#modal-class-email").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/participants/",
      type: "PUT",
      data: {"email": email},
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/");
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
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/",
      type: "PUT",
      data: {"name": name, "description": description},
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/");
      }
    });
  });

  /*apagando turma*/
  $("#btn-remove-class").click(function(event){
    var classId = $("#class-id").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/classes/" + classId + "/",
      type: "DELETE",
      success: function(data) {
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/");
      }
    });
  });

  /*carregando todos os questionários criados*/
  $("#btn-new-task-modal").click(function(event){
    $.ajax({
      url: PROTOCOL + HOSTNAME + "/classroom/tests/",
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
    var test = $("#test :checked").val();

    if(isRetroativeDate(deadline) == false) {
      if(test) {
        var classId = $("#class-id").val();
        var title = $("#title").val();
        var description = $("#description").val();
        var deadline = $("#deadline").val();

        $.ajax({
          url: PROTOCOL + HOSTNAME + "/classroom/tasks/",
          type: "POST",
          data: {title: title, description: description, deadline: deadline, classId: classId, test: test},
          success: function(data) {
            window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId);
          }
        });
      } else {
        $("#modal-new-task-error").css("display", "block").css("color", "red").text("Vocẽ deve escolher um teste!");
      }
    } else {
      $("#modal-new-task-error").css("display", "block").css("color", "red").text("Escolha um prazo válido!");
    }
  });
});
