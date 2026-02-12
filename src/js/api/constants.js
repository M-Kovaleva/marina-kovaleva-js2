// Base API URL for Noroff API v2
export const API_BASE_URL = 'https://v2.api.noroff.dev';

// Authentication endpoints
export const API_AUTH_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_AUTH_LOGIN = `${API_BASE_URL}/auth/login`;
export const API_AUTH_KEY = `${API_BASE_URL}/auth/create-api-key`;

// Social endpoints - Posts
export const API_SOCIAL_POSTS = `${API_BASE_URL}/social/posts`;
export const API_SOCIAL_POST_SINGLE = (id) => `${API_BASE_URL}/social/posts/${id}`;
export const API_SOCIAL_POST_REACT = (id, emoji) => 
  `${API_BASE_URL}/social/posts/${id}/react/${encodeURIComponent(emoji)}`;
export const API_SOCIAL_POST_COMMENT = (id) => `${API_BASE_URL}/social/posts/${id}/comment`;
export const API_SOCIAL_POST_COMMENT_DELETE = (postId, commentId) => 
  `${API_BASE_URL}/social/posts/${postId}/comment/${commentId}`;
export const API_SOCIAL_POSTS_SEARCH = (query) => 
  `${API_BASE_URL}/social/posts/search?q=${encodeURIComponent(query)}`;
export const API_SOCIAL_POSTS_FOLLOWING = `${API_BASE_URL}/social/posts/following`;

// Social endpoints - Profiles
export const API_SOCIAL_PROFILES = `${API_BASE_URL}/social/profiles`;
export const API_SOCIAL_PROFILE_SINGLE = (name) => `${API_BASE_URL}/social/profiles/${name}`;
export const API_SOCIAL_PROFILE_POSTS = (name) => `${API_BASE_URL}/social/profiles/${name}/posts`;
export const API_SOCIAL_PROFILE_FOLLOW = (name) => `${API_BASE_URL}/social/profiles/${name}/follow`;
export const API_SOCIAL_PROFILE_UNFOLLOW = (name) => `${API_BASE_URL}/social/profiles/${name}/unfollow`;
export const API_SOCIAL_PROFILES_SEARCH = (query) => 
  `${API_BASE_URL}/social/profiles/search?q=${encodeURIComponent(query)}`;

export function buildQueryString(options = {}) {
  const params = new URLSearchParams();
  
  if (options._author) params.append('_author', 'true');
  if (options._comments) params.append('_comments', 'true');
  if (options._reactions) params.append('_reactions', 'true');
  if (options._following) params.append('_following', 'true');
  if (options._followers) params.append('_followers', 'true');
  if (options._posts) params.append('_posts', 'true');
  
  const query = params.toString();
  return query ? `?${query}` : '';
}