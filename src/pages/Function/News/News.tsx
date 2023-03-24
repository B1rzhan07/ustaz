import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import HeaderComponent from '../../../components/Header/Header.component'
import DownloadIcon from '@mui/icons-material/Download'
import classes from './News.module.scss'
import AnnouncementsForm from './WriteAnnnoucements'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { style } from './styles'
import { ColorButton } from './styles'
import { BootstrapButton } from './styles'

const News = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const scrollTo = () => {}
  const { t } = useTranslation()
  const handleClick = () => {
    window.open('', '_blank')
  }
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    link.download = 'document.pdf'
    link.click()
  }

  return (
    <div className={classes.container}>
      <HeaderComponent scrollTo={scrollTo} />

      <div className={classes.news}>
        <h1
          style={{
            textAlign: 'center',
            color: '#0063cc',
          }}
        >
          {t('plan')}
        </h1>
        {true && (
          <>
            <Button variant="contained" onClick={handleOpen}>
              Создать новость
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <AnnouncementsForm />
              </Box>
            </Modal>
          </>
        )}
        <div className={classes.news__item}>
          <h5>{t('plan1')}</h5>
          <p>some</p>
          <div className={classes.news__inside}>
            <BootstrapButton
              className={classes.btn}
              variant="contained"
              onClick={handleClick}
            >
              {t('read')}
            </BootstrapButton>
            <ColorButton className={classes.btn} variant="outlined">
              <DownloadIcon onClick={handleDownload} />
            </ColorButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default News
