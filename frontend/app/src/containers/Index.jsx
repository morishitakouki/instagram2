import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import fetchPosts from '../apis/blogsAPI.js';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  return (
    <Fragment>
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
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Index;
