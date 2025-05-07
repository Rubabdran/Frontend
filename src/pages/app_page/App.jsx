//------------ import --------------//

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

//-------------import pages---------//

import LoginPage from '../login_page/LoginPage';
import SignupPage from '../signup_page/SignupPage';
import GenerateImage from '../generate_page/GenerateImage';
import FavoritesPage from '../fav_page/Favorites';
import ExplorePage from '../explore_page/Explore';
import Navbar from '../../components/NavBar';
import * as usersAPI from '../../utilities/api';

//----------------functions--------------//

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await usersAPI.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.log("Error getting user:", err);
      }
    };
    getUser();
  }, []);

 //--------------------layout--------------//
 
  return (
    <div className="app">
      {user && <Navbar setUser={setUser} user={user} />}
      <div className="content">
        <Routes>
          <Route path="/generate" element={<GenerateImage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/" element={<Navigate to="/generate" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
