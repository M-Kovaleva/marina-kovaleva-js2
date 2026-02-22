/* Profile Handler - loads and displays user profile with all posts */
import { get, del } from "../api/apiClient.js";
import { followUser, unfollowUser } from "../api/apiClient.js";
import { getCurrentUserData } from "../auth/storage.js";
import { createPostCard } from "../components/PostCard.js";
import { navigateTo } from "../router/router.js";
import {
  toggleLoading,
  confirmAction,
  showAlert,
  createAvatar,
} from "../utils/ui.js";

/**
 * Fetch user profile with posts and followers
 * @param {string} username - Username to fetch
 * @returns {Promise<Object>} Profile data with posts
 */
async function getProfile(username) {
  const params = new URLSearchParams({
    _posts: "true",
    _followers: "true",
    _following: "true",
    _media: "true",
  });

  const result = await get(`/social/profiles/${username}?${params}`);
  return result.data;
}
/* DOM creation - profile components */
/* Create profile header with info */
function createProfileHeader(profile, isOwnProfile, isFollowing) {
  const header = document.createElement("div");
  header.className = "profile-header";

  // Avatar
  const avatar = createAvatar(
    profile.avatar?.url,
    profile.name,
    "profile-avatar",
    "large",
  );
  header.append(avatar);

  // User info
  const userInfo = document.createElement("div");
  userInfo.className = "profile-user-info-container";

  // Name
  const name = document.createElement("h1");
  name.className = "profile-name";
  name.textContent = profile.name;

  // Email
  if (profile.email) {
    const email = document.createElement("p");
    email.className = "profile-email";
    email.textContent = profile.email;
    userInfo.append(name, email);
  } else {
    userInfo.append(name);
  }

  const userInfoContainer = document.createElement("div");
  userInfoContainer.className = "profile-user-info-container";
  userInfoContainer.append(userInfo);

  // Follow/Unfollow button - if not own profile
  if (!isOwnProfile) {
    const followBtn = document.createElement("button");
    followBtn.className = isFollowing ? "btn-unfollow" : "btn-follow";
    followBtn.id = "follow-btn";
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
    followBtn.setAttribute("data-username", profile.name);
    followBtn.setAttribute("data-following", isFollowing);
    userInfoContainer.append(followBtn);
  }

  header.append(userInfoContainer);
  return header;
}

/* Create stats section: nuber of posts, followers, following */
function createStats(profile) {
  const stats = document.createElement("div");
  stats.className = "profile-stats";

  // Posts count
  const postsCount = document.createElement("div");
  postsCount.className = "profile-stat";
  const postsNumber = document.createElement("span");
  postsNumber.className = "profile-stat-number";
  postsNumber.id = "posts-count";
  postsNumber.textContent = profile._count?.posts || 0;
  const postsLabel = document.createElement("span");
  postsLabel.className = "profile-stat-label";
  postsLabel.textContent = "Posts";
  postsCount.append(postsNumber, postsLabel);

  // Followers count
  const followersCount = document.createElement("div");
  followersCount.className = "profile-stat";
  const followersNumber = document.createElement("span");
  followersNumber.className = "profile-stat-number";
  followersNumber.id = "followers-count";
  followersNumber.textContent = profile._count?.followers || 0;
  const followersLabel = document.createElement("span");
  followersLabel.className = "profile-stat-label";
  followersLabel.textContent = "Followers";
  followersCount.append(followersNumber, followersLabel);

  // Following count
  const followingCount = document.createElement("div");
  followingCount.className = "profile-stat";
  const followingNumber = document.createElement("span");
  followingNumber.className = "profile-stat-number";
  followingNumber.textContent = profile._count?.following || 0;
  const followingLabel = document.createElement("span");
  followingLabel.className = "profile-stat-label";
  followingLabel.textContent = "Following";
  followingCount.append(followingNumber, followingLabel);

  stats.append(postsCount, followersCount, followingCount);
  return stats;
}

/* Create posts section */
function createPostsSection(posts, isOwnProfile) {
  const section = document.createElement("div");
  section.className = "profile-posts";

  const heading = document.createElement("h2");
  heading.textContent = "Posts";
  section.append(heading);

  const postsList = document.createElement("div");
  postsList.className = "profile-posts-list";
  postsList.id = "profile-posts-list";

  if (!posts || posts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "profile-posts-empty";
    empty.textContent = "No posts yet.";
    postsList.append(empty);
  } else {
    posts.forEach((post) => {
      const postCard = createPostCard(post, {
        variant: "profile",
        showAuthor: false,
        showActions: isOwnProfile,
        onEdit: handleEdit,
        onDelete: handleDelete,
      });

      postsList.append(postCard);
    });
  }

  section.append(postsList);
  return section;
}

