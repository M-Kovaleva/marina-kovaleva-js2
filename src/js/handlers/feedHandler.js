/* Feed Handler - loads and displays posts */
import { get } from '../api/apiClient.js';
import Home from '../views/Home.js';

/* 1. Get posts from API */ 

/**
 * Fetch posts from API
 * @returns {Promise<Array>} Array of post objects
 * 
 * URLSearchParams for query strings
 */
async function getPosts() {
  // Build query string with URLSearchParams
  const params = new URLSearchParams({
    _author: 'true',
    _comments: 'true',
    _reactions: 'true',
    limit: '12'
  });

  // GET request: fetch with Bearer token (handled by apiClient)
  const result = await get(`/social/posts?${params}`);
  return result.data;
}

/* Render posts to DOM */

/**
 * Display posts in feed
 * @param {Array} posts - Posts from API
 */
function renderPosts(posts) {
  const feed = document.getElementById('feed');
  
  // Empty state: conditional rendering
  if (!posts || posts.length === 0) {
    feed.innerHTML = Home.renderEmptyState();  // HTML from Home.js
    return;
  }

   // Render posts using Home.js template
  feed.innerHTML = posts
    .map(post => Home.renderPostCard(post))  // HTML from Home.js
    .join('');
}

/* Loading */
/**
 * Show/hide loading spinner
 * @param {boolean} isLoading
 */
function showLoading(isLoading) {
  const spinner = document.getElementById('feed-loading');
  const feed = document.getElementById('feed');

  if (isLoading) {
    spinner.style.display = 'block';
    feed.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    feed.style.display = 'block';
  }
}

/* Load and display posts (called by router) - async/await, try/catch for error handling */
export async function setupFeed() {
  showLoading(true);

  try {
    const posts = await getPosts();
    renderPosts(posts);
  } catch (error) {
    console.error('Failed to load posts:', error);
    document.getElementById('feed').innerHTML = 
      '<p>Error loading posts. Please try again.</p>';
  } finally {
    showLoading(false);
  }
}