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

      <button type="submit" class="btn-accent">
        Search
      </button>
    </form>

    <!-- POSTS -->
    <section id="feed" class="feed-section">
      <div class="feed-post">
        <div class="feed-post-header">
          <span class="feed-post-user">User</span>
          <span class="feed-post-date">17 Feb 2026</span>
        </div>

        <div class="feed-post-content">
          Post text goes here...
        </div>
      </div>

      <div class="feed-pagination">
        <button class="btn-secondary" id="prev-page-btn">
          Previous
        </button>

        <button class="btn-secondary" id="next-page-btn">
          Next
        </button>
      </div>
    </section>

  </section>

  <!-- MODAL -->
  <div id="post-modal" class="feed-modal hidden">

    <div class="feed-modal-backdrop"></div>

    <div class="feed-modal-panel">

      <div class="feed-modal-header">
        <button id="follow-user-btn" class="feed-primary-btn">
          Follow user
        </button>

        <button id="modal-close" class="feed-secondary-btn">
          Close
        </button>
      </div>

      <div id="post-modal-content" class="feed-modal-content"></div>

    </div>
  </div>
`;
  }
}