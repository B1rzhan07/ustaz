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
import BasicModal from '../pages/Personal/Com/modalCom'
import ProfileGrades from '../pages/Function/Profile/ProfileGrades'

function RoutesComponent() {
  const ref = React.useRef(null)
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
        <Route path={`/moreSec/:id`} element={<More />} />
        <Route path={`/stepper`} element={<HorizontalLinearStepper />} />
        <Route path={`com/moreCom/:id`} element={<BasicModal />} />
        <Route path={`profile/total/:id`} element={<ProfileGrades />} />
      </Routes>
    </div>
  )
}

export default RoutesComponent
