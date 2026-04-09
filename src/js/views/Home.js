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

        <!-- Empty State -->
        <div id="feed-empty" class="feed-empty hidden text-center py-16">
          <div class="text-5xl mb-4">📭</div>
          <p class="text-stone-500 dark:text-stone-400 text-lg mb-4">No posts found</p>
          <a href="/create" data-link class="inline-block px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors">
            Create the first post
          </a>
        </div>

        <!-- Error State -->
        <div id="feed-error" class="feed-error hidden text-center py-16">
          <div class="text-5xl mb-4">⚠️</div>
          <p class="text-red-600 dark:text-red-400 font-medium mb-4">Failed to load posts</p>
          <button 
            id="retry-btn"
            class="px-6 py-3 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold rounded-lg cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
          >
            Try again
          </button>
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
