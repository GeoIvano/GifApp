import { singleGifDisplay } from './trending-view.js';

/**
 * Generates HTML for displaying detailed information about a GIF.
 *
 * @param {object} gifResponse - The response containing detailed information about the GIF.
 * @returns {string} - The HTML for the detailed view of the GIF.
 */

export const toGifDetailedView = (gifResponse) => {
  const gif = gifResponse.data;
  console.log(gif);
  return ` <div id="gif-details">
  ${singleGifDisplay(gif, false)}
  <h1>${gif.title}</h1>
  <p>Username: ${gif.username}</p>
  <p>ID: ${gif.id}</p>
  <p>Rating: ${gif.rating}</p>
  <p>Source: <a id="gif-source-url" href="${gif.source}" target="_blank">${gif.source}</a></p>
</div>
`};