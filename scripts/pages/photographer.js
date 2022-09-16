
// Photographes et médias à partir du fichier JSON
import { getPhotographers } from '../data/photographersData.js';
import { getMedias } from '../data/mediasData.js';

// Modèle card des photographes
import { photographerCard } from '../templates/photographerCard.js';

// Modèle card des médias
import { mediaCard } from '../templates/mediaCard.js';
import { launchLightboxModal } from './lightboxModal.js';

import { createElement } from '../utils/functions.js';

import { sorting } from '../utils/sorting.js';
import { manageLikes } from '../utils/likes.js';

// === AFFICHAGE DE PHOTOGRAPHER CARD ===
// Importation des données des photographes et des médias ci-dessus

// Obtenir l'URL

const queryStringUrl = window.location.search;

const urlSearchParams = new URLSearchParams(queryStringUrl);

async function displayPhotographerCard(photographers) {
  const photographHeader = document.querySelector('.photograph__header__infos');

  const photographerUrlId = urlSearchParams.get('id');

  const name = urlSearchParams.get('name');

  // On trouve l'index du photographe avec l'identifiant de l'url
  const photographerIndex = photographers.findIndex((el) => el.id == photographerUrlId);

  // Affiche les infos du photographe en fonction de son ID
  const photographerCardModel = photographerCard(photographers[photographerIndex]);

  const photographCard = photographerCardModel.createPhotographerCard();

  photographHeader.appendChild(photographCard);

  // Création d'un élement "img" pour afficher le photographe
  const { portrait } = photographers[photographerIndex];
  const picture = `assets/photographers/photographers_id_photos/${portrait}`;

  createElement('img', { alt: name, src: picture }, undefined, '.photograph__header__portrait');
}

// === AFFICHAGE DES CARDS MÉDIAS ===

async function displayMediaData(medias, photographers) {
  console.log(medias)
  console.log(photographers)
  const mediasSection = document.querySelector('.medias__section');
  const pricePerDayElement = document.querySelector('.pricePerDay');

  const photographerUrlId = urlSearchParams.get('id');
  const name = urlSearchParams.get('name');
  const mediasArray = [];

  // On trie les médias par popularité
  medias.sort((a, b) => a.likes - b.likes);

  medias.reverse();

  // Création des cards média triées par popularité et on les affiche sur la page. 
  medias.forEach((media) => {
    if (media.photographerId == photographerUrlId) {
      const mediasModel = mediaCard(media, name);
      const mediasCard = mediasModel.createMediaCard();
      mediasSection.appendChild(mediasCard);
      // Création d'un tableau avec tous les médias des photographes
      mediasArray.push(media);
    }
  });

  // Tri des médias du photographe
  const selectElement = document.querySelector('#sorting__list');
  selectElement.addEventListener('change', manageSorting);
  selectElement.addEventListener('change', manageLikesUpdate);

  function manageSorting(event) {
    // const mediaLikesElementsArray = Array.from(document.querySelectorAll('.media__likes'));
    // mediaLikesElementsArray.forEach((element) => {

    // });
    sorting(event, mediasArray);

    mediasSection.innerHTML = '';

    mediasArray.forEach((media) => {
      const mediasModel = mediaCard(media, name);
      const mediasCard = mediasModel.createMediaCard();
      mediasSection.appendChild(mediasCard);
    });

    //  on rappelle la fonction launchLightboxModal avec les médias triés
    launchLightboxModal();
  }

  function manageLikesUpdate() {
    // Fonction qui incrémente les likes sur chaque média et le total des likes en bas de page
    const _manageLikes = manageLikes();
    // Gestion des listeners sur le coeur des medias pour incrémenter et afficher le total
    _manageLikes.manageMediaLikes();
  }
  manageLikesUpdate();

  // mise en place du prix journalier après les likes en bas de la page. 
  photographers.forEach((photographer) => {
    if (photographer.id == photographerUrlId) {
      const pricePerDay = photographer.price;
      pricePerDayElement.textContent = `${pricePerDay}€/jour`;
    }
  });
}

async function init() {
  // Récupération des données du photographe et on affiche la card du photographe
  const { photographers } = await getPhotographers();
  displayPhotographerCard(photographers);

  // Récupération des données multimédias et on affiche la card multimédia
  const { medias } = await getMedias();
  displayMediaData(medias, photographers);

  launchLightboxModal();
  manageLikes();
}

init();
