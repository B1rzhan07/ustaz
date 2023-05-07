import { Alert, Button, CircularProgress, FormControl } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import TournamentService from '../../../services/TournamentService'

const NewForm = () => {
  const [data, setData] = React.useState<any>(
    JSON.parse(localStorage.getItem('register') || '{}'),
  )
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

  const sendFirst = async () => {
    setFormState('pending')
    await TournamentService.sendForm(formData1)
      .then(async (response) => {
        TournamentService.getRegister().then((res) => {
          setData(res.data)
          localStorage.setItem('register', JSON.stringify(res.data))
          setData(res.data)
        })
        setFormState('submitted')
        setSelectedFile(null)
        setIsFileUploaded(true)
      })
      .finally(() => {
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
          New form wws:{' '}
          {data?.team?.applicationFormURL
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

        <h5 style={{ marginTop: 40 }}>New form wws</h5>
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

export default NewForm
