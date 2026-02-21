/* Feed Handler - loads and displays posts with pagination */
import { get, del } from '../api/apiClient.js';
import { getCurrentUserData } from '../auth/storage.js';
import { navigateTo } from '../router/router.js';
import { searchPosts } from './searchHandler.js';

/* State */
let currentPage = 1;
let currentQuery = '';
let isFetching = false;

/* Exported for searchHandler */
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

/* API */
async function getPosts(page = 1) {
  const params = new URLSearchParams({
    _author: 'true',
    _comments: 'true',
    _reactions: 'true',
    _media: 'true', 
    limit: '12',
    page: page.toString()
  });

  const result = await get(`/social/posts?${params}`);
  return {
    posts: result.data,
    meta: result.meta
  };
}

/* Helpers */
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function getInitial(name) {
  return name?.[0]?.toUpperCase() || '?';
}

/* DOM creation - post card components */

/* Create post card */
function createPostCard(post, isAuthor) {
  const card = document.createElement('article');
  card.className = 'feed-post';

  // Header (author + actions)
  const header = createPostHeader(post, isAuthor);
  card.append(header);

  // Image
  if (post.media?.url) {
    const image = createPostImage(post.media.url, post.title);
    card.append(image);
  }

  // Title
  const title = document.createElement('h2');
  title.className = 'feed-post-title';
  title.textContent = post.title || 'Untitled';
  card.append(title);

  // Body
  const body = document.createElement('p');
  body.className = 'feed-post-content';
  body.textContent = post.body ? post.body.slice(0, 150) + '...' : '';
  card.append(body);

  // Read more link
  const link = document.createElement('a');
  link.href = `/post/${post.id}`;
  link.className = 'feed-post-link';
  link.setAttribute('data-link', '');
  link.textContent = 'Read more >';
  card.append(link);

  return card;
}

/* Create post header with author info and actions */
function createPostHeader(post, isAuthor) {
  const header = document.createElement('div');
  header.className = 'feed-post-header';

  // Author section
  const authorSection = document.createElement('div');
  authorSection.className = 'feed-post-author';

  // Avatar
  const avatar = createAvatar(
    post.author?.avatar?.url,
    post.author?.name || 'Unknown'
  );
  authorSection.append(avatar);

  // Author info
  const authorInfo = document.createElement('div');
  authorInfo.className = 'feed-post-author-info';

  const authorLink = document.createElement('a');
  authorLink.href = `/profile/${post.author?.name}`;
  authorLink.className = 'feed-post-user';
  authorLink.setAttribute('data-link', '');
  authorLink.textContent = post.author?.name || 'Unknown';

  const date = document.createElement('span');
  date.className = 'feed-post-date';
  date.textContent = formatDate(post.created);

  authorInfo.append(authorLink, date);
  authorSection.append(authorInfo);
  header.append(authorSection);

  // Actions (Edit/Delete) - only for author
  if (isAuthor) {
    const actions = createPostActions(post.id);
    header.append(actions);
  }

  return header;
}

/* Create avatar - image or placeholder */
function createAvatar(avatarUrl, name) {
  if (avatarUrl) {
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = name;
    img.className = 'feed-post-avatar';
    return img;
  }

  const placeholder = document.createElement('div');
  placeholder.className = 'feed-post-avatar-placeholder';
  placeholder.textContent = getInitial(name);
  return placeholder;
}

/* Create post image */
function createPostImage(imageUrl, title) {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = title || 'Post image';
  img.className = 'feed-post-image';
  return img;
}

/* Create post actions (Edit/Delete buttons) */
function createPostActions(postId) {
  const actions = document.createElement('div');
  actions.className = 'feed-post-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-action btn-edit';
  editBtn.setAttribute('data-post-id', postId);
  editBtn.setAttribute('data-action', 'edit');
  editBtn.setAttribute('title', 'Edit post');
  editBtn.textContent = 'Edit';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-action btn-delete';
  deleteBtn.setAttribute('data-post-id', postId);
  deleteBtn.setAttribute('data-action', 'delete');
  deleteBtn.setAttribute('title', 'Delete post');
  deleteBtn.textContent = 'X';

  actions.append(editBtn, deleteBtn);
  return actions;
}

/* DOM creation - empty/error states */

/* Create empty state */
function createEmptyState() {
  const empty = document.createElement('p');
  empty.className = 'feed-empty';
  empty.textContent = 'No posts found.';
  return empty;
}

