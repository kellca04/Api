document.addEventListener("DOMContentLoaded", function() {
    const languageSelect = document.getElementById("languageSelect");
    const categorySelect = document.getElementById("categorySelect");
    const numberSelect = document.getElementById("numberSelect");
    const getJokesButton = document.getElementById("getJokesButton");
    const jokeIdInput = document.getElementById("jokeIdInput");
    const getJokeByIdButton = document.getElementById("getJokeByIdButton");
    const jokesContainer = document.getElementById("jokes-container");

    getJokesButton.addEventListener("click", function() {
        const language = languageSelect.value;
        const category = categorySelect.value;
        const number = numberSelect.value;

        fetch(`/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
            .then(response => response.json())
            .then(data => displayJokes(data))
            .catch(error => console.error("Error fetching jokes:", error));
    });

    getJokeByIdButton.addEventListener("click", function() {
        const jokeId = jokeIdInput.value;

        if (jokeId === "") {
            alert("Please enter a valid joke ID.");
            return;
        }

        fetch(`/api/v1/jokes/${jokeId}`)
            .then(response => {
                if (response.status === 404) {
                    alert("Joke not found.");
                }
                return response.json();
            })
            .then(data => displayJoke(data))
            .catch(error => console.error("Error fetching joke:", error));
    });

    function displayJokes(jokes) {
        jokesContainer.innerHTML = "";

        if (jokes.length === 0) {
            jokesContainer.innerHTML = "No jokes available.";
            return;
        }

        jokesContainer.innerHTML += "<h2>Jokes:</h2>";

        jokes.forEach(joke => {
            jokesContainer.innerHTML += `
                <p><strong>ID:</strong> ${joke.id}<br>
                <strong>Category:</strong> ${joke.category}<br>
                <strong>Language:</strong> ${joke.language}<br>
                <strong>Joke:</strong> ${joke.joke}</p>
            `;
        });
    }

    function displayJoke(joke) {
        jokesContainer.innerHTML = "";

        if (joke.id) {
            jokesContainer.innerHTML += `
                <p><strong>ID:</strong> ${joke.id}<br>
                <strong>Category:</strong> ${joke.category}<br>
                <strong>Language:</strong> ${joke.language}<br>
                <strong>Joke:</strong> ${joke.joke}</p>
            `;
        }
    }
});
