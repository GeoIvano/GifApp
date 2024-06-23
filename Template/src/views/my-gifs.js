import { singleGifDisplay } from './trending-view.js';

/**
 * Generates the HTML for the "My GIFs" view, displaying uploaded GIFs.
 *
 * @param {Array<Object>} gifs - An array of objects representing the uploaded GIFs.
 * @returns {string} - The HTML content for the "My GIFs" view.
 */
export const toMyGifsView = (gifs) => `
<div id="my-gifs">
  <h1>Upload your gifs to see them here!</h1>
  <div id="uploaded-gifs-container">
  ${gifs.map((gif) => singleGifDisplay(gif.data)).join('')}
  </div>
</div>
`;
