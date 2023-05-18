import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import HeaderComponent from '../../../components/Header/Header.component'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TournamentService from '../../../services/TournamentService'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import AuthService from '../../../services/AuthService'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function CustomizedTables() {
  const url = useParams()
  const [grades, setGrades] = React.useState([
    {
      grades: [
        {
          grade: 0,
          criteria: '',
        },
      ],
    },
  ])
  const [final, setFinal] = React.useState<any>([])
  const [criteria, setCriteria] = React.useState([])
  const [sum, setSum] = React.useState<any>([])
  const [avg, setAvg] = React.useState<any>([])
  React.useEffect(() => {
    TournamentService.getGrades(Number(url?.id)).then((res) => {
      setGrades(res.data)
      setCriteria(res.data[0]?.grades.map((item: any) => item.criteria))
    })
    AuthService.getGrade().then((res) => {
      console.log(res.data)
      setFinal(res.data)
    })
  }, [url.id])
  React.useEffect(() => {
    if (grades) {
      setSum(
        grades.map((item: any) => {
          return item.grades.reduce((acc: any, curr: any) => {
            return acc + curr.grade
          }, 0)
        }),
      )
    }
  }, [grades])
  console.log(final)

  console.log(sum)

  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div>
      <HeaderComponent />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          variant="contained"
          style={{
            marginLeft: '1rem',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          onClick={() => navigate(-1)}
        >
          {t('back')}
        </Button>
        <span
          style={{
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {t('finalGrade')}:
          {Number(url.id) == 1 ? <span> {final[0]?.grade}</span> : null}
          {Number(url.id) == 2 ? <span> {final[1]?.grade}</span> : null}
          {Number(url.id) == 3 ? <span> {final[2]?.grade}</span> : null}
        </span>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, marginTop: 1, marginBottom: 1 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  textAlign: 'center',
                }}
              >
                {t('criteria')}
              </StyledTableCell>
              {grades.map((item: any, index: number) => (
                <StyledTableCell
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Комисисия {index + 1}
                  <br />
                  <span>
                    {t('sum')}: {sum[index]}
                  </span>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {criteria?.map((row: any, index: number) => (
              <>
                <StyledTableRow>
                  <StyledTableCell
                    style={{
                      fontWeight: 'bold',
                      width: '30%',
                    }}
                  >
                    {index + 1}. {criteria[index]}
                  </StyledTableCell>
                  {grades.map((item: any, index: number) => (
                    <StyledTableCell
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {
                        grades[index]?.grades.find(
                          (item: any) => item.criteria === row,
                        )?.grade
                      }
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
