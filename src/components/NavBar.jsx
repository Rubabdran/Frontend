// import React from 'react';
// import { Link, useNavigate } from 'react-router';
// import './nav.css'


// export default function Navbar({setUser}) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null)
//     navigate('/login');
//   };

//   return (
//     <nav id='nav'>
//       <div>Image Generation</div>
//       <div id='links'>
//         <Link to="/generate" >Home</Link>
//         <Link to="/favorites">Favorites</Link>
//         <Link to="/explore">Explore</Link>
//         <button onClick={handleLogout} >Logout</button>
//       </div>
//     </nav>
//   );
// }

import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FaHome, FaHeart, FaCompass, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './nav.css';

export default function Navbar({ setUser, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/generate" className="brand-link">
          <span className="brand-icon">🎨</span>
          <span className="brand-text">Genibot</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/generate" className="nav-link">
          <FaHome className="nav-icon" />
          <span>Home</span>
        </Link>
        <Link to="/favorites" className="nav-link">
          <FaHeart className="nav-icon" />
          <span>Favorites</span>
        </Link>
        <Link to="/explore" className="nav-link">
          <FaCompass className="nav-icon" />
          <span>Explore</span>
        </Link>
      </div>

      <div className="navbar-user">
        <div className="user-info">
          <FaUser className="user-icon" />
          <span className="username">{user?.username || 'User'}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}



