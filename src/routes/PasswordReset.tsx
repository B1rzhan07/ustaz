import TextField from '@mui/material/TextField'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import Button from '@mui/material/Button'

const PasswordReset = () => {
  const navigate = useNavigate()
  const [password, setPassword] = React.useState<string>('')

  const updatePassword = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      AuthService.resetWithToken(password, token)
        .then((res) => {
          console.log(res)
          alert('Password reset successfully')
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
          alert('Password reset failed, please try again')
        })
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
      }}
    >
      <h1>Reset password</h1>
      <p>
        Check your email for a link to reset your password. If it doesn’t appear
        within a few minutes, check your spam folder.
      </p>

      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
      />
      <Button onClick={updatePassword}>Update</Button>

      <Link
        style={{
          marginTop: '20px',
        }}
        to="/login"
      >
        To login
      </Link>
    </div>
  )
}

export default PasswordReset
