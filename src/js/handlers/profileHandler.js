/* Profile Handler - loads and displays user profile with all posts */
import { get } from '../api/apiClient.js';
import { followUser, unfollowUser } from '../api/apiClient.js';
import { getCurrentUserData } from '../auth/storage.js';

/* API */
async function getProfile(username) {
  const params = new URLSearchParams({
    _posts: 'true',
    _followers: 'true',
    _following: 'true'
  });

  const result = await get(`/social/profiles/${username}?${params}`);
  return result.data;
}

/* Helpers */
function getInitial(name) {
  return name?.[0]?.toUpperCase() || '?';
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/* DOM creation - profile components */
/* Create profile header with info */
function createProfileHeader(profile, isOwnProfile, isFollowing) {
  const header = document.createElement('div');
  header.className = 'profile-header';

  // Avatar
  const avatar = createAvatar(
    profile.avatar?.url,
    profile.avatar?.alt || profile.name
  );
  header.append(avatar);

  // User info
  const userInfo = document.createElement('div');
  userInfo.className = 'profile-user-info-container';

  // Name
  const name = document.createElement('h1');
  name.className = 'profile-name';
  name.textContent = profile.name;

  // Email
  if (profile.email) {
    const email = document.createElement('p');
    email.className = 'profile-email';
    email.textContent = profile.email;
    userInfo.append(name, email);
  } else {
    userInfo.append(name);
  }
  
    const userInfoContainer = document.createElement('div');
    userInfoContainer.className = 'profile-user-info-container';
    userInfoContainer.append(userInfo);

  // Follow/Unfollow button - if not own profile
  if (!isOwnProfile) {
    const followBtn = document.createElement('button');
    followBtn.className = isFollowing ? 'btn-unfollow' : 'btn-follow';
    followBtn.id = 'follow-btn';
    followBtn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    followBtn.setAttribute('data-username', profile.name);
    followBtn.setAttribute('data-following', isFollowing);
    userInfoContainer.append(followBtn);
  }

  header.append(userInfoContainer);
  return header;
}

/* Create avatar - image or placeholder */
function createAvatar(avatarUrl, name) {
  const container = document.createElement('div');
  container.className = 'profile-avatar-container';

  if (avatarUrl) {
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.alt = name;
    img.className = 'profile-avatar';
    container.append(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'profile-avatar-placeholder';
    placeholder.textContent = getInitial(name);
    container.append(placeholder);
  }

  return container;
}

/* Create stats section: nuber of posts, followers, following */
function createStats(profile) {
  const stats = document.createElement('div');
  stats.className = 'profile-stats';

  // Posts count
  const postsCount = document.createElement('div');
  postsCount.className = 'profile-stat';
  const postsNumber = document.createElement('span');
  postsNumber.className = 'profile-stat-number';
  postsNumber.textContent = profile._count?.posts || 0;
  const postsLabel = document.createElement('span');
  postsLabel.className = 'profile-stat-label';
  postsLabel.textContent = 'Posts';
  postsCount.append(postsNumber, postsLabel);

  // Followers count
  const followersCount = document.createElement('div');
  followersCount.className = 'profile-stat';
  const followersNumber = document.createElement('span');
  followersNumber.className = 'profile-stat-number';
  followersNumber.id = 'followers-count'; //ID for updating 
  followersNumber.textContent = profile._count?.followers || 0;
  const followersLabel = document.createElement('span');
  followersLabel.className = 'profile-stat-label';
  followersLabel.textContent = 'Followers';
  followersCount.append(followersNumber, followersLabel);

  // Following count
  const followingCount = document.createElement('div');
  followingCount.className = 'profile-stat';
  const followingNumber = document.createElement('span');
  followingNumber.className = 'profile-stat-number';
  followingNumber.textContent = profile._count?.following || 0;
  const followingLabel = document.createElement('span');
  followingLabel.className = 'profile-stat-label';
  followingLabel.textContent = 'Following';
  followingCount.append(followingNumber, followingLabel);

  stats.append(postsCount, followersCount, followingCount);
  return stats;
}

/* Create posts section */
function createPostsSection(posts) {
  const section = document.createElement('div');
  section.className = 'profile-posts';

  const heading = document.createElement('h2');
  heading.textContent = 'Posts';
  section.append(heading);

  const postsList = document.createElement('div');
  postsList.className = 'profile-posts-list';

  if (!posts || posts.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'profile-posts-empty';
    empty.textContent = 'No posts yet.';
    postsList.append(empty);
  } else {
    posts.forEach(post => {
      const postCard = createPostCard(post);
      postsList.append(postCard);
    });
  }

  section.append(postsList);
  return section;
}

/* Create post card */
function createPostCard(post) {
  const card = document.createElement('article');
  card.className = 'profile-post-card';

  // Post image 
  if (post.media?.url) {
    const image = document.createElement('img');
    image.src = post.media.url;
    image.alt = post.title || 'Post image';
    image.className = 'profile-post-image';
    card.append(image);
  }

  // Post content
  const content = document.createElement('div');
  content.className = 'profile-post-content';

  // Title
  const title = document.createElement('h3');
  title.className = 'profile-post-title';
  title.textContent = post.title || 'Untitled';

  // Body
  const body = document.createElement('p');
  body.className = 'profile-post-body';
  body.textContent = post.body ? post.body.slice(0, 120) + '...' : '';

  // Date
  const date = document.createElement('span');
  date.className = 'profile-post-date';
  date.textContent = formatDate(post.created);

  // Link to post
  const link = document.createElement('a');
  link.href = `/post/${post.id}`;
  link.className = 'profile-post-link';
  link.setAttribute('data-link', '');
  link.textContent = 'Read more >';

  content.append(title, body, date, link);
  card.append(content);

  return card;
}

/* DOM creation - error state */
function createErrorState() {
  const error = document.createElement('div');
  error.className = 'profile-error';

  const text = document.createElement('p');
  text.textContent = 'Could not load profile. User may not exist.';

  const link = document.createElement('a');
  link.href = '/';
  link.className = 'btn-secondary';
  link.setAttribute('data-link', '');
  link.textContent = 'Back to Feed';

  error.append(text, link);
  return error;
}

/* DOM manipulation */
/* Show/hide loading spinner */
function showLoading(isLoading) {
  const spinner = document.getElementById('profile-loading');
  const content = document.getElementById('profile-content');

  if (!spinner || !content) return;

  if (isLoading) {
    spinner.style.display = 'block';
    content.style.display = 'none';
  } else {
    spinner.style.display = 'none';
    content.style.display = 'block';
  }
}
/* Check if current user is following this profile */
function checkIfFollowing(profile) {
  const currentUser = getCurrentUserData();
  if (!currentUser || !currentUser.name) return false;

  // Check if current user is in the followers list
  return profile.followers?.some(follower => follower.name === currentUser.name) || false;
}

/* Display profile in DOM */
function displayProfile(profile) {
  const profileContent = document.getElementById('profile-content');
  if (!profileContent) return;

  // Clear existing content
  profileContent.innerHTML = '';

  // Check if this is own profile
  const currentUser = getCurrentUserData();
  const isOwnProfile = currentUser && currentUser.name === profile.name;

  // Check if following
  const isFollowing = checkIfFollowing(profile);

  // Create and append components
  const header = createProfileHeader(profile, isOwnProfile, isFollowing);
  profileContent.append(header);

  const stats = createStats(profile);
  profileContent.append(stats);

  const posts = createPostsSection(profile.posts);
  profileContent.append(posts);

  // Attach follow button handler
  if (!isOwnProfile) {
    attachFollowHandler(profile.name);
  }
}
/* Attach Follow/Unfollow button handler */
function attachFollowHandler(username) {
  const followBtn = document.getElementById('follow-btn');
  if (!followBtn) return;

  followBtn.addEventListener('click', async () => {
    const isFollowing = followBtn.getAttribute('data-following') === 'true';

    // Disable button during request
    followBtn.disabled = true;

    try {
      if (isFollowing) {
        // Unfollow
        await unfollowUser(username);
        
        // Update button
        followBtn.textContent = 'Follow';
        followBtn.className = 'btn-follow';
        followBtn.setAttribute('data-following', 'false');

        // Update followers count
        updateFollowersCount(-1);
      } else {
        // Follow
        await followUser(username);
        
        // Update button
        followBtn.textContent = 'Unfollow';
        followBtn.className = 'btn-unfollow';
        followBtn.setAttribute('data-following', 'true');

        // Update followers count
        updateFollowersCount(1);
      }
    } catch (error) {
      console.error('Follow/Unfollow error:', error);
      alert('Failed to update follow status. Please try again.');
    } finally {
      followBtn.disabled = false;
    }
  });
}

/* Update followers count */
function updateFollowersCount(delta) {
  const followersCountElement = document.getElementById('followers-count');
  if (!followersCountElement) return;

  const currentCount = parseInt(followersCountElement.textContent, 10);
  const newCount = currentCount + delta;
  followersCountElement.textContent = newCount;
}


/* Display error state */
function displayError() {
  const profileContent = document.getElementById('profile-content');
  if (!profileContent) return;

  profileContent.innerHTML = '';
  const error = createErrorState();
  profileContent.append(error);
}

/* Main logic */
async function loadProfile(username) {
  showLoading(true);

  try {
    const profile = await getProfile(username);
    displayProfile(profile);
  } catch (error) {
    console.error('Failed to load profile:', error);
    displayError();
  } finally {
    showLoading(false);
  }
}

/* Setup - called by router */
export async function setupProfile(username) {
  await loadProfile(username);
}