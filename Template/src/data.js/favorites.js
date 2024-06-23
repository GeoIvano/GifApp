let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/**
 * Adds a GIF to the list of favorites if it's not already in the favorites list.
 *
 * @param {string} gifId - The identifier of the GIF to add to the favorites list.
 */

export const addFavorite = (gifId) => {
    if(favorites.find(id => id === gifId)) {

        return;
    }

    favorites.push(gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

/**
 * Removes a GIF from the list of favorites based on its ID.
 *
 * @param {string} gifId - The identifier of the GIF to remove from the favorites list.
 */

export const removeFavorite = (gifId) => {
    favorites = favorites.filter(id => id !== gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavorites = () => {
    return  [...favorites];
};