import React, { useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImgage from '../images/Logo.png'

function Register() {

  const StyledSidebarIcon = styled.div`
    margin-bottom: 30px; 
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const LogoImageStyled = styled.img`
    width: 190px; 
    height: auto;
  `;
  const NewRegister = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const StyledLoginButton = styled(Button)`
  width: 100%;
`;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '', 
    },
  });

  useEffect(() => {
    trigger(); 
  }, [trigger]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation, 
          confirm_success_url: 'http://localhost:3000',
        }),
      });
     
       
      if (response.ok) {
        navigate('/login'); 
      } else {
        console.error('認証エラー');
      }
    } catch (error) {
      console.error('新規登録中にエラーが発生しました:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <Row style={{ marginBottom: '0' }}> 
        <Col md={{ span: 6, offset: 3 }}>
          <div className="border p-4" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}> 
            <h2 className='mb-4'>
              <StyledSidebarIcon>
                <LogoImageStyled src={LogoImgage} alt="" /> 
              </StyledSidebarIcon>
              <NewRegister>新規登録</NewRegister>
            </h2>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '0' }}> {/* フォームの余白を削除 */}
              <Form.Group className='mb-3'>
                <Form.Control
                  type='name'
                  placeholder='名前（4文字以上）'
                  {...register('name', {
                    required: '名前は必須です。',
                    minLength: { value: 4, message: '4文字以上で入力してください。' },
                  })}
                />
                 {errors.name && <p style={{ color: 'red', fontSize: '1.0em', marginTop: '5px' }}>{errors.name.message}</p>}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='email'
                  placeholder='メールアドレス（4文字以上）'
                  {...register('email', {
                    required: 'メールアドレスは必須です。',
                    minLength: { value: 4, message: '4文字以上で入力してください。' },
                  })}
                />
                 {errors.email && <p style={{ color: 'red', fontSize: '1.0em', marginTop: '5px' }}>{errors.email.message}</p>}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='password'
                  placeholder='パスワード（6文字以上）'
                  {...register('password', {
                    required: 'パスワードは必須です。',
                    minLength: { value: 6, message: '6文字以上で入力してください。' },
                  })}
                  id='passwordInput'
                />
                 {errors.password && <p style={{ color: 'red', fontSize: '1.0em', marginTop: '5px' }}>{errors.password.message}</p>}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Control
                  type='password' 
                  placeholder='パスワード（6文字以上）'
                  {...register('password_confirmation', {
                    required: 'パスワードは必須です。',
                    minLength: { value: 6, message: '6文字以上で入力してください。' },
                    validate: (value) => value === getValues('password') || 'パスワードが一致しません。',
                  })}
                  id='passwordConfirmationInput'
                />
                 {errors.password_confirmation && <p style={{ color: 'red', fontSize: '1.0em', marginTop: '5px' }}>{errors.password_confirmation.message}</p>}           
              </Form.Group>

              <StyledLoginButton variant='primary' type='submit' block disabled={Object.keys(errors).length > 0}>
                アカウントを作成
              </StyledLoginButton>
              <hr style={{ marginTop: '20px', marginBottom: '20px' }} />
              <div className="text-center">
                <p>既にアカウントをお持ちですか？ <Button variant="link" onClick={() => navigate('/')}>ログイン</Button></p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
