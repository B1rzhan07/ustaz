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
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

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
  const [commission, setCommission] = React.useState<any>([
    JSON.parse(localStorage.getItem('commission') || '{}'),
  ])
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
  const [graded, setGraded] = React.useState<any>(null)

  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  console.log(age)
  const [stage, setStage] = React.useState('')
  const handleChangeStage = (event: SelectChangeEvent) => {
    setStage(event.target.value as string)
  }

  return (
    <>
      <HeaderComponent />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl
          style={{
            marginTop: '20px',
            width: '400px',
            marginBottom: '20px',
          }}
        >
          <InputLabel id="demo-simple-select-label">Оценен</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={'true'}>Да</MenuItem>
            <MenuItem value={'false'}>Нет</MenuItem>
            <MenuItem value={'nothing'}>Все</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          style={{
            marginTop: '20px',
            width: '400px',
            marginBottom: '20px',
            marginLeft: '20px',
          }}
        >
          <InputLabel id="demo-simple-select-label">Этап</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stage}
            label="Age"
            onChange={handleChangeStage}
          >
            <MenuItem value={'STAGE-1'}>Этап 1</MenuItem>
            <MenuItem value={'STAGE-2'}>Этап 2</MenuItem>
            <MenuItem value={'STAGE-3'}>Этап 3</MenuItem>
            <MenuItem value={'all'}>Все</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Этап</StyledTableCell>
              <StyledTableCell>Оценить</StyledTableCell>
              <StyledTableCell>Оценен</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commission
              ?.filter((item: any) =>
                age === 'true'
                  ? item?.grades?.length > 0
                  : age === 'false'
                  ? item?.grades?.length === 0
                  : item,
              )
              .filter((item: any) =>
                stage === 'STAGE-1'
                  ? item.stage === 'STAGE-1'
                  : stage === 'STAGE-2'
                  ? item.stage === 'STAGE-2'
                  : stage === 'STAGE-3'
                  ? item.stage === 'STAGE-3'
                  : item,
              )
              .map((row: any) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.team}</StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    Этап: <b>{row?.stage?.toString().match(/-(\d+)/)[1]}</b>
                  </StyledTableCell>
                  <TableCell>
                    <Button
                      disabled
                      style={{}}
                      onClick={() => {
                        goEach(row.id)
                        const number = parseInt(
                          row.stage.toString().match(/-(\d+)/)[1],
                        )
                      }}
                    >
                      Бағалау
                    </Button>
                  </TableCell>
                  <StyledTableCell
                    style={{
                      color: row?.grades?.length > 0 ? 'green' : 'red',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    {row?.grades?.length > 0 ? (
                      <span>Оценен</span>
                    ) : (
                      <span>Не оценен</span>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
