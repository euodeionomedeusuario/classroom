/*see.js*/

/**/

var PROTOCOL = window.location.protocol + "//";
var HOSTNAME = window.location.hostname;

$(document).ready(function() {
  /*Inicializando o botão collapse*/
  $(".button-collapse").sideNav();

  /*atualizando a nota da resposta*/
  function updateGrade(answer, grade) {
    var testId = $("#test-id").val();

    $.ajax({
      url: PROTOCOL + HOSTNAME + "/quiz/answers/" + answer + "/",
      type: "PUT",
      data: {grade: grade},
      success: function(data) {
        console.log("Test's grade " + test + "updated in " + Date());
        window.location.replace(PROTOCOL + HOSTNAME + "/classroom/quiz/tests/" + testId + "/answers/");
      }
    });
  }

  /*adicionando evento no botão de atualizar a nota*/
  $("#btnUpdateGrade").click(function(event) {
    var answer = $("#answer-id").val();
    var grade = $("#grade").val();
    updateGrade(answer, grade);
  });
});
