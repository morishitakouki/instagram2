import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import getCurrentUser from '../apis/UserInfo';
import { UserContext } from "../App";
import { useNavigate } from 'react-router-dom';
import '../App.css';  // 新しいCSSファイルを作成

const Login = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');


  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/auth/sign_in',
        {
          email: email,
          password: password,
        }
      );

      const authToken = response.headers['access-token'];
      const client = response.headers['client'];
      const uid = response.headers['uid'];
      
      localStorage.setItem('access-token', authToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

      setIsSignedIn(true);
      setCurrentUser(response.data);
      console.log(response)
      // ログイン成功時に/createにリダイレクト
      navigate('/create', { state: { successMessage: `ようこそ ${response.data.data.name} さん！`  } });
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('ログインできませんでした。');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">ログイン</h2>
      {loginMessage && <Alert variant={loginMessage.includes('成功') ? 'success' : 'danger'}>{loginMessage}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          ログイン
        </Button>
      </Form>
    </div>
  );
};

export default Login;