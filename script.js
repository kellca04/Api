$(document).ready(function () {
    const baseUrl = "https://jokesapikellca04.onrender.com/api/v1/jokes";

    $("#getJokesButton").click(function () {
        const language = $("#languageSelect").val();
        const category = $("#categorySelect").val();
        const number = $("#numberInput").val();

        $.get(`${baseUrl}/${language}/${category}/${number}`, function (data) {
            displayJokes(data);
        });
    });

    $("#getJokeByIdButton").click(function () {
        const language = $("#languageSelect").val();
        const category = $("#categorySelect").val();
        const number = 1; // Requesting a single joke
        const jokeId = $("#jokeIdInput").val();

        $.get(`${baseUrl}/${language}/${category}/${number}/${jokeId}`, function (data) {
            displayJokes(data);
        });
    });

    function displayJokes(data) {
        const jokesOutput = $("#jokesOutput");
        jokesOutput.empty();

        if (Array.isArray(data.data)) {
            data.data.forEach((joke, index) => {
                jokesOutput.append(`<p><strong>Joke ${index + 1}:</strong> ${joke}</p>`);
            });
        } else if (typeof data.data === "string") {
            jokesOutput.append(`<p>${data.data}</p>`);
        }
    }
});
