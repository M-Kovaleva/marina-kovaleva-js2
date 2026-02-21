import AbstractView from './AbstractView.js';

export default class CreatePost extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Create Post - Social media application');
  }

  async getHtml() {
    return `
       <div class="post-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="post-back-link">< Back to Home</a>

        <!-- LOADING -->
        <div id="create-post-loading" class="loading-spinner" style="display: none;">
          <div class="spinner"></div>
          <p>Creating your post...</p>
        </div>

        <!-- FORM CARD  -->
        <div class="post-detail">
          <h1 class="post-title">Create New Post</h1>
          
          <!-- FORM -->
          <form id="create-post-form" class="create-post-form" novalidate></form>
        </div>

      </div>
    `;
  }
}