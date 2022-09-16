
import { lightbox } from '../templates/lightbox.js';
import { lightboxFactory } from '../factories/lightboxFactory.js';

import { createElement, getExtension } from '../utils/functions.js';


/**
 * Création de la lightbox et gestion des médias à l'interieur
 */
function lightboxModal() {
  const links = Array.from(document.querySelectorAll('.media__card__img__wrapper'));
  const headings = Array.from(document.querySelectorAll('.media__CardHeading__h2'));
  console.log(links)
  const imagesUrls = links.map((link) => link.getAttribute('href'));

  // Au click, la fonction getLightbox est appelée pour créer le template lightbox
  links.forEach((link) => link.addEventListener('click', getLightbox));

  /**
   * @param {Event} event
   */
  function getLightbox(event) {
    event.preventDefault();
    const lightboxModel = lightbox();
    const url = event.currentTarget.getAttribute('href');
    lightboxModel.buildLightbox(url);
    // Appel de la fonction targetImage pour afficher l'image
    targetImage(event);
  }

  /**
   * On cible le media à afficher par l'url 
   * @param {MouseEvent} event
   */
  function targetImage(event) {
    const url = event.currentTarget.getAttribute('href');

    // On récupère le titre de l'image ou de la vidéo ciblée
    let heading = '';
    heading = event.currentTarget.closest('.media__card').querySelector('h2>div').textContent;

    loadImage(heading, url);
  }
  

  /**
   * Chargement du media
   * @param {String} heading Le texte du media à afficher
   * @param {String} url l'url du media à afficher
   */
  function loadImage(heading, url) {
    console.log(heading)
    const container = document.querySelector('.lightbox__container');
    container.innerHTML = '';

    // const closingCross = document.querySelector('.lightbox__close');

    getImage(heading, url);

    document.querySelector('.lightbox__next').addEventListener('click', next);
    document.querySelector('.lightbox__prev').addEventListener('click', previous);

    document.querySelector('.lightbox__wrapper').addEventListener('keyup', changeMedia);
    document.querySelector('.lightbox__wrapper').addEventListener('keyup', onKeyUp);

    document.querySelector('.lightbox__close').addEventListener('click', close);
    document.querySelector('.lightbox__close').addEventListener('keyup', onKeyUp);
  }

  /**
   * Création d'un élément image ou vidéo avec son titre en fonction du type de média à afficher
   * @param {String} heading Le texte du media à afficher
   * @param {String} url l'url du media à afficher
   */
  function getImage(heading, url) {
    const container = document.querySelector('.lightbox__container');

    // Création d'un élément img ou video en fonction du type
    // basé sur l'extension de l'URL du fichier
    const ext = getExtension(url);
    if (ext[0] === 'jpg') {
      lightboxFactory('image', heading, url);

      const imageElement = document.querySelector('.lightbox-media');
      createElement('h2', { className: 'lightbox__imageHeading lightbox__heading' }, heading, 'div.lightbox__container');

      // Ajout d'un loader dans 'container'
      const loader = createElement('div', { className: 'lightbox__loader' }, undefined, 'div.lightbox__container');

      // Supprime le loader l'orsque l'image est chargée
      imageElement.onload = () => {
        container.removeChild(loader);
      };
    }

    if (ext[0] === 'mp4') {
      lightboxFactory('video', heading, url);

      container.querySelector('.lightbox-playPauseButton');

      createElement('h2', { className: 'lightbox__videoHeading lightbox__heading' }, heading, 'div.lightbox__container');
    }
  }

  // ====================
  // Fermeture de la lightbox
  // ====================

  /**
   * Appel de la fonction close pour fermer la lightbox
   * @param {KeyboardEvent} event
   *
   */
  function onKeyUp(event) {
    if (event.key === 'Escape') {
      close(event);
    } else if (event.key === 'Enter') {
      close(event);
    }
  }

  /**
   * Fermeture de la lightbox
   * @param {MouseEvent|KeyboardEvent} event
   *
   */
  function close(event) {
    event.preventDefault();

    document.querySelector('.lightbox__close').removeEventListener('keyup', onKeyUp);
    document.querySelector('.lightbox__close').removeEventListener('click', close);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', onKeyUp);
    document.querySelector('.lightbox__wrapper').remove();
  }

  // ==================================================
  // BOUTON NEXT ET PREV POUR NAVIGUER DANS LA LIGHTBOX
  // ==================================================

  /**
     * Afficher le média suivant dans la lightbox
     * @param {MouseEvent|KeyboardEvent} event événement souris ou clavier
     */
  function next() {
    let heading = document.querySelector('.lightbox__container h2').textContent;
    let url = document.querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxHeading = document.querySelector('.lightbox__heading');

    let currentIndex = imagesUrls.findIndex((mediaUrl) => mediaUrl === url);
    let nextUrl = '';
    let nextHeading = '';
    if (currentIndex === imagesUrls.length - 1) {
      currentIndex = -1;
    }

    nextUrl = imagesUrls[currentIndex + 1];
    nextHeading = headings[currentIndex + 1].textContent;

    // Suppression du titre et du média avant de créer ce qui suit
    lightboxMedia.remove();
    lightboxHeading.remove();

    url = nextUrl;
    heading = nextHeading;

    document.querySelector('.lightbox__next').removeEventListener('click', next);
    document.querySelector('.lightbox__prev').removeEventListener('click', previous);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

    loadImage(heading, url);
  }

  /**
     * Afficher le média précédent dans la lightbox
     * @param {MouseEvent|KeyboardEvent} event événement souris ou clavier
     */
  function previous() {
    let heading = document.querySelector('.lightbox__container h2').textContent;
    let url = document.querySelector('.lightbox__container .lightbox-media').getAttribute('src');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxHeading = document.querySelector('.lightbox__heading');

    let currentIndex = imagesUrls.findIndex((mediaUrl) => mediaUrl === url);
    let previousUrl = '';
    let previousHeading = '';
    if (currentIndex === 0) {
      currentIndex = imagesUrls.length;
    }

    previousUrl = imagesUrls[currentIndex - 1];
    previousHeading = headings[currentIndex - 1].textContent;

    // Supprimez le titre et le média avant de créer ce qui suit
    lightboxMedia.remove();
    lightboxHeading.remove();

    url = previousUrl;
    heading = previousHeading;

    document.querySelector('.lightbox__next').removeEventListener('click', next);
    document.querySelector('.lightbox__prev').removeEventListener('click', previous);
    document.querySelector('.lightbox__wrapper').removeEventListener('keyup', changeMedia);

    loadImage(heading, url);
  }

  /**
   * Appel de la fonction next ou previous pour afficher le média suivant ou précédent
   * @param {KeyboardEvent} event 
   */
  function changeMedia(event) {
    if (event.key === 'ArrowRight') {
      next();
    }
    if (event.key === 'ArrowLeft') {
      previous();
    }
  }
}

async function launchLightboxModal() {
  lightboxModal();
}

export { launchLightboxModal };
