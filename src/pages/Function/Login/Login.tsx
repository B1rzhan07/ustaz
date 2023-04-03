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
import CircularProgress from '@mui/material/CircularProgress'
const Login = () => {
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [correctReg, setCorrectReg] = React.useState(false)
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
      setCorrectReg(true)
    } else if (isLogin && all.username && all.password) {
      setCorrect(true)
    }
  }, [isValidEmail, isLogin, all])

  const setEmail = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (isEmailValid(event.target.value)) {
        setIsValidEmail(true)
      }
      const regex = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/
      const input = event.target.value

      if (!/\s/g.test(input) && regex.test(input)) {
        setAll((prevState) => ({ ...prevState, email: event.target.value }))
      }
    },
    [isEmailValid],
  )

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
    setError(null as any)
  }, [])
  const [error, setError] = React.useState<any>(null)
  const submitHandler = React.useCallback(
    (event: React.FormEvent) => {
      setFormState('pending')
      event.preventDefault()
      if (isLogin) {
        AuthService.login(all.username.toString(), all.password.toString())
          .then((response: AxiosResponse) => {
            setFormState('submitted')
            if (localStorage.getItem('user')) {
              navigate('/profile')
            } else {
              setError(t('errLogin'))
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
      } else {
        AuthService.register(
          all.username.toString(),
          all.password.toString(),
          all.email.toString(),
          all.middleName.toString(),
          all.lastName.toString(),
          all.firstName.toString(),
        )
          .then((response: AxiosResponse) => {
            console.log(response.status)
            setFormState('submitted')
            if (Number(response.status) == 200) {
              AuthService.login(
                all.username.toString(),
                all.password.toString(),
              )
                .then((response: AxiosResponse) => {
                  setFormState('submitted')
                  if (localStorage.getItem('user')) {
                    navigate('/profile')
                  } else {
                    setError('Қайтадан кіріп көріңіз')
                  }
                })
                .catch((err: AxiosError) => {
                  setError('Қайтадан кіріп көріңіз')
                  setFormState('submitted')
                  console.log('err', err)
                })
            }
          })
          .catch((err) => {
            setError(t('exist'))
            setFormState('submitted')
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
      <HeaderComponent />
      <form onSubmit={submitHandler}>
        <div className="container mb-5">
          <div className="d-flex flex row g-0">
            <div className="col-md-6 mt-3">
              <div className={'card p-3 ' + classes.card1}>
                <div className="d-flex justify-content-around">
                  <h1
                    style={{
                      fontSize: '30px',
                    }}
                    className={classes.login + ' mt-3'}
                  >
                    {isLogin ? t('login') : t('register')}
                  </h1>{' '}
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
                        <h5> {t('name')}: </h5>{' '}
                        <TextField
                          sx={{ width: '50%' }}
                          id="outlined-basic"
                          variant="outlined"
                          required
                          placeholder={t('kaz') + ''}
                          value={all.firstName}
                          onChange={(e) => {
                            const input = e.target.value
                            const regex1 = /^[А-ЯҢңӘӨҮа-яңғіқҚӨҰҺІҒұһәөү\s]*$/
                            if (!/\s/g.test(input) && regex1.test(input)) {
                              setAll((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                              }))
                            }
                          }}
                        />
                      </div>{' '}
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <h5> {t('surname')}: </h5>{' '}
                        <TextField
                          sx={{ width: '50%' }}
                          id="outlined-basic"
                          variant="outlined"
                          placeholder={t('kaz') + ''}
                          value={all.lastName}
                          required
                          onChange={(e) => {
                            const input = e.target.value
                            const regex = /^[a-zA-Z\s]*$/
                            const regex1 = /^[А-ЯҢңӘӨҮа-яңғіқҚӨҰҺІҒұһәөү\s]*$/
                            if (!/\s/g.test(input) && regex1.test(input)) {
                              setAll((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                              }))
                            }
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <h5> {t('middle')}: </h5>{' '}
                        <TextField
                          sx={{ width: '50%' }}
                          id="outlined-basic"
                          variant="outlined"
                          value={all.middleName}
                          placeholder={t('kaz') + ''}
                          required
                          onChange={(e) => {
                            const input = e.target.value
                            const regex1 = /^[А-ЯҢңӘӨҮа-яңғіқҚӨҰҺІҒұһәөү\s]*$/
                            if (!/\s/g.test(input) && regex1.test(input)) {
                              setAll((prevState) => ({
                                ...prevState,
                                middleName: e.target.value,
                              }))
                            }
                          }}
                          lang="kz"
                        />
                      </div>{' '}
                      <div
                        style={{
                          marginTop: '10px',
                        }}
                        className={classes.signInCard}
                      >
                        <h5> Email: </h5>{' '}
                        <TextField
                          sx={{ width: '50%' }}
                          id="outlined-basic"
                          variant="outlined"
                          required
                          placeholder={t('latin') + ' '}
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
                      <h4
                        style={{
                          marginTop: '10px',
                        }}
                      >
                        {' '}
                        Логин:{' '}
                      </h4>{' '}
                      <TextField
                        style={{
                          marginTop: '10px',
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        required
                        placeholder={t('latin') + ' '}
                        value={all.username}
                        sx={!isLogin ? { width: '50%' } : undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const input = e.target.value
                          if (!/\s/g.test(input)) {
                            setAll((prevState) => ({
                              ...prevState,
                              username: input,
                            }))
                          }
                        }}
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
                      <h4 className="mt-3"> {t('password')}: </h4>{' '}
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        required
                        sx={!isLogin ? { width: '50%' } : undefined}
                        value={all.password}
                        placeholder={t('writePassword') + '...'}
                        onChange={(e) => {
                          const input = e.target.value
                          if (!/\s/g.test(input)) {
                            setAll((prevState) => ({
                              ...prevState,
                              password: e.target.value,
                            }))
                          }
                        }}
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
                      disabled={!correctReg}
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
                    <h3>
                      <Link
                        className={classes.register}
                        onClick={switchAuthModeHandler}
                        to={''}
                      >
                        {' '}
                        {isLogin ? t('register') : t('login')}{' '}
                      </Link>{' '}
                    </h3>{' '}
                  </div>{' '}
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
