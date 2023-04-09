import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TournamentService from '../../../services/TournamentService'
const Article = () => {
  const data = JSON.parse(localStorage.getItem('register') || '{}')
  const [error, setError] = useState(false)

  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const [success, setSuccess] = React.useState(false)

  const [selectedFile3, setSelectedFile3] = React.useState<FileList | null>(
    null,
  )
  const [linkArticle, setLinkArticle] = useState<string>('')
  const [errors, setErrors] = useState<string | null>(null)
  const formData3 = new FormData()
  formData3.append('file', selectedFile3?.item(0) as File)
  const { t, i18n } = useTranslation()
  const sendThird = () => {
    setFormState('pending')
    setSuccess(false)
    setError(false)
    if (selectedFile3) {
      TournamentService.sendArticle(formData3)
        .then((response) => {
          TournamentService.getRegister().then((res) => {
            localStorage.setItem('register', JSON.stringify(res.data))
          })
          setSuccess(true)
          setFormState('submitted')
          setSelectedFile3(null)
        })
        .catch((err: AxiosError) => {
          setSuccess(false)
          setError(true)
        })
    }
    if (linkArticle) {
      TournamentService.linkArticle(linkArticle).then((res) => {
        TournamentService.getRegister().then((res) => {
          localStorage.setItem('register', JSON.stringify(res.data))
        })
        setSuccess(true)
        setFormState('submitted')
        setLinkArticle('')
      })
    }
    if (!selectedFile3 && !linkArticle) {
      setSuccess(false)
      setError(true)
    }
  }
  const isValidLink = (link: string) => {
    return /^(ftp|http|https):\/\/[^ "]+$/.test(link)
  }
  const handleChangeArticle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLinkArticle(value)
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
          {t('question3')} {data?.team?.articleURL ? t('yes') : t('no')}
        </div>
        <h5
          style={{
            marginTop: 40,
          }}
        >
          {t('article')}
        </h5>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TextField
            style={{
              marginTop: 10,
              width: '50%',
            }}
            id="standard-basic"
            label={t('linkArticle')}
            variant="standard"
            value={linkArticle}
            onChange={handleChangeArticle}
            error={!!error}
            helperText={error}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 20,
          }}
        >
          {t('or')}
        </div>
        <div
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Button
            style={{
              width: '50%',
              marginRight: 10,
              borderRadius: 20,
            }}
            variant="contained"
            onClick={() => {
              document.getElementById('file2')?.click()
            }}
          >
            <input
              id="file2"
              hidden
              multiple
              type="file"
              onChange={(e) => {
                setSelectedFile3(e.target.files)
              }}
            />
            {t('file')}
          </Button>
          {selectedFile3?.item(0)?.name}
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
            onClick={sendThird}
          >
            {t('send')}
          </Button>
        </div>
        {formState === 'pending' && (
          <div
            style={{
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

export default Article
