$(document).ready(function() {
    $("#get-joke-button").click(function() {
        $.ajax({
            url: "/get_joke",
            method: "GET",
            success: function(response) {
                var joke = response.joke;
                $("#joke-text").text(joke);
            },
            error: function(error) {
                console.log("Error fetching joke: " + error);
            }
        });
    });
});
