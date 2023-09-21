import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from '../Button/Button.component'
import TabsComponent from '../Tabs/Tabs.component'
import { useTranslation } from 'react-i18next'
import img2 from '../../../public/Img/index.png'
import { isMobile } from 'react-device-detect'
import { Button } from '@mui/material'

function HeaderComponent() {
  const navigate = useNavigate()

  const type = JSON.parse(localStorage.getItem('user') || '{}').role
  const { t } = useTranslation()

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
          <div
            style={{
              marginRight: 2,
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={img2} alt="almaty" height="70" width="90" />
          </div>

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

            {!isMobile && (
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
            )}
            {(type === 'ROLE_SECRETARY' || type === 'ROLE_ADMIN') && (
              <div className="pages headerY" style={{ color: 'black' }}>
                <button
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    outline: 'none',
                  }}
                  onClick={() => {
                    navigate('/sec')
                  }}
                >
                  <b>Назначить комиссию</b>
                </button>
              </div>
            )}
            {(type === 'ROLE_ADMIN' || type === 'ROLE_COMMISSION') && (
              <div className="pages headerY" style={{ color: 'black' }}>
                <button
                  style={{
                    backgroundColor: 'white',
                    border: 'none',
                    outline: 'none',
                  }}
                  onClick={() => {
                    navigate('/com')
                  }}
                >
                  <b>Работы участников</b>
                </button>
              </div>
            )}
            {/* <div className="pages headerY" style={{ color: 'black' }}>
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
                <b>{t('results')}</b>
              </button>
            </div> */}
          </Box>

          <Box
            className="bet headerY"
            sx={{
              display: { xs: 'none', md: 'flex' },
              width: '40%',
            }}
          >
            {localStorage.getItem('user') ? (
              <>
                <ButtonComponent
                  word={'профиль'}
                  onClick={() => {
                    navigate('/profile')
                  }}
                />
                <ButtonComponent
                  word={t('logout')}
                  onClick={() => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('data')
                    localStorage.removeItem('register')
                    localStorage.removeItem('more')
                    localStorage.removeItem('teams')
                    localStorage.removeItem('criteria')
                    localStorage.removeItem('criteries')
                    localStorage.removeItem('commission')
                    window.location.href = '/'
                  }}
                />
              </>
            ) : (
              <Button
                sx={{
                  color: 'white',
                  backgroundColor: '#3E58E8',
                  borderRadius: 50,
                  padding: '10px 12px',
                  marginLeft: '20px',
                  '&:hover': {
                    backgroundColor: '#3E58E8',
                  },
                  width: '20%',
                  marginRight: '50px',
                }}
                onClick={() => {
                  window.location.href = '/login'
                }}
              >{t('login')}</Button>
            )}
            {!isMobile && <TabsComponent />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderComponent
