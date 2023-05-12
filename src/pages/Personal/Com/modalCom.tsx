import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Defences from '../../../services/Defences'
import { useState } from 'react'
import { Slider } from '@mui/material'
import Commission from '../../../services/Commission'
import HeaderComponent from '../../../components/Header/Header.component'
import { useNavigate, useParams } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import GradingRow from './GradingRow'
import CircularProgress from '@mui/material/CircularProgress'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export default function BasicModal() {
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const navigate = useNavigate()
  const url = useParams()
  const [criteria, setCriteria] = React.useState<any>([])
  console.log(criteria)
  const [data, setData] = React.useState<any>([])

  React.useEffect(() => {
    const getCriteria = async () => {
      setFormState('pending')
      try {
        const commissionRes = await Defences.getDefenceCommissionById(
          Number(url.id),
        )
        console.log(commissionRes.data)
        setData(commissionRes.data)
        if (
          commissionRes.data &&
          commissionRes.data.defence &&
          commissionRes.data.defence.stage &&
          commissionRes.data.defence.stage.id
        ) {
          const criteriesRes = await Commission.getCriteries(
            commissionRes.data.defence.stage.id,
          )
          console.log(criteriesRes.data)
          setCriteria(criteriesRes.data)
          setFormState('submitted')
        } else {
          console.error('Error: data.defence.stage.id is undefined')
        }
      } catch (error) {
        console.error(error)
      }
    }
    getCriteria()
  }, [])

  const [grades, setGrades] = React.useState<any>([])

  return (
    <div>
      <HeaderComponent />
      <div>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginTop: '20px',
            marginLeft: '40px',
          }}
        >
          ФИО: {data?.team?.team?.creator?.first_name}{' '}
          {data?.team?.team?.creator?.last_name}{' '}
          {data?.team?.team?.creator?.middle_name}
        </Typography>
        <Button
          disabled={data?.team?.team?.applicationFormURL === null}
          style={{
            marginTop: '10px',
          }}
          onClick={() =>
            window.open(data?.team?.team?.applicationFormURL, '_blank')
          }
          variant="contained"
          sx={{ ml: 5 }}
        >
          Өтініш формасы
        </Button>
        <Button
          disabled={data?.team?.team?.curriculumURL === null}
          style={{
            marginTop: '10px',
          }}
          onClick={() => window.open(data?.team?.team?.curriculumURL, '_blank')}
          variant="contained"
          sx={{ ml: 5 }}
        >
          ҚМЖ
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
          Мультимедиалық Мақала
        </Button>
        <Button
          style={{
            marginTop: '10px',
          }}
          disabled={data?.team?.team?.articleURL === null}
          onClick={() => window.open(data?.team?.team?.articleURL, '_blank')}
          variant="contained"
          sx={{ ml: 2 }}
        >
          Мәтіндік Мақала
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
          Сабақтың ссылкасы
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginLeft: '40px',
          marginRight: '40px',
          marginTop: '40px',
        }}
      >
        {formState === 'pending' ? (
          <>
            <CircularProgress
              size={100}
              style={{
                marginLeft: '50%',
                marginTop: '10%',
              }}
            />
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Критерий</StyledTableCell>
                    <StyledTableCell>Баға</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {criteria?.map((criterion: any) => (
                    <GradingRow
                      key={criterion.id}
                      criteria={criterion}
                      setGrades={setGrades}
                      stage={data?.defence?.stage?.id}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{
                  marginTop: '20px',
                  marginBottom: '50px',
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  marginLeft: '10px',
                  borderRadius: '40px',
                  padding: '10px 20px',
                  right: '0',
                }}
                onClick={() => {
                  Commission.setGradeCommission(data?.defence?.id, grades).then(
                    (res) => {
                      console.log(res.data)
                      navigate('/com')
                      alert('Бағаланды')
                    },
                  )
                }}
              >
                Жіберу
              </Button>
              <Button
                variant="contained"
                style={{
                  marginTop: '20px',
                  marginBottom: '50px',
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  marginLeft: '10px',
                  borderRadius: '40px',
                  padding: '10px 20px',
                  right: '0',
                }}
                onClick={() => {
                  navigate('/com')
                }}
              >
                Артқа
              </Button>
            </div>
          </>
        )}
        {criteria.length === 0 && formState === 'submitted' && (
          <Typography
            variant="h4"
            gutterBottom
            style={{
              marginTop: '20px',
              marginLeft: '40px',
            }}
          >
            Критерийлер жоқ
          </Typography>
        )}
      </div>
    </div>
  )
}
