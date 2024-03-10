import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { UserContext } from '../App'; 

const Header = () => {
  const { currentUser, setCurrentUser, setIsSignedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
  
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');

    setCurrentUser(null);
    setIsSignedIn(false);

    navigate('/');
    
  };

  return (
    <Navbar className="custom-navbar" variant="light">
      <Container className="justify-content-end">
        {currentUser && (
          <Navbar.Brand href="#home"> {currentUser.name}さん</Navbar.Brand>
        )}
        {currentUser && (
          <Button variant="outline-primary" onClick={handleLogout}>
            ログアウト
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;