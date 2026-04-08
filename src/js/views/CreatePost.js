import AbstractView from "./AbstractView.js";

export default class CreatePost extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Create Post - Social media application");
  }

  async getHtml() {
    return `
      <div class="max-w-2xl mx-auto">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-500 mb-6 transition-colors">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="create-post-loading" class="hidden text-center py-16">
          <div class="w-10 h-10 mx-auto border-4 border-stone-300 border-t-brand-600 rounded-full animate-spin"></div>
          <p class="mt-4 text-stone-500 dark:text-stone-400">Creating your post...</p>
        </div>

        <!-- FORM CARD -->
        <div class="bg-white dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 p-6 sm:p-8">
          <h1 class="text-2xl font-bold text-stone-900 dark:text-white mb-6">Create New Post</h1>
          
          <!-- FORM (built by JS) -->
          <form id="create-post-form" class="space-y-5"></form>
        </div>

      </div>
    `;
  }
}