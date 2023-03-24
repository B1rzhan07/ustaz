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
import img2 from '../../../../public/Img/index.png'
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
    setAll({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      middleName: '',
      email: '',
    })
    setError('')
  }, [])
  const [error, setError] = React.useState<any>(null)
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
          .catch((err: any) => {
            setError(err)
            console.log(err)
          })
      } else {
        AuthService.register(
          all.username.toString(),
          all.password.toString(),
          all.email.toString(),
          all.middleName.toString(),
          all.lastName.toString(),
          all.firstName.toString(),
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
                setError(err)
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
      setError('Қайтадан кіріп көріңіз')
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
                          value={all.firstName}
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
                          value={all.lastName}
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
                          value={all.middleName}
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
                          value={all.email}
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
                        value={all.username}
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
                        value={all.password}
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
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
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
