import AbstractView from "./AbstractView.js";

export default class Profile extends AbstractView {
  constructor(params) {
    super(params);
    this.username = params.name;
    this.setTitle(`${this.username} - Profile`);
  }

  async getHtml() {
    return `
      <div class="max-w-2xl mx-auto">
        
        <!-- BACK BUTTON -->
        <a href="/" data-link class="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-700 dark:hover:text-brand-500 mb-6 transition-colors">
          <span>←</span> Back to Home
        </a>

        <!-- LOADING -->
        <div id="profile-loading" class="hidden text-center py-16">
          <div class="w-10 h-10 mx-auto border-4 border-stone-300 border-t-brand-600 rounded-full animate-spin"></div>
          <p class="mt-4 text-stone-500 dark:text-stone-400">Loading profile...</p>
        </div>

        <!-- PROFILE CONTENT -->
        <div id="profile-content" class="profile-detail"></div>

      </div>
    `;
  }
}