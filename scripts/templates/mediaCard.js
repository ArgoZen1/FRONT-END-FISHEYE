import { photographerMediaFactory } from '../factories/photographerMediaFactory.js';

import { createElement } from '../utils/functions.js';


function mediaCard(media, name) {
  const {
    id, photographerId, title, image, video, likes, date, price,
  } = media;
  const altText = media['alt-text'];

  // Obtenir le prénom du photographe à partir du nom complet
  const firstname = name.split(' ');

  const picture = `assets/photographers/${firstname[0]}/${image}`;
  const film = `assets/photographers/${firstname[0]}/${video}`;

  // ==============================================
  // Création de la carte média avec toutes les informations nécessaires
  function createMediaCard() {
    // élément article qui va contenir la card. Utilisation de la fonction createElement pour créer divers éléments
    const article = createElement('article', { className: 'media__card' }, undefined, 'div.medias__section');

    // image et son parent
    createElement('div', { className: 'media__card__wrapper' }, undefined, 'article');

    // balise a qui va contenir le lien de l'image ou de la vidéo
    if (media.image) {
      createElement('a', { className: 'media__card__img__wrapper', href: picture, ariaLabel: `${altText}, vue rapprochée` }, undefined, 'div.media__card__wrapper');
    }

    if (media.video) {
      createElement('a', { className: 'media__card__img__wrapper', href: film, ariaLabel: `${altText}, vue rapprochée` }, undefined, 'div.media__card__wrapper');
    }

    // Création d'un élément img ou vidéo en fonction du type de l'élément
    if (media.image) {
      photographerMediaFactory('image', media.image, altText, picture);
    }
    //linter ok
    let videoElement;
    function playVideo() {
      videoElement.play();
    }
    if (media.video) {
      photographerMediaFactory('video', media.video, altText, film);
      videoElement = document.querySelectorAll('.video');
      const playButton = document.querySelectorAll('.playPauseButton');

      playButton.forEach((button) => {
        button.addEventListener('click', playVideo);
      });

    }

    // heading
    createElement('h2', { className: 'media__CardHeading' }, undefined, 'article');
    createElement('div', { className: 'media__CardHeading__h2' }, title, 'h2.media__CardHeading');

    createElement('div', { className: 'media__likes__wrapper' }, undefined, 'h2.media__CardHeading');

    // ajout d'un span qui va contenir le coeur
    createElement('span', { className: 'media__likes' }, likes, 'div.media__likes__wrapper');
    createElement('i', {
      className: 'heart-icon-filled fas fa-heart media__heart', role: 'img', ariaLabel: 'likes', ariaHidden: false, tabIndex: '-1', title: 'Cliquez le coeur pour aimer',
    }, undefined, 'div.media__likes__wrapper');
    createElement('span', { className: 'likesAccessibleText' }, 'Cliquez le coeur pour aimer', 'div.media__likes__wrapper');

    return (article);
  }

  return {
    id, photographerId, title, image, likes, date, price, createMediaCard,
  };
}

export { mediaCard };
