import AbstractView from "./AbstractView.js";

export default class Profile extends AbstractView {
  constructor(params) {
    super(params);
    this.username = params.name;
    this.setTitle(`${this.username} - Profile`);
  }

  async getHtml() {
    return `
      <div class="profile-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="profile-back-link">< Back to Home</a>

        <!-- LOADING -->
        <div id="profile-loading" class="loading-spinner" style="display: none;">
          <div class="spinner"></div>
          <p>Loading profile...</p>
        </div>

        <!-- PROFILE CONTENT -->
        <div id="profile-content" class="profile-detail"></div>

      </div>
    `;
  }
}
