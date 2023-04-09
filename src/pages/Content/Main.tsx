import React from 'react'
import '../../index.scss'
import Input from '../../components/Input/Input.component'
import ModalRegister from '../../components/Modal/ModalRegister'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/kaz.png'
import TelegramIcon from '@mui/icons-material/Telegram'

const main: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="content" id="section1">
        <div className="contentLeft">
          <h1 style={{ color: 'blue', marginBottom: 30 }}>
            Жаспын, жас та болсам баспын!
          </h1>
          <h3 style={{ marginBottom: 30 }}>{t('greeting')}</h3>
          <Input handleOpen={handleOpen} />
          {open && <ModalRegister handleClose={handleClose} open={open} />}
        </div>
        <img className="contentRight" src={img} alt="log" />
      </div>
      <div className="now">
        <div className="nowLeft">
          <h2 style={{ color: 'black' }}>{t('now')}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontSize: 20,
            }}
          >
            <div>{t('readMore')}</div>
            <div className="telegram">
              <button
                onClick={() => {
                  window.open('https://t.me/almaty_ustazy_support')
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  textDecoration: 'underline',
                }}
              >
                Almaty_ustazy
              </button>

              <TelegramIcon
                fontSize="large"
                style={{
                  color: '#3E58E8',
                }}
                onClick={() => {
                  window.open('https://t.me/almaty_ustazy_support')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default main
