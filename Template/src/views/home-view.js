import { toGifSimple } from './gif-views.js';
/**
 * Generates HTML for the home view of the GifLab app.
 *
 * @returns {string} - The HTML for the home view, providing an introduction and features.
 */

export const toHomeView = (featuredGifs) => {
  console.log("toHomeView");
  const featuredGifsHTML = featuredGifs
    ? `
    <div class="featured-gifs">
      ${featuredGifs
        .map((gifData) => `<div>${toGifSimple(gifData)}</div>`)
        .join('')}
    </div>`
    : '';

  return `
  <head>
    <title>GifLab - Home</title>
  </head>
  <body>
    <div class="content">
      <h1>Welcome to GifLab!</h1>
      
      <p>The most entertaining GIF app. You can:</p>
      <div class="wrapper">
        <ul class="list">
          <li>Browse the most trending GIFs</li>
          <li>Upload GIFs</li>
          <li>Add and remove GIFs from favorites</li>
          <li>Search for GIFs by title</li>
        </ul>
      </div>

      <h3>Featured GIFs:</h3>
      ${featuredGifsHTML}
    </div>
  </body>
  `;
};

