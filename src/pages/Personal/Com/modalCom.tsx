import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Defences from '../../../services/Defences'
import { useState } from 'react'
import { Slider } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type Props = {
  open: boolean
  handleClose: () => void
  id: number
}

export default function BasicModal({ open, handleClose, id }: Props) {
  const [grade, setGrade] = useState<number>(0)
  const [data, setData] = React.useState<any>([])

  React.useEffect(() => {
    Defences.getDefenceCommissionById(id).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }, [id])

  const handleChange = (event: Event, value: number | number[]) => {
    setGrade(value as number)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            {data?.team?.member?.first_name} {data?.team?.member?.last_name}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Required Forms
              </Typography>
              <Button
                disabled={data?.team?.team?.applicationFormURL === null}
                onClick={() =>
                  window.open(data?.team?.team?.applicationFormURL, '_blank')
                }
                variant="contained"
                sx={{ ml: 2 }}
              >
                Open Application Form
              </Button>
              <Button
                style={{
                  marginTop: '10px',
                }}
                disabled={data?.team?.team?.presentationURL === null}
                onClick={() =>
                  window.open(data?.team?.team?.presentationURL, '_blank')
                }
                variant="contained"
                sx={{ ml: 2 }}
              >
                Open Presentation Form
              </Button>
              <Button
                style={{
                  marginTop: '10px',
                }}
                disabled={data?.team?.team?.lessonRecordingURL === null}
                onClick={() =>
                  window.open(data?.team?.team?.lessonRecordingURL, '_blank')
                }
                variant="contained"
                sx={{ ml: 2 }}
              >
                Open Lesson URL
              </Button>
            </Box>
            <Typography
              style={{
                marginTop: '10px',
              }}
              variant="body1"
              gutterBottom
            >
              Please set the grade for the defense.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Grade: {grade}
              </Typography>
              <Slider
                value={grade}
                min={0}
                max={100}
                step={1}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </Box>
            <Button
              onClick={() => {
                Defences.setGradeCommission(
                  id,
                  data?.team?.member?.id,
                  grade,
                ).then((res) => {
                  console.log(res.data)
                  handleClose()
                  setGrade(0)
                })
              }}
              variant="contained"
            >
              Set Grade
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
