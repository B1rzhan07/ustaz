import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../pages/Function/Login/Login'
import Profile from '../pages/Function/Profile/Profile'
import Register from '../pages/Function/Register/Register'

import PersonalSec from '../pages/Personal/Sec/PersonalSec'
import PersonalCom from '../pages/Personal/Com/PersonalCom'
import PasswordReset from './PasswordReset'
import More from '../pages/Personal/Sec/More'
import HorizontalLinearStepper from '../components/Modal/Stepper'
import BasicModal from '../pages/Personal/Com/modalCom'
import All from '..//pages/Function/All/All'
import News from '..//pages/Function/News/News'
import ProfileGrades from '../pages/Function/Profile/ProfileGrades'
import Policy from '../pages/Policy/Policy'
import { Page404 } from '../widgets/ErrorPage/ui/Page404'

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<All />} />
      <Route path="/login" element={<Login />} key="login" />
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
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default RoutesComponent
