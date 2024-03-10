import React, { useContext, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../images/Logo.png';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const LeftContent = styled.div`
  flex: 0.45;
  text-align: left;
`;

const RightContentBox = styled.div`
  flex: 0.35;
  padding: 20px;
  margin-right: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const RightContent = styled.div`
  text-align: center;
`;

const LoginHeading = styled.h2`
  margin-bottom: 20px;
`;

const StyledSidebarIcon = styled.div`
  margin-bottom: 90px;

  img.icon-size {
    width: 250px;
    height: auto;
  }
`;

const RegisterButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledLoginButton = styled(Button)`
  width: 100%;
`;

const Login = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/auth/sign_in', {
        email: email,
        password: password,
      });
      const authToken = response.headers['access-token'];
      const client = response.headers['client'];
      const uid = response.headers['uid'];
      localStorage.setItem('access-token', authToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);
      setIsSignedIn(true);
      setCurrentUser(response.data);
      navigate('/create', { state: { successMessage: `ようこそ ${response.data.data.name} さん！` } });
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('ログインできませんでした。');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Container>
      <LeftContent>
        <h1>
          <StyledSidebarIcon>
            <img src={Logo} alt="" className="icon-size" />
          </StyledSidebarIcon>
        </h1>
        <h4>Isostagramを使うと、友達や同僚、同級生、仲間たちとつながりを深められます。ケータイ、スマートフォンからもアクセスできます。</h4>
      </LeftContent>
      <RightContentBox>
        <RightContent>
          <LoginHeading>ログイン</LoginHeading>
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

            <StyledLoginButton variant="primary" type="submit">
              ログイン
            </StyledLoginButton>
          </Form>
          <Divider />
          <p>アカウントを作成しますか？</p>
          <RegisterButton variant="success" onClick={handleRegister}>
            新規登録
          </RegisterButton>
        </RightContent>
      </RightContentBox>
    </Container>
  );
};

export default Login;
