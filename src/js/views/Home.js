import AbstractView from './AbstractView.js';

export default class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Feed - Social media application');
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Welcome to Social madia application!</h1>
        <div class="test-links">
          <ul>
            <li><a href="/login" data-link>Go to Login</a></li>
            <li><a href="/register" data-link>Go to Register</a></li>
            <li><a href="/post/123" data-link>View Post</a></li>
            <li><a href="/profile/_name" data-link>View Profile</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}