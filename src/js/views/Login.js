import AbstractView from './AbstractView.js';
export default class Login extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Login - Social media application');
  }

  async getHtml() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <h1>Log in to your account</h1>
          <form id="login-form" class="auth-form" novalidate>     
            <!-- Email -->
            <div class="form-group">
              <label for="login-email">Email</label>
              <input 
                type="email" 
                id="login-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
              />
              <span class="form-error" id="email-error"></span>
            </div>
            <!-- Password -->
            <div class="form-group">
              <label for="login-password">Password</label>
              <input 
                type="password" 
                id="login-password" 
                name="password"
                required
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <span class="form-error" id="password-error"></span>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="login-submit">
              Log In
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="login-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Logging you in...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="login-error" style="display: none;">
              <p id="login-error-text"></p>
            </div>
          </form>

          <!-- Link to Register -->
          <p class="auth-link">
            Don't have an account? 
            <a href="/register" data-link>Create one here</a>
          </p>
          <p class="auth-link"><a href="/" data-link>< Back to Home</a></p>
        </div>
      </div>
    `;
  }
}