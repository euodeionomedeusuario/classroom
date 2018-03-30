/*edit-test.js*/

/**/

$(document).ready(function(){
  $("#btn-update-test").click(function(event){
    var testId = $("#test-id").val();

    var name = $("#name").val();
    var description = $("#description").val();
    var numAttempts = $("#num-attempts").val();
    var time = $("#time").val();
    var questions = [];

    $("#questions-list li input").each(function(index, element) {
      questions.push($(this).val());
    });

    $.ajax({
      url: "http://127.0.0.1:6543/quiz/tests/" + testId + "/",
      type: "PUT",
      data: {"name": name, "description": description, "questions": questions, "ntime": time, "numAttempts": numAttempts},
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/quiz/");

      }
    });

  });
});
