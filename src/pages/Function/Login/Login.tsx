import React from 'react'
import classes from './Login.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import HeaderComponent from '../../../components/Header/Header.component'
import { AxiosResponse } from 'axios'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
type Props = {
  word: string
}
const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true)
  const [all, setAll] = React.useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
  })
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }
  const [error, setError] = React.useState<string | null>(null)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()
    if (isLogin) {
      AuthService.login(all.username.toString(), all.password.toString()).catch(
        (err) => {
          setError(err)
          console.log(error)
        },
      )
    } else {
      AuthService.register(
        all.username.toString(),
        all.password.toString(),
        all.email.toString(),
        all.firstName.toString(),
        all.lastName.toString(),
        all.middleName.toString(),
      )
        .then((response: AxiosResponse) => {
          console.log(response.data)
          AuthService.login(all.username.toString(), all.password.toString())
        })
        .catch((error) => {
          setError(error.response.data.message)
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
  }

  function setFirstName(value: string): void {
    setAll((prevState) => ({ ...prevState, firstName: value }))
  }
  function setLastName(value: string): void {
    setAll((prevState) => ({ ...prevState, lastName: value }))
  }
  function setMiddleName(value: string): void {
    setAll((prevState) => ({ ...prevState, middleName: value }))
  }
  function setEmail(value: string): void {
    setAll((prevState) => ({ ...prevState, email: value }))
  }
  function setUserName(value: string): void {
    setAll((prevState) => ({ ...prevState, username: value }))
  }
  function setPassword(value: string): void {
    setAll((prevState) => ({ ...prevState, password: value }))
  }
  const { t } = useTranslation()

  return (
    <>
      <HeaderComponent scrollTo={setPassword} />
      <form onSubmit={submitHandler}>
        <div className="container mt-5 mb-5">
          <div className="d-flex flex row g-0">
            <div className="col-md-6 mt-3">
              <div className={'card p-3 ' + classes.card1}>
                <div className="d-flex flex-column">
                  <img
                    src="https://almatyustazy.kz/img_almaty_ustaz/logo.svg"
                    height="40"
                    width="70"
                  />
                  <span className={classes.login + ' mt-3'}>
                    {' '}
                    {isLogin ? t('login') : t('register')}
                  </span>{' '}
                </div>

                <div
                  className={classes.inputField + ' d-flex flex-column mt-3'}
                >
                  {' '}
                  {!isLogin && (
                    <div
                      className={
                        classes.inputField + ' d-flex flex-column mt-3'
                      }
                    >
                      <div className={classes.signInCard}>
                        <span> {t('name')}: </span>{' '}
                        <input
                          className={classes.formControl}
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                        />{' '}
                      </div>{' '}
                      <div className={classes.signInCard}>
                        <span> {t('surname')}: </span>{' '}
                        <input
                          className={classes.formControl}
                          required
                          onChange={(e) => setLastName(e.target.value)}
                        />{' '}
                      </div>{' '}
                      <div className={classes.signInCard}>
                        <span> {t('middle')}: </span>{' '}
                        <input
                          className={classes.formControl}
                          required
                          onChange={(e) => setMiddleName(e.target.value)}
                        />{' '}
                      </div>{' '}
                      <div className={classes.signInCard}>
                        <span> Email: </span>{' '}
                        <input
                          className={classes.formControl}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />{' '}
                      </div>{' '}
                    </div>
                  )}{' '}
                  <div>
                    <div
                      className={
                        isLogin ? 'd-flex flex-column mt-3' : classes.signInCard
                      }
                    >
                      <span> Никнейм: </span>{' '}
                      <input
                        className={classes.formControl}
                        required
                        placeholder={
                          t('writeNickname') + '...' // "Логин енгізіңіз"
                        }
                        onChange={(e) => setUserName(e.target.value)}
                      />{' '}
                    </div>
                    <div
                      className={
                        isLogin ? 'd-flex flex-column mt-3' : classes.signInCard
                      }
                    >
                      <span className="mt-3"> {t('password')} </span>{' '}
                      <input
                        className={classes.formControl}
                        required
                        type="password"
                        placeholder={t('writePassword') + '...'} // "Пароль енгізіңіз"
                        onChange={(e) => setPassword(e.target.value)}
                      />{' '}
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                    </div>{' '}
                  </div>
                  <Button
                    variant="contained"
                    type="submit"
                    className={
                      'mt-4 btn-dark d-flex justify-content-center align-items-center' +
                      classes.btn
                    }
                  >
                    {' '}
                    {isLogin ? t('login') : t('register')}{' '}
                  </Button>
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
                    <img
                      src="https://almatyustazy.kz/local/templates/ustaz/include_areas/kz/images/taglinemob-img.png"
                      height="100%"
                      width="100%"
                    />
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
