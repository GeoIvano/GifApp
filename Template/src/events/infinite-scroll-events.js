import {loadTrendingGifs} from '../requests/request-service.js';
import {singleGifDisplay} from '../views/trending-view.js'

/**
 * Indicates whether the content is currently being loaded.
 * @type {boolean}
 */
let isLoading = false;

/**
 * The current page number for content loading.
 * @type {number}
 */
let currentPage = 1;

/**
 * A flag indicating whether the scroll has reached the end of the content.
 * @type {boolean}
 */
let isAtEndOfContent = false;

/**
 * Checks if the scroll is at the end of the page content.
 *
 * @returns {boolean} - `true` if the scroll is at the end of the content, otherwise `false`.
 */
function isScrollAtEnd() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollThreshold = 100;
  return scrollHeight - (scrollTop + clientHeight) < scrollThreshold;
}

/**
 * Sets the flag indicating whether the scroll has reached the end of the content.
 *
 * @param {boolean} value - `true` to indicate the end of content, `false` otherwise.
 */
function setIsAtEndOfContent(value) {
  isAtEndOfContent = value;
}

/**
 * Retrieves the flag indicating whether the scroll has reached the end of the content.
 *
 * @returns {boolean} - `true` if the scroll has reached the end of the content, otherwise `false`.
 */
function getIsAtEndOfContent() {
  return isAtEndOfContent;
}

/**
 * Displays the end-of-content element if it exists.
 */
function displayEndOfContent() {
  const endOfContentElement = document.querySelector('#end-of-content');
  if (endOfContentElement) {
    endOfContentElement.style.display = 'block';
  }
}

/**
 * Loads more content when the scroll is at the end.
 */
async function loadMoreContent() {
  currentPage++;


  const offset = (currentPage - 1) * 16;
  const additionalGifs = await loadTrendingGifs(offset);

  const gifsContainer = document.querySelector('#gifs-placeholder');

  let gifsHTML = '';

  if (Array.isArray(additionalGifs)) {
    gifsHTML = additionalGifs.map((gif) => singleGifDisplay(gif)).join('');
  } else if (additionalGifs && Array.isArray(additionalGifs.data)) {
    gifsHTML = additionalGifs.data.map((gif) => singleGifDisplay(gif)).join('');
  } else {
    console.error('Unexpected response format:', additionalGifs);
  }

 
  gifsContainer.innerHTML += gifsHTML;

 
  if (isScrollAtEnd()) {
    setIsAtEndOfContent(true);
    displayEndOfContent();
  }
}

/**
 * Handles the scroll event and initiates loading more content if appropriate.
 */
async function handleScroll() {
  if (isLoading || getIsAtEndOfContent()) return;

  if (isScrollAtEnd()) {
    isLoading = true;
    await loadMoreContent();
    isLoading = false;

    
    if (isScrollAtEnd()) {
      setIsAtEndOfContent(true);
      displayEndOfContent();
    }
  }
}

/**
 * Initializes infinite scroll behavior by adding a scroll event listener.
 *
 * @returns {Function} - The `handleScroll` function used as the event listener.
 */
export const initializeInfiniteScroll = () => {
  window.addEventListener('scroll', handleScroll);
  return handleScroll;
};
