import React from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Come from '../../Content/Come'
import Footer from '../../Content/Footer'
import Main from '../../Content/Main'
import Now from '../../Content/Now'
import Stages from '../../Content/Stages'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const All = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (isMobile) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <BrowserView>
        <HeaderComponent />
        <Main />
        <Stages />
        <Come />
        <Now />
        <Footer />
      </BrowserView>
    </div>
  )
}

export default All
