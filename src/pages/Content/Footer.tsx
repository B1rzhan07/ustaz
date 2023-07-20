import React from 'react'
import TelegramIcon from '@mui/icons-material/Telegram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import '../../index.scss'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
const Footer: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div>
      <div className="footer">
        <div>
          <b>
            <h2>{t('contact')}</h2>
            <p
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: 20,
              }}
            >
              {t('readMore')}
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
                https://t.me/almaty_ustazy_support
              </button>
            </p>
          </b>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TelegramIcon
            fontSize="large"
            className="telegram"
            onClick={() => {
              window.open('https://t.me/almaty_ustazy_support')
            }}
          />
          <YouTubeIcon
            className="telegram"
            fontSize="large"
            onClick={() => {
              window.open('https://www.youtube.com/@almatyustazy594')
            }}
          />
        </div>
      </div>
      <Divider light />
      <div className="divider">
        © 2023, Almaty Ustazy. Барлық құқықтар сақталған.
      </div>
    </div>
  )
}

export default Footer
