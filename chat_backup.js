var shareddatabase = firebase.database();

var chatlimit = 1000;

var database_refname = "simplechat-dev"

$(document).ready(function() {

  $("#textInput").on("keyup", function(event) {
    if (event.keyCode === 13) {
      submitText();
    }
  });

  // when we click on it, change the database
  $("#submitText").click(submitText);

  function submitText() {
    var data = {
      timestamp: Date.now(),
      name: $("#nameInput").val(),
      text: $("#textInput").val()
    };

    $("#textInput").val("");
    shareddatabase.ref(database_refname).push(data);
  }

  var chatlimit = 1000;

  // when the database changes, change the website
  shareddatabase
    .ref(database_refname)
    .orderByChild("timestamp")
    .limitToLast(chatlimit)
    .on("value", function(snapshot) {
      var chats = snapshot.val();

      $(".chatcontainer").empty();

      var url;

      for (k in chats) {
       
        var chatimghtml = ""
        var imgregex =/(https?:\/\/.*\.(?:png|jpg|jpeg))/;
        if( imgregex.test(chats[k].text) == true) {
          var imgurl = chats[k].text.match(imgregex)[0];
          chatimghtml = `<img class="chatimage" src="${imgurl}">`;
        }
        

        $(".chatcontainer").append(`
        <div class="messagecontainer">
          <div class="messagename">${chats[k].name}</div>
          <div class="messagetext"> ${chats[k].text}</div>
          <div class="messageimg">${chatimghtml}</div>
        </div>`);

      }

      $("#chattext").scrollTop($("#chattext")[0].scrollHeight);
    });
});
