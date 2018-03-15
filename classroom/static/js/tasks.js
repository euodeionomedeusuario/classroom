/*tasks.js*/

/**/

$(document)ready(function(){
  /*verificando o prazo da tarefa*/
  function deadlineIsOver(value) {
    var deadline = new Date(value);
    var currentDate = new Date();

    if(deadline - currentDate <= 0) {
      return true;
    } else {
      return false;
    }
  }
});
