import { useState } from 'react'
import { Button, TextField, Typography, Grid, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import Announcements from '../../../services/Announcements'

const UploadInput = styled('input')({
  display: 'none',
})

const AnnouncementsForm = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    Announcements.sendAnnouncements(title, text, content).then((response) => {
      console.log(response.data.announcementId)
    })
  }

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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Текст"
              fullWidth
              value={text}
              onChange={(event) => setText(event.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Контент"
              fullWidth
              value={content}
              onChange={(event) => setContent(event.target.value)}
              multiline
              rows={8}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*,application/pdf"
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
            {file && <span>{file.name}</span>}
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
