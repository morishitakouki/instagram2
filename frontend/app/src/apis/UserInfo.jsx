import axios from 'axios';

const getCurrentUser = async () => {
 
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');


  if (!accessToken || !client || !uid) {
    console.log('One or more required items are missing from local storage.');
    return;
  }

  try {
    const response = await axios.get(
      'http://localhost:3001/api/v1/auth/sessions',
      {
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          client: client,
          uid: uid,
        },
      }
    );
    console.log(response);
    return response.data; 
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error; 
  }
};

export default getCurrentUser;