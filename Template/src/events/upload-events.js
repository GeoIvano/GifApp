/**
 * @file Manages the upload functionality and updating the uploadedGifIds array.
 * @module upload-events
 */
import { API_KEY } from '../common/constants.js';
import {addUploadedGifs, uploadedGifIds} from '../common/data.js';
import { API_UPLOAD_URL } from '../common/constants.js';

/**
 * Uploads a given GIF file using the GIPHY API
 * and updates the uploadedGifIds array if successful.
 * @async
 * @function
 * @param {File} file - The GIF file to upload.
 * @return {Promise<boolean>} - A promise that resolves to `true` if the upload
 *  was successful and `false` otherwise.
 */

export const uploadGif = async (file) => {
    try {
        // Validate input file
        if (!file || !(file instanceof File)) {
            throw new Error('Invalid file parameter!');
        }
        // Check file type
        if (file.type !== 'image/gif') {
            throw new Error('Invalid file type. Only GIF files are allowed!');
        }
        // Check file size
        if (file.size > 25 * 1024 * 1024) {
            throw new Error('File size exceeds 25mb. Please upload a smaller GIF file.');
        }
        // Check if there is a file
        if(!file){
            throw new Error('No file chosen. Please try again.');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', API_KEY);

        const request = await fetch(`${API_UPLOAD_URL}?api_key=${API_KEY}`, {
            method: 'post',
            body: formData,
        });

        // Validate API response
        if (request.status !== 200) {
            throw new Error('API error');
        }

        const response = await request.json();
        console.log(response);
        if (!response.data || !response.data.id) {
            throw new Error('Invalid API response data');
        }

        uploadedGifIds.push(response.data.id);
        console.log(response.data.id)
        addUploadedGifs(response.data.id);
        return true;
    }   catch (error) {
        console.log(error);

        // Display error alert
        alert('Upload failed. ' + error.message);
        return false;
    }
};
