import React from 'react';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center mb-4">
      <div className="text-xl font-bold text-blue-600">🎨 مولد الصور</div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">الرئيسية</Link>
        <Link to="/my-images" className="text-gray-700 hover:text-blue-600">صوري</Link>
        <Link to="/favorites" className="text-gray-700 hover:text-blue-600">المفضلة</Link>
        <Link to="/explore" className="text-gray-700 hover:text-blue-600">استكشاف</Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline ml-4">تسجيل الخروج</button>
      </div>
    </nav>
  );
}
