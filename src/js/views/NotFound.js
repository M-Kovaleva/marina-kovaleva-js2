import AbstractView from "./AbstractView.js";

export default class NotFound extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("404 - Page not found");
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>404 - Page not found</h1>
        <p class="auth-link"><a href="/" data-link>< Return to Home</a></p>
      </div>
    `;
  }
}
