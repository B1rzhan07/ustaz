import TextField from '@mui/material/TextField'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import HeaderComponent from '../components/Header/Header.component'
import CircularProgress from '@mui/material/CircularProgress'

const PasswordReset = () => {
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const navigate = useNavigate()
  const [password, setPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const updatePassword = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    setFormState('pending')
    if (token) {
      AuthService.resetWithToken(password, token).then((res: any) => {
        console.log(res)
        if (res.status < 500) {
          setMessage('Пароль успешно изменен')
          alert('Пароль успешно изменен')
          setFormState('submitted')
          navigate('/login')
        }
        if (res.code === 'ERR_BAD_RESPONSE') {
          setMessage('Попробуйте еще раз отправить email')
          setFormState('error')
        }
      })
    }
  }
  const { t } = useTranslation()

  return (
    <>
      <HeaderComponent />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <h1
          style={{
            color: '#2D2D2D',
          }}
        >
          {t('reset')}
        </h1>

        <TextField
          sx={{ width: '300px', marginTop: '20px' }}
          value={password}
          onChange={(e) => {
            const input = e.target.value
            if (!/\s/g.test(input)) {
              setPassword(input)
            }
          }}
          id="outlined-basic"
          label={t('write')}
          variant="outlined"
        />
        <Button
          style={{
            marginTop: '20px',
          }}
          variant="contained"
          onClick={updatePassword}
        >
          {t('reset')}
        </Button>
        {formState === 'pending' && (
          <CircularProgress
            style={{
              marginTop: '20px',
            }}
          />
        )}
        {message && (
          <p
            style={{
              color: formState === 'error' ? 'red' : 'green',
              marginTop: '20px',
            }}
          >
            {message}
          </p>
        )}
      </div>
    </>
  )
}

export default PasswordReset
