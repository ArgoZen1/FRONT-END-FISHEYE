/**
 * 
  Trie les médias du photographe par titre, date ou popularité via la sélection
 * @param {Objects[]} photographerMedias Tableau contenant tous les médias du photographe
 */
function sorting(event, mediasArray) {
  if (event.currentTarget.value === 'popularity') {
    mediasArray.sort((a, b) => (a.likes - b.likes));
    mediasArray.reverse();
  }

  if (event.currentTarget.value === 'date') {
    mediasArray.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      return 0;
    });
  }

  if (event.currentTarget.value === 'title') {
    mediasArray.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
}

export { sorting };
