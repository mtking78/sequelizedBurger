$(document).ready(function() {
    // Getting references to the name input and author container, as well as the table body
    var nameInput = $("#eater-name");
    var eaterList = $("tbody");
    var eaterContainer = $(".eater-container");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an Author
    $(document).on("submit", ".create-eater", handleEaterFormSubmit);
    // $(document).on("click", ".delete-eater", handleDeleteButtonPress);

    // Getting the initial list of Authors
    getEaters();

    // A function to handle what happens when the form is submitted to create a new Author
    function handleEaterFormSubmit(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!nameInput.val().trim().trim()) {
            return;
        }
        // Calling the upsertAuthor function and passing in the value of the name input
        upsertEater({
            name: nameInput
            .val()
            .trim()
        });
    }

    // A function for creating an author. Calls getAuthors upon completion
    function upsertEater(eaterData) {
        $.post("/api/eaters", eaterData)
            .then(getEaters);
    }

    // Function for creating a new list row for authors
    function createEaterRow(eaterData) {
        var newTr = $("<tr>");
        newTr.data("eater", eaterData);
        newTr.append("<td>" + eaterData.eater_name + "</td>");
        // newTr.append("<td> " + authorData.Posts.length + "</td>");
        // newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
        // newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
        // newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
        return newTr;
    }

    // Function for retrieving authors and getting them ready to be rendered to the page
    function getEaters() {
        $.get("/api/eaters", function(data) {
            console.log(data);
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createEaterRow(data[i]));
            }
            renderEaterList(rowsToAdd);
            nameInput.val("");
        });
    }

    // A function for rendering the list of authors to the page
    function renderEaterList(rows) {
        // eaterList.children().not(":last").remove();
        // eaterContainer.children(".alert").remove();
        if (rows.length) {
            // console.log(rows);
            eaterList.prepend(rows);
        }
        // else {
        //     renderEmpty();
        // }
    }

    // // Function for handling what to render when there are no authors
    // function renderEmpty() {
    //     var alertDiv = $("<div>");
    //     alertDiv.addClass("alert alert-danger");
    //     alertDiv.text("You must create an Author before you can create a Post.");
    //     authorContainer.append(alertDiv);
    // }

    // // Function for handling what happens when the delete button is pressed
    // function handleDeleteButtonPress() {
    //     var listItemData = $(this).parent("td").parent("tr").data("author");
    //     var id = listItemData.id;
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/authors/" + id
    //     })
    //         .then(getAuthors);
    // }
});