// apis/blogsAPI.js

import axios from 'axios';
import { postsAPI, bookmarksAPI, bookmarksListAPI } from '../urls/indexurl';

const getHeaders = () => {
  return {
    'access-token': localStorage.getItem('access-token'),
    'client': localStorage.getItem('client'),
    'uid': localStorage.getItem('uid'),
  };
};

const fetchPosts = async () => {
  try {
    const response = await axios.get(postsAPI, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deletePost = async (postId) => {
  const headers = getHeaders();

  try {
    const response = await axios.delete(`${postsAPI}/${postId}`, {
      headers,
    });

    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const createBookmark = async (postId) => {
  const headers = getHeaders();

  try {
    const response = await axios.post(bookmarksAPI(postId), {}, {
      headers,
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const deleteBookmark = async (postId) => {
  const headers = getHeaders();

  try {
    const response = await axios.delete(bookmarksAPI(postId), {
      headers,
    });

    if (response.status === 204) {
      return true;
    }
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const checkBookmarkStatus = async (postId) => {
  const headers = getHeaders();

  try {
    const response = await axios.get(bookmarksAPI(postId), {
      headers,
    });

    return response.data;
  } catch (error) {
    handleRequestError(error);
    throw error;
  }
};

const handleRequestError = (error) => {
  if (error.response) {
    console.error('Error response:', error.response);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up the request:', error.message);
  }
  throw error;
};

const fetchBookmarks = async () => {
  const headers = getHeaders();

  try {
    const response = await axios.get(bookmarksListAPI, {
      headers,
    });

    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

export { fetchPosts, deletePost, createBookmark, deleteBookmark, checkBookmarkStatus, fetchBookmarks };
