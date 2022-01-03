/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

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