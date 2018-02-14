
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
const btnFetch = document.getElementById('btn-fetch');
let searchedForText;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

btnFetch.addEventListener('click', function () {
  event.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  let uri = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e53e1cff6e5f4b5897ecec6f9972ba1a`;
  fetch(uri)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      const response = data.response.docs;
      addNews(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.onreadystatechange = function () {
    if (articleRequest.readyState === 4 && articleRequest.status === 200) {
      // La diferencia entre json y una cadena
      // console.log(articleRequest.responseText);
      // Para asegurarnos que es json lo parseamos 
      const data = JSON.parse(articleRequest.responseText);
      // console.log(data.message);
    }
  };
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=e53e1cff6e5f4b5897ecec6f9972ba1a`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function addNews(arr) {
  const data = JSON.parse(this.responseText);
  const article = data.response.docs[0];
  const title = article.headline.main;
  const snippet = article.snippet;
  let li = document.createElement('li');
  li.className = 'articleClass';
  li.innerText = snippet;
  responseContainer.appendChild(li);
}
function handleError() {
  console.log('Se ha presentado un error');
}