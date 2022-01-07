/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/* --- Global Variables --- */

const form = document.querySelector('.js-search');
const input = document.querySelector('.js-input');
const mainFav = document.querySelector('.js-main-fav');
const mainRes = document.querySelector('.js-main-res');
const deleteAllFav = document.querySelector('.js-delete-all');

let favorite = [];
let result = [];
const global = [2, 5, 9];

/* --- Get data form API --- */

function getData() {
  const query = input.value.replace(' ', '%20');
  const apiURL = `https://api.jikan.moe/v3/search/anime?q=${query}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      result = data.results;
      createResults();
      checkSelected();
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