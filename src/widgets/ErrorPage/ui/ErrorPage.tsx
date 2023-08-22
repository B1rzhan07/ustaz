import { useTranslation } from 'react-i18next'
import cls from './ErrorPage.module.scss'
import { Button } from '@mui/material'
import classes from './ErrorPage.module.scss'
interface ErrorPageProps {
  className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div>
      <p>{t('Произошла непредвиденная ошибка')}</p>
      <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
    </div>
  )
}
