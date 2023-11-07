document.addEventListener('DOMContentLoaded', function () {
    const getRandomBtn = document.getElementById('getRandom');
    const getByIdBtn = document.getElementById('getById');
    const resultDiv = document.getElementById('result');

    getRandomBtn.addEventListener('click', function () {
        const language = document.getElementById('language').value;
        const category = document.getElementById('category').value;
        const count = document.getElementById('count').value;

        fetch(`/get_jokes?language=${language}&category=${category}&count=${count}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resultDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                resultDiv.innerHTML = 'Incorrect entries!';
            });
    });

    getByIdBtn.addEventListener('click', function () {
        const id = document.getElementById('jokeId').value;
        const language = document.getElementById('language').value;

        fetch(`/get_joke_by_id?id=${id}&language=${language}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resultDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                resultDiv.innerHTML = 'Incorrect entries!';
            });
    });
});
