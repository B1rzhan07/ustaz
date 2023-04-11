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
  console.log('local', localStorage.getItem('user'))

  return (
    <>
      <ButtonComponent
        word={url === '/' ? t('register') : url === '/profile' && t('nysan')}
        onClick={() => {
          if (url === '/profile' && data?.group) {
            navigate('/stepper')
          } else if (url === '/profile' && !data.group) {
            navigate('/register')
            if (i18n.language == 'kz') {
              alert('Жеке кабинеттегі мәліметтерді толықтырыңыз')
            } else if (i18n.language == 'ru') {
              alert('Добавьте незаполненые данные в профиле')
            }
          }
          if (
            url === '/' &&
            data?.group &&
            localStorage.getItem('user') &&
            !data2?.team?.applicationFormURL
          ) {
            handleOpen()
          } else if (
            url === '/' &&
            data?.group &&
            localStorage.getItem('user') &&
            data2?.team?.applicationFormURL &&
            data2?.team.presentationURL === null &&
            data2?.team.articleURL === null
          ) {
            if (i18n.language == 'kz') {
              alert(
                'Өтінімді жүктегенсіз, презентация және мақала жүктеуіңіз керек',
              )
              navigate('/stepper')
            } else if (i18n.language == 'ru') {
              alert(
                'Вы уже загрузили форму, необходимо загрузить презентацию и статью',
              )
              navigate('/stepper')
            }
          } else if (
            url === '/' &&
            data?.group &&
            localStorage.getItem('user') &&
            data2?.team?.applicationFormURL &&
            data2?.team.presentationURL &&
            data2?.team.articleURL === null
          ) {
            if (i18n.language == 'kz') {
              alert(
                'Өтінімді жүктегенсіз, мақала жүктеуіңіз керек(қалау бойынша)',
              )
              navigate('/stepper')
            } else if (i18n.language == 'ru') {
              alert(
                'Вы уже загрузили форму и презентацию, необходимо загрузить статью(необязательно)',
              )
              navigate('/stepper')
            }
          } else if (
            url === '/' &&
            data?.group &&
            localStorage.getItem('user') &&
            data2?.team?.applicationFormURL &&
            data2?.team.presentationURL &&
            data2?.team.articleURL
          ) {
            if (i18n.language == 'kz') {
              alert('Өтінімді, презентацияны, және мақаланы жүктегенсіз')
              navigate('/profile')
            }
            if (i18n.language == 'ru') {
              alert('Вы уже загрузили форму, презентацию и статью')
              navigate('/profile')
            }
          } else if (url === '/' && !localStorage.getItem('user')) {
            navigate('/login')
          } else if (
            url === '/' &&
            !data?.group &&
            localStorage.getItem('user')
          ) {
            navigate('/register')
            if (i18n.language == 'kz') {
              alert('Жеке кабинеттегі мәліметтерді толықтырыңыз')
            } else if (i18n.language == 'ru') {
              alert('Добавьте незаполненые данные в профиле')
            }
          }
          if (url === '/' && localStorage.getItem('user') === null) {
            navigate('/login')
          }
        }}
      />
    </>
  )
}