/* DOM creation - error state */
function createErrorState() {
  const error = document.createElement("div");
  error.className = "profile-error";

  const text = document.createElement("p");
  text.textContent = "Could not load profile. User may not exist.";

  const link = document.createElement("a");
  link.href = "/";
  link.className = "btn-secondary";
  link.setAttribute("data-link", "");
  link.textContent = "Back to Feed";

  error.append(text, link);
  return error;
}

/* DOM manipulation */
/* Check if current user is following this profile */
function checkIfFollowing(profile) {
  const currentUser = getCurrentUserData();
  if (!currentUser || !currentUser.name) return false;

  // Check if current user is in the followers list
  return (
    profile.followers?.some((follower) => follower.name === currentUser.name) ||
    false
  );
}

/* Display profile in DOM */
function displayProfile(profile) {
  const profileContent = document.getElementById("profile-content");
  if (!profileContent) return;

  // Clear existing content
  profileContent.innerHTML = "";

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

  const posts = createPostsSection(profile.posts, isOwnProfile);
  profileContent.append(posts);

  // Attach follow button handler
  if (!isOwnProfile) {
    attachFollowHandler(profile.name);
  }
}
/* Attach Follow/Unfollow button handler */
function attachFollowHandler(username) {
  const followBtn = document.getElementById("follow-btn");
  if (!followBtn) return;

  followBtn.addEventListener("click", async () => {
    const isFollowing = followBtn.getAttribute("data-following") === "true";

    // Disable button during request
    followBtn.disabled = true;

    try {
      if (isFollowing) {
        // Unfollow
        await unfollowUser(username);

        // Update button
        followBtn.textContent = "Follow";
        followBtn.className = "btn-follow";
        followBtn.setAttribute("data-following", "false");

        // Update followers count
        updateFollowersCount(-1);
      } else {
        // Follow
        await followUser(username);

        // Update button
        followBtn.textContent = "Unfollow";
        followBtn.className = "btn-unfollow";
        followBtn.setAttribute("data-following", "true");

        // Update followers count
        updateFollowersCount(1);
      }
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      showAlert("Failed to update follow status. Please try again.");
    } finally {
      followBtn.disabled = false;
    }
  });
}

/* Update followers count */
function updateFollowersCount(delta) {
  const followersCountElement = document.getElementById("followers-count");
  if (!followersCountElement) return;

  const currentCount = parseInt(followersCountElement.textContent, 10);
  const newCount = currentCount + delta;
  followersCountElement.textContent = newCount;
}

/* Update posts count */
function updatePostsCount(delta) {
  const postsCountElement = document.getElementById("posts-count");
  if (!postsCountElement) return;

  const currentCount = parseInt(postsCountElement.textContent, 10);
  const newCount = Math.max(0, currentCount + delta); // Не меньше 0
  postsCountElement.textContent = newCount;
}

/* Event handlers Edit/Delet */

// Edit handler - redirect to create post
function handleEdit(postId) {
  navigateTo(`/create?id=${postId}`);
}

// Delete handler
async function handleDelete(postId) {
  if (!confirmAction("Are you sure you want to delete this post?")) return;

  try {
    // delete post
    await del(`/social/posts/${postId}`);

    // delete post card from DOM
    const postCard = document
      .querySelector(`[data-post-id="${postId}"]`)
      ?.closest(".post-card");
    if (postCard) {
      postCard.remove();
    }

    updatePostsCount(-1);

    showAlert("Post deleted successfully!");
  } catch (error) {
    console.error("Failed to delete post:", error);
    showAlert("Failed to delete post. Please try again.");
  }
}

/* Display error state */
function displayError() {
  const profileContent = document.getElementById("profile-content");
  if (!profileContent) return;

  profileContent.innerHTML = "";
  const error = createErrorState();
  profileContent.append(error);
}

/* Main logic */
async function loadProfile(username) {
  toggleLoading("profile-loading", "profile-content", true);

  try {
    const profile = await getProfile(username);
    displayProfile(profile);
  } catch (error) {
    console.error("Failed to load profile:", error);
    displayError();
  } finally {
    toggleLoading("profile-loading", "profile-content", false);
  }
}

/**
 * Setup profile page - called by router
 * @param {string} username - Username to display
 * @returns {Promise<void>}
 */
export async function setupProfile(username) {
  await loadProfile(username);
}
