import { createElement } from '../utils/functions.js';

// Création de la carte du photographe sur photographe.html avec toutes les infos

function photographerCard(photographer) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  function createPhotographerCard() {
    // élément article placé dans la div à positionner avant le bouton dans le DOM
    
    const article = createElement('article', { className: 'header__infos__card' }, undefined, 'div.photograph__header__infos');

    // titre h2
    createElement('h2', { className: 'header__infos__heading' }, name, 'article');

    // div qui contient tous les textes sauf le titre
    createElement('div', { className: 'header__infos__desc' },  undefined, 'article.header__infos__card');

    createElement('p', { className: 'city' }, `${city}, ${country}`, 'div.header__infos__desc');
    createElement('p', { className: 'tagline' }, `${tagline}`, 'div.header__infos__desc');

    return (article);
  }

  return {
    name, id, city, country, tagline, price, picture, createPhotographerCard,
  };
}

export { photographerCard };
