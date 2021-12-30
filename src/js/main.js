'use strict';

/* --- Global Variables --- */

const input = document.querySelector('.js-input');
const button = document.querySelector('.js-submit');
//const main = document.querySelector('.js-main');
//const mainFav = document.querySelector('.main__fav');
const mainRes = document.querySelector('.main__res');

const favorite = [];
let result = [];

/* --- Get data form API --- */

function getData() {
  const query = input.value.replace(' ', '%20');
  const apiURL = `https://api.jikan.moe/v3/search/anime?q=${query}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      result = data.results;
      createResults();
    });
}

/* --- Create-sections Functions --- */

//Create HTML tag
function createTag(tag, className) {
  const newTag = document.createElement(tag);
  newTag.classList.add(className);
  return newTag;
}

//Create an article with title and background image
function createBkgImgArticle(title, imgUrl, thisId) {
  const thisMother = createTag('article', 'js-article');
  const thisChild = createTag('h5', 'js-article-title');
  const newTitle = document.createTextNode(title);
  thisMother.dataset.id = thisId;
  thisChild.appendChild(newTitle);
  thisMother.appendChild(thisChild);
  setBkg(thisMother, imgUrl);
  return thisMother;
}

//Set background
function setBkg(element, imgUrl) {
  const imgDefault =
    'https://via.placeholder.com/225x350/fff/666/?text=No+Picture';
  if (imgUrl.includes('qm_50.gif') || imgUrl.includes('questionmark')) {
    element.style.background = `url('${imgDefault}') center bottom / cover no-repeat`;
  } else {
    element.style.background = `url('${imgUrl}') center bottom / cover no-repeat`;
  }
}

//Paint results
function createResults() {
  const resultSection = createTag('section', 'js-results');
  for (const item of result) {
    const article = createBkgImgArticle(
      item.title,
      item.image_url,
      item.mal_id
    );
    resultSection.appendChild(article);
  }
  mainRes.appendChild(resultSection);
  listenerCards();
}

//Paint favorites

/* --- Event Listener Functions --- */

//Listen to events in the search button
function handleClickSubmit(event) {
  event.preventDefault();
  const eraseResults = document.querySelector('.js-results');
  mainRes.removeChild(eraseResults);
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

  const selectedId = selectedCard.dataset.id;
  const selectedFav = result.find(
    (item) => item.mal_id === parseInt(selectedId)
  );

  checkFavorite(selectedFav);
}

//Check if the selected favorite is already in the favorite array
function checkFavorite(selectedFav) {
  if (favorite.find((item) => item.mal_id === selectedFav.mal_id)) {
    favorite.pop(selectedFav);
  } else {
    favorite.push(selectedFav);
  }
}

function listenerCards() {
  const cards = document.querySelectorAll('.js-article');
  for (const card of cards) {
    card.addEventListener('click', handleClickCard);
  }
}
