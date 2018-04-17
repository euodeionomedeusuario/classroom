/*classes.js*/

/**/


var PROTOCOL = window.location.protocol + "//";
var PORT = ":" + window.location.port;
var HOSTNAME = window.location.hostname + PORT;

function acceptInvite(invite) {
  var classId = $("#class-id").val();

  $.ajax({
    url: PROTOCOL + HOSTNAME + "/classroom/invites/" + invite + "/",
    type: "GET",
    success: function(event){
      window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId);
    }
  });
}

function refuseInvite(invite) {
  var classId = $("#class-id").val();

  $.ajax({
    url: PROTOCOL + HOSTNAME + "/classroom/invites/" + invite + "/",
    type: "DELETE",
    success: function(event){
      window.location.replace(PROTOCOL + HOSTNAME + "/classroom/classes/" + classId);
    }
  });
}

$(document).ready(function(event) {
  /*Habilitando modal*/
  $(".modal-trigger").leanModal();

});
