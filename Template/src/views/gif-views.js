import { renderFavoriteStatus } from '../events/helpers.js'

/**
 * Generates HTML for displaying a simple GIF card.
 *
 * @param {object} gif - The GIF object to display.
 * @param {boolean} isRenderingInFavorites - Indicates whether the GIF is being rendered in a favorites section.
 * @returns {string} - The HTML for the simple GIF card.
 */

export const toGifSimple = (gif, isRenderingInFavorites) => {
    return `
<div class="gif">
<h1>${gif.title}</h1>
<img src="${gif.images.original.url}" alt="${gif.title}" class="gif-simple-style"/><br>
<button id="btnViewDetails" class="view-gif-btn" data-gif-id="${gif.id}">View details</button>
${renderFavoriteStatus(gif.id, isRenderingInFavorites)}
</div>
`};

