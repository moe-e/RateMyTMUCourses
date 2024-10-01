import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './components/Home/Home.jsx'
import Explore from './components/Explore/Explore.jsx'
import About from './components/About/About.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup/Signup.jsx'
import Course from './components/Course/Course.jsx'
import Profile from './components/Profile/Profile.jsx'
import './index.css'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/course/:number" element={<Course/>} />
    </Routes>
    </>
  )
}

export default App
