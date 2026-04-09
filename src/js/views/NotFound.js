import AbstractView from "./AbstractView.js";

export default class NotFound extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("404 - Page not found");
  }

  async getHtml() {
    return `
      <div class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4">
        
        <h1 class="text-3xl font-bold text-stone-900 dark:text-white mb-4">
          404
        </h1>
        
        <p class="text-xl text-stone-600 dark:text-stone-400 mb-8">
          Oops! Page not found
        </p>
        
        <a 
          href="/" 
          data-link 
          class="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 hover:shadow-md active:scale-[0.98] transition-all duration-200"
        >
          <span>←</span> Back to Home
        </a>
        
      </div>
    `;
  }
}
