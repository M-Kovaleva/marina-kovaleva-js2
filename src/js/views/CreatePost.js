import AbstractView from './AbstractView.js';

export default class CreatePost extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Create Post - Social media application');
  }

  async getHtml() {
    return `
      <div class="create-post-container">
        <div class="create-post-card">
          
          <!-- HEADER -->
          <div class="create-post-header">
            <h1>Create New Post</h1>
            <a href="/" data-link class="btn-secondary">Cancel</a>
          </div>

          <!-- FORM -->
          <form id="create-post-form" class="create-post-form" novalidate>
            
            <!-- Title (Required) -->
            <div class="form-group">
              <label for="post-title">Title *</label>
              <input 
                type="text" 
                id="post-title" 
                name="title"
                required
                placeholder="Enter post title"
                maxlength="100"
              />
              <small class="form-help">Required • Max 100 characters</small>
              <span class="form-error" id="title-error"></span>
            </div>

            <!-- Body -->
            <div class="form-group">
              <label for="post-body">Content</label>
              <textarea 
                id="post-body" 
                name="body"
                placeholder="What's on your mind?"
                rows="8"
              ></textarea>
              <small class="form-help">Optional</small>
              <span class="form-error" id="body-error"></span>
            </div>

            <!-- Tags -->
            <div class="form-group">
              <label for="post-tags">Tags</label>
              <input 
                type="text" 
                id="post-tags" 
                name="tags"
                placeholder="javascript, react, tutorial (comma-separated)"
              />
              <small class="form-help">Optional • Separate tags with commas</small>
              <span class="form-error" id="tags-error"></span>
            </div>

            <!-- Media URL -->
            <div class="form-group">
              <label for="post-media">Image URL</label>
              <input 
                type="url" 
                id="post-media" 
                name="media"
                placeholder="https://example.com/image.jpg"
              />
              <small class="form-help">Optional • Enter a valid image URL</small>
              <span class="form-error" id="media-error"></span>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="create-post-submit">
              Create Post
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="create-post-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Creating your post...</p>
            </div>

            <!-- Success Message -->
            <div class="success-message" id="create-post-success" style="display: none;">
              <p>✅ Post created successfully!</p>
              <p>Redirecting to feed...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="create-post-error" style="display: none;">
              <p id="create-post-error-text"></p>
            </div>

          </form>

        </div>
      </div>
    `;
  }
}