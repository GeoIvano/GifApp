import { singleGifDisplay } from './trending-view.js';

/**
 * Generates HTML for displaying a list of GIFs found for a specific search term.
 *
 * @param {Array<object>} gifs - An array of GIF objects to display in the search view.
 * @param {string} searchTerm - The search term used to find the GIFs.
 * @returns {string} - The HTML for the search view containing the GIFs and search term.
 */

export const toSearchView = (gifs, searchTerm) => `
<div id="gifs">
  <h1>Gifs found for "${searchTerm}":</h1>
  <div class="content">
    ${gifs.map((gifRequest) => singleGifDisplay(gifRequest, false)).join('\n') || '<p>Add some gifs to favorites to see them here.</p>'}
  </div>
</div>
`;