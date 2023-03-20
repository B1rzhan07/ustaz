import React from 'react'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
const Footer: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="footer">
        <div>
          <b>
            <p>{t('contact')}</p>
            <p></p>
          </b>
        </div>
        <div>
          <TelegramIcon />
          <FacebookIcon />
          <YouTubeIcon />
          <InstagramIcon />
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
