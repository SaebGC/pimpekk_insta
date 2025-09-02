import './App.css';
import React from 'react';
import LeftSide from './components/LeftSide';
import MiddleSide from './components/MiddleSide';
import RightSide from './components/RightSide';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './components/CreatePost';
import Profile from './pages/Profile';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>

      <div className='leftSideHome'>
        <Login />
        <LeftSide />
      </div>
      <div className='login'>
      </div>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <div className='middleSide'>
                <MiddleSide />
              </div>

              <div className='rightSide'>
                <RightSide />
              </div>
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <div className='middleSide'>
                <MiddleSide />
              </div>
              <div className='rightSide'>
                <RightSide />
              </div>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/crear" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </div>
  );
}

export default App;
