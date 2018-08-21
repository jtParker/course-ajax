(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    // let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    const searchedForText = 'hippos';
    const unsplashRequest = new XMLHttpRequest();

    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 5324c6f5742acc5d653e9b181d189af718873d41247df1dd7e27de3cadef15f4');
    unsplashRequest.send();

    function addArticles () {}
      const articleRequest = new XMLHttpRequest();
      articleRequest.onload = addArticles;
      articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=b6079eba483f4cf58907639398c264bc`);
      articleRequest.send();

    function addImage(){
      let htmlContent = '';
      const data = JSON.parse(this.responseText);

      if (data && data.results && data.results[0]) {
      const firstImage = data.results[0];

      htmlContent = `<figure>
        <img src="${firstImage.urls.regular}" alt="${searchedForText}"
        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
      </figure>`;
    } else {
      htmlContent = '<div class="error-no-image">No images available</div>';
    }

      responseContainer.insertAdjacentHTML('afterBegin', htmlContent);
    }

    function addArticles() {
      const articleData = JSON.parse(this.responseText);
      const articles = articleData.response.docs;
      let articleContent = '';

      if (articleData) {
        for (var i = 0; i < articles.length; i++) {
          articleContent = `<article><h2>${articles[i].headline.main}</h2></article>
          <p>${articles[i].snippet}</p>`;
          responseContainer.insertAdjacentHTML('afterBegin', articleContent);
        }
      } else {
        articleContent = '<div class=""> No articles available</div>';
      }

    }


})();
