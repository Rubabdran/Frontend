import React from 'react';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      <div className="text-2xl font-bold text-blue-600">Image Generation</div>
      <div className="space-x-6">
        <Link to="/generate" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/favorites" className="text-gray-700 hover:text-blue-600 font-medium">Favorites</Link>
        <Link to="/explore" className="text-gray-700 hover:text-blue-600 font-medium">Explore</Link>
        <button onClick={handleLogout} className="text-red-600 hover:underline font-medium">Logout</button>
      </div>
    </nav>
  );
}



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// // import "./navbar.css"

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="topBar">
//         <h1>🎨 image generation</h1>
//         <i
//           className={`uil toggle ${menuOpen ? 'uil-multiply' : 'uil-bars'}`}
//           onClick={toggleMenu}
//         ></i>
//       </div>
//       <ul className={`navMenu ${menuOpen ? 'block' : 'hidden md:flex'}`}>
//         <li><Link to="/generate">Home</Link></li>
//         <li><Link to="/favorites">Fav</Link></li>
//         <li><Link to="/explore">Explore</Link></li>
//         <li><button onClick={handleLogout}>Logout</button></li>
//       </ul>
//     </nav>
//   );
// }
