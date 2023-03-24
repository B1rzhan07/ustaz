import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Function/Login/Login'
import All from '../pages/Function/All/All'
import Profile from '../pages/Function/Profile/Profile'
import Register from '../pages/Function/Register/Register'
import { useTranslation } from 'react-i18next'
import { SelectChangeEvent } from '@mui/material'
import News from '../pages/Function/News/News'

function RoutesComponent() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<All />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
