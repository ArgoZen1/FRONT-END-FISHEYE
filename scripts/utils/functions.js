// crée un élément avec des classes id ou attributs
// Et ajoute un autre élément 
// Parametres : ( 'element', { className: class, Id: attrValue or attrName: value },
// 'textContent', parentElement )

/**
   *
   * @param {HTMLElement} elementName La balise de l'élément HTML à créer. Par exemple : (div ou h2)
   * @param {OBJECT} classIdAttr Un objet avec les classes et/ou les attributs de l'élément
   * exemple : {className: 'myclassName', id: 'myId', src: url, ariaLabel: 'myAriaLabel'}
   * @param {String} textContent le texte de l'élément, s'il n'y en a pas on renvoi undefined // à supprimer peut être. 
   * @param {HTMLElement} appendTo élément parent ou l'élément ajouté 
   * Exemple : 'div.container'.s'il n'y en a pas on renvoi undefined.
   * @returns HTML Element
   */
const createElement = (elementName, classIdAttr, textContent, appendTo) => {
  const element = document.createElement(elementName);
  // création d'un tableau de classe, d'id ou d'attributs
  Object.keys(classIdAttr).forEach((i) => {
    element[i] = classIdAttr[i];
    
  });
  
  
  // s'il n'y a pas de textContent on renvoi undefined
  if (textContent) {
    element.textContent = textContent;
  }
  if (appendTo) {
    const parent = document.querySelectorAll(appendTo);
    parent.forEach((item) => {
      item.appendChild(element);
    });
  }
  return element;
};

// On recupére l'extension d'un nom de média (ici, jpg ou mp4)
const getExtension = (mediaName) => {
  // ici on utilise une regex pour recuperer tout ce qu'il y a après le point dans l'url de l'image donc => JPG ou MP4
  const regex = /[^.]+$/;
  const ext = mediaName.match(regex);
//  console.log(ext)
  return ext;
};

export { createElement, getExtension, /*getMediaNameWithExt */  };
