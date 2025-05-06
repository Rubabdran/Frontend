
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import { useState, useEffect } from 'react';

import LoginPage from '../login_page/LoginPage';
import SignupPage from '../signup_page/SignupPage';
import GenerateImage from '../generate_page/GenerateImage';
import FavoritesPage from '../fav_page/Favorites';
import ExplorePage from '../explore_page/Explore';


function App() {
  const [user, setUser] = useState(null);
  return (
      <div>
        <Routes>
          <Route path="/generate" element={<GenerateImage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/login" element= {<LoginPage user={user} setUser={setUser} /> }/>
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        </Routes>
      </div>
  );
}

export default App;
