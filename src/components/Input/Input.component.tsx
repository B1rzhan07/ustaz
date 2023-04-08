import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import ButtonComponent from '../Button/Button.component'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type Props = {
  handleOpen: () => void
}
export default function Input({ handleOpen }: Props) {
  const url = window.location.pathname

  const storedData = localStorage.getItem('data')
  const data = storedData ? JSON.parse(storedData) : null
  console.log(data, 'data')
  const data2 = JSON.parse(localStorage.getItem('register') || '{}')
  console.log(data2, 'data2')

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  console.log(data, 'data')
  return (
    <>
      <ButtonComponent
        word={url === '/' ? t('register') : url === '/profile' && t('nysan')}
        onClick={() => {
          if (
            (localStorage.getItem('user') &&
              data.category &&
              (data2?.team?.applicationFormURL === null ||
                data2?.team?.presentationURL === null)) ||
            data2.team.articleURL === null
          ) {
            handleOpen()
          } else if (localStorage.getItem('user') && data.category === null) {
            if (i18n.language == 'kz') {
              alert('Жеке кабинеттегі мәліметтерді толықтырыңыз')
            } else if (i18n.language == 'ru') {
              alert('Добавьте незаполненые данные в профиле')
            }
            navigate('/register')
          } else if (localStorage.getItem('user') === null) {
            window.location.href = '/login'
          }
          if (
            data2?.team?.applicationFormURL &&
            data2?.team?.presentationURL &&
            data2?.team?.articleURL
          ) {
            alert('Вы уже отправили заявку')
          }
        }}
      />
    </>
  )
}
