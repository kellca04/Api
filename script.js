document.addEventListener("DOMContentLoaded", function () {
    // JavaScript to interact with the API
    document.getElementById('getJokes').addEventListener('click', function () {
        const category = document.getElementById('category').value;
        const language = document.getElementById('language').value;
        const number = document.getElementById('number').value;

        fetch(`/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
            .then(response => response.json())
            .then(data => {
                const jokesDiv = document.getElementById('jokes');
                jokesDiv.innerHTML = ''; // Clear previous jokes
                data.forEach(joke => {
                    const p = document.createElement('p');
                    p.textContent = joke;
                    jokesDiv.appendChild(p);
                });
            });
    });

    document.getElementById('getJokeById').addEventListener('click', function () {
        const language = 'en'; // Use only English
        const jokeId = document.getElementById('jokeId').value;

        fetch(`/api/v1/jokes/${language}/neutral/${jokeId}`)
            .then(response => response.json())
            .then(data => {
                const jokesDiv = document.getElementById('jokes');
                jokesDiv.innerHTML = JSON.stringify(data, null, 2);
            });
    });
});
