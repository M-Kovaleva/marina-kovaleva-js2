import AbstractView from "./AbstractView.js";

export default class Login extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login - Social media application");
  }

  async getHtml() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          
          <h1 class="page-title-center">Log in to your account</h1>

          <form id="login-form" class="space-y-6">
            
            <!-- Email -->
            <div class="space-y-2">
              <label for="login-email" class="form-label">
                Email
              </label>
              <input 
                type="email" 
                id="login-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
                class="autofill-fix input-field"
              />
              <span class="form-error" id="email-error"></span>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="login-password" class="form-label">
                Password
              </label>
              <input 
                type="password" 
                id="login-password" 
                name="password"
                required
                minlength="8"
                placeholder="••••••••"
                autocomplete="current-password"
                class="autofill-fix input-field"
              />
              <span class="form-error" id="password-error"></span>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="login-submit" class="btn-primary">
              Log In
            </button>

            <!-- Loading State -->
            <div id="login-loading" class="loading-container">
              <div class="loading-spinner"></div>
              <p class="loading-text">Logging you in...</p>
            </div>

            <!-- Error Message -->
            <div id="login-error" class="error-message hidden" role="alert">
              <p id="login-error-text"></p>
            </div>
          </form>

          <!-- Links -->
          <div class="mt-8 text-center space-y-2">
            <p class="text-stone-600 dark:text-stone-300">
              Don't have an account? 
              <a href="/register" data-link class="back-link">Create one here</a>
            </p>
            <a href="/" data-link class="back-link">← Back to Home</a>
          </div>
        </div>
      </div>
    `;
  }
}
