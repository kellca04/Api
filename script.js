document.getElementById('getJokes').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const language = document.getElementById('language').value;
    const number = document.getElementById('number').value;
    const jokeId = document.getElementById('jokeId').value;

    const apiUrl = `https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=${number}&jokeId=${jokeId}`;

    fetch(apiUrl)
        .then(response => {
            if (response.status === 404) {
                return "Error 404";
            }
            return response.json();
        })
        .then(data => {
            const jokesContainer = document.getElementById('jokes');
            jokesContainer.innerHTML = '';
            if (data === "Error 404") {
                jokesContainer.innerHTML = '<p class="text-danger">Error 404: Joke not found</p>';
            } else {
                data.forEach(joke => {
                    jokesContainer.innerHTML += `<p>${joke}</p>`;
                });
            }
        })
        .catch(error => console.error(error));
});
