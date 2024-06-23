import { addFavorite, getFavorites, removeFavorite } from '../data.js/favorites.js';
import {q, renderFavoriteStatus} from './helpers.js';

/**
 * Toggles the favorite status of a GIF with the specified ID.
 *
 * @param {string} gifId - The identifier of the GIF to toggle the favorite status for.
 */

export const toggleFavoriteStatus = (gifId) => {
    const favorites = getFavorites();

    if (favorites.includes(gifId)) {
        removeFavorite(gifId);
    } else {
        addFavorite(gifId);
    }

    q(`span[data-gif-id="${gifId}"]`).innerHTML = renderFavoriteStatus(gifId);
};