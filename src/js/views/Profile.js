import AbstractView from "./AbstractView.js";

export default class Profile extends AbstractView {
  constructor(params) {
    super(params);
    this.username = params.name;
    this.setTitle(`${this.username} - Profile`);
  }

  async getHtml() {
    return `
      <div class="page-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="back-link mb-6">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="profile-loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading profile...</p>
        </div>

        <!-- PROFILE CONTENT -->
        <div id="profile-content" class="profile-detail"></div>

      </div>
    `;
  }
}
