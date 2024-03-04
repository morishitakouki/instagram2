import axios from 'axios';
import { postsAPI } from '../urls/indexurl';

const fetchPosts = () => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');

  return axios.get(postsAPI, {
    headers: {
      'access-token': accessToken,
      'client': client,
      'uid': uid,
    },
  })
    .then(res => res.data)
    .catch(error => {
      if (error.response) {
        // レスポンスが返されたが、ステータスコードがエラー範囲外
        console.error('Error response:', error.response);
      } else if (error.request) {
        // レスポンスが返されなかった場合
        console.error('No response received:', error.request);
      } else {
        // リクエストを送信する前にエラーが発生した場合
        console.error('Error setting up the request:', error.message);
      }
      throw error; // エラーを再スローして呼び出し元で処理できるようにする
    });
};

export default fetchPosts;