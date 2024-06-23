import { renderFavoriteStatus } from "../events/helpers.js";

/**
 * Generates HTML for displaying a single GIF card.
 * 
 * @param {object} gif The GIF object to display.  
 * @param {boolean} isRenderingInFavorites Indicates whether the GIF is being rendered in the favorites section.
 * @returns The HTML for the single GIF card.
*/

export const singleGifDisplay = (gif, isRenderingInFavorites) => {
  return `<div class="gif-card" id="trending-box">
    <img class="simple-single-gif" data-gif-id="${gif.id}" data-gif-url=${gif.url} src="${gif.images.original.url}" alt="${gif.title}">
    <button id="btnViewDetails" class="view-gif-btn" data-gif-id="${gif.id}">View details</button>
    ${renderFavoriteStatus(gif.id, isRenderingInFavorites)}
    </div> `
}

/**
 * Generates HTML for displaying a list of trending GIFs.
 * 
 * @param {Array<object>} gifs - An array of GIF objects to display in the trending view.
 * @returns {string} - The HTML for the trending view containing the GIFs.
 */


export const toTrendingView = (gifs) => {
  return `
    <div id="gifs-list">
      <h1>Trending gifs:</h1>
      <div class="content" id="gifs-placeholder">
        ${gifs.map((gif) => singleGifDisplay(gif, false)).join('')}
        <div id="end-of-content" style="text-align: center; padding: 10px; display: none;">End of Content</div>
      </div>
    </div>
    <button id="back-to-top-button">Back to Top</button>
  `;
};
