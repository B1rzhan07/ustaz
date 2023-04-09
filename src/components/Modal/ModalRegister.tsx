import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import UploadButtons from '../Upload/Upload.component'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import '../../index.scss'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import TournamentService from '../../services/TournamentService'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import '../../index.scss'
import axios, { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 40,
  borderRadius: 10,
  p: 10,
  backgroundColor: '#fff',
}

type Props = {
  handleClose: () => void
  open: boolean
}

export default function ModalRegister({ handleClose, open }: Props) {
  const [formState, setFormState] = useState<'pending' | 'submitted' | 'error'>(
    'submitted',
  )

  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)

  const formData1 = new FormData()

  formData1.append('file', selectedFile?.item(0) as File)

  const [error, setError] = useState(false)
  const [link, setLink] = useState('')
  const [data, setData] = useState<any>(
    JSON.parse(localStorage.getItem('register') || '{}'),
  )
  console.log(data)

  const sendFirst = () => {
    setFormState('pending')
    TournamentService.sendForm(formData1)
      .then((response) => {
        setFormState('submitted')
      })
      .finally(() => {
        handleClose()
        TournamentService.getRegister().then((res) => {
          setData(res.data)
          localStorage.setItem('register', JSON.stringify(res.data))
        })
      })
      .catch((err: AxiosError) => {
        setError(true)
      })
  }
  const { t, i18n } = useTranslation()

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{}}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',

              color: '#000',
            }}
          >
            <h3>{t('olymp')}</h3>
          </Typography>

          <FormControl fullWidth>
            <h5 style={{ marginTop: 40 }}>{t('form')}</h5>
            <Button
              variant="contained"
              style={{
                marginTop: 20,
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
                marginTop: 20,
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
            <h5 style={{ marginTop: 40 }}>{t('form1')}</h5>
            <Button variant="outlined" style={{ marginTop: 10 }}>
              <input
                type="file"
                id="upload"
                onChange={(e) => setSelectedFile(e.target.files)}
              />
            </Button>

            <Button
              style={{
                marginTop: 20,
              }}
              variant="contained"
              onClick={sendFirst}
            >
              {t('send')}
            </Button>
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
          {error && (
            <Alert
              style={{
                marginTop: 15,
              }}
              severity="error"
            >
              {t('errorSend')}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  )
}
