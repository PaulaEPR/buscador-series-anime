'use strict';

/* --- Global Variables --- */

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-submit');
const main = document.querySelector('.js-main');
const imgDefault =
  'https://via.placeholder.com/225x350/fff/666/?text=No+Picture';

/* --- Functions --- */

//Create HTML tag
function createTag(tag, className) {
  const newTag = document.createElement(tag);
  newTag.classList.add(className);
  return newTag;
}

//Create an article with title and background image
function createBkgImgArticle(title, imgUrl) {
  const thisMother = createTag('article', 'js-article');
  const thisChild = createTag('h5', 'js-article-title');
  const newTitle = document.createTextNode(title);
  thisChild.appendChild(newTitle);
  thisMother.appendChild(thisChild);
  setBkg(thisMother, imgUrl);
  return thisMother;
}

//Set background
function setBkg(element, imgUrl) {
  if (imgUrl.includes('qm_50.gif')) {
    element.style.background = `url('${imgDefault}') center bottom / cover no-repeat`;
  } else {
    element.style.background = `url('${imgUrl}') center bottom / cover no-repeat`;
  }
}

//Listen to events in the search button
function handleChangeInput(event) {
  event.preventDefault();
  const eraseResults = document.querySelector('.js-results');
  main.removeChild(eraseResults);
  getData();
}

button.addEventListener('click', handleChangeInput);

/* --- Obtener datos de la API --- */

function getData() {
  const apiURL = `https://api.jikan.moe/v3/search/anime?q=${input.value}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const result = data.results;
      const results = createTag('section', 'js-results');
      for (const item of result) {
        const title = item.title;
        const imgUrl = item.image_url;
        const article = createBkgImgArticle(title, imgUrl);
        results.appendChild(article);
        main.appendChild(results);
      }
    });
}
