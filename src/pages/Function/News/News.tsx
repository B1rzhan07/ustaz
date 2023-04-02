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
import Announcements from '../../../services/Announcements'
import DeleteIcon from '@mui/icons-material/Delete'
import Pagination from './Pagination'

const News = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { t } = useTranslation()

  const [announcements, setAnnouncements] = useState<any>([])
  React.useEffect(() => {
    Announcements.getAnnouncements().then((response) => {
      setAnnouncements(response.data)
    })
  }, [])

  const [curPage, setCurPage] = React.useState(1)
  const [postPerPage] = React.useState(5)
  const indexOfLastPost = curPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = announcements.slice(indexOfFirstPost, indexOfLastPost)
  const paginationCount = Math.ceil(announcements.length / postPerPage)
  function handlePage(pageNum: number) {
    setCurPage(pageNum)
  }
  const type = JSON.parse(localStorage.getItem('user') || '{}').role
  console.log(announcements)

  return (
    <div className={classes.container}>
      <HeaderComponent />

      <div className={classes.news}>
        <h1
          style={{
            textAlign: 'center',
            color: '#0063cc',
          }}
        ></h1>
        {type === 'ROLE_SECRETARY' && (
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
                <AnnouncementsForm
                  onClose={handleClose}
                  setAnnouncements={setAnnouncements}
                />
              </Box>
            </Modal>
          </>
        )}
        {currentPosts?.length === 0 && (
          <h1 style={{ textAlign: 'center', color: '#0063cc' }}>
            {t('noNews')}
          </h1>
        )}
        {currentPosts?.reverse().map((announcement: any) => (
          <div className={classes.news__item}>
            <b>{announcement?.title}</b>
            <div className={classes.news__item__text}>
              <p>{announcement?.text}</p>
            </div>
            <div className={classes.news__inside}>
              <p className={classes.news__inside__date}>
                {new Date(announcement?.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className={classes.news__inside__btn}>
                {announcement?.filename != '' && (
                  <ColorButton className={classes.btn} variant="outlined">
                    <DownloadIcon
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = announcement?.filename
                        link.click()
                      }}
                    />
                  </ColorButton>
                )}
                {type === 'ROLE_SECRETARY' && (
                  <DeleteIcon
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '30px',
                    }}
                    className={classes.btn}
                    onClick={() => {
                      Announcements.deleteAnnouncement(announcement?.id)
                      setAnnouncements(
                        announcements.filter(
                          (item: any) => item.id !== announcement?.id,
                        ),
                      )
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination paginationCount={paginationCount} handlePage={handlePage} />
    </div>
  )
}

export default News
