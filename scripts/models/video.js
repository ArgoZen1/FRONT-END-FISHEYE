import { createElement, getExtension } from '../utils/functions.js';

function VideoTag(tag, videoName, altText, url) {
  const ext = getExtension(videoName);

  if (ext[0] === 'mp4') {
    const obj = {
      elementName: `${tag}`,
      classIdAttr: {
        className: 'media__cardImg photographer-video',
        src: url,
        ariaLabel: '',
        controls: 'controls',
      },
      textContent: undefined,
      appendTo: 'div.media__card__wrapper',
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

export { VideoTag };
