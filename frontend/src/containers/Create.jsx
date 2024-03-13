import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { postsAPI } from '../urls/indexurl';
import '../App.css'; 
import { useLocation } from 'react-router-dom';

function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setShowMessage(true);

      const timer = setTimeout(() => {
        setShowMessage(false);
        setSuccessMessage('');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      setError('タイトルは必須です');
      return;
    }

    if (content.trim() === '') {
      setError('内容は必須です');
      return;
    }

    if (title.length > 100) {
      setError('タイトルは100文字以内で入力してください');
      return;
    }

    if (content.length > 1000) {
      setError('内容は1000文字以内で入力してください');
      return;
    }

    const formData = new FormData();
    formData.append('post[title]', title);
    formData.append('post[content]', content);
    if (image) {
      formData.append('post[image]', image);
    }

    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');

    axios.post(postsAPI, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      },
    })
      .then(() => {
        setSuccessMessage('投稿に成功しました');
        setShowMessage(true);
        setError('');
        setTitle('');
        setContent('');
        setImage(null);

        const timer = setTimeout(() => {
          setShowMessage(false);
          setSuccessMessage('');
        }, 3000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="background-image">
      <Container className="mt-5">
        {showMessage && (
          <Alert variant="success" className="animated-alert">
            {successMessage}
          </Alert>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div id="form-box">
              <h2 className="mb-4">投稿を作成</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="postTitle">
                  <Form.Label>タイトル</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="タイトルを入力"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postContent">
                  <Form.Label>内容</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="内容を入力"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postImage">
                  <Form.Label>画像</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  投稿
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Create;
