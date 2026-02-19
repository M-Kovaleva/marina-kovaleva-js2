/* Feed Handler - loads and displays posts */
import { get } from '../api/apiClient.js';
import Home from '../views/Home.js';
import { searchPosts, updateSearchInfo } from './searchHandler.js';
import { getCurrentUserData } from '../auth/storage.js';
import { navigateTo } from '../router/router.js';

let currentPage = 1;  // current page
let currentQuery = '';  // added for search
let isFetching = false; // Double-click protection

/* exported for searchHandler */
export function setQuery(query) {
  currentQuery = query;
  currentPage = 1;
}

export function getQuery() {
  return currentQuery;
}

export function setPage(page) {
  currentPage = page;
}

/* Get posts from API */ 

/**
 * Fetch posts from API
 * @param {number} page - Page number
 * @returns {Promise<{posts: Array, meta: Object}>} Posts and metadata
 */
async function getPosts(page = 1) {
  // Build query string with URLSearchParams
  const params = new URLSearchParams({
    _author: 'true',
    _comments: 'true',
    _reactions: 'true',
    limit: '12',
    page: page.toString()
  });

  // GET request: fetch with Bearer token (handled by apiClient)
  const result = await get(`/social/posts?${params}`);
  return {
    posts: result.data,
    meta: result.meta  // Returning meta from the API
  };
}

/* Render posts to DOM */

/**
 * Display posts in feed
 * @param {Array} posts - Posts from API
 */
export function renderPosts(posts) {
  const feed = document.getElementById('feed');
  
  // Empty state: conditional rendering
  if (!posts || posts.length === 0) {
    feed.innerHTML = Home.renderEmptyState();  // HTML from Home.js
    return;
  }

  // Get current user name
  const currentUser = getCurrentUserData();
  const currentUserName = currentUser?.name || null;

   // Render posts using Home.js template
  feed.innerHTML = posts.map(post => Home.renderPostCard(post, currentUserName)).join('');
  // Attach action handlers after rendering
  attachActionHandlers();
}

/* Attach Edit/Delete button handlers */
function attachActionHandlers() {
  const feed = document.getElementById('feed');
  if (!feed) return;

  feed.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const postId = button.dataset.postId;

    if (action === 'edit') {
      handleEdit(postId);
    } else if (action === 'delete') {
      handleDelete(postId);
    }
  });
}

/* Handle Edit action */
function handleEdit(postId) {
  // Navigate to edit page (you'll need to create this)
  navigateTo(`/post/${postId}/edit`);
}

/* Handle Delete action */
async function handleDelete(postId) {
  // Confirm deletion
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (!confirmed) return;

  try {
    // Delete post via API
    await del(`/social/posts/${postId}`);
    
    // Reload posts to show updated list
    await loadPosts();
    
    // Show success (optional)
    alert('Post deleted successfully!');
  } catch (error) {
    console.error('Failed to delete post:', error);
    alert('Failed to delete post. Please try again.');
  }
}
/* Pagination. Update pagination buttons based on meta */
/**
 * Update pagination UI using meta object from API
 * @param {Object} meta - Pagination metadata
 */
export function updatePagination(meta) {
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pageInfo = document.getElementById('page-info');

  // Update page text
  if (pageInfo) {
    pageInfo.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;
  }

  // Disable meta-based buttons
  if (prevBtn) {
    prevBtn.disabled = meta.isFirstPage;
  }

  if (nextBtn) {
    nextBtn.disabled = meta.isLastPage;
  }
}

  /* 4. Setup pagination event listeners */
function setupPagination() {
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');

  // Previous button
  prevBtn?.addEventListener('click', async () => {
    if (!isFetching && !prevBtn.disabled) {
      currentPage--;
      await loadPosts();
      window.scrollTo(0, 0);
    }
  });

  // Next button
  nextBtn?.addEventListener('click', async () => {
    if (!isFetching && !nextBtn.disabled) {
      currentPage++;
      await loadPosts();
      window.scrollTo(0, 0);
    }
  });
}

/* Loading */
/**
 * Show/hide loading spinner
 * @param {boolean} isLoading
 */
export function showLoading(isLoading) {
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

/* Load posts (search or regular) */
export async function loadPosts() {
  if (isFetching) return;
  
  isFetching = true;
  showLoading(true);

  try {
    // Search or regular load
    const { posts, meta } = currentQuery
      ? await searchPosts(currentQuery, currentPage)
      : await getPosts(currentPage);
    
    renderPosts(posts);
    updatePagination(meta);
    updateSearchInfo();  // From searchHandler
  } catch (error) {
    console.error('Failed to load posts:', error);
    document.getElementById('feed').innerHTML = Home.renderErrorState();
  } finally {
    showLoading(false);
    isFetching = false;
  }
}

/* Main function called by router */

export async function setupFeed() {
  currentPage = 1;
  setupPagination();  //
  await loadPosts();
}