import { CONTAINER_SELECTOR } from '../common/constants.js';
import { loadSearchGifs } from '../requests/request-service.js';
import { toSearchView } from '../views/search-view.js';
import { q } from './helpers.js';

/**
 * Renders the search results for a given search term in the specified container.
 *
 * @param {string} searchTerm - The search term to display results for.
 * @returns {Promise<void>} - A promise that resolves after rendering the search results.
 */

export const renderSearchItems = async (searchTerm) => {
    const gifs = await loadSearchGifs(searchTerm);
    q(CONTAINER_SELECTOR).innerHTML = toSearchView(gifs, searchTerm);
};