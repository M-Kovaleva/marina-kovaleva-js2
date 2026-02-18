import AbstractView from './AbstractView.js';

export default class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle('Post - Social media applicaion');
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

  /* HTML Templates called by postHandler.js */

  /**
   * Generate HTML for full post
   * @param {object} post - Post object from API
   * @returns {string} HTML string
   */
  static renderPost(post) {
    const author = post.author?.name || 'Unknown';
    const authorAvatar = post.author?.avatar?.url || '';
    const title = post.title || 'Untitled';
    const body = post.body || '';
    const created = new Date(post.created).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const image = post.media?.url || '';
    const tags = post.tags || [];
    const reactions = post._count?.reactions || 0;
    const comments = post._count?.comments || 0;

    return `
      <!-- POST HEADER -->
      <div class="post-header">
        <div class="post-author">
          ${authorAvatar 
            ? `<img src="${authorAvatar}" alt="${author}" class="post-author-avatar" />` 
            : `<div class="post-author-avatar-placeholder">${author[0]}</div>`
          }
          <div class="post-author-info">
            <a href="/profile/${author}" data-link class="post-author-name">${author}</a>
            <span class="post-date">${created}</span>
          </div>
        </div>
      </div>

      <!-- POST IMAGE -->
      ${image ? `<img src="${image}" alt="${title}" class="post-image" />` : ''}

      <!-- POST CONTENT -->
      <div class="post-body">
        <h1 class="post-title">${title}</h1>
        <p class="post-text">${body}</p>
      </div>

      <!-- POST TAGS -->
      ${tags.length > 0 ? `
        <div class="post-tags">
          ${tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
        </div>
      ` : ''}

      <!-- POST STATS -->
      <div class="post-stats">
        <span class="post-stat">♡ ${reactions} reactions</span>
        <span class="post-stat">${comments} comments</span>
      </div>

      <!-- COMMENTS SECTION -->
      <div class="post-comments">
        <h2>Comments</h2>
        <div id="comments-list"></div>
      </div>
    `;
  }

  /**
   * Generate HTML for comments list
   * @param {Array} comments - Comments from API
   * @returns {string} HTML string
   */
  static renderComments(comments) {
    if (!comments || comments.length === 0) {
      return '<p class="comments-empty">No comments yet. Be the first to comment!</p>';
    }

    return comments.map(comment => {
      const author = comment.author?.name || 'Anonymous';
      const authorAvatar = comment.author?.avatar?.url || '';
      const body = comment.body || '';
      const created = new Date(comment.created).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      return `
        <div class="comment">
          <div class="comment-header">
            ${authorAvatar 
              ? `<img src="${authorAvatar}" alt="${author}" class="comment-avatar" />` 
              : `<div class="comment-avatar-placeholder">${author[0]}</div>`
            }
            <div class="comment-info">
              <a href="/profile/${author}" data-link class="comment-author">${author}</a>
              <span class="comment-date">${created}</span>
            </div>
          </div>
          <p class="comment-body">${body}</p>
        </div>
      `;
    }).join('');
  }

  /**
   * Generate HTML for error state
   * @returns {string} HTML string
   */
  static renderError() {
    return `
      <div class="post-error">
        <p>Could not load post. It may have been deleted or you don't have permission to view it.</p>
        <a href="/" data-link class="btn-secondary">Back to Feed</a>
      </div>
    `;
  }
}
