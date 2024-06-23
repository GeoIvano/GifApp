import { EMPTY_HEART, FULL_HEART } from '../common/constants.js';
import { getFavorites } from '../data.js/favorites.js';

/**
 * A shorthand function to select an element from the DOM using a CSS selector.
 *
 * @param {string} selector - The CSS selector to match the element to select.
 * @returns {Element | null} - The selected DOM element or null if no element matches the selector.
 */

export const q = (selector) => document.querySelector(selector);

/**
 * A shorthand function to select multiple elements from the DOM using a CSS selector.
 *
 * @param {string} selector - The CSS selector to match the elements to select.
 * @returns {NodeList} - A collection of DOM elements that match the provided selector.
 */

export const qs = (selector) => document.querySelectorAll(selector);

/**
 * Sets the active navigation link based on the current page.
 *
 * @param {string} page - The identifier of the current page.
 */

export const setActiveNav = (page) => {
    const navs = qs('a.nav-link');

    Array
      .from(navs)
      .forEach(element => element
        .getAttribute('data-page') === page
        ? element.classList.add('active')
        : element.classList.remove('active')
        );
};

/**
 * Renders the favorite status for a GIF based on its ID.
 *
 * @param {string} gifId - The identifier of the GIF to render the favorite status for.
 * @param {boolean} isRenderingInFavorites - Indicates whether the rendering is in the "Favorites" view (default: false).
 * @returns {string} - The HTML representation of the favorite status icon.
 */

export const renderFavoriteStatus = (gifId, isRenderingInFavorites) => {
    const favorites = getFavorites();

    return favorites.includes(gifId)
    ? `<span class="favorite active" data-is-in-favorites-view="${isRenderingInFavorites ? true : false}" data-gif-id="${gifId}">${FULL_HEART}</span>`
    : `<span class="favorite" data-is-in-favorites-view="${isRenderingInFavorites ? true : false}" data-gif-id="${gifId}">${EMPTY_HEART}</span>`;
};