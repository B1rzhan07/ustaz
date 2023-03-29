import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Function/Login/Login'
import All from '../pages/Function/All/All'
import Profile from '../pages/Function/Profile/Profile'
import Register from '../pages/Function/Register/Register'

import News from '../pages/Function/News/News'
import PersonalSec from '../pages/Personal/Sec/PersonalSec'
import PersonalCom from '../pages/Personal/Com/PersonalCom'

function RoutesComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/sec" element={<PersonalSec />} />
        <Route path="/com" element={<PersonalCom />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
