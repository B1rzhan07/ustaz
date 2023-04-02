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
  const [commission, setCommission] = React.useState<any>([])
  React.useEffect(() => {
    Defences.getDefenceCommission().then((res) => {
      setCommission(res.data)
      console.log(res.data)
    })
  }, [])
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [id, setId] = React.useState(0)
  return (
    <>
      <HeaderComponent />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>DateOfDefence</StyledTableCell>
              <StyledTableCell>Team</StyledTableCell>
              <StyledTableCell>Stage</StyledTableCell>
              <StyledTableCell>SetGrade</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commission?.map((row: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.defenceDate || 'No'}</StyledTableCell>
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
                      setOpen(true)
                      setId(row.id)
                    }}
                  >
                    Set Defense
                  </button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BasicModal open={open} handleClose={handleClose} id={id} />
    </>
  )
}
