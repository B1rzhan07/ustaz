import React from 'react'
import '../../index.scss'
import Input from '../../components/Input/Input.component'
import CheckBox from '../../components/CheckBox/CheckBox.component'
import { useTranslation } from 'react-i18next'
import img from '../../../public/Img/alma.jpg'
const Now: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="now">
        <div className="nowLeft">
          <h1>{t('now')}</h1>
          <p>{t('fast')}</p>
        </div>
      </div>
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
        <b>
          <p>{t('almaty')}</p>
        </b>
      </div>
    </>
  )
}

export default Now
