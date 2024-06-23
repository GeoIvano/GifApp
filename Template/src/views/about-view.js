/**
 * Generates HTML for the "About" view, displaying information about the team members.
 *
 * @returns {string} - The HTML for the "About" view.
 */

export const toAboutView = () => `
<div id="about">
  <div class="about-content">
  <h1>Meet the members of the team</h1>
  <div class="cards">
  <div class="card1">
  <div class="profile-pic1"></div>
  <h1>Aleksandar Andreev</h1>
  <div class="overlay-email1"></div>
  <a class="email-icon1" href=mailto:alexandreev11g@gmail.com>
  <p>alexandreev11g@gmail.com</p>
  </a>
</div>
<div class="card2">
<div class="profile-pic2"></div>
<h1>Georgi Ivanov</h1>
<div class="overlay-email1"></div>
<a class="email-icon1" href=mailto:georgistoykovivanov@abv.bg>
<p>georgistoykovivanov@abv.bg</p>
</a>
</div>
<div class="card3">
<div class="profile-pic3"></div>
<h1>Daniel Chuchulev</h1>
<div class="overlay-email1"></div>
<a class="email-icon1" href=mailto:daniel.chuchulev96@gmail.com>
<p>daniel.chuchulev96@gmail.com</p>
</a>
</div>
`;