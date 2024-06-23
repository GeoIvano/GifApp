/*eslint-disable no-invalid-this*/
import { FAVORITES, HOME } from './common/constants.js';
import { toggleFavoriteStatus } from './events/favorites-events.js';
import { q } from './events/helpers.js';
import { loadPage } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';
import { renderGifDetails } from './events/navigation-events.js';
import { loaderView } from './views/loader-view.js';
import { uploadGif } from './events/upload-events.js';

/**
 * Adds a global event listener to the document that listens for click events
 * and dispatches specific events based on the target element's class.
 * Also adds an event listener to the search input to
 * render search results on input change.
 * Finally, loads the home page by default on DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', () => {
	// add a global event listener
	document.addEventListener('click', async (e) => {
		// nav events
		if (
			e.target.classList.contains('nav-link') &&
			!e.target.classList.contains('favorite')
		) {
			const navLinks = document.querySelectorAll('.nav-link');
			navLinks.forEach((link) => {
				link.classList.remove('active');
			});
			e.target.classList.add('active');
			loadPage(e.target.getAttribute('data-page'));
		}

		// show gif details
		if (e.target.classList.contains('view-gif-btn')) {
			renderGifDetails(e.target.getAttribute('data-gif-id'));
		}

		// toggle favorite event
		if (e.target.classList.contains('favorite')) {
			const gifId = e.target.getAttribute('data-gif-id');
			toggleFavoriteStatus(gifId);
			const isInFavoritesView = e.target.getAttribute(
				'data-is-in-favorites-view'
			);
			if (isInFavoritesView === 'true') {
				loadPage(FAVORITES);
			}
		}

		// back to top button in trending
		const backToTopButton = document.getElementById('back-to-top-button');

		const scrollToTop = () => {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
		};

		window.addEventListener('scroll', () => {
			if (
				document.body.scrollTop > 20 ||
				document.documentElement.scrollTop > 20
			) {
				backToTopButton.classList.add('show');
			} else {
				backToTopButton.classList.remove('show');
			}

			backToTopButton.addEventListener('click', scrollToTop);
		});

		

		// upload preview
		const uploadInput = document.getElementById('upload-input');
		const gifPreview = document.getElementById('gifPreview');
		if (uploadInput && gifPreview) {
			uploadInput.addEventListener('change', function () {
				const file = this.files[0];
				const reader = new FileReader();

				reader.onload = function (e) {
					gifPreview.style.display = 'block';
					gifPreview.src = e.target.result;
				};

				reader.readAsDataURL(file);
			});
		}

		if (e.target.classList.contains('upload-btn')) {
			const fileInput = document.getElementById('upload-input');
			const file = fileInput.files[0];
			const uploadButton = e.target;

			if (file) {
				const loadingAnimation = document.createElement('div');
				loadingAnimation.innerHTML = loaderView(); // Replace this with your own loading animation
				document.getElementById('upload').appendChild(loadingAnimation);
				loadingAnimation.style.display = 'block';
				uploadButton.style.display = 'none';

				try {
					const success = await uploadGif(file);
					if (success) {
						alert('GIF uploaded successfully!');
					}
				} catch (error) {
					alert('Upload failed. ' + error.message);
				} finally {
					loadingAnimation.style.display = 'none';
					uploadButton.style.display = 'block';
				}
			} else {
				alert('Please select a file to upload.');
			}
		}
	});

	// show events
	q('input#search').addEventListener('input', (e) => {
		renderSearchItems(e.target.value);
	});

	loadPage(HOME);
});
