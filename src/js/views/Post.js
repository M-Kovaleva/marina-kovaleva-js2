import AbstractView from "./AbstractView.js";

export default class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Post - Social media applicaion");
  }

  async getHtml() {
    return `
      <div class="post-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="post-back-link">< Back to Home</a>

        <!-- LOADING -->
        <div id="post-loading" class="loading-spinner" style="display: none;">
          <div class="spinner"></div>
          <p>Loading post...</p>
        </div>

        <!-- POST CONTENT -->
        <article id="post-content" class="post-detail"></article>

      </div>
    `;
  }
}
