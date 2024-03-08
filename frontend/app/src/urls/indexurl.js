// urls/indexurl.js

const DEFAULT_API_LOCALHOST = 'http://localhost:3001/api/v1';

const defaultApi = 'http://localhost:3001/api/v1';
const postsAPI = `${DEFAULT_API_LOCALHOST}/posts`;
const bookmarksAPI = (postId) => `${defaultApi}/posts/${postId}/bookmarks`;
const bookmarksListAPI = `${DEFAULT_API_LOCALHOST}/posts/bookmarks`;


export { defaultApi, postsAPI, bookmarksAPI, bookmarksListAPI };
