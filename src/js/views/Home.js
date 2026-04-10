import AbstractView from "./AbstractView.js";

export default class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Feed - Social media application");
  }

  async getHtml() {
    return `
      <section class="page-container">

        <!-- Search Form -->
        <form id="search-form" class="flex gap-3 mb-8">
          <input
            type="search"
            name="search"
            placeholder="Search posts..."
            class="autofill-fix input-field flex-1"
          />
          <button 
            type="submit" 
            class="p-3 text-stone-500 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors"
            aria-label="Search"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path stroke-linecap="round" d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </form>

        <!-- Search Info -->
        <div id="search-info" class="search-info hidden mb-6 flex items-center justify-between px-4 py-3 bg-amber-100 dark:bg-stone-800 rounded-lg text-sm text-stone-600 dark:text-stone-300"></div>

        <!-- Loading State -->
        <div id="feed-loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading posts...</p>
        </div>

        <!-- Posts Feed -->
        <section id="feed" class="feed-section space-y-6"></section>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-6 mt-10 pt-6 border-t border-stone-200 dark:border-stone-700">
          <button 
            id="prev-page-btn"
            class="text-2xl text-stone-500 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer disabled:text-stone-300 dark:disabled:text-stone-700 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
    
          <span id="page-info" class="text-sm font-medium text-stone-500 dark:text-stone-400">
            Page 1
          </span>
          
          <button 
            id="next-page-btn"
            class="text-2xl text-stone-500 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer disabled:text-stone-300 dark:disabled:text-stone-700 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>

      </section>
    `;
  }
}
