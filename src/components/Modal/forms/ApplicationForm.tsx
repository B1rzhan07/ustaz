import { Alert, Button, CircularProgress, FormControl } from '@mui/material'
import { AxiosError } from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import TournamentService from '../../../services/TournamentService'

const ApplicationForm = () => {
  const data = JSON.parse(localStorage.getItem('register') || ({} as string))

  const [isFileUploaded, setIsFileUploaded] = React.useState(false)

  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const [error, setError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState<FileList | null>(null)
  const formData1 = new FormData()
  formData1.append('file', selectedFile?.item(0) as File)
  const { t, i18n } = useTranslation()
  const sendFirst = () => {
    setFormState('pending')
    TournamentService.sendForm(formData1)
      .then((response) => {
        setFormState('submitted')
        setSelectedFile(null)
        setIsFileUploaded(true)
      })
      .finally(() => {
        TournamentService.getRegister().then((res) => {
          localStorage.setItem('register', JSON.stringify(res.data))
        })
        setSuccess(true)
      })
      .catch((err) => {
        setError(true)
        console.log(err, 'err')
      })
  }
  return (
    <div>
      <FormControl fullWidth>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {t('question1')}{' '}
          {data?.team.applicationFormURL
            ? t('yes')
            : isFileUploaded
            ? t('yes')
            : t('no')}
          {data?.team?.applicationFormURL && (
            <Button
              style={{ marginLeft: 10, borderRadius: 20 }}
              variant="contained"
              component="label"
              onClick={() => {
                window.open(data?.team?.applicationFormURL)
              }}
            >
              {t('click')}
            </Button>
          )}
        </div>
        <h5 style={{ marginTop: 40 }}>{t('form')}</h5>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            style={{
              width: '40%',
              borderRadius: 20,
              marginTop: 20,
              padding: 15,
              textDecoration: 'none',
              color: 'white',
            }}
            onClick={() => {
              window.open(
                'https://storage.googleapis.com/almatyustazy-profile-bucket/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D0%B8%20%D0%BD%D0%B0%20%D0%BA%D0%BE%D0%BD%D0%BA%D1%83%D1%80%D1%81.DOCX',
              )
            }}
          >
            {t('clickKaz')}
          </Button>
          <Button
            variant="contained"
            style={{
              width: '40%',
              borderRadius: 20,
              marginTop: 20,
              padding: 15,
              textDecoration: 'none',
              color: 'white',
            }}
            onClick={() => {
              window.open(
                'https://storage.googleapis.com/almatyustazy-profile-bucket/Форма%20РУС.docx',
              )
            }}
          >
            {t('clickRus')}
          </Button>
        </div>
        <h5 style={{ marginTop: 40 }}>{t('form1')}</h5>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            style={{ width: '40%', borderRadius: 20, marginTop: 10 }}
            onClick={() => {
              document.getElementById('upload')?.click()
            }}
          >
            <input
              hidden
              type="file"
              id="upload"
              onChange={(e) => setSelectedFile(e.target.files)}
            />
            {t('file')}
          </Button>
          <span
            style={{
              marginLeft: 10,
            }}
          >
            {selectedFile?.item(0)?.name}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{
              width: '80%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              borderRadius: 20,
              padding: 10,
              marginTop: 20,
            }}
            variant="contained"
            onClick={sendFirst}
          >
            {t('send')}
          </Button>
        </div>
      </FormControl>
      {formState === 'pending' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}
        >
          <CircularProgress />
        </div>
      )}

      {success && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Alert
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 20,
              backgroundColor: '#4caf50',
              borderRadius: 20,
              width: '80%',
            }}
            severity="success"
          >
            Файл жіберілді
          </Alert>
        </div>
      )}
    </div>
  )
}

export default ApplicationForm