/* Create error state */
function createErrorState() {
  const error = document.createElement('p');
  error.className = 'feed-error';
  error.textContent = 'Error loading posts. Please try again.';
  return error;
}

/* DOM manipulation */

/* Show/hide loading spinner */
function showLoading(isLoading) {
  const spinner = document.getElementById('feed-loading');
  const feed = document.getElementById('feed');

  if (!spinner || !feed) return;

  if (isLoading) {
    spinner.style.display = 'block';
    feed.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    feed.style.display = 'block';
  }
}

/* Display posts in feed */
function displayFeed(posts) {
  const feed = document.getElementById('feed');
  if (!feed) return;

  // Clear existing content
  feed.innerHTML = '';

  // Empty state
  if (!posts || posts.length === 0) {
    const empty = createEmptyState();
    feed.append(empty);
    return;
  }

  // Get current user
  const currentUser = getCurrentUserData();
  const currentUserName = currentUser?.name || null;

  // Create and append post cards
  posts.forEach(post => {
    const isAuthor = currentUserName && post.author?.name === currentUserName;
    const postCard = createPostCard(post, isAuthor);
    feed.append(postCard);
  });
}

/* Display error state */
function displayError() {
  const feed = document.getElementById('feed');
  if (!feed) return;

  feed.innerHTML = '';
  const error = createErrorState();
  feed.append(error);
}

/* Update pagination UI */
function updatePagination(meta) {
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const pageInfo = document.getElementById('page-info');

  if (pageInfo) {
    pageInfo.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;
  }

  if (prevBtn) {
    prevBtn.disabled = meta.isFirstPage;
  }

  if (nextBtn) {
    nextBtn.disabled = meta.isLastPage;
  }
}

/* Update search info bar */
export function updateSearchInfo() {
  const searchInfo = document.getElementById('search-info');
  if (!searchInfo) return;

  if (currentQuery) {
    searchInfo.style.display = 'flex';
    searchInfo.innerHTML = `
      <span>Showing results for: <strong>"${currentQuery}"</strong></span>
      <button id="clear-search-btn" class="btn-clear-search">Clear search</button>
    `;

    // Attach clear search handler
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        currentQuery = '';
        currentPage = 1;
        const searchInput = document.querySelector('[name="search"]');
        if (searchInput) searchInput.value = '';
        await loadFeed();
      });
    }
  } else {
    searchInfo.style.display = 'none';
  }
}

/* Event handlers */

/* Attach post action handlers (Edit/Delete) */
function attachActionHandlers() {
  const feed = document.getElementById('feed');
  if (!feed) return;

  feed.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-action]');
    if (!button) return;

    const action = button.getAttribute('data-action');
    const postId = button.getAttribute('data-post-id');

    if (action === 'edit') {
      handleEdit(postId);
    } else if (action === 'delete') {
      await handleDelete(postId);
    }
  });
}

/* Handle edit action */
function handleEdit(postId) {
  navigateTo(`/create?id=${postId}`);
}

/* Handle delete action */
async function handleDelete(postId) {
  const confirmed = confirm('Are you sure you want to delete this post?');
  if (!confirmed) return;

  try {
    await del(`/social/posts/${postId}`);
    await loadFeed();
    alert('Post deleted successfully!');
  } catch (error) {
    console.error('Failed to delete post:', error);
    alert('Failed to delete post. Please try again.');
  }
}

/* Attach pagination handlers */
function attachPagination() {
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', async () => {
      if (!isFetching && !prevBtn.disabled) {
        currentPage--;
        await loadFeed();
        window.scrollTo(0, 0);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', async () => {
      if (!isFetching && !nextBtn.disabled) {
        currentPage++;
        await loadFeed();
        window.scrollTo(0, 0);
      }
    });
  }
}

/* Main logic */

/* Load feed (search or regular) */
export async function loadFeed() {
  if (isFetching) return;

  isFetching = true;
  showLoading(true);

  try {
    // Search or regular load
    const { posts, meta } = currentQuery
      ? await searchPosts(currentQuery, currentPage)
      : await getPosts(currentPage);

    displayFeed(posts);
    updatePagination(meta);
    updateSearchInfo();
  } catch (error) {
    console.error('Failed to load posts:', error);
    displayError();
  } finally {
    showLoading(false);
    isFetching = false;
  }
}

/* Setup - called by router */
export async function setupFeed() {
  currentPage = 1;
  attachPagination();
  attachActionHandlers();
  await loadFeed();
}