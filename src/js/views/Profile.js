import AbstractView from './AbstractView.js';

export default class Profile extends AbstractView {
  constructor(params) {
    super(params);
    this.username = params.name;
    this.setTitle(`${this.username} - Profile`);
  }

  async getHtml() {
    return `
      <div class="container">
        <h1>Profile: @${this.username}</h1>
        <p><a href="/" data-link>← Back to Home</a></p>
      </div>
    `;
  }
}