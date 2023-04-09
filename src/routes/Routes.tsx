import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Function/Login/Login'
import All from '../pages/Function/All/All'
import Profile from '../pages/Function/Profile/Profile'
import Register from '../pages/Function/Register/Register'

import News from '../pages/Function/News/News'
import PersonalSec from '../pages/Personal/Sec/PersonalSec'
import PersonalCom from '../pages/Personal/Com/PersonalCom'
import PasswordReset from './PasswordReset'
import More from '../pages/Personal/Sec/More'
import HorizontalLinearStepper from '../components/Modal/Stepper'

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
        <Route path="/password_reset" element={<PasswordReset />} />
        <Route path={`/moresec/:id`} element={<More />} />
        <Route path={`/stepper`} element={<HorizontalLinearStepper />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
