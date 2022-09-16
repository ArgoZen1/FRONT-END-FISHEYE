import { ImageTag } from '../models/image.js';
import { VideoTag } from '../models/video.js';

/*
** Renvoie l'élément img ou video de 'models/image.js' ou 'models/video.js'
*/ 
function photographerMediaFactory(type, mediaName, altText, url) {
  switch (type) {
    case 'image':
      ImageTag('img', mediaName, altText, url);
      break;
    case 'video':
      VideoTag('video', mediaName, altText, url);
      break;
    default:
      console.log('Sorry, media not found');
  }
}

export { photographerMediaFactory };
