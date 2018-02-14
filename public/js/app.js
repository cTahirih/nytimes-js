const searchField = document.getElementById('search-input');
const responseContainer = document.getElementById('response-container');
const btnXml = document.getElementById('XML');
const btnFetch = document.getElementById('FETCH');
let searchedForText;

btnXml.addEventListener('click', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

btnFetch.addEventListener('click', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNewsFetch();
});

var getNews = function getNews() {
  var articleRequestXML = new XMLHttpRequest();
  articleRequestXML.onreadystatechange = function() {
    if (articleRequestXML.readyState === 4 && articleRequestXML.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      articleRequestXML.onload = addNews(response); 
      articleRequestXML.onerror = handleError; 
    }
  };
  articleRequestXML.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=09000718e5954c1f961b9d990d608c08`);
  articleRequestXML.send();
};

function handleError() {
  console.log('Se ha presentado un error');
};

function addNews(news) {
  news.forEach(element => {
    if (element.document_type === 'article') {
      const newsRsult = `
      <div class = "box-news rounded mt-2 mb-2 pt-2 pb-2 pl-2 pr-2">
        <div class = "col-12 text-center">
          <h4 class="title">${element.headline.main}</h4>
        </div>
        <div class = "row">
          <div class = "col-4 col-lg-3">
            <img class="img-fluid rounded" src="https://static01.nyt.com/${element.multimedia[0].url}">
          </div>
          <div class = "col-8 col-lg-9">
            <p class="text-justify">${element.snippet}</p>
          </div>
        </div>
        <div class = "col-4 offset-8"> 
          <a  class="btn btn-primary" href=${element.web_url}>Leer Más</a>     
        </div>
      </div>
      `;
      responseContainer.innerHTML += newsRsult;
    } 
  });
};

