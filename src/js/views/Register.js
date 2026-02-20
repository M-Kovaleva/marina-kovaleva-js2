import AbstractView from './AbstractView.js';

export default class Register extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Register - Social media application');
  }

  async getHtml() {
    return `
      <div class="auth-container">
        <div class="auth-card">
          <h1>Create account</h1>
          <form id="register-form" class="auth-form" novalidate>
            <!-- Username -->
            <div class="form-group">
              <label for="register-name">Username</label>
              <input 
                type="text" 
                id="register-name" 
                name="name"
                required
                placeholder="your name"
                autocomplete="username"
              />
              <small class="form-help">Only letters, numbers, and underscores</small>
              <span class="form-error" id="name-error"></span>
            </div>
            <!-- Email -->
            <div class="form-group">
              <label for="register-email">Email</label>
              <input 
                type="email" 
                id="register-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
              />
              <small class="form-help">Must be a @stud.noroff.no email</small>
              <span class="form-error" id="email-error"></span>
            </div>
            <!-- Password -->
            <div class="form-group">
              <label for="register-password">Password</label>
              <input 
                type="password" 
                id="register-password" 
                name="password"
                required
                placeholder="••••••••"
                autocomplete="new-password"
              />
              <small class="form-help">Minimum 8 characters</small>
              <span class="form-error" id="password-error"></span>
            </div>
            <!-- ✅ ДОБАВЬ: Avatar URL -->
            <div class="form-group">
              <label for="register-avatar">Avatar URL (optional)</label>
              <input 
                type="url" 
                id="register-avatar" 
                name="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
              />
              <small class="form-help">Enter a direct image URL (jpg, png, gif, webp)</small>
              <span class="form-error" id="avatar-error"></span>
            </div>
            <!-- Submit Button -->
            <button type="submit" class="btn-primary" id="register-submit">
              Create Account
            </button>

            <!-- Loading State -->
            <div class="loading-spinner" id="register-loading" style="display: none;">
              <div class="spinner"></div>
              <p>Creating your account...</p>
            </div>

            <!-- Success Message -->
            <div class="success-message" id="register-success" style="display: none;">
              <p>✅ Account created successfully!</p>
              <p>Redirecting to Home...</p>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="register-error" style="display: none;">
              <p id="register-error-text"></p>
            </div>
          </form>
         
          <!-- Link to Login -->
          <p class="auth-link">
            Already have an account? 
            <a href="/login" data-link>Log in here</a>
          </p>
           <p class="auth-link"><a href="/" data-link>← Back to Home</a></p>
        </div>
      </div>
    `;
  }
}