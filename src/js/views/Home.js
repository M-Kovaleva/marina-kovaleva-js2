import AbstractView from './AbstractView.js';

export default class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Feed - Social media application');
  }

  async getHtml() {
    return `
      <section class="feed-container">

        <!-- SEARCH -->
        <form id="search-form" class="feed-search-form">
          <input
            type="search"
            name="search"
            placeholder="Search posts..."
            class="input-field"
          />
          <button type="submit" class="btn-accent">Search</button>
        </form>

        <!-- SEARCH INFO -->
        <div id="search-info" class="search-info" style="display: none;"></div>

        <!-- LOADING -->
        <div id="feed-loading" class="loading-spinner" style="display: none;">
          <div class="spinner"></div>
          <p>Loading posts...</p>
        </div>

        <!-- POSTS -->
        <section id="feed" class="feed-section"></section>

        <!-- PAGINATION -->
        <div class="feed-pagination">
          <button class="btn-secondary" id="prev-page-btn">Previous</button>
          <span id="page-info" class="feed-page-info">Page 1</span>
          <button class="btn-secondary" id="next-page-btn">Next</button>
        </div>

      </section>
    `;
  }
}