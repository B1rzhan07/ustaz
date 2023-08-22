import React from 'react'
import '../../index.scss'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/alma.jpg'
const Now: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1 style={{ marginLeft: 300, marginTop: 20 }}>{t('create')}</h1>
      <div className="almaty">
        <img
          style={{
            borderRadius: 50,
            marginLeft: 90,
          }}
          src={img}
          alt=""
          height={100}
          width={100}
        />

        <p>
          <b>{t('almaty')}</b>
        </p>
      </div>
    </div>
  )
}

export default Now
