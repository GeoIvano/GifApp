import {
	ABOUT,
	TRENDING,
	CONTAINER_SELECTOR,
	FAVORITES,
	MY_GIFS,
	UPLOAD,
	HOME
} from '../common/constants.js';
import { getFavorites } from '../data.js/favorites.js';
import { toHomeView } from '../views/home-view.js';
import { toAboutView } from '../views/about-view.js';
import { q, setActiveNav } from './helpers.js';
import { toFavoritesView } from '../views/favorites-view.js';
import { toTrendingView } from '../views/trending-view.js';
import { loadGifDetailsById } from '../requests/request-service.js';
import { loadSingleGif } from '../requests/request-service.js';
import { loadTrendingGifs } from '../requests/request-service.js';
import { loadFeaturedGifs } from '../requests/request-service.js';
import { toGifDetailedView } from '../views/details-view.js';
import { toUploadView } from '../views/upload-view.js';
import { toGifSimple } from '../views/gif-views.js';
import { toMyGifsView } from '../views/my-gifs.js';
import {initializeInfiniteScroll} from './infinite-scroll-events.js';
import { API_KEY, API_STARTING_URL } from '../common/constants.js';
import { getUploadedGifs } from '../common/data.js';

let currentInfiniteScrollHandler = null;

/**
 * Loads and renders the content for a specific page in the application.
 *
 * @param {string} page - The identifier of the page to load.
 * @returns {Promise<void | null>} - A promise that resolves after rendering the content of the selected page or null if the page is not recognized.
 */

export const loadPage = (page = '') => {
	if (currentInfiniteScrollHandler) {
		window.removeEventListener('scroll', currentInfiniteScrollHandler);
		currentInfiniteScrollHandler = null;
	}
	switch (page) {
		case HOME:
			setActiveNav(HOME);
			return renderHome();

		case TRENDING:
			setActiveNav(TRENDING);
			return renderTrending();

		case FAVORITES:
			setActiveNav(FAVORITES);
			return renderFavorites();

		case UPLOAD:
			setActiveNav(UPLOAD);
			return renderUpload();

		case MY_GIFS:
			setActiveNav(MY_GIFS);
			return renderMyGifs();

		case ABOUT:
			setActiveNav(ABOUT);
			return renderAbout();

		default:
			return null;
	}
};

/**
 * Renders the home page of the application, displaying featured GIFs.
 *
 * @returns {Promise<void>} - A promise that resolves after rendering the home page.
 */

const renderHome = async () => {
	try {
		const featuredGifs = await loadFeaturedGifs();
		q(CONTAINER_SELECTOR).innerHTML = toHomeView(featuredGifs);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Renders trending GIFs and initializes infinite scrolling for the trending view.
 */
const renderTrending = async () => {
	try {
		const trending = await loadTrendingGifs();
		q(CONTAINER_SELECTOR).innerHTML = toTrendingView(trending.data);
		currentInfiniteScrollHandler = initializeInfiniteScroll();
	} catch (error) {
		console.log(error);
	}
};

/**
 * Renders favorite GIFs and handles the display of random GIFs if no favorites are available.
 */
const renderFavorites = async () => {
	try {
		const favorites = getFavorites();
		let favoriteGifs = [];

		if (favorites.length === 0) {
			try {
				const response = await fetch(
					`${API_STARTING_URL}/random?api_key=${API_KEY}&rating=g`
				);
				if (response.ok) {
					const data = await response.json();
					favoriteGifs.push(data);
					q('#random-gif-container').innerHTML = toGifSimple(data, true);
				} else {
					throw new Error('Failed to fetch random GIF');
				}
			} catch (error) {
				console.log('Failed to fetch a random GIF:', error);
			}
		} else {
			favoriteGifs = await Promise.all(
				favorites.map(async (id) => {
					try {
						return await loadSingleGif(id);
					} catch (error) {
						console.log(`Failed to load GIF with ID: ${id}`);
					}
				})
			);
		}

		q(CONTAINER_SELECTOR).innerHTML = toFavoritesView(
			favoriteGifs.filter((gif) => gif !== null)
		);
	} catch (error) {
		console.log(error);
	}
};

/**
 * Renders the "Upload" page, allowing users to upload GIFs.
 */

const renderUpload = () => {
	q(CONTAINER_SELECTOR).innerHTML = toUploadView();
};

/**
 * Renders the "My gifs" page, allowing users to see their uploaded GIFs.
 */
export const renderMyGifs = async () => {
	const myGifs = getUploadedGifs().map( async (id) => await loadSingleGif(id));
	const gifs = await Promise.all(myGifs);
	console.log(gifs);
	q(CONTAINER_SELECTOR).innerHTML = toMyGifsView(gifs);
  };

/**
 * Renders the "About" page, providing information about the team members.
 */

const renderAbout = async () => {
	q(CONTAINER_SELECTOR).innerHTML = toAboutView();
};

/**
 * Renders the detailed view of a GIF based on its ID.
 *
 * @param {string | null} id - The identifier of the GIF to display details for (default: null).
 * @returns {Promise<void>} - A promise that resolves after rendering the detailed view of the GIF.
 */

export const renderGifDetails = async (id = null) => {
	const details = await loadGifDetailsById(id);

	q(CONTAINER_SELECTOR).innerHTML = toGifDetailedView(details);
};
