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


/* html templates called by feedHandler.js */
  /**
   * Generate HTML for a single post card
   * @param {object} post - Post object from API
   * @returns {string} HTML string
   */
  static renderPostCard(post, currentUserName = null) {
    const author = post.author?.name || 'Unknown';
    const authorAvatar = post.author?.avatar?.url || '';
    const title = post.title || 'Untitled';
    const body = post.body || '';
    const date = new Date(post.created).toLocaleDateString();
    const image = post.media?.url || '';
    // Check if current user is the author
    const isAuthor = currentUserName && author === currentUserName;

    return `
      <article class="feed-post">
          <div class="feed-post-header">
            <div class="feed-post-author">
              ${Home.renderAvatar(authorAvatar, author)}
            <div class="feed-post-author-info">
              <span class="feed-post-user">${author}</span>
              <span class="feed-post-date">${date}</span>
            </div>
          </div>
        ${isAuthor ? `
           <div class="feed-post-actions">
                <button class="btn-action btn-edit" data-post-id="${post.id}" data-action="edit" title="Edit post">Edit</button>
                <button class="btn-action btn-delete" data-post-id="${post.id}" data-action="delete" title="Delete post">X</button>
              </div>
        ` : ''}
      </div>
      ${image ? `<img src="${image}" alt="${title}" class="feed-post-image" />` : ''}
      <h2 class="feed-post-title">${title}</h2>
      <p class="feed-post-content">${body.slice(0, 150)}...</p>
      <a href="/post/${post.id}" data-link class="feed-post-link">Read more ></a>
    </article>
    `;
  }

  /**
   * Generate HTML for avatar (image or placeholder)
   * @param {string} avatarUrl - Avatar URL
   * @param {string} name - User name
   * @returns {string} HTML string
   */
  static renderAvatar(avatarUrl, name) {
    if (avatarUrl) {
      return `<img src="${avatarUrl}" alt="${name}" class="feed-post-avatar" />`;
    }
    return `<div class="feed-post-avatar-placeholder">${name[0]?.toUpperCase() || '?'}</div>`;
  }

  /**

  /**
   * Generate HTML for search info bar
   * @param {string} query - Search query
   * @returns {string} HTML string
   */
  static renderSearchInfo(query) {
    return `
      <span>Showing results for: <strong>"${query}"</strong></span>
      <button id="clear-search-btn" class="btn-clear-search">Clear search</button>
    `;
  }

  /**
   * Generate HTML for empty state
   * @returns {string} HTML string
   */
  static renderEmptyState() {
    return '<p>No posts found.</p>';
  }

  /**
   * Generate HTML for error state
   * @returns {string} HTML string
   */
  static renderErrorState() {
    return '<p>Error loading posts. Please try again.</p>';
  }
}