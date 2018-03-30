/*warnings.js*/

/**/

function fillModalEditWarning(warning_id) {

  $.ajax({
    url: "http://127.0.0.1:8000/classroom/warnings/" + warning_id + "/",
    type: "GET",
    success: function(data) {

      $("#modal-edit-warning-id").val(data["_id"]);
      $("#modal-edit-warning-title").val(data["title"]);
      $("#modal-edit-warning-description").val(data["description"]);
    }
  });
}

function deleteWarning(warning_id) {
  var classId = $("#class-id").val();

  $.ajax({
    url: "http://127.0.0.1:8000/classroom/warnings/" + warning_id + "/",
    type: "DELETE",
    success: function(data) {
      window.location.replace("http://127.0.0.1:8000/classroom/classes/" + classId + "/")

    }
  });
}

$(document).ready(function() {
  $("#btn-edit-warning").click(function(event) {
    var classId = $("#class-id").val();
    var warningId = $("#modal-edit-warning-id").val();
    var title = $("#modal-edit-warning-title").val();
    var description = $("#modal-edit-warning-description").val();

    $.ajax({
      url: "http://127.0.0.1:8000/classroom/warnings/" + warningId + "/",
      type: "PUT",
      data: {"title": title, "description": description},
      success: function(data) {
        window.location.replace("http://127.0.0.1:8000/classroom/classes/" + classId + "/")
      }
    });
  });
});
