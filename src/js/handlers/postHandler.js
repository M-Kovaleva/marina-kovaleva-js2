/* Post Handler - loads and displays single post */
import { get } from "../api/apiClient.js";
import { toggleLoading, formatDate, createAvatar } from "../utils/ui.js";

/**
 * Fetch single post with author and comments
 * @param {string} id - Post ID
 * @returns {Promise<Object>} Post data
 */
async function getPost(id) {
  const params = new URLSearchParams({
    _author: "true",
    _comments: "true",
    _reactions: "true",
  });

  const result = await get(`/social/posts/${id}?${params}`);
  return result.data;
}

/* DOM creation - post components */

/*Create post header with author info */
function createPostHeader(post) {
  const header = document.createElement("div");
  header.className = "post-header";

  const author = document.createElement("div");
  author.className = "flex items-center gap-3";

  // Avatar
  const avatar = createAvatar(
    post.author?.avatar?.url,
    post.author?.name || "Unknown",
    "h-12 w-12 rounded-full object-cover",
    "medium"
  );
  author.append(avatar);

  // Author info
  const authorInfo = document.createElement("div");
  authorInfo.className = "flex flex-col";

  const authorLink = document.createElement("a");
  authorLink.href = `/profile/${post.author?.name}`;
  authorLink.className = "post-author-name";
  authorLink.setAttribute("data-link", "");
  authorLink.textContent = post.author?.name || "Unknown";

  const date = document.createElement("span");
  date.className = "text-sm text-stone-400 dark:text-stone-500";
  date.textContent = formatDate(post.created, "full");
  authorInfo.append(authorLink, date);
  author.append(authorInfo);
  header.append(author);

  return header;
}

/* Create post image */
function createPostImage(imageUrl, title) {
  if (!imageUrl) return null;

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;
  img.className = "post-image";
  return img;
}

/* Create post body - title and text */
function createPostBody(post) {
  const body = document.createElement("div");
  body.className = "post-body";

  const title = document.createElement("h1");
  title.className = "post-title";
  title.textContent = post.title || "Untitled";

  const text = document.createElement("p");
  text.className = "post-text";
  text.textContent = post.body || "";

  body.append(title, text);
  return body;
}

/* Create tags */
function createTags(tags) {
  if (!tags || tags.length === 0) return null;

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "post-tags";

  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "post-tag";
    tagElement.textContent = `#${tag}`;
    tagsContainer.append(tagElement);
  });

  return tagsContainer;
}

/* Create reactions and comments count */
function createPostStats(post) {
  const stats = document.createElement("div");
  stats.className = "post-stats";

  const reactions = document.createElement("span");
  reactions.className = "text-sm text-stone-500 dark:text-stone-400";
  reactions.textContent = `♡ ${post._count?.reactions || 0} reactions`;

  const comments = document.createElement("span");
  comments.className = "text-sm text-stone-500 dark:text-stone-400";
  comments.textContent = `${post._count?.comments || 0} comments`;

  stats.append(reactions, comments);
  return stats;
}

/* DOM creation - comments */
/* Create comments section */
function createCommentsSection(comments) {
  const section = document.createElement("div");
  section.className = "post-comments";

  const heading = document.createElement("h2");
  heading.textContent = "Comments";
  section.append(heading);

  const commentsList = document.createElement("div");
  commentsList.id = "comments-list";

  if (!comments || comments.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state text-sm";
    empty.textContent = "No comments yet. Be the first to comment!";
    commentsList.append(empty);
  } else {
    comments.forEach((comment) => {
      const commentElement = createComment(comment);
      commentsList.append(commentElement);
    });
  }

  section.append(commentsList);
  return section;
}

/* Create comment element */
function createComment(comment) {
  const commentBox = document.createElement("div");
  commentBox.className = "comment";

  // Header
  const header = document.createElement("div");
  header.className = "mb-2 flex items-center gap-3";

  const avatar = createAvatar(
    comment.author?.avatar?.url,
    comment.author?.name || "Anonymous",
    "h-8 w-8 rounded-full object-cover",
    "small"
  );
  header.append(avatar);

  // Author info
  const info = document.createElement("div");
  info.className = "flex flex-col";

  const authorLink = document.createElement("a");
  authorLink.href = `/profile/${comment.author?.name}`;
  authorLink.className = "comment-author";
  authorLink.setAttribute("data-link", "");
  authorLink.textContent = comment.author?.name || "Anonymous";

  const date = document.createElement("span");
  date.className = "text-xs text-stone-400 dark:text-stone-500";
  date.textContent = formatDate(comment.created, "long");

  info.append(authorLink, date);

  info.append(authorLink, date);
  header.append(info);

  // Body
  const body = document.createElement("p");
  body.className = "comment-body";
  body.textContent = comment.body || "";

  commentBox.append(header, body);
  return commentBox;
}

/* DOM creation - error state */

function createErrorState() {
  const error = document.createElement("div");
  error.className = "py-16 text-center";

  const text = document.createElement("p");
  text.textContent =
    "Could not load post. It may have been deleted or you don't have permission.";

  error.append(text);
  return error;
}

/* DON manipulation */
/* Display post in DOM */
function displayPost(post) {
  const postContent = document.getElementById("post-content");
  if (!postContent) return;

  // Clear existing content
  postContent.innerHTML = "";

  // Create and append components
  const header = createPostHeader(post);
  postContent.append(header);

  const image = createPostImage(post.media?.url, post.title);
  if (image) postContent.append(image);

  const body = createPostBody(post);
  postContent.append(body);

  const tags = createTags(post.tags);
  if (tags) postContent.append(tags);

  const stats = createPostStats(post);
  postContent.append(stats);

  const comments = createCommentsSection(post.comments);
  postContent.append(comments);
}

/* Display error state */
function displayError() {
  const postContent = document.getElementById("post-content");
  if (!postContent) return;

  postContent.innerHTML = "";
  const error = createErrorState();
  postContent.append(error);
}

/* Main logic */
async function loadPost(id) {
  toggleLoading("post-loading", "post-content", true);

  try {
    const post = await getPost(id);
    displayPost(post);
  } catch (error) {
    console.error("Failed to load post:", error);
    displayError();
  } finally {
    toggleLoading("post-loading", "post-content", false);
  }
}

/**
 * Setup post page - called by router
 * @param {string} id - Post ID to display
 * @returns {Promise<void>}
 */
export async function setupPost(id) {
  await loadPost(id);
}
