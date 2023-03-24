import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import ButtonComponent from '../Button/Button.component'
import TabsComponent from '../Tabs/Tabs.component'
import { useTranslation } from 'react-i18next'

type Props = {
  scrollTo: (name: string) => void
}
function HeaderComponent({ scrollTo }: Props) {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleClick = (name: string) => {
    scrollTo(name)
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const { t, i18n } = useTranslation()

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: 'white',
        padding: '12px 100px',
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
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/" className="nav-link">
              <img
                src="data:image/jpeg;base64,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"
                alt="almaty"
                height="80"
                width="100"
              />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <div className="pages" style={{ color: 'black' }}>
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
                <b>Басты бет</b>
              </button>
            </div>
            <div className="pages" style={{ color: 'black' }}>
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

            <div className="pages" style={{ color: 'black' }}>
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
          </Box>
          {/* <ButtonComponent
            word={t('news')}
            onClick={() => {
              navigate('/news')
            }}
          /> */}
          <Box sx={{ flexGrow: 2 }} className="bet">
            {localStorage.getItem('user') && (
              <ButtonComponent
                word={t('personal')}
                onClick={() => {
                  navigate('/profile')
                }}
              />
            )}
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

            <TabsComponent />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderComponent
function setAnchorElUser(currentTarget: EventTarget & HTMLElement) {
  throw new Error('Function not implemented.')
}
