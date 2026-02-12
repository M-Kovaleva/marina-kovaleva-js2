import AbstractView from './AbstractView.js';

export default class Post extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle('Post - Social media applicaion');
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Post Page</h1>
        <p><strong>Post ID:</strong> ${this.postId}</p>
        <p><a href="/" data-link>← Back to Home</a></p>
      </div>
    `;
  }
}