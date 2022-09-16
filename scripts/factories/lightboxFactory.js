import { LightboxImageTag } from '../models/lightboxImage.js';
import { LightboxVideoTag } from '../models/lightboxVideo.js';

// Renvois l'element image ou vidéo 'models/image.js' ou 'models/video.js'
/**
 * @param {String} type la balise du media 'image' ou 'video'
 * @param {String} mediaName en-tête du média pour l'attribut 'alt'
 * @param {*} url URL du média pour l'attribut 'src'
 * @returns fonction qui crée l'élément 'type'
 */
function lightboxFactory(type, mediaName, url) {
  switch (type) {
    case 'image':
      LightboxImageTag('img', mediaName, url);
      break;
    case 'video':
      LightboxVideoTag('video', mediaName, url);
      break;
    default:
      console.log('Sorry, media not found');
  }
}

export { lightboxFactory };
