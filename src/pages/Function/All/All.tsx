import React from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Come from '../../Content/Come'
import Footer from '../../Content/Footer'
import Main from '../../Content/Main'
import Now from '../../Content/Now'
import Stages from '../../Content/Stages'
import { detect } from 'detect-browser'
const All: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const browser = detect()
    const isMobileDevice =
      browser && browser.os.toLowerCase().includes('mobile')

    if (isMobileDevice) {
      setIsMobile(true)
      return () =>
        alert(
          'Ноутбук арқылы қолданыңызды сұраймыз. Мобильді қолдануға қол жеткізбейміз.',
        )
    } else {
      setIsMobile(false)
    }
  }, [])
  console.log(isMobile)
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
      {isMobile == false && (
        <>
          <HeaderComponent scrollTo={scrollTo} />
          <Main />
          <Stages refStage={refStage} />
          <Come refParticipant={refParticipants} />
          <Now />
          <Footer />
        </>
      )}
    </div>
  )
}

export default All
