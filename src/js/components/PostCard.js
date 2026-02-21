/* PostCard Component -  post card for Feed and Profile pages */
import { navigateTo } from '../router/router.js';

/*Format date for display*/
function formatDate(dateString, format = 'short') {
  const options = format === 'long' 
    ? { day: 'numeric', month: 'long', year: 'numeric' }
    : { day: 'numeric', month: 'short', year: 'numeric' };
  
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

/* Create avatar - image or placeholder */
function createAvatar(avatarUrl, name, size = 'default') {
  if (avatarUrl) {
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = name;
    img.className = `post-card-avatar post-card-avatar-${size}`;
    return img;
  }

  const placeholder = document.createElement('div');
  placeholder.className = `post-card-avatar-placeholder post-card-avatar-${size}`;
  placeholder.textContent = getInitial(name);
  return placeholder;
}

/* Create post image */
function createPostImage(imageUrl, title) {
  if (!imageUrl) return null;
  
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = title || 'Post image';
  img.className = 'post-card-image';
  return img;
}

/*Create author section - for feed variant */
function createAuthorSection(post) {
  const section = document.createElement('div');
  section.className = 'post-card-author';

  // Avatar
  const avatar = createAvatar(
    post.author?.avatar?.url,
    post.author?.name || 'Unknown',
    'small'
  );
  section.append(avatar);

  // Author info
  const info = document.createElement('div');
  info.className = 'post-card-author-info';

  const authorLink = document.createElement('a');
  authorLink.href = `/profile/${post.author?.name}`;
  authorLink.className = 'post-card-author-name';
  authorLink.setAttribute('data-link', '');
  authorLink.textContent = post.author?.name || 'Unknown';

  const date = document.createElement('span');
  date.className = 'post-card-date';
  date.textContent = formatDate(post.created, 'short');

  info.append(authorLink, date);
  section.append(info);

  return section;
}

/* Create action buttons - Edit/Delete */
function createActionButtons(postId, onEdit, onDelete) {
  const actions = document.createElement('div');
  actions.className = 'post-card-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-action btn-edit';
  editBtn.setAttribute('data-post-id', postId);
  editBtn.setAttribute('data-action', 'edit');
  editBtn.setAttribute('title', 'Edit post');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => onEdit(postId));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-action btn-delete';
  deleteBtn.setAttribute('data-post-id', postId);
  deleteBtn.setAttribute('data-action', 'delete');
  deleteBtn.setAttribute('title', 'Delete post');
  deleteBtn.textContent = 'X';
  deleteBtn.addEventListener('click', () => onDelete(postId));

  actions.append(editBtn, deleteBtn);
  return actions;
}

/**
 * Create PostCard component
 * 
 * @param {Object} post - Post data
 * @param {Object} options - Configuration options
 * @param {string} options.variant - 'feed' or 'profile'
 * @param {boolean} options.showAuthor - Show author info (default: true for feed, false for profile)
 * @param {boolean} options.showActions - Show edit/delete buttons (default: false)
 * @param {number} options.bodyPreviewLength - Length of body preview (default: 150 for feed, 120 for profile)
 * @param {Function} options.onEdit - Edit callback
 * @param {Function} options.onDelete - Delete callback
 * @returns {HTMLElement} Post card element
 */
export function createPostCard(post, options = {}) {
  const {
    variant = 'feed',
    showAuthor = variant === 'feed',
    showActions = false,
    bodyPreviewLength = variant === 'feed' ? 150 : 120,
    onEdit = (id) => navigateTo(`/create?id=${id}`),
    onDelete = () => {}
  } = options;

  // Main card
  const card = document.createElement('article');
  card.className = `post-card post-card-${variant}`;

  // Header author + actions 
  if (showAuthor || showActions) {
    const header = document.createElement('div');
    header.className = 'post-card-header';

    if (showAuthor) {
      const authorSection = createAuthorSection(post);
      header.append(authorSection);
    }

    if (showActions) {
      const actions = createActionButtons(post.id, onEdit, onDelete);
      header.append(actions);
    }

    card.append(header);
  }

  // Image
  const image = createPostImage(post.media?.url, post.title);
  if (image) {
    card.append(image);
  }

  // Content section
  const content = document.createElement('div');
  content.className = 'post-card-content';

  // Title
  const title = document.createElement('h2');
  title.className = 'post-card-title';
  title.textContent = post.title || 'Untitled';
  content.append(title);

  // Body preview
  if (post.body) {
    const body = document.createElement('p');
    body.className = 'post-card-body';
    const preview = post.body.length > bodyPreviewLength
      ? post.body.slice(0, bodyPreviewLength) + '...'
      : post.body;
    body.textContent = preview;
    content.append(body);
  }

  // Date for profile
  if (variant === 'profile') {
    const date = document.createElement('span');
    date.className = 'post-card-date';
    date.textContent = formatDate(post.created, 'long');
    content.append(date);
  }

  // Read more link
  const link = document.createElement('a');
  link.href = `/post/${post.id}`;
  link.className = 'post-card-link';
  link.setAttribute('data-link', '');
  link.textContent = 'Read more >';
  content.append(link);

  card.append(content);

  return card;
}