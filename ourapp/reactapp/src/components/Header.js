// Header.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import './Header.css'; // You can create a Header.css for styling your header

function Header() {
//   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null); 
    navigate('/'); 
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]); 
  


  return (
    <div className="head-container">
    <header>
      <nav className="nav">
      <div class = "user-welcome">
        Welcome, {user?.name}
      </div>
      <button onClick={handleLogout} className="logout-button"> 
        Logout
        </button>
      </nav>
    </header>
    </div>
  );
}

export default Header;
