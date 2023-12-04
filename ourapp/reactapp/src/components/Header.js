// Header.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import { Link } from 'react-router-dom';
import './Header.css'; // You can create a Header.css for styling your header

function Header() {
//   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    // localStorage.setItem()
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
      <div className="user-welcome">
        Welcome, {user?.name}
      </div>
      <div className="nav-right" style={{width:'170px'}}>
      <div style={{ marginTop: '10px' }}>
      <Link to="/ViewProfile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          style={{ width: '30px', height: '30px' }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        </Link>
      </div>
      <button onClick={handleLogout} className="logout-button"> 
        Logout
        </button>
        </div>
      </nav>
    </header>
    </div>
  );
  
}

export default Header;