import React from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Come from '../../Content/Come'
import Footer from '../../Content/Footer'
import Main from '../../Content/Main'
import Now from '../../Content/Now'
import Stages from '../../Content/Stages'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

const All = () => {
  const { t } = useTranslation()
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
      <MobileView>
        <h3>{t('support')}</h3>
      </MobileView>
    </div>
  )
}

export default All
