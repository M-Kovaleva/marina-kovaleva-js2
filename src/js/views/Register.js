import AbstractView from "./AbstractView.js";

export default class Register extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Register - Social media application");
  }

  async getHtml() {
    return `
      <div class="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
        <div class="w-full max-w-md bg-white dark:bg-stone-700 rounded-2xl shadow-lg p-8">
          
          <h1 class="text-2xl font-bold text-center text-stone-900 dark:text-white mb-8">
            Create account
          </h1>

          <form id="register-form" class="space-y-5">
            
            <!-- Username -->
            <div class="space-y-2">
              <label for="register-name" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
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
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <p class="text-sm text-stone-500 dark:text-stone-400">Only letters, numbers, and underscores</p>
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="name-error"></span>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="register-email" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
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
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <p class="text-sm text-stone-500 dark:text-stone-400">Must be a @stud.noroff.no email</p>
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="email-error"></span>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="register-password" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
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
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <p class="text-sm text-stone-500 dark:text-stone-400">Minimum 8 characters</p>
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="password-error"></span>
            </div>

            <!-- Avatar URL (Optional) -->
            <div class="space-y-2">
              <label for="register-avatar" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
                Avatar URL
                <span class="font-normal text-stone-400 dark:text-stone-500">(optional)</span>
              </label>
              <input 
                type="url" 
                id="register-avatar" 
                name="avatarUrl"
                placeholder="https://example.com/avatar.jpg"
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <p class="text-sm text-stone-500 dark:text-stone-400">Direct image URL (jpg, png, gif, webp)</p>
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="avatar-error"></span>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              id="register-submit"
              class="w-full py-3 mt-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold rounded-lg cursor-pointer hover:bg-stone-700 hover:shadow-md dark:hover:bg-brand-500 dark:hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </button>

            <!-- Loading State -->
            <div id="register-loading" class="hidden text-center py-4">
              <div class="w-8 h-8 mx-auto border-4 border-stone-300 border-t-brand-600 rounded-full animate-spin"></div>
              <p class="mt-2 text-stone-500 dark:text-stone-400">Creating your account...</p>
            </div>

            <!-- Success Message -->
            <div id="register-success" class="hidden bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-4 text-center">
              <p class="text-green-700 dark:text-green-400 font-medium">✓ Account created successfully!</p>
              <p class="text-green-700 dark:text-green-400 text-sm mt-1">Redirecting to Home...</p>
            </div>

            <!-- Error Message -->
            <div id="register-error" class="hidden bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 text-center">
              <p id="register-error-text" class="text-red-700 dark:text-red-400 font-medium m-0"></p>
            </div>

          </form>

          <!-- Links -->
          <div class="mt-8 text-center space-y-2">
            <p class="text-stone-600 dark:text-stone-300">
              Already have an account? 
              <a href="/login" data-link class="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Log in here</a>
            </p>
            <a href="/" data-link class="inline-block text-brand-600 dark:text-brand-400 font-semibold hover:underline">← Back to Home</a>
          </div>

        </div>
      </div>
    `;
  }
}