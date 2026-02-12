import AbstractView from './AbstractView.js';

export default class Login extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Login - Social media application');
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Login Page</h1>
        <p><a href="/" data-link>← Back to Home</a></p>
        <p><a href="/register" data-link>Don't have an account? Register</a></p>
      </div>
    `;
  }
}