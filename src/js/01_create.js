/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

/* --- Create-sections Functions --- */

//Create HTML tag
function createTagJS(tag, classCSS, classJS) {
  const newTag = document.createElement(tag);
  newTag.classList.add(classCSS);
  newTag.classList.add(classJS);
  return newTag;
}

function createTagCSS(tag, classCSS) {
  const newTag = document.createElement(tag);
  newTag.classList.add(classCSS);
  return newTag;
}

//Create an article with title and background image
function createBkgImgArticle(title, imgUrl, thisId) {
  const thisMother = createTagJS('article', 'res__card', 'js-article');
  const thisChild = createTagCSS('h5', 'res__card--title');
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
  if (
    imgUrl.includes('qm_50.gif') ||
    imgUrl.includes('questionmark') ||
    imgUrl === ''
  ) {
    element.style.background = `url('${imgDefault}') center bottom / cover no-repeat`;
  } else {
    element.style.background = `url('${imgUrl}') center bottom / cover no-repeat`;
  }
}

//Create an article with title and little image
function createListArticle(title, imgUrl, thisId) {
  const thisMother = createTagJS('article', 'fav__card', 'js-article');
  thisMother.dataset.id = thisId;
  const thisChild1 = createTagCSS('img', 'fav__card--img');
  thisChild1.src = imgUrl;
  const thisChild2 = createTagCSS('h5', 'fav__card--title');
  const newTitle = document.createTextNode(title);
  thisChild2.appendChild(newTitle);
  const thisChild3 = createTagJS('button', 'fav__card--button', 'js-delete-fav');
  thisChild3.dataset.id = thisId;
  const thisGrandChild = createTagCSS('img', 'fav__card--icon');
  const deleteSvg = './assets/images/icons/delete.svg';
  thisGrandChild.src = deleteSvg;
  thisChild3.appendChild(thisGrandChild);
  thisMother.append(thisChild1, thisChild2, thisChild3);
  return thisMother;
}

//Paint results
function createResults() {
  const resultSection = createTagJS('section', 'res', 'js-results');
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
  const favSection = createTagJS('section', 'fav', 'js-favorites');
  for (const item of favorite) {
    const article = createListArticle(item.title, item.image_url, item.mal_id);
    favSection.appendChild(article);
  }
  mainFav.appendChild(favSection);
  listenDeleteBtns();
}