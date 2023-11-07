document.addEventListener("DOMContentLoaded", function() {
    var getJokesButton = document.getElementById("getJokesButton");
    var jokesContainer = document.getElementById("jokes-container");

    getJokesButton.addEventListener("click", function() {
        fetch("https://your-flask-api-url/api/v1/jokes?category=all&language=en&number=1")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(function(jokes) {
                displayJokes(jokes);
            })
            .catch(function(error) {
                console.error("Error fetching jokes:", error);
            });
    });

    function displayJokes(jokes) {
        jokesContainer.innerHTML = "";

        if (jokes.length === 0) {
            jokesContainer.innerHTML = "No jokes available.";
            return;
        }

        jokesContainer.innerHTML += "<h2>Jokes:</h2>";

        for (var i = 0; i < jokes.length; i++) {
            var joke = jokes[i];
            jokesContainer.innerHTML +=
                "<p><strong>ID:</strong> " + joke.id + "<br>" +
                "<strong>Category:</strong> " + joke.category + "<br>" +
                "<strong>Language:</strong> " + joke.language + "<br>" +
                "<strong>Joke:</strong> " + joke.joke + "</p>";
        }
    }
});
