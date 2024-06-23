import {API_KEY} from '../common/constants.js';

/**
 * Retrieves a random GIF.
 *
 * @returns {Promise<Object | null>} - A promise that resolves with the random GIF data or null if an error occurs.
 */

export const getRandomGif = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=g`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error('Failed to fetch random GIF');
    }
  } catch (error) {
    console.log(error);
  }
};