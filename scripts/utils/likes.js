
/**
 * @returns { Function } Fonction qui gère l'incrémentation des likes média au clic
 * sur le coeur des médias et la somme des likes qui s'affiche en bas de page
 */
function manageLikes() {
  // Éléments Dom de chaque média
  // nb de likes et icone coeur
  const mediaLikesNumberElements = document.querySelectorAll('.media__likes');
  const mediaHeartsElements = document.querySelectorAll('.media__heart');

  // Élément "Total likes" en bas de la page
  const pageLikesElement = document.querySelector('.totalLikes');

  /**
   * Incrémenter le nombre de likes sur un média, de 1
   * @param {MouseEvent} event
   * @returns Le nombre de likes du média, incrémenté de un.
   */

  const incrementMediaLikes = (event) => {
    event.preventDefault()
    const heart = event.currentTarget;
    
    
    // Sélectionne le nombre de likes correspondant au coeur
    const likes = heart.parentElement.querySelector('.media__likes');
    
      likes.textContent = Number(likes.textContent) + 1;
    
  };

  /**
   * Calcule et affiche la somme de tous les likes de la page en bas de page
   * @returns { String }
   */
  const sumOfAllMediasLikes = () => {
    const listOfLikes = [];
    let sumOfLikes = 0;
    // Crée un tableau de numéros de likes
    mediaLikesNumberElements.forEach((like) => {
      listOfLikes.push(Number(like.textContent));
    });
    sumOfLikes = listOfLikes.reduce((a, b) => a + b, 0);
    
    // Affichage de la somme des likes en bas de page
    return pageLikesElement.textContent = sumOfLikes;
  };

  // Afficher la somme des likes en bas de page
  pageLikesElement.textContent = sumOfAllMediasLikes();

  /**
   * Fonction appelée sur l'événement clic sur le cœur du média.
   * Recalcule le nouveau total des likes de la page et l'affiche.
   * @param {MouseEvent} event
   */
  const managePageLikes = () => {
    sumOfAllMediasLikes();
  };

  /**
   * @param {KeyboardEvent} event
   *
   */
  function onKeyUp(event) {
    if (event.key === 'Enter') {
      incrementMediaLikes(event);
      managePageLikes();
    }
  }
 

  /**
   * Ajoute deux listeners sur chaque coeur de média avec un événement de clic.
   * Le premier appelle une fonction qui incrémente le nb de likes de 1 au clic.
   * Le second appelle la fonction qui calcule et affiche la somme de tous les likes
   * en bas de page
   */
   const once = {
    once: true
  };
  const manageMediaLikes = () => {
    mediaHeartsElements.forEach((mediaHeart) => {
      mediaHeart.addEventListener('click', incrementMediaLikes, once );
      mediaHeart.addEventListener('click', managePageLikes);
      mediaHeart.addEventListener('keyup', onKeyUp);
    });
  };
  return { manageMediaLikes };
}

export { manageLikes };








