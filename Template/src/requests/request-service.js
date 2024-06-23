import {
	API_KEY,
	GIFS_RENDERED,
	API_STARTING_URL,
	RATING,
} from '../common/constants.js';

/**
 * Loads featured GIFs based on a search term from the GifLab app.
 *
 * @param {string} searchTerm - The term to search for (default: 'coding').
 * @returns {Promise<Array<object> | null} - A promise that resolves to an array of GIF objects if the load is successful, or null on failure.
 */

export const loadFeaturedGifs = async (searchTerm = 'coding') => {
	const apiUrl = `${API_STARTING_URL}/search?api_key=${API_KEY}&q=${searchTerm}&limit=3&offset=0&rating=${RATING}&lang=en`;
	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`Response failed with status ${response.status}`);
		}

		const fetchedFeaturedGifs = await response.json();
		return fetchedFeaturedGifs.data;
	} catch (e) {
		console.log('Error:', e);
		return null;
	}
};

/**
 * Loads GIFs based on a search term from the GifLab app.
 *
 * @param {string} searchTerm - The term to search for (default: '').
 * @returns {Promise<Array<object> | null>} - A promise that resolves to an array of GIF objects if the search is successful, or null on failure.
 */

export const loadSearchGifs = async (searchTerm = '') => {
	const apiUrl = `${API_STARTING_URL}/search?api_key=${API_KEY}&q=${searchTerm}&limit=${GIFS_RENDERED}&offset=0&rating=${RATING}&lang=en`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`Response failed with status ${response.status}`);
		}

		const fetchedSearch = await response.json();
		return fetchedSearch.data;
	} catch (e) {
		console.error('Error:', e);
		return null;
	}
};

/**
 * Loads a single GIF by its ID from the GifLab app.
 *
 * @param {string | null} id - The ID of the GIF to load.
 * @returns {Promise<object | null>} - A promise that resolves to a GIF object if the load is successful, or null on failure.
 */

export const loadSingleGif = async (id = null) => {
	const apiUrl = `${API_STARTING_URL}/${id}?api_key=${API_KEY}&rating=${RATING}&lang=en`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`Response failed with status ${response.status}`);
		}

		const fetchedGifById = await response.json();
		return fetchedGifById;
	} catch (e) {
		console.error('Error:', e);
		return null;
	}
};

/**
 * Loads trending GIFs from the Giphy API with an optional offset.
 *
 * @param {number} [offset=0] - The offset for the request, specifying which page of trending GIFs to retrieve.
 * @returns {Promise<Object|null>} - A Promise that resolves to an object containing trending GIFs or null if an error occurs.
 */

export const loadTrendingGifs = async (offset = 0) => {
	const apiUrl = `${API_STARTING_URL}/trending?api_key=${API_KEY}&offset=${offset}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error(`Response failed with status ${response.status}`);
		}

		const trendingGifs = await response.json();
		return trendingGifs;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

/**
 * Loads detailed information about a GIF by its ID from the GifLab app.
 *
 * @param {string} gifId - The ID of the GIF to load.
 * @param {string} rating - The desired rating for the GIF (default: 'g').
 * @returns {Promise<object | null>} - A promise that resolves to an object containing detailed information about the GIF if the load is successful, or null on failure.
 */

export const loadGifDetailsById = async (id) => {
	const apiUrl = `${API_STARTING_URL}/${id}?api_key=${API_KEY}&rating=${RATING}`;

	try {
		const response = await fetch(apiUrl);

		if (response.status === 200) {
			const data = await response.json();
			return data;
		}	else {
			throw new Error('Failed to fetch GIF data.');
		}	
	}	catch (error) {
			console.error(error);
			return null;
		}
	};

