document.addEventListener("DOMContentLoaded", function() {
    var getRandomJokeButton = document.getElementById("getRandomJokeButton");
    var getJokeByIdButton = document.getElementById("getJokeByIdButton");
    var jokesContainer = document.getElementById("jokes-container");
    var idInput = document.getElementById("idInput");
    var languageSelect = document.getElementById("languageSelect");
    var categorySelect = document.getElementById("categorySelect");

    getRandomJokeButton.addEventListener("click", function() {
        var language = languageSelect.value;
        var category = categorySelect.value;
        var number = 1; // Default number of jokes

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
            .then(handleResponse)
            .then(function(jokes) {
                displayJokes(jokes);
            });
    });

    getJokeByIdButton.addEventListener("click", function() {
        var id = idInput.value;

        // Always fetch the joke by ID in English
        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes/${id}?language=en`)
            .then(handleResponse)
            .then(function(joke) {
                displayJokes([joke]);
            });
    });

    function handleResponse(response) {
        if (!response.ok) {
            if (response.status === 404) {
                jokesContainer.innerHTML = "Unrealistic selections";
            } else {
                throw new Error("Network response was not ok");
            }
        }
        return response.json();
    }

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
