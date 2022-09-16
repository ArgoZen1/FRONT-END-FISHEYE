import { createElement, getExtension } from '../utils/functions.js';

function ImageTag(imgTag, imgName, altText, url) {
  const ext = getExtension(imgName);
  
  // ici on utilise ext[0] du dossier ../utils/functions.js pour cibler si le format jpg dans le tableau
  if (ext[0] === 'jpg') {
    const obj = {
      elementName: `${imgTag}`,
      classIdAttr: {
        className: 'media__cardImg',
        src: url,
        alt: altText,
      },
      textContent: undefined,
      appendTo: 'div.media__card__wrapper',
    };
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  }

  console.log('Sorry, this is not a valid format of image');
}

export { ImageTag };
