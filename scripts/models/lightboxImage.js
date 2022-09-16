import { createElement, getExtension } from '../utils/functions.js';

/**
 *
 * @param {String} imgTag tag de l'élément media : img
 * @param {String} imgName attribut alt
 * @param {URL} url l'url de l'image
 * @returns {HTMLElement} l'élément 'img' avec des classes, attributs src et alt
 * 
 */
function LightboxImageTag(imgTag, imgName, url) {
  const ext = getExtension(url);
  if (ext[0] === 'jpg') {
    const obj = {
      elementName: `${imgTag}`,
      classIdAttr: {
        className: 'lightbox__image lightbox-media',
        src: url,
        alt: imgName,
      },
      textContent: undefined,
      appendTo: 'div.lightbox__container',
    };
    return createElement(obj.elementName, obj.classIdAttr, obj.textContent, obj.appendTo);
  }
  
  console.log('Sorry, this is not a valid format of image');
}

export { LightboxImageTag };
