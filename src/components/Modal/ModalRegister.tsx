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
    TournamentService.sendCur(formData1)
      .then((response) => {
        setFormState('submitted')
      })
      .finally(() => {
        handleClose()
        if (i18n.language == 'kz') {
          alert('ҚМЖ жүктелді')
        } else if (i18n.language == 'ru') {
          alert('КСП загружена')
        }
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
          <FormControl fullWidth>
            <Button
              variant="outlined"
              style={{ marginTop: 10 }}
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
              {t('upload')}
            </Button>
            <span
              style={{
                marginTop: 20,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              {selectedFile?.item(0)?.name}
            </span>

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
