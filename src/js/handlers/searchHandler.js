/* Search Handler - handles post search functionality */
import { get } from '../api/apiClient.js';
import Home from '../views/Home.js';
import { setQuery, setPage, getQuery, loadFeed } from './feedHandler.js';

/* API */
/**
 * Search posts by query
 * @param {string} query - Search term
 * @param {number} page - Page number
 * @returns {Promise<{posts: Array, meta: Object}>}
 */
export async function searchPosts(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    _author: 'true',
    _comments: 'true',
    _reactions: 'true',
    limit: '12',
    page: page.toString()
  });

  const result = await get(`/social/posts/search?${params}`);
  return {
    posts: result.data,
    meta: result.meta
  };
}

//* Search info bar */══════════════════════════════════════════════
export function updateSearchInfo() {
  const searchInfo = document.getElementById('search-info');
  const query = getQuery();
  
  if (query) {
    searchInfo.innerHTML = Home.renderSearchInfo(query);
    searchInfo.style.display = 'flex';
    
    // Attach clear button handler
    const clearBtn = document.getElementById('clear-search-btn');
    clearBtn?.addEventListener('click', clearSearch);
  } else {
    searchInfo.style.display = 'none';
  }
}

/* Clear search results */
function clearSearch() {
  // Clear query
  setQuery('');
  
  // Clear input field
  const searchInput = document.querySelector('#search-form input[name="search"]');
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Reload regular posts
  loadPosts();
  window.scrollTo(0, 0);
}

/* Setup (called by router) */
export function setupSearch() {
  const form = document.getElementById('search-form');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const query = formData.get('search')?.trim() || '';
    
    if (query) {
      setQuery(query);
      await loadFeed()();
      setPage(1);
    }
  });
}