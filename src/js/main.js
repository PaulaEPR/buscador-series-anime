'use strict';

/* --- Funciones --- */

//Crea la etiqueta HTML
function createTag(tag, className) {
  const newTag = document.createElement(tag);
  newTag.classList.add(className);
  return newTag;
}

//Crear un artículo con título e imagen de fondo
function createBkgImgArticle(title, imgUrl) {
  const thisMother = createTag('article', 'js-article');
  const thisChild = createTag('h5', 'js-article-title');
  const newtitle = document.createTextNode(title);
  thisChild.appendChild(newtitle);
  thisMother.appendChild(thisChild);
  thisMother.style.background = `url('${imgUrl}') center bottom / cover no-repeat`;
  return thisMother;
}

fetch('https://api.jikan.moe/v3/search/anime?q=naruto')
  .then((response) => response.json())
  .then((data) => {
    const result = data.results;
    for (const item of result) {
      const title = item.title;
      const imgUrl = item.image_url;
      const article = createBkgImgArticle(title, imgUrl);
      const mother = document.querySelector('.main');
      mother.appendChild(article)
    }
  });
