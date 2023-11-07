
document.getElementById('getJokes').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const language = document.getElementById('language').value;
    const number = document.getElementById('number').value;

    fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes?category=${category}&language=${language}&number=${number}`)
        .then(response => response.json())
        .then(data => {
            const jokesContainer = document.getElementById('jokes');
            jokesContainer.innerHTML = '';
            data.forEach(joke => {
                jokesContainer.innerHTML += `<p>${joke}</p>`;
            });
        })
        .catch(error => console.error(error));
});
