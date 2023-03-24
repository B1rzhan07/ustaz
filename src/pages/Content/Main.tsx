import React from 'react'
import '../../index.scss'
import Input from '../../components/Input/Input.component'
import ModalRegister from '../../components/Modal/ModalRegister'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/kaz.png'
const main: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t, i18n } = useTranslation()
  return (
    <div className="content" id="section1">
      <div className="contentLeft">
        <h3>{t('greeting')}</h3>
        <h1 style={{ marginTop: 25, color: 'blue', marginBottom: 40 }}>
          Жаспын, жас та болсам баспын!
        </h1>
        <Input handleOpen={handleOpen} />
        {open && <ModalRegister handleClose={handleClose} open={open} />}
      </div>
      <img className="contentRight" src={img} alt="log" />
    </div>
  )
}

export default main
