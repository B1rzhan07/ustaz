import ButtonComponent from '../Button/Button.component'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

type Props = {
  handleOpen: () => void
}
export default function Input({ handleOpen }: Props) {
  const storedData = localStorage.getItem('data')

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  return (
    <>
      <ButtonComponent
        word={t('register')}
        onClick={() => {
          if (!localStorage.getItem('user')) {
            navigate('/login')
          }
          if (localStorage.getItem('user')) {
            navigate('/profile')
          }
        }}
      />
    </>
  )
}
