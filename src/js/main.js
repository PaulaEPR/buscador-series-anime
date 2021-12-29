'use strict';

/* --- Global Variables --- */

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-submit');
const main = document.querySelector('.js-main');
const imgDefault =
  'https://via.placeholder.com/225x350/fff/666/?text=No+Picture';

const favorite = [];

/* --- Create-sections Functions --- */

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
  if (imgUrl.includes('qm_50.gif') || imgUrl.includes('questionmark')) {
    element.style.background = `url('${imgDefault}') center bottom / cover no-repeat`;
  } else {
    element.style.background = `url('${imgUrl}') center bottom / cover no-repeat`;
  }
}

/* --- Event Listener Functions --- */

//Listen to events in the search button
function handleClickSubmit(event) {
  event.preventDefault();
  const eraseResults = document.querySelector('.js-results');
  main.removeChild(eraseResults);
  getData();
}

button.addEventListener('click', handleClickSubmit);

//Listen to events in the results
function handleClickCard(event) {
  const selectedCard = event.currentTarget;
  const selectedTitle = selectedCard.querySelector('.js-article-title');
  //const favoriteSection = document.querySelector('.js-favorites');
  selectedCard.classList.toggle('js-selected');
  selectedTitle.classList.toggle('js-selected-title');
}

function listenerCards() {
  const cards = document.querySelectorAll('.js-article');
  for (const card of cards) {
    card.addEventListener('click', handleClickCard);
  }
}

/* --- Obtener datos de la API --- */

function getData() {
  const query = input.value.replace(' ', '%20');
  const apiURL = `https://api.jikan.moe/v3/search/anime?q=${query}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const result = data.results;
      const resultSection = createTag('section', 'js-results');
      for (const item of result) {
        const title = item.title;
        const imgUrl = item.image_url;
        const article = createBkgImgArticle(title, imgUrl);
        resultSection.appendChild(article);
      }
      main.appendChild(resultSection);
      listenerCards();
    });
}
