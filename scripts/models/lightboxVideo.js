import { createElement, getExtension } from '../utils/functions.js';

/**
 * Création de l'élement vidéo. 
 * @param {String} videoTag Le tag de l'élément média : 'video'
 * @param {String} videoName Le nom de la vidéo pour l'attribut 'alt'
 * @param {URL} url L'URL de la vidéo
 * @returns {HTMLElement} Element 'video' avec les classes, et attributs src, alt et controls,
 * 
 */
function LightboxVideoTag(videoTag, videoName, url) {
  const ext = getExtension(url);

  if (ext[0] === 'mp4') {
    const obj = {
      elementName: `${videoTag}`,
      classIdAttr: {
        className: 'media__cardImg lightbox-video lightbox-media',
        src: url,
        alt: videoName,
        controls: 'controls',
      },
      textContent: undefined,
      appendTo: 'div.lightbox__container',
    };
    const videoElement = createElement(
      obj.elementName,
      obj.classIdAttr,
      obj.textContent,
      obj.appendTo,
    );


    return { videoElement };
  }
  console.log('Sorry, this is not a valid format of video');
}

export { LightboxVideoTag};
