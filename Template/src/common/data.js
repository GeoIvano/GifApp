/**
 * An array containing GIF IDs of uploaded GIFs stored in local storage.
 * @type {Array<string>}
 */
let uploadedGifs = JSON.parse(localStorage.getItem('uploaded')) || [];

/**
 * An array containing the IDs of uploaded GIFs.
 * @type {Array<string>}
 */
export {uploadedGifs};

/**
 * An array containing uploaded GIF IDs.
 * @type {Array<string>}
 */
export const uploadedGifIds = [];

/**
 * Adds a GIF ID to the list of uploaded GIFs if it doesn't already exist.
 *
 * @param {string} gifId - The ID of the GIF to be added.
 */
export const addUploadedGifs = (gifId) => {
    if(uploadedGifs.find(id => id === gifId)) {

        return;
    }

    uploadedGifs.push(gifId);
    localStorage.setItem('uploaded', JSON.stringify(uploadedGifs));
};

/**
 * Removes a GIF ID from the list of uploaded GIFs.
 *
 * @param {string} gifId - The ID of the GIF to be removed.
 */

export const removeUploadedGifs = (gifId) => {
    uploadedGifs = uploadedGifs.filter(id => id !== gifId);
    localStorage.setItem('uploaded', JSON.stringify(uploadedGifs));
};

/**
 * Retrieves a copy of the uploaded GIF IDs.
 *
 * @returns {Array<string>} - A copy of the uploaded GIF IDs.
 */
export const getUploadedGifs = () => {
    return  [...uploadedGifs];
};