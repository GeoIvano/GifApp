import { toGifSimple } from './gif-views.js';

/**
 * Generates HTML for displaying a list of favorite GIFs.
 *
 * @param {Array<object>} gifs - An array of GIF objects to display in the favorites view.
 * @returns {string} - The HTML for the favorites view containing the favorite GIFs.
 */

export const toFavoritesView = (gifs) => `
<div class="gif">
  <h1>Favorite gifs:</h1>
  <div class="favorite">
    ${gifs.length > 0
    ? gifs.map((gifRequest) => toGifSimple(gifRequest.data, true)).join('\n')
    : '<p>No favorite GIFs yet!</p>'}
    ${gifs.length === 0
    ? '<div id="random-gif-container"></div>'
    : ''
  }
  </div>
</div>
`;