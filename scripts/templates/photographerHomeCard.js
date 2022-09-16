import { createElement } from '../utils/functions.js';

function photographerHomeCard(photographer) {
  const {
    name, id, city, country, tagline, price, portrait,
  } = photographer;

  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  // Création de la carte du photographe avec toutes les infos sauf l'id
  function createHomeCard() {
    
    const article = createElement('article', { className: 'photographer__card' }, undefined, 'div.photographer__section');

    // création d'une div pour img et un lien vers la page du photographe
    createElement('div', { className: 'link__container' }, undefined, 'article');

    // lien du contenu de la carte. On insére le nom et l'id du photographe dans les paramètres de l'url
    createElement('a', { className: 'photographer__card__content__wrapper', href: `./photographer.html?name=${name}&id=${id}`, ariaLabel: name }, undefined, 'div.link__container');

    // img et sa div
    createElement('div', { className: 'cardImg__wrapper' }, undefined, 'div.link__container');
    createElement('img', { className: 'cardImg', src: picture, alt: '' }, undefined, 'div.cardImg__wrapper');

    // titre h2
    createElement('h2', { className: 'cardHeading' }, name, 'div.link__container');

    // div qui contient tous les textes sauf le titre
    createElement('div', { className: 'cardText' }, undefined, 'article');
    createElement('p', { className: 'city' }, `${city}, ${country}`, 'div.cardText');
    createElement('p', { className: 'tagline' }, `${tagline}`, 'div.cardText');
    createElement('p', { className: 'price' }, `${price} €/jour`, 'div.cardText');

    return (article);
  }

  return {
    name, id, city, country, tagline, price, createHomeCard,
  };
}

export { photographerHomeCard };
