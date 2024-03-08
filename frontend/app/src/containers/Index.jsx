// components/Index.js

import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import { fetchPosts, deletePost, createBookmark, deleteBookmark, checkBookmarkStatus } from '../apis/blogsAPI.js';
import '../App.css';

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error while fetching posts:", error));
  }, []);

// components/Index.js

// ... (前略)

useEffect(() => {
  const fetchBookmarkStatus = async () => {
    try {
      if (selectedPost) {
        // 404エラー時にも適切に処理されるように修正
        const data = await checkBookmarkStatus(selectedPost.id).catch((error) => {
          if (error.response && error.response.status === 404) {
            // エラーハンドリング (存在しない場合など)
            setIsBookmarked(false);
          } else {
            // その他のエラー
            console.error("Error checking bookmark status:", error);
          }
        });

        if (data) {
          setIsBookmarked(data.bookmarked);
        }
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  fetchBookmarkStatus();
}, [selectedPost]);

// ... (後略)


  const openModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowModal(false);
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
        console.error("Error handling post deletion:", error);
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

      // Update the bookmark status first
      setIsBookmarked(updatedIsBookmarked);

      // Fetch updated posts
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <Fragment>
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
          <Button variant="danger" onClick={handleDeletePost}>
            削除
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Index;
