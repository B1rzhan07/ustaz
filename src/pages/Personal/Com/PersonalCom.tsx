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
import Defences from '../../../services/Defences'
import Button from '@mui/material/Button'
import BasicModal from './modalCom'
import { useNavigate } from 'react-router-dom'
import Commission from '../../../services/Commission'

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
  const navigate = useNavigate()
  const [commission, setCommission] = React.useState<any>([])
  console.log(commission)

  React.useEffect(() => {
    Defences.getDefenceCommission().then((res) => {
      setCommission(res.data)
      localStorage.setItem('commission', JSON.stringify(res.data))
      console.log(res.data)
    })
  }, [])
  const goEach = (id: number) => {
    navigate(`morecom/${id}`)
  }

  return (
    <>
      <HeaderComponent />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Жұмысы</StyledTableCell>
              <StyledTableCell>Stage</StyledTableCell>
              <StyledTableCell>Баға қою</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commission?.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.team}</StyledTableCell>
                <StyledTableCell>{row.stage}</StyledTableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: 'blue',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      goEach(row.id)
                      const number = parseInt(
                        row.stage.toString().match(/-(\d+)/)[1],
                      )
                      Commission.getCriteries(number).then((response) => {
                        localStorage.setItem(
                          'criteria',
                          JSON.stringify(response.data),
                        )
                        console.log(response.data)
                      })
                    }}
                  >
                    Бағалау
                  </button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <BasicModal open={open} handleClose={handleClose} id={id} /> */}
    </>
  )
}
