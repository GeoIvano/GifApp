/**
 * Generates HTML for uploading a GIF card.
 * 
 * @returns {string} The HTML for the uploaded GIF card.
 */

export const toUploadView = () => `
<div id="upload">
    <div class="about-content">
        <h1>Upload your favorite gifs here!</h1>
            <form>
                <label for="upload-input"></label>
                <img src="#" alt="GIF Preview" id="gifPreview" style="display:none; max-width: 400px;">
                <input type="file" id="upload-input" class="upload-input-button">
                <br>
                <button type="button" class="upload-button"><svg class="upload-btn" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#fc03a1" viewBox="0 0 256 256"><path d="M228,152v56a20,20,0,0,1-20,20H48a20,20,0,0,1-20-20V152a12,12,0,0,1,24,0v52H204V152a12,12,0,0,1,24,0ZM96.49,88.49,116,69v83a12,12,0,0,0,24,0V69l19.51,19.52a12,12,0,0,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,0,0,17,17Z"></path></svg></button>
            </form>
        <div id="gif-container"></div>
    </div>
</div>
`;