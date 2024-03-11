import React, { useContext, useState } from 'react';
import { Navbar, Container, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { UserContext } from '../App'; 

const Header = () => {
  const { currentUser, setCurrentUser, setIsSignedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');

    setCurrentUser(null);
    setIsSignedIn(false);

    navigate('/');
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  const handleShowModal = () => {
    setShowLogoutModal(true);
  };

  return (
    <Navbar className="custom-navbar" variant="light">
      <Container className="justify-content-end">
        {currentUser && (
          <Navbar.Brand href="#home"> {currentUser.name}さん</Navbar.Brand>
        )}
        {currentUser && (
          <Button variant="danger" onClick={handleShowModal}>
            ログアウト
          </Button>
        )}
      </Container>

      <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
       
   
        <Modal.Body>ログアウトしますか？</Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={handleCloseModal} style={{ width: "45%" }}>
            キャンセル
          </Button>
          <Button variant="danger" onClick={handleLogout} style={{ width: "45%" }}>
            ログアウト
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
