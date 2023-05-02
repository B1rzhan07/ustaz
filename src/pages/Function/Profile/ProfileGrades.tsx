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
  const [criteria, setCriteria] = React.useState([])
  React.useEffect(() => {
    TournamentService.getGrades(Number(url?.id)).then((res) => {
      setGrades(res.data)
      setCriteria(res.data[0]?.grades.map((item: any) => item.criteria))
    })
  }, [url.id])
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div>
      <HeaderComponent />

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
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, marginTop: 1, marginBottom: 1 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>{t('criteria')}</StyledTableCell>
              {grades.map((item: any, index: number) => (
                <StyledTableCell>Комисисия {index + 1}</StyledTableCell>
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

                      width: '50%',
                    }}
                  >
                    {index + 1}. {criteria[index]}
                  </StyledTableCell>
                  {grades.map((item: any, index: number) => (
                    <StyledTableCell
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      {item?.grades[index]?.grade}
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
