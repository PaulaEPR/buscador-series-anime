'use strict';

/* --- Global Variables --- */

const form = document.querySelector('.search');
const input = document.querySelector('.js-input');
//const button = document.querySelector('.js-submit');
const mainFav = document.querySelector('.main__fav');
const mainRes = document.querySelector('.main__res');

let favorite = [];
let result = [];

/* --- Testing --- */




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

/* --- Local Storage --- */

//Save favorites
function saveFav() {
  localStorage.setItem('fav', JSON.stringify(favorite));
}

//Get favorites
function getFav() {
  const localStorageFav = localStorage.getItem('fav');
  if (localStorageFav !== null) {
    favorite = JSON.parse(localStorageFav);
    createFavs();
  }
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
function createFavs() {
  eraseSection('.js-favorites', mainFav);
  const favSection = createTag('section', 'js-favorites');
  for (const item of favorite) {
    const article = createBkgImgArticle(
      item.title,
      item.image_url,
      item.mal_id
    );
    favSection.appendChild(article);
  }
  mainFav.appendChild(favSection);
}

/* --- Event Listener Functions --- */

//Listen to submit event in the search form
function handleClickSubmit(event) {
  event.preventDefault();
  eraseSection('.js-results', mainRes);
  getData();
}

form.addEventListener('submit', handleClickSubmit);

//Listen to reset event in the search form
function handleClickReset() {
  input.focus();
  result = [];
  eraseSection('.js-results', mainRes);
}
form.addEventListener('reset', handleClickReset);

//Listen to events in the results
function handleClickCard(event) {
  const selectedCard = event.currentTarget;
  const selectedTitle = selectedCard.querySelector('.js-article-title');
  const selectedId = selectedCard.dataset.id;

  selectedCard.classList.toggle('js-selected');
  selectedTitle.classList.toggle('js-selected-title');

  checkFavorite(selectedId);
  createFavs();
  saveFav();
}

function listenerCards() {
  const cards = document.querySelectorAll('.js-article');
  for (const card of cards) {
    card.addEventListener('click', handleClickCard);
  }
}

/* --- Helper Functions --- */

//Check favorites
function checkFavorite(selectedId) {
  //Check if it's already in the favorites array
  const selectedFav = favorite.find(
    (item) => item.mal_id === parseInt(selectedId)
  );
  //Search it in the results and add or remove from favorites array
  if (selectedFav === undefined) {
    const selectedRes = result.find(
      (item) => item.mal_id === parseInt(selectedId)
    );
    favorite.push(selectedRes);
  } else {
    const foundIndex = favorite.findIndex(
      (item) => item.mal_id === parseInt(selectedId)
    );
    favorite.splice(foundIndex, 1);
  }
}

//Erase a section from the HTML
function eraseSection(childClass, motherName) {
  motherName.removeChild(document.querySelector(childClass));
}

/* --- Start --- */

//Recover favorites from Local Storage
getFav();