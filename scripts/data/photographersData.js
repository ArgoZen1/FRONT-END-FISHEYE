/*
** Ici on recupere les données des photographes avec fetch dans le fichier photographers.json
*/
async function getPhotographers() {
  let photographers;

  await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      photographers = res.photographers;
    })
    .catch((err) => console.log('error', err));

  return {
    photographers,
  };
}

export { getPhotographers };
