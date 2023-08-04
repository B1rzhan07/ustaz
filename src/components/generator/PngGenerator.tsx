import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CertificateDownloadButton: React.FC<{
  name: string
  surname: string
  date: string
  school: string
  subject: string
}> = ({ name, surname, date, school, subject }) => {
  const { t } = useTranslation()
  const handleDownloadCertificate = () => {
    const canvasResolution = 300

    date = '4.08.2023'

    const canvasWidth = 11 * canvasResolution
    const canvasHeight = 8.5 * canvasResolution

    // Get the canvas element
    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const ctx = canvas.getContext('2d')

    if (!ctx) {
      console.error('Canvas 2D context not available.')
      return
    }

    const certificateImage = new Image()
    certificateImage.src = '/certificate.png'

    certificateImage.onload = () => {
      ctx.drawImage(certificateImage, 0, 0, canvasWidth, canvasHeight)

      ctx.font = '120px Merriweather'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'

      const nameX = canvasWidth / 1.8
      const nameY = 1350
      const surnameX = canvasWidth / 2.2
      const surnameY = 1350
      const dateX = canvasWidth / 3.6
      const dateY = canvasHeight - 330
      const schoolX = canvasWidth / 1.6
      const schoolY = 1827
      const subjectX = canvasWidth / 1.78
      const subjectY = 1913

      ctx.fillText(name, nameX, nameY)
      ctx.fillText(surname, surnameX, surnameY)
      ctx.font = '50px Merriweather'
      ctx.fillText(date, dateX, dateY)
      ctx.font = '60px Merriweather'
      ctx.fillText(school, schoolX, schoolY)
      ctx.fillText(subject, subjectX, subjectY)

      const link = document.createElement('a')
      link.download = `${name}_${surname}_certificate.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <Button
      variant="contained"
      sx={{
        padding: 1.5,
      }}
      onClick={handleDownloadCertificate}
    >
      {t('download')}
    </Button>
  )
}

export default CertificateDownloadButton
