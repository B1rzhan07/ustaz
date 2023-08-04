import React, { Suspense } from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Come from '../../Content/Come'
import Footer from '../../Content/Footer'
import Now from '../../Content/Now'
import Stages from '../../Content/Stages'
import { BrowserView, MobileView, isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

const OtherComponent = React.lazy(() => import('../../Content/Main'))

type Props = {
  ref: any
}

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
        <Suspense fallback={<div>Loading...</div>}>
          <OtherComponent />
        </Suspense>
        <Stages />
        <Come />
        <Now />
        <Footer />
      </BrowserView>
    </div>
  )
}

export default All
