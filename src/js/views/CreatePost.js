import AbstractView from "./AbstractView.js";

export default class CreatePost extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Create Post - Social media application");
  }

  async getHtml() {
    return `
      <div class="page-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="back-link">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="create-post-loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Creating your post...</p>
        </div>

        <!-- FORM CARD -->
        <div class="card sm:p-8">
          <h1 class="page-title">Create New Post</h1>
          
          <!-- FORM (built by JS) -->
          <form id="create-post-form" class="space-y-5"></form>
        </div>

      </div>
    `;
  }
}
