$(function() {

    $("#addburger").on("submit", function(event) {
        event.preventDefault();

        if ($("#newburger").val() === "") {
            $("#inputModal").modal("show");
            return;
        };
    });

    // // Only operates with index.handlebars, obsolete with Method-Override
    // $(".create-burger").on("submit", function(event) {
    //     event.preventDefault();

    //     // var isValid = true;
    //     if ($("#newburger").val() === "") {
    //         // isValid = false;
    //         $("#inputModal").modal("show");
    //         return;
    //     }

    //     var newBurger = {
    //         burger_name: $("#newburger").val().trim(),
    //         devoured: 0
    //     };

    //     // Send the POST request.
    //     $.ajax("/api/burgers", {
    //         type: "POST",
    //         data: newBurger
    //     }).then(function() {
    //         console.log("Added new burger");
    //         // Reload the page to get the updated burger list.
    //         location.reload();
    //     });
    // });

    // // Only operates with index.handlebars, obsolete with Method-Override
    // $(".create-eater").on("submit", function(event) {
    //     event.preventDefault();

    //     // var isValid = true;
    //     if ($("#eater-name").val() === "") {
    //         // isValid = false;
    //         $("#eaterModal").modal("show");
    //         return;
    //     }

    //     var newEater = {
    //         eater_name: $("#eater-name").val().trim()
    //     };

    //     // Send the POST request.
    //     $.ajax("/api/eaters", {
    //         type: "POST",
    //         data: newEater
    //     }).then(function() {
    //         console.log("Added new eater");
    //         // Reload the page to get the updated burger list.
    //         location.reload();
    //     });
    // });

    // // Only operates with index.handlebars, obsolete with Method-Override
    // $(".eatburger").on("click", function(event) {
    //     event.preventDefault();

    //     var id = $(this).data("id");
    //     var devouredState = {
    //         devoured: 1
    //     };

    //     // Send the PUT request.
    //     $.ajax("/api/burgers/" + id, {
    //     // $.ajax("/" + id, {
    //         type: "PUT",
    //         data: devouredState
    //     }).then(function() {
    //         console.log("Burger devoured");
    //         location.reload();
    //     });
    // });

    // // Only operates with index.handlebars, obsolete with Method-Override
    // $(".trashburger").on("click", function(event) {
    //     event.preventDefault();

    //     var id = $(this).data("id");

    //     // Send the DELETE request.
    //     $.ajax({
    //         type: "DELETE",
    //         url: "/api/burgers/" + id
    //     }).then(location.reload());
    // });

})