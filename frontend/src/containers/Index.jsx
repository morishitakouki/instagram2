import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import { fetchPosts, deletePost, createBookmark, deleteBookmark, checkBookmarkStatus, updatePost } from '../apis/blogsAPI.js';
import '../App.css';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [errorEditing, setErrorEditing] = useState(false);
  const [successEditing, setSuccessEditing] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error("投稿の取得エラー:", error));
  }, []);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        if (selectedPost) {
          const data = await checkBookmarkStatus(selectedPost.id).catch((error) => {
            if (error.response && error.response.status === 404) {
              setIsBookmarked(false);
            } else {
              console.error("ブックマーク状態の確認エラー:", error);
            }
          });
          if (data) {
            setIsBookmarked(data.bookmarked);
          }
        }
      } catch (error) {
        console.error("ブックマーク状態の確認エラー:", error);
      }
    };
    fetchBookmarkStatus();
  }, [selectedPost]);

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  const openEditModal = () => {
    const postId = selectedPost.id;
    setPostData({
      title: selectedPost.title,
      content: selectedPost.content,
    });
    setShowEditModal(true);
    setEditingPostId(postId);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setErrorEditing(false);
    setSuccessEditing(false);
  };

  const handleEditPost = async () => {
    closeModal();
    openEditModal();
  };

  const handleDeletePost = async () => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        const isDeleted = await deletePost(selectedPost.id);

        if (isDeleted) {
          closeModal();

          const updatedPosts = await fetchPosts();
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error("投稿の削除エラー:", error);
      }
    }
  };

  const handleToggleBookmark = async () => {
    try {
      let updatedIsBookmarked;

      if (isBookmarked) {
        await deleteBookmark(selectedPost.id);
        updatedIsBookmarked = false;
      } else {
        await createBookmark(selectedPost.id);
        updatedIsBookmarked = true;
      }

      setIsBookmarked(updatedIsBookmarked);

      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("ブックマークの切り替えエラー:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost(editingPostId, postData);

      closeEditModal();

      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
      setSuccessEditing(true);

      setErrorEditing(false);

      setTimeout(() => setSuccessEditing(false), 3000);
    } catch (error) {
      console.error("投稿の更新エラー:", error);
      setErrorEditing(true);

      setSuccessEditing(false);
    }
  };

  return (
    <Fragment>
      {successEditing && <Alert variant="success">編集に成功しました。</Alert>}
      {posts.length === 0 && (
        <div className="empty-posts-message">
          <h3>投稿がありません(´･_･`)</h3>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {posts.map((post) => (
          <Col key={post.id}>
            <Card style={{ width: '18rem', margin: '10px', cursor: 'pointer' }} onClick={() => openModal(post)}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Img variant="top" src={post.image.url} alt="Post Image" style={{ maxHeight: '100%', objectFit: 'cover' }} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img src={selectedPost?.image.url} alt="Post Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Col>
            <Col md={6}>
              {selectedPost?.content}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={isBookmarked ? "success" : "primary"} onClick={handleToggleBookmark}>
            {isBookmarked ? "ブックマーク解除" : "ブックマーク"}
          </Button>
          <Button variant="primary" onClick={handleEditPost}>
            編集
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            削除
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={closeEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>投稿を編集する</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorEditing && <Alert variant="danger">タイトルとコンテントは両方入力してください。</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={postData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                name="content"
                value={postData.content}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              投稿をアップデート
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Index;
