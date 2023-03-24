import React from 'react'
import classes from './Login.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import HeaderComponent from '../../../components/Header/Header.component'
import { AxiosError, AxiosResponse } from 'axios'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import img from '../../../../public/Img/kaz.png'
import TextField from '@mui/material/TextField'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = React.useState(true)
  const [isValidEmail, setIsValidEmail] = React.useState(false)

  const [all, setAll] = React.useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  })

  const isEmailValid = React.useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }, [])

  React.useEffect(() => {
    if (
      isValidEmail &&
      all.username &&
      all.password &&
      all.firstName &&
      all.lastName &&
      all.middleName
    ) {
      setCorrect(true)
    } else if (isLogin && all.username && all.password) {
      setCorrect(true)
    }
  }, [isValidEmail, isLogin, all])

  const setFirstName = React.useCallback((value: string): void => {
    setAll((prevState) => ({ ...prevState, firstName: value }))
  }, [])

  const setLastName = React.useCallback((value: string): void => {
    setAll((prevState) => ({ ...prevState, lastName: value }))
  }, [])

  const setMiddleName = React.useCallback((value: string): void => {
    setAll((prevState) => ({ ...prevState, middleName: value }))
  }, [])

  const setEmail = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setAll((prevState) => ({ ...prevState, email: event.target.value }))
      if (isEmailValid(event.target.value)) {
        setIsValidEmail(true)
      }
    },
    [isEmailValid],
  )

  const setUserName = React.useCallback((value: string): void => {
    setAll((prevState) => ({ ...prevState, username: value }))
  }, [])

  const setPassword = React.useCallback((value: string): void => {
    setAll((prevState: any) => ({ ...prevState, password: value }))
  }, [])

  const [correct, setCorrect] = React.useState(false)

  const switchAuthModeHandler = React.useCallback(() => {
    setIsLogin((prevState: any) => !prevState)
  }, [])

  const submitHandler = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      if (isLogin) {
        AuthService.login(all.username.toString(), all.password.toString())
          .then((response: AxiosResponse) => {
            if (localStorage.getItem('user')) {
              navigate('/profile')
            }
          })
          .catch((err: AxiosError) => {
            console.log(err)
          })
      } else {
        AuthService.register(
          all.username.toString(),
          all.password.toString(),
          all.email.toString(),
          all.firstName.toString(),
          all.lastName.toString(),
          all.middleName.toString(),
        ).then((response: AxiosResponse) => {
          console.log(response.status)

          if (Number(response.status) == 200) {
            AuthService.login(all.username.toString(), all.password.toString())
              .then((response: AxiosResponse) => {
                if (localStorage.getItem('user')) {
                  navigate('/profile')
                }
              })
              .catch((err: AxiosError) => {
                console.log(err)
              })
          }
        })
      }
      setAll({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
      })
    },
    [all, isLogin, navigate],
  )
  return (
    <>
      <HeaderComponent scrollTo={setPassword} />
      <form onSubmit={submitHandler}>
        <div className="container mt-5 mb-5">
          <div className="d-flex flex row g-0">
            <div className="col-md-6 mt-3">
              <div className={'card p-3 ' + classes.card1}>
                <div className="d-flex justify-content-around">
                  <img
                    src="data:image/jpeg;base64,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"
                    height="70"
                    width="70"
                  />
                  <span className={classes.login + ' mt-3'}>
                    {isLogin ? t('login') : t('register')}
                  </span>{' '}
                </div>{' '}
                <div
                  className={classes.inputField + ' d-flex flex-column mt-3'}
                >
                  {!isLogin && (
                    <div
                      className={
                        classes.inputField + ' d-flex flex-column mt-3'
                      }
                    >
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <span> {t('name')}: </span>{' '}
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>{' '}
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <span> {t('surname')}: </span>{' '}
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          required
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <span> {t('middle')}: </span>{' '}
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          required
                          onChange={(e) => setMiddleName(e.target.value)}
                        />
                      </div>{' '}
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <span> Email: </span>{' '}
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          required
                          onChange={setEmail}
                        />
                      </div>{' '}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: '10px',
                    }}
                  >
                    <div
                      style={{
                        marginTop: '10px',
                      }}
                      className={
                        isLogin ? 'd-flex flex-column mt-3' : classes.signInCard
                      }
                    >
                      <span
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        {' '}
                        Никнейм:{' '}
                      </span>{' '}
                      <TextField
                        style={{
                          marginTop: '10px',
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder={t('writeNickname') + '...'}
                        required
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: '10px',
                      }}
                      className={
                        isLogin ? 'd-flex flex-column mt-3' : classes.signInCard
                      }
                    >
                      <span className="mt-3"> {t('password')} </span>{' '}
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        required
                        placeholder={t('writePassword') + '...'}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>{' '}
                  </div>
                  {isLogin ? (
                    <Button
                      disabled={!correct}
                      variant="contained"
                      type="submit"
                      className={
                        'mt-4 btn-dark d-flex justify-content-center align-items-center' +
                        classes.btn
                      }
                    >
                      {' '}
                      {t('login')}{' '}
                    </Button>
                  ) : (
                    <Button
                      disabled={!correct}
                      variant="contained"
                      type="submit"
                      className={
                        'mt-4 btn-dark d-flex justify-content-center align-items-center' +
                        classes.btn
                      }
                    >
                      {' '}
                      {t('register')}{' '}
                    </Button>
                  )}
                  <div
                    className={
                      classes.text2 + ' mt-4 d-flex flex-row align-items-center'
                    }
                  >
                    <span>
                      <Link
                        className={classes.register}
                        onClick={switchAuthModeHandler}
                        to={''}
                      >
                        {' '}
                        {isLogin ? t('register') : t('login')}{' '}
                      </Link>{' '}
                    </span>{' '}
                  </div>{' '}
                </div>
              </div>{' '}
            </div>
            <div className="col-md-6 mt-3">
              <div className={'card p-3 ' + classes.card2}>
                <div className="image">
                  <Link to="/">
                    <img src={img} height={500} width="100%" />
                  </Link>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </form>
    </>
  )
}

export default Login
