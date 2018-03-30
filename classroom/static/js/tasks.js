/*tasks.js*/

/**/

function fillModalEditTask(taskId) {
  $.ajax({
    url: "http://127.0.0.1:8000/classroom/tasks/" + taskId + "/",
    type: "GET",
    success: function(data) {

      $("#modal-edit-task-id").val(data["_id"]);
      $("#modal-edit-task-title").val(data["title"]);
      $("#modal-edit-task-description").val(data["description"]);
      $("#modal-edit-task-deadline").val(data["deadline"]);

    }
  });
}


$(document).ready(function() {
  $("#btn-edit-task").click(function(event) {
    var classId = $("#class-id").val();
    var taskId = $("#modal-edit-task-id").val();
    var title = $("#modal-edit-task-title").val();
    var description = $("#modal-edit-task-description").val();
    var deadline = $("#modal-edit-task-deadline").val();

    $.ajax({
      url: "http://127.0.0.1:8000/classroom/tasks/" + taskId + "/",
      type: "PUT",
      data: {"title": title, "description": description, "deadline": deadline},
      success: function(data) {
        window.location.replace("http://127.0.0.1:8000/classroom/classes/" + classId + "/")
      }
    });
  });
});
