document.addEventListener("DOMContentLoaded", function() {
    var getJokesButton = document.getElementById("getJokesButton");
    var getRandomJokeButton = document.getElementById("getRandomJokeButton");
    var searchByIdButton = document.getElementById("searchByIdButton");
    var jokesContainer = document.getElementById("jokes-container");
    var languageSelect = document.getElementById("languageSelect");
    var categorySelect = document.getElementById("categorySelect");
    var numberInput = document.getElementById("numberInput");
    var idInput = document.getElementById("idInput");

    getJokesButton.addEventListener("click", function() {
        var language = languageSelect.value;
        var category = categorySelect.value;
        var number = numberInput.value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
            .then(handleResponse)
            .then(function(jokes) {
                displayJokes(jokes);
            });
    });

    getRandomJokeButton.addEventListener("click", function() {
        var language = languageSelect.value;
        var category = categorySelect.value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=1`)
            .then(handleResponse)
            .then(function(jokes) {
                displayJokes(jokes);
            });
    });

    searchByIdButton.addEventListener("click", function() {
        var id = idInput.value;
        var language = languageSelect.value;
        var category = categorySelect.value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes/${language}/${category}/${id}`)
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
                "<strong>
