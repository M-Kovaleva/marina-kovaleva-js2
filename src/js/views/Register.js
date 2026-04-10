import AbstractView from "./AbstractView.js";

export default class Register extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Register - Social media application");
  }

  async getHtml() {
    return `
      <div class="auth-container py-8">
        <div class="auth-card">
          
          <h1 class="page-title-center">Create account</h1>

          <form id="register-form" class="space-y-5">
            
            <!-- Username -->
            <div class="space-y-2">
              <label for="register-name" class="form-label">
                Username
              </label>
              <input 
                type="text" 
                id="register-name" 
                name="name"
                required
                pattern="^[a-zA-Z0-9_]+$"
                placeholder="your username"
                autocomplete="username"
                class="autofill-fix input-field"
              />
              <p class="form-hint">Only letters, numbers, and underscores</p>
              <span class="form-error" id="name-error"></span>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="register-email" class="form-label">
                Email
              </label>
              <input 
                type="email" 
                id="register-email" 
                name="email"
                required
                pattern="^[a-zA-Z0-9._%+-]+@stud\\.noroff\\.no$"
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
                class="autofill-fix input-field"
              />
              <p class="form-hint">Must be a @stud.noroff.no email</p>
              <span class="form-error" id="email-error"></span>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="register-password" class="form-label">
                Password
              </label>
              <input 
                type="password" 
                id="register-password" 
                name="password"
                required
                minlength="8"
                placeholder="••••••••"
                autocomplete="new-password"
                class="autofill-fix input-field"
              />
              <p class="form-hint">Minimum 8 characters</p>
              <span class="form-error" id="password-error"></span>
            </div>

            <!-- Avatar URL (Optional) -->
            <div class="space-y-2">
              <label for="register-avatar" class="form-label">
                Avatar URL
                <span class="font-normal text-stone-400 dark:text-stone-500">(optional)</span>
              </label>
              <input 
                type="url" 
                id="register-avatar" 
                name="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
                class="autofill-fix input-field"
              />
              <p class="form-hint">Direct image URL (jpg, png, gif, webp)</p>
              <span class="form-error" id="avatar-error"></span>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="register-submit" class="btn-primary">
              Create Account
            </button>

            <!-- Loading State -->
            <div id="register-loading" class="loading-container">
              <div class="loading-spinner"></div>
              <p class="loading-text">Creating your account...</p>
            </div>

            <!-- Success Message -->
            <div id="register-success" class="success-message hidden">
              <p> Account created successfully!</p>
              <p>Redirecting to Home...</p>
            </div>

            <!-- Error Message -->
            <div id="register-error" class="error-message hidden">
              <p id="register-error-text"></p>
            </div>

          </form>
          <!-- Links -->
          <div class="mt-8 text-center space-y-2">
            <p class="text-stone-600 dark:text-stone-300">
              Already have an account? 
              <a href="/login" data-link class="back-link">Log in here</a>
            </p>
            <a href="/" data-link class="back-link">← Back to Home</a>
          </div>
        </div>
      </div>
    `;
  }
}
