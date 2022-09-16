// Données des photographes du fichier JSON
import { getPhotographers } from '../data/photographersData.js';

// Modéle de la card 
import { photographerHomeCard } from '../templates/photographerHomeCard.js';

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer__section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerHomeCard(photographer);
    const photographerCard = photographerModel.createHomeCard();
    photographersSection.appendChild(photographerCard);
  });
}

async function init() {
  // Récupérer les données des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
