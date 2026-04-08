import AbstractView from "./AbstractView.js";

export default class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Post - Social media application");
  }

  async getHtml() {
    return `
      <div class="max-w-2xl mx-auto">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-500 mb-6 transition-colors">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="post-loading" class="hidden text-center py-16">
          <div class="w-10 h-10 mx-auto border-4 border-stone-300 border-t-brand-600 rounded-full animate-spin"></div>
          <p class="mt-4 text-stone-500 dark:text-stone-400">Loading post...</p>
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