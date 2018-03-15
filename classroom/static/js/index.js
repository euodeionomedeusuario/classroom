/*index.js*/

/**/

$(document).ready(function(){
  /*Inicialzando collapse button*/
  $(".button-collapse").sideNav();

  /*Habilitando modal*/
  $(".modal-trigger").leanModal();

  $("#btn-create-class").click(function(event) {
    var name = $("#name").val();
    var description = $("#description").val();

    $.ajax({
      url: "http://127.0.0.1:6543/classroom/classes/",
      type: "POST",
      data: {name: name, description: description},
      success: function(data) {
        window.location.replace("http://127.0.0.1:6543/classroom/");
      }
    });
  });
});
