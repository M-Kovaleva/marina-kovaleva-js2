/* Feed Handler - loads and displays posts with pagination */
import { get, del } from "../api/apiClient.js";
import { getCurrentUserData } from "../auth/storage.js";
import { navigateTo } from "../router/router.js";
import { searchPosts } from "./searchHandler.js";
import { createPostCard } from "../components/PostCard.js";
import { toggleLoading, confirmAction, showAlert } from "../utils/ui.js";

/* State */
let currentPage = 1;
let currentQuery = "";
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
    _author: "true",
    _comments: "true",
    _reactions: "true",
    _media: "true",
    limit: "12",
    page: page.toString(),
  });

  const result = await get(`/social/posts?${params}`);
  return {
    posts: result.data,
    meta: result.meta,
  };
}

/* DOM creation - empty/error states */

/* Create empty state */
function createEmptyState() {
  const empty = document.createElement("p");
  empty.className = "feed-empty";
  empty.textContent = "No posts found.";
  return empty;
}

/* Create error state */
function createErrorState() {
  const error = document.createElement("p");
  error.className = "feed-error";
  error.textContent = "Error loading posts. Please try again.";
  return error;
}

/* DOM manipulation */
/* Display posts in feed */
function displayFeed(posts) {
  const feed = document.getElementById("feed");
  if (!feed) return;

  // Clear existing content
  feed.innerHTML = "";

  // Empty state
  if (!posts || posts.length === 0) {
    feed.append(createEmptyState());
    return;
  }

  // Get current user
  const currentUser = getCurrentUserData();
  const currentUserName = currentUser?.name || null;

  // Create and append post cards
  posts.forEach((post) => {
    const isAuthor = currentUserName && post.author?.name === currentUserName;

    // Using PostCard component
    const postCard = createPostCard(post, {
      variant: "feed",
      showAuthor: true,
      showActions: isAuthor,
      onEdit: handleEdit,
      onDelete: handleDelete,
    });

    feed.append(postCard);
  });
}

/* Display error state */
function displayError() {
  const feed = document.getElementById("feed");
  if (!feed) return;

  feed.innerHTML = "";
  const error = createErrorState();
  feed.append(error);
}

/* Update pagination */
function updatePagination(meta) {
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");
  const pageInfo = document.getElementById("page-info");

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
  const searchInfo = document.getElementById("search-info");
  if (!searchInfo) return;

  if (currentQuery) {
    searchInfo.style.display = "flex";
    searchInfo.innerHTML = `
      <span>Showing results for: <strong>"${currentQuery}"</strong></span>
      <button id="clear-search-btn" class="btn-clear-search">Clear search</button>
    `;

    // Attach clear search handler
    const clearBtn = document.getElementById("clear-search-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", async () => {
        currentQuery = "";
        currentPage = 1;
        const searchInput = document.querySelector('[name="search"]');
        if (searchInput) searchInput.value = "";
        await loadFeed();
      });
    }
  } else {
    searchInfo.style.display = "none";
  }
}

/* Event handlers *

/* Handle edit action */
function handleEdit(postId) {
  navigateTo(`/create?id=${postId}`);
}

/* Handle delete action */
async function handleDelete(postId) {
  if (!confirmAction("Are you sure you want to delete this post?")) return;

  try {
    await del(`/social/posts/${postId}`);
    await loadFeed();
    showAlert("Post deleted successfully!");
  } catch (error) {
    console.error("Failed to delete post:", error);
    showAlert("Failed to delete post. Please try again.");
  }
}

/* Attach pagination handlers */
function attachPagination() {
  const prevBtn = document.getElementById("prev-page-btn");
  const nextBtn = document.getElementById("next-page-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", async () => {
      if (!isFetching && !prevBtn.disabled) {
        currentPage--;
        await loadFeed();
        window.scrollTo(0, 0);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", async () => {
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
  toggleLoading("feed-loading", "feed", true);

  try {
    // Search or regular load
    const { posts, meta } = currentQuery
      ? await searchPosts(currentQuery, currentPage)
      : await getPosts(currentPage);

    displayFeed(posts);
    updatePagination(meta);
    updateSearchInfo();
  } catch (error) {
    console.error("Failed to load posts:", error);
    displayError();
  } finally {
    toggleLoading("feed-loading", "feed", false);
    isFetching = false;
  }
}

/* Setup - called by router */
export async function setupFeed() {
  currentPage = 1;
  attachPagination();
  await loadFeed();
}
