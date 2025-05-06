import React from 'react';
import { Link, useNavigate } from 'react-router';


export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <div>Image Generation</div>
      <div>
        <Link to="/generate" >Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/explore">Explore</Link>
        <button onClick={handleLogout} >Logout</button>
      </div>
    </nav>
  );
}


