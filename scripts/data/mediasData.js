/*
** Ici on recupere les données des medias avec fetch dans le fichier photographers.json
*/
async function getMedias() {
  let medias;

  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      medias = res.media;
    })
    .catch((err) => console.log('error', err));

  return {
    medias,
  };
}

export { getMedias };
