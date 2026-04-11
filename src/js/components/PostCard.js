/* PostCard Component - post card for Feed and Profile pages */
import { navigateTo } from "../router/router.js";
import { formatDate, createAvatar } from "../utils/ui.js";

/* Constants */
const BODY_PREVIEW_LENGTH = { FEED: 150, PROFILE: 120 };

/**
 * Create author section - for feed variant
 */
function createAuthorSection(post) {
  const section = document.createElement("div");
  section.className = "flex items-center gap-3";

  // Avatar
  const avatar = createAvatar(
    post.author?.avatar?.url,
    post.author?.name || "Unknown",
    "post-card-avatar",
    "small"
  );
  avatar.className =
    "w-10 h-10 rounded-full object-cover bg-amber-100 dark:bg-stone-600 flex items-center justify-center text-sm font-semibold text-stone-700 dark:text-stone-200";
  section.appendChild(avatar);

  // Author info
  const info = document.createElement("div");
  info.className = "flex flex-col";

  const authorLink = document.createElement("a");
  authorLink.href = `/profile/${post.author?.name}`;
  authorLink.className = "post-author-name text-sm";
  authorLink.setAttribute("data-link", "");
  authorLink.textContent = post.author?.name || "Unknown";

  const date = document.createElement("span");
  date.className = "text-xs text-stone-400 dark:text-stone-500";
  date.textContent = formatDate(post.created, "short");

  info.appendChild(authorLink);
  info.appendChild(date);
  section.appendChild(info);

  return section;
}

/**
 * Create action buttons - Edit/Delete
 * Mobile: always visible
 * Desktop: hidden, show on hover
 */
function createActionButtons(postId, onEdit, onDelete) {
  const actions = document.createElement("div");
  actions.className = "flex gap-3";

  // Edit button (pencil icon)
  const editBtn = document.createElement("button");
  editBtn.className = "btn-icon";
  editBtn.setAttribute("aria-label", "Edit post");
  editBtn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
    </svg>
  `;
  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(postId);
  });

  // Delete button (trash icon)
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn-icon";
  deleteBtn.setAttribute("aria-label", "Delete post");
  deleteBtn.innerHTML = `
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
    </svg>
  `;
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(postId);
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  return actions;
}

/**
 * Create PostCard component
 */
export function createPostCard(post, options = {}) {
  const {
    variant = "feed",
    showAuthor = variant === "feed",
    showActions = false,
    bodyPreviewLength = variant === "feed"
      ? BODY_PREVIEW_LENGTH.FEED
      : BODY_PREVIEW_LENGTH.PROFILE,
    onEdit = (id) => navigateTo(`/create?id=${id}`),
    onDelete = () => {},
  } = options;

  // Main card with group for hover effects
  const card = document.createElement("article");
  card.className =
    "group bg-white dark:bg-stone-800 border border-transparent dark:border-stone-700 rounded-xl overflow-hidden transition-all duration-300";

  // Header (author + actions)
  if (showAuthor || showActions) {
    const header = document.createElement("div");
    header.className = "flex items-center justify-between p-4";

    if (showAuthor) {
      header.appendChild(createAuthorSection(post));
    }

    if (showActions) {
      header.appendChild(createActionButtons(post.id, onEdit, onDelete));
    }

    card.appendChild(header);
  }

  // Image with responsive padding 
  if (post.media?.url) {
    const imageWrapper = document.createElement("div");
    // Mobile: no margin, sm: small margin, md: more margin
    imageWrapper.className =
      "overflow-hidden rounded-none sm:mx-2 sm:rounded-lg md:mx-4 md:rounded-xl";

    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = post.title || "Post image";
    img.className =
      "w-full aspect-square object-cover md:group-hover:scale-105 transition-transform duration-300";
    imageWrapper.appendChild(img);
    card.appendChild(imageWrapper);
  }

  // Content section
  const content = document.createElement("div");
  content.className = "p-4 space-y-2";

  // Title
  const title = document.createElement("h2");
  title.className =
    "text-lg font-bold text-stone-900 dark:text-white line-clamp-2";
  title.textContent = post.title || "Untitled";
  content.appendChild(title);

  // Body preview
  if (post.body) {
    const body = document.createElement("p");
    body.className =
      "text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-3";
    body.textContent =
      post.body.length > bodyPreviewLength
        ? post.body.slice(0, bodyPreviewLength) + "..."
        : post.body;
    content.appendChild(body);
  }

  // Date (for profile variant)
  if (variant === "profile") {
    const date = document.createElement("span");
    date.className = "block text-xs text-stone-400 dark:text-stone-500";
    date.textContent = formatDate(post.created, "long");
    content.appendChild(date);
  }

  // Read more link
  const link = document.createElement("a");
  link.href = `/post/${post.id}`;
  link.className = "back-link text-sm";
  link.setAttribute("data-link", "");
  link.innerHTML = `Read more <span class="md:group-hover:translate-x-1 transition-transform duration-200">→</span>`;
  content.appendChild(link);

  card.appendChild(content);

  return card;
}
