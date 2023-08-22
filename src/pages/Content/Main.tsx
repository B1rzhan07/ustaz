import React from 'react'
import '../../index.scss'
import Input from '../../components/Input/Input.component'
import ModalRegister from '../../components/Modal/ModalRegister'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/kaz.png'
import TelegramIcon from '@mui/icons-material/Telegram'
import { Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const main: React.FC = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()
  return (
    <Paper elevation={0}>
      <StyledTypography
        sx={{
          margin: '0 50px',
          flexDirection: 'row',
        }}
      >
        <StyledTypography
          className="main"
          sx={{
            flexDirection: 'column',
            width: '50%',
            ['@media (max-width: 960px)']: {
              width: '100%',
            },
          }}
        >
          <h1 style={{ color: 'blue', marginBottom: 30, textAlign: 'center' }}>
            Жаспын, жас та болсам баспын!
          </h1>
          <h3 style={{ marginBottom: 30, textAlign: 'center' }}>
            {t('greeting')}
          </h3>
          <Input handleOpen={handleOpen} />
          {open && <ModalRegister handleClose={handleClose} open={open} />}
        </StyledTypography>
        <img
          style={{
            width: '50%',
            height: '50%',
            marginLeft: 50,
          }}
          src={img}
          alt="log"
        />
      </StyledTypography>
      <div className="now">
        <div className="nowLeft">
          <h2
            style={{
              color: 'black',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            {t('now')}
          </h2>
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

          <Button
            sx={{
              marginTop: 5,
              padding: 1.5,
              borderRadius: 1,
            }}
            onClick={() => {
              navigate('/policy')
            }}
            variant="contained"
            color="success"
          >
            Политика конфиденциальности и обработки персональных данных
          </Button>
        </div>
      </div>
    </Paper>
  )
}

export default main
