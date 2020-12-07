
var shareddatabase = firebase.database();

var database_refname = "simplechat-dev-dt"

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
      text: $("#textInput").val(),
      size: $("#sizeInput").val(),

      color: $("#colorInput").val()

    };

    shareddatabase.ref(database_refname).push(data); // cchat
    // shareddatabase.ref(database_refname).set(data); // set a single value
  }

  var chatlimit = 10000;

  // when the database changes, change the website
  shareddatabase.ref(database_refname)
  .orderByChild("timestamp")
  .limitToLast(chatlimit)

  .on("value", function(snapshot) {
    var data = snapshot.val();

    $(".chatcontainer").empty();


    var tally = {};
    for (d in data) {
      if (data[d]['name'] in tally) {
        tally[data[d]['name']] += 1;
      } else {
        tally[data[d]['name']] = 1;
      }
    }


    for (d in data) {

      console.log(data[d]['name']);
      console.log(data[d]['size']);
      console.log(data[d]['text']);
      console.log(data[d]['color']);

      //var tallystyle = "";
      //if(tally[data[d]['name']] > 3) {
      //  tallystyle = "background-color: yellow;"
      //}

      var tallystyle = "font-size: " + (5 / tally[data[d]['name']])  + "em;"



      $(".chatcontainer").append(`
        <div style="${tallystyle}  color: #${ data[d]['color'] }">${ data[d]['name'] } : ${ data[d]['text'] } </div>
        `);



    }


  });


});
