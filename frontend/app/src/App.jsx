import React, { createContext, useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import './App.css';
import Create from './containers/Create.jsx';
import Index from './containers/Index.jsx';
import Register from './containers/Register.jsx';
import Header from './components/Header.jsx';
import getCurrentUser from './apis/UserInfo.jsx';
import Login from './containers/Login.jsx';

export const UserContext = createContext();

const AppRoutes = () => {
  const { isSignedIn } = useContext(UserContext);

  return (
    <Routes>
      {isSignedIn ? (
        <>
          <Route path="/create" element={<Create />} />
          <Route path="/index" element={<Index />} />
        </>
      ) : (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      console.log(res);

      if (res?.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data);
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      <div className="App">
        <Router>
          <div className="sidebar">
            {isSignedIn && <Sidebar />}
          </div>
          <div className="content">
            {isSignedIn && <Header />}
            <AppRoutes />
          </div>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;