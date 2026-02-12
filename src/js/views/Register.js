import AbstractView from './AbstractView.js';

export default class Register extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Register - Social media application');
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Register Page</h1>
        <p><a href="/" data-link>← Back to Home</a></p>
        <p><a href="/login" data-link>Already have an account? Login</a></p>
      </div>
    `;
  }
}