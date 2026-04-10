import AbstractView from "./AbstractView.js";

export default class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Post - Social media application");
  }

  async getHtml() {
    return `
      <div class="page-container">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="back-link mb-6">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="post-loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading post...</p>
        </div>

        <!-- ERROR STATE -->
        <div id="post-error" class="hidden text-center py-16">
          <div class="text-5xl mb-4">⚠️</div>
          <p class="text-red-600 dark:text-red-400 font-medium mb-4">Failed to load post</p>
          <a href="/" data-link class="inline-block px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors">
            Back to Home
          </a>
        </div>

        <!-- POST CONTENT -->
        <article id="post-content" class="post-detail"></article>

      </div>
    `;
  }
}
