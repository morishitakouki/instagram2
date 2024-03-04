import React, { useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Register() {
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
    trigger(); // フォームのバリデーションをトリガー
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
        // レスポンスヘッダーから認証情報を取得
       
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
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className='mb-4'>新規登録</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
              <Form.Label>名前</Form.Label>
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
              <Form.Label>メールアドレス</Form.Label>
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
              <Form.Label>パスワード</Form.Label>
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
              <Form.Label>パスワード確認</Form.Label>
              <Form.Control
                type='password' 
                placeholder='パスワード 6文字以上）'
                {...register('password_confirmation', {
                  required: 'パスワードは必須です。',
                  minLength: { value: 6, message: '6文字以上で入力してください。' },
                  validate: (value) => value === getValues('password') || 'パスワードが一致しません。',
                })}
                id='passwordConfirmationInput'
              />
               {errors.password_confirmation && <p style={{ color: 'red', fontSize: '1.0em', marginTop: '5px' }}>{errors.password_confirmation.message}</p>}           
              </Form.Group>

            <Button variant='primary' type='submit' disabled={Object.keys(errors).length > 0}>
              アカウントを作成
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;