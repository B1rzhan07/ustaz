import React from 'react'
import '../../index.scss'
import Input from '../../components/Input/Input.component'
import ModalRegister from '../../components/Modal/ModalRegister'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/kaz.png'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const main: React.FC = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  console.log('main')
  React.useEffect(() => {
    console.log('useefeect')
  }, [])
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  return (
    <>
      <div className="content">
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
          <p>
            <Button
              sx={{
                backgroundColor: '#3E58E8',
                color: 'white',
                marginTop: 5,
                padding: 2,
                borderRadius: 5,
              }}
              onClick={() => {
                navigate('/policy')
              }}
              variant="contained"
            >
              Политика конфиденциальности и обработки персональных данных
            </Button>
          </p>
        </div>
      </div>
    </>
  )
}

export default main
