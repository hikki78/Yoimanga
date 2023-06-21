// script.js

const url = 'https://myanimelist.p.rapidapi.com/manga/recommendations/';
const apiKey = '00aef2aeb5msh7fe88d267172891p16d646jsn687c6dca108c';

const recommendButton = document.getElementById('recommendButton');
const mangaIdInput = document.getElementById('mangaId');
const recommendationsSection = document.getElementById('recommendations');

recommendButton.addEventListener('click', () => {
  const mangaId = mangaIdInput.value.trim();

  if (!mangaId) {
    alert('Please enter a valid manga ID.');
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + mangaId, true);
  xhr.setRequestHeader('X-RapidAPI-Key', apiKey);
  xhr.setRequestHeader('X-RapidAPI-Host', 'myanimelist.p.rapidapi.com');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        displayRecommendations(result.recommendations);
      } else {
        console.error('Request failed. Status:', xhr.status);
        alert('An error occurred while retrieving recommendations.');
      }
    }
  };

  xhr.send();
});

function displayRecommendations(recommendations) {
  recommendationsSection.innerHTML = '';

  if (recommendations.length === 0) {
    recommendationsSection.textContent = 'No recommendations found.';
    return;
  }

  const ul = document.createElement('ul');

  recommendations.forEach((recommendation) => {
    const li = document.createElement('li');
    li.textContent = recommendation.recommendation.title;
    ul.appendChild(li);
  });

  recommendationsSection.appendChild(ul);
}
