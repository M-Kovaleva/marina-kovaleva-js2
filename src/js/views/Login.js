import AbstractView from "./AbstractView.js";

export default class Login extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login - Social media application");
  }

  async getHtml() {
    return `
      <div class="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-white dark:bg-stone-700 rounded-2xl shadow-lg p-8">
          
          <h1 class="text-3xl font-bold text-center text-stone-900 dark:text-white mb-8">
            Log in to your account
          </h1>

          <form id="login-form" class="space-y-6">
            
            <!-- Email -->
            <div class="space-y-2">
              <label for="login-email" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
                Email
              </label>
              <input 
                type="email" 
                id="login-email" 
                name="email"
                required
                placeholder="your.name@stud.noroff.no"
                autocomplete="email"
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="email-error"></span>
            </div>

            <!-- Password -->
            <div class="space-y-2">
              <label for="login-password" class="block text-sm font-semibold text-stone-700 dark:text-stone-200">
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
                class="autofill-fix w-full px-4 py-3 border-2 border-stone-200 dark:border-stone-500 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-400 focus:border-brand-500 focus:outline-none transition-all duration-200"
              />
              <span class="form-error text-sm text-red-600 dark:text-red-400" id="password-error"></span>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              id="login-submit"
              class="w-full py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold rounded-lg cursor-pointer hover:bg-stone-700 hover:shadow-md dark:hover:bg-brand-500 dark:hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              Log In
            </button>

            <!-- Loading State -->
            <div id="login-loading" class="hidden text-center py-4">
              <div class="w-8 h-8 mx-auto border-4 border-stone-300 border-t-brand-600 rounded-full animate-spin"></div>
              <p class="mt-2 text-stone-500 dark:text-stone-400">Logging you in...</p>
            </div>

            <!-- Error Message -->
            <div id="login-error" class="hidden bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-4 text-center">
              <p id="login-error-text" class="text-red-700 dark:text-red-400 font-medium m-0"></p>
            </div>

          </form>

          <!-- Links -->
          <div class="mt-8 text-center space-y-2">
            <p class="text-stone-600 dark:text-stone-300">
              Don't have an account? 
              <a href="/register" data-link class="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Create one here</a>
            </p>
            <a href="/" data-link class="inline-block text-brand-600 dark:text-brand-400 font-semibold hover:underline">← Back to Home</a>
          </div>

        </div>
      </div>
    `;
  }
}