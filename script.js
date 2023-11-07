// JavaScript to interact with the API
        document.getElementById('getJokes').addEventListener('click', function () {
            const category = document.getElementById('category').value;
            const language = document.getElementById('language').value;
            const number = document.getElementById('number').value;

            fetch(`/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
                .then(response => response.json())
                .then(data => {
                    const jokesDiv = document.getElementById('jokes');
                    jokesDiv.innerHTML = JSON.stringify(data, null, 2);
                });
        });

        document.getElementById('getJokeById').addEventListener('click', function () {
            const category = document.getElementById('category').value;
            const language = document.getElementById('language').value;
            const jokeId = document.getElementById('jokeId').value;

            fetch(`/api/v1/jokes/${language}/${category}/${jokeId}`)
                .then(response => response.json())
                .then(data => {
                    const jokesDiv = document.getElementById('jokes');
                    jokesDiv.innerHTML = JSON.stringify(data, null, 2);
                });
        });
