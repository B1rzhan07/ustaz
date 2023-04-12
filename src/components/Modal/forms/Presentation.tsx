import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material'
import { AxiosError } from 'axios'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TournamentService from '../../../services/TournamentService'

const Presentation = () => {
  const data = JSON.parse(localStorage.getItem('register') || ({} as string))

  const [isFileUploaded, setIsFileUploaded] = React.useState(false)

  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const [success, setSuccess] = React.useState(false)
  const [selectedFile2, setSelectedFile2] = React.useState<FileList | null>(
    null,
  )
  const formData2 = new FormData()
  formData2.append('file', selectedFile2?.item(0) as File)
  const [error, setError] = React.useState(false)
  const [link, setLink] = React.useState('')
  const { t, i18n } = useTranslation()
  const sendSecond = () => {
    setSuccess(false)
    setError(false)
    setFormState('pending')
    setSuccess(true)
    if (selectedFile2) {
      TournamentService.sendPresentation(formData2)
        .then((response) => {
          TournamentService.getRegister().then((res) => {
            localStorage.setItem('register', JSON.stringify(res.data))
          })
          setFormState('submitted')

          setSelectedFile2(null)
          setIsFileUploaded(true)
        })
        .finally(() => {
          setSuccess(true)
        })
        .catch((err: AxiosError) => {
          setSuccess(true)
          setError(true)
        })
    }
    if (link) {
      TournamentService.registerTournament(link)
        .then((response) => {
          TournamentService.getRegister().then((res) => {
            localStorage.setItem('register', JSON.stringify(res.data))
          })
          setFormState('submitted')
          setLink('')
          setIsFileUploaded(true)
        })
        .finally(() => {
          setSuccess(true)
        })
        .catch((err: AxiosError) => {
          setSuccess(false)
          setError(true)
        })
    }
    if (!selectedFile2 && !link) {
      setSuccess(false)
      setError(true)
      setFormState('submitted')
    }
  }
  const [errors, setErrors] = React.useState<string | null>(null)

  const isValidLink = (link: string) => {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(link)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLink(value)
    if (value && !isValidLink(value)) {
      setErrors('Please enter a valid link')
    } else {
      setErrors(null)
    }
  }
  return (
    <div>
      <FormControl fullWidth>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          {t('question2')}{' '}
          {data?.team.presentationURL
            ? t('yes')
            : isFileUploaded
            ? t('yes')
            : t('no')}
          {data?.team?.presentationURL && (
            <Button
              style={{ marginLeft: 10, borderRadius: 20 }}
              variant="contained"
              component="label"
              onClick={() => {
                window.open(data?.team?.presentationURL)
              }}
            >
              {t('click')}
            </Button>
          )}
        </div>
        <h5
          style={{
            marginTop: 40,
          }}
        >
          {t('link')}{' '}
        </h5>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            style={{
              marginTop: 20,
              width: '50%',
            }}
            id="standard-basic"
            label={t('linkPresentation')}
            variant="standard"
            value={link}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
        </div>
        <div
          style={{
            marginTop: 15,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {t('or')}
        </div>
        <div
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Button
            variant="contained"
            style={{
              marginTop: 15,
              width: '50%',
              marginRight: 10,
              borderRadius: 20,
            }}
            onClick={() => {
              document.getElementById('file2')?.click()
            }}
          >
            <input
              hidden
              multiple
              id="file2"
              type="file"
              onChange={(e) => {
                setSelectedFile2(e.target.files)
              }}
            />
            {t('file')}
          </Button>
          {selectedFile2?.item(0)?.name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{
              marginTop: 30,
              width: '80%',
              borderRadius: 20,
              padding: 10,
            }}
            variant="contained"
            onClick={sendSecond}
          >
            {t('send')}
          </Button>
        </div>

        {formState === 'pending' && (
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </div>
        )}
        {error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Alert
              style={{
                marginTop: 20,
                backgroundColor: '#f44336',
                borderRadius: 20,
                width: '80%',
              }}
              severity="error"
            >
              {t('errorSend')}
            </Alert>
          </div>
        )}
        {success && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Alert
              style={{
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
      </FormControl>
    </div>
  )
}

export default Presentation
