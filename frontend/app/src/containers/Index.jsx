import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Card } from 'react-bootstrap';

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
      {posts.map((post) => (
        <Card key={post.id} style={{ width: '18rem', margin: '10px', cursor: 'pointer' }} onClick={() => openModal(post)}>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost?.content}
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