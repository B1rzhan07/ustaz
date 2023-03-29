import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from '../Button/Button.component'
import TabsComponent from '../Tabs/Tabs.component'
import { useTranslation } from 'react-i18next'
import img2 from '../../../public/Img/index.png'
type Props = {
  scrollTo: (name: string) => void
}
function HeaderComponent({ scrollTo }: Props) {
  const location = window.location.pathname
  const navigate = useNavigate()
  const handleClick = (name: string) => {
    scrollTo(name)
  }
  const type = JSON.parse(localStorage.getItem('user') || '{}').role
  const { t, i18n } = useTranslation()

  return (
    <AppBar
      position="sticky"
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '12px',
        height: '110px',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" className="nav-link">
              <img src={img2} alt="almaty" height="80" width="100" />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div className="pages headerY" style={{ color: 'black' }}>
              <button
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                }}
                onClick={() => {
                  navigate('/')
                }}
              >
                <b>{t('main')}</b>
              </button>
            </div>
            {location === '/' && (
              <>
                <div className="pages headerY" style={{ color: 'black' }}>
                  <button
                    style={{
                      backgroundColor: 'white',
                      border: 'none',
                      outline: 'none',
                    }}
                    onClick={() => {
                      handleClick('Байқау кезеңдері')
                    }}
                  >
                    <b>{t('stages')}</b>
                  </button>
                </div>

                <div className="pages headerY" style={{ color: 'black' }}>
                  <button
                    style={{
                      backgroundColor: 'white',
                      border: 'none',
                      outline: 'none',
                    }}
                    onClick={() => {
                      handleClick('Қатысушы болу')
                    }}
                  >
                    <b>{t('participate')}</b>
                  </button>
                </div>
              </>
            )}

            <div className="pages headerY" style={{ color: 'black' }}>
              <button
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                }}
                onClick={() => {
                  navigate('/news')
                }}
              >
                <b>{t('news')}</b>
              </button>
            </div>
            {(type === 'ROLE_SECRETARY' || type === 'ROLE_ADMIN') && (
              <div className="pages headerY" style={{ color: 'black' }}>
                <button
                  disabled
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    outline: 'none',
                  }}
                  onClick={() => {
                    navigate('/sec')
                  }}
                >
                  <b>Сделать Defence</b>
                </button>
              </div>
            )}
            {(type === 'ROLE_ADMIN' || type === 'ROLE_COMMISSION') && (
              <div className="pages headerY" style={{ color: 'black' }}>
                <button
                  disabled
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    outline: 'none',
                  }}
                  onClick={() => {
                    navigate('/com')
                  }}
                >
                  <b>My defences</b>
                </button>
              </div>
            )}
          </Box>

          <Box className="bet headerY">
            {localStorage.getItem('user') && (
              <ButtonComponent
                word={'профиль'}
                onClick={() => {
                  navigate('/profile')
                }}
              />
            )}
            <div className="betRight headerY">
              {!localStorage.getItem('user') ? (
                <ButtonComponent
                  word={t('login')}
                  onClick={() => {
                    window.location.href = '/login'
                  }}
                />
              ) : (
                <ButtonComponent
                  word={t('logout')}
                  onClick={() => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('data')
                    localStorage.removeItem('register')
                    navigate('/')
                  }}
                />
              )}
            </div>

            <TabsComponent />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderComponent
