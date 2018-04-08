// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        // $("#articles").append(`<h3> ArticlesofExecution ${data[i]._id} ${data[i].title}</h3>`);
        $(".articles").append(`
        <div class="gazette-post-tag">
            <a href="#">NEWS</a>
        </div>
         <h3><a href="https://${data[i].domain}${data[i].link}" data-id="${data[i]._id}" class="font-pt mb-2">${data[i].title}</a></h3>
        <span class="gazette-post-date mb-2">${data[i].date}</span>
        <a class="post-total-comments" data-id="${data[i]._id}">Comments</a>
        <div id="notes-${data[i]._id}"></div>
        <div class="young-notes"></div>
        <br>
        <br>
        `);
        // If there's a note in the article
            // if (data.note[i]) {
            //     // Place the body of the note in the body textarea
            //     $(".young-notes").text(`${data[i].note.title} \n ${data[i].note.body}`);
            // }
    }
});


// Whenever someone clicks an comments-class a tag
$(document).on("click", `.post-total-comments-${data[i]._id}`, function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: `/articles/${thisId}`
        })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2> Insert Comment Below</h2><br>");
            // An input to enter a new title
            $("#notes").append("Title<br><input id='titleinput' name='title' ><br>");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'>Message</textarea><br>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .then(function(data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});