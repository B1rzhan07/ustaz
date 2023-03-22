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
import { schools, subjects } from '../../models/data'
import TextField from '@mui/material/TextField'
import '../../index.scss'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
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
  const [selectedFile2, setSelectedFile2] = useState<FileList | null>(null)
  const [success, setSuccess] = useState(false)
  const formData1 = new FormData()
  const formData2 = new FormData()
  formData1.append('file', selectedFile?.item(0) as File)
  formData2.append('file', selectedFile2?.item(0) as File)
  const [error, setError] = useState(false)
  const [link, setLink] = useState('')
  const tournamentId = 0
  const choices = 0
  const name = 'file'
  const url = ''

  const sent = () => {}

  const sendFirst = () => {
    setFormState('pending')
    TournamentService.sendForm(formData1)
      .then((response) => {
        setFormState('submitted')
      })
      .finally(() => {
        setSuccess(true)
      })
      .catch((err: AxiosError) => {
        setSuccess(false)
        setError(true)
      })
  }
  const { t, i18n } = useTranslation()

  const sendSecond = () => {
    setFormState('pending')
    if (selectedFile2) {
      TournamentService.sendPresentation(formData2)
        .then((response) => {
          setFormState('submitted')
        })
        .finally(() => {
          if (i18n.language === 'kz') {
            alert('Қабылданды')
          } else if (i18n.language === 'ru') {
            alert('Принято')
          }
          localStorage.setItem('register', 'yes')
          handleClose()
        })
        .catch((err: AxiosError) => {
          setSuccess(false)
          setError(true)
        })
    }
    if (link) {
      TournamentService.registerTournament(link).then((res) => {
        handleClose()
      })
    }
  }
  const [errors, setErrors] = useState<string | null>(null)
  const isValidLink = (link: string) => {
    // Use a regular expression to check if the link is valid
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
          {success ? (
            <>
              <h5>{t('link')} </h5>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '35ch' },
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '20px',

                  color: '#000',
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="standard-basic"
                  label="Link"
                  variant="standard"
                  value={link}
                  onChange={handleChange}
                  error={!!error}
                  helperText={error}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {t('or')}
                </div>
                <FormControl fullWidth>
                  <Button variant="outlined">
                    <input
                      multiple
                      type="file"
                      onChange={(e) => {
                        setSelectedFile2(e.target.files)
                      }}
                    />
                  </Button>
                  <Button
                    style={{
                      marginTop: 10,
                    }}
                    variant="contained"
                    onClick={sendSecond}
                  >
                    {t('work')}
                  </Button>
                </FormControl>
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
                  <Alert
                    style={{
                      marginTop: 10,
                    }}
                    severity="error"
                  >
                    {t('errorSend')}
                  </Alert>
                )}
              </Box>
            </>
          ) : (
            <>
              <h5>{t('form')}</h5>
              <FormControl fullWidth>
                <Button variant="outlined">
                  <input
                    type="file"
                    id="upload"
                    onChange={(e) => setSelectedFile(e.target.files)}
                  />
                </Button>
                <Button
                  style={{
                    marginTop: 10,
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
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              {error && (
                <Alert
                  style={{
                    marginTop: 10,
                  }}
                  severity="error"
                >
                  {t('errorSend')}
                </Alert>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  )
}
