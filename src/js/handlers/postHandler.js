/* Post Handler - loads and displays single post */
import { get } from '../api/apiClient.js';
import Post from '../views/Post.js';

/* API */
/**
 * Fetch single post from API
 * @param {string} id - Post ID
 * @returns {Promise<object>} Post object with author, comments, reactions
 */
async function getPost(id) {
  const params = new URLSearchParams({
    _author: 'true',
    _comments: 'true',
    _reactions: 'true'
  });

  const result = await get(`/social/posts/${id}?${params}`);
  return result.data;
}

/* Render */
function renderPost(post) {
  const postContent = document.getElementById('post-content');
  if (!postContent) return;

  // Render post
  postContent.innerHTML = Post.renderPost(post);

  // Render comments
  const commentsList = document.getElementById('comments-list');
  if (commentsList && post.comments) {
    commentsList.innerHTML = Post.renderComments(post.comments);
  }
}

function showError() {
  const postContent = document.getElementById('post-content');
  if (!postContent) return;

  postContent.innerHTML = Post.renderError();
}

/* Loading */
function showLoading(isLoading) {
  const spinner = document.getElementById('post-loading');
  const content = document.getElementById('post-content');

  if (isLoading) {
    if (spinner) spinner.style.display = 'block';
    if (content) content.style.display = 'none';
  } else {
    if (spinner) spinner.style.display = 'none';
    if (content) content.style.display = 'block';
  }
}

/* Load post */
async function loadPost(id) {
  showLoading(true);

  try {
    const post = await getPost(id);
    renderPost(post);
  } catch (error) {
    console.error('Failed to load post:', error);
    showError();
  } finally {
    showLoading(false);
  }
}

/* Setup (called by router) */
export async function setupPost(id) {
  await loadPost(id);
}