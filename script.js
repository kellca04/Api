document.addEventListener("DOMContentLoaded", function () {
    // JavaScript to interact with the API
    document.getElementById('getJokeById').addEventListener('click', function () {
        const jokeId = document.getElementById('jokeId').value;

        fetch(`https://jokesapikellca04.onrender.com/api/v1/jokes/${jokeId}`, {
            method: 'GET',
            headers: {
                'Origin': 'https://kellca04jokes.netlify.app'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const jokesDiv = document.getElementById('jokes');
            jokesDiv.innerHTML = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error, e.g., display an error message to the user.
        });
    });
});
