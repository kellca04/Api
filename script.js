document.addEventListener("DOMContentLoaded", function() {
    var getJokesButton = document.getElementById("getJokesButton");
    var getRandomJokeButton = document.getElementById("getRandomJokeButton");
    var jokesContainer = document.getElementById("jokes-container");
    var languageSelect = document.getElementById("languageSelect");
    var categorySelect = document.getElementById("categorySelect");
    var numberInput = document.getElementById("numberInput");

    getJokesButton.addEventListener("click", function() {
        var language = languageSelect.value;
        var category = categorySelect.value;
        var number = numberInput.value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
            .then(function(response) {
                if (!response.ok) {
                    if (response.status === 404) {
                        jokesContainer.innerHTML = "Unrealistic selections";
                    } else {
                        throw new Error("Network response was not ok");
                    }
                } else {
                    return response.json();
                }
            })
            .then(function(jokes) {
                if (jokes) {
                    displayJokes(jokes);
                }
            })
            .catch(function(error) {
                console.error("Error fetching jokes:", error);
            });
    });

    getRandomJokeButton.addEventListener("click", function() {
        var language = languageSelect.value;
        var category = categorySelect.value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=1`)
            .then(function(response) {
                if (!response.ok) {
                    if (response.status === 404) {
                        jokesContainer.innerHTML = "Unrealistic selections";
                    } else {
                        throw new Error("Network response was not ok");
                    }
                } else {
                    return response.json();
                }
            })
            .then(function(jokes) {
                if (jokes) {
                    displayJokes(jokes);
                }
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
