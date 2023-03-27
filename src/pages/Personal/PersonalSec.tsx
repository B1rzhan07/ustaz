import React from 'react'
import HeaderComponent from '../../components/Header/Header.component'
import Defense from '../../services/Defences'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import '../../index.scss'
import BasicModal from './helper/Modal'

interface Team {
  map(arg0: (row: Team) => JSX.Element): React.ReactNode
  id: number
  name: string
  applicationFormURL: string | null
  confirmed: boolean
  presentationURL: string | null
  defense: boolean
}

const PersonalSec = () => {
  const scrollTo = () => {}
  const [teams, setTeams] = React.useState<Team>([])
  const [commissions, setCommissions] = React.useState([])
  React.useEffect(() => {
    const fetchData = async () => {
      Defense.getTeams().then((res) => {
        setTeams(res.data)
      })
      Defense.getCommissions().then((res) => {
        setCommissions(res.data)
      })
    }
    fetchData()
  }, [])
  console.log(teams)
  console.log(commissions)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <HeaderComponent scrollTo={scrollTo} />
      <TableContainer component={Paper} className="table">
        <Table sx={{ maxWidth: 1100 }}>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>ApplicationFormURL</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>presentationURL</TableCell>
              <TableCell>Defense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((row: Team) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child th, &:last-child td': { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  {row.applicationFormURL ? (
                    <Link to={row?.applicationFormURL}>here</Link>
                  ) : (
                    'null'
                  )}
                </TableCell>
                <TableCell>{row.confirmed ? 'true' : 'false'}</TableCell>
                <TableCell>{row.presentationURL ? 'true' : 'false'}</TableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: row.defense ? 'green' : 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={handleOpen}
                  >
                    Set Defense
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <BasicModal
          open={open}
          handleClose={handleClose}
          commissions={commissions}
        />
      </TableContainer>
    </div>
  )
}

export default PersonalSec
