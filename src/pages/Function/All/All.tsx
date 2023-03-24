import React from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Come from '../../Content/Come'
import Footer from '../../Content/Footer'
import Main from '../../Content/Main'
import Now from '../../Content/Now'
import Stages from '../../Content/Stages'
import { BrowserView, MobileView } from 'react-device-detect'
const All: React.FC = () => {
  const refStage = React.useRef<HTMLInputElement>(null)
  const refParticipants = React.useRef<HTMLInputElement>(null)
  const scrollTo = (name: string) => {
    if (name === 'Байқау кезеңдері')
      refStage.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (name === 'Қатысушы болу')
      refParticipants.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
  }

  return (
    <div>
      <BrowserView>
        <HeaderComponent scrollTo={scrollTo} />
        <Main />
        <Stages refStage={refStage} refParticipant={refParticipants} />
        <Come />
        <Now />
        <Footer />
      </BrowserView>
      <MobileView>
        <div>
          Сіздің құрылғыңыздың браузері қолданбасындағы құралдарды қолдануға
          мүмкін емес. Қолданбасындағы құралдарды қолдануға үшін компьютердің
          браузерін қолданыңыз
        </div>
      </MobileView>
    </div>
  )
}

export default All
