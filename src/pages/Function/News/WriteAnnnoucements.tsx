import { useState } from 'react'
import { Button, TextField, Typography, Grid, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import Announcements from '../../../services/Announcements'

const UploadInput = styled('input')({
  display: 'none',
})
type AnnouncementsFormProps = {
  onClose: () => void
  setAnnouncements: (announcements: any) => void
}

const AnnouncementsForm = ({
  onClose,
  setAnnouncements,
}: AnnouncementsFormProps) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const [file, setFile] = useState<FileList | null>(null)
  const formData = new FormData()

  formData.append('file', file?.item(0) as File)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files)
    }
  }
  var announcementId = 0
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Announcements.sendAnnouncements(title, text)
      .then((response) => {
        console.log(response.data)
        announcementId = response.data.announcementId
        Announcements.sendPresentationAnnouncement(formData, announcementId)
      })
      .then(() => {
        onClose()
        Announcements.getAnnouncements().then((response) => {
          setAnnouncements(response.data)
        })
      })
  }
  console.log(file?.item(0)?.name)

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Создать новость
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Название"
              fullWidth
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Текст"
              fullWidth
              value={text}
              onChange={(event) => setText(event.target.value)}
              multiline
              rows={7}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              id="upload-file"
              type="file"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="upload-file">
              <Button variant="contained" color="primary" component="span">
                Загрузить файл
              </Button>
            </label>
            {file && <span>{file?.item(0)?.name}</span>}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Создать
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default AnnouncementsForm
