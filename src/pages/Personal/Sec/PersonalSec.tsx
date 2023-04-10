import React from 'react'
import HeaderComponent from '../../../components/Header/Header.component'
import Defense from '../../../services/Defences'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import '../../../index.scss'
import BasicModal from './helper/Modal'
import Pagination from '../../Function/News/Pagination'
import Defences from '../../../services/Defences'
import Secretary from '../../../services/Secretary'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'

interface Team {
  creator: any
  map(arg0: (row: Team) => JSX.Element): React.ReactNode
  id: number
  name: string
  applicationFormURL: string | null
  confirmed: boolean
  presentationURL: string | null
  defense: boolean
}

const PersonalSec = () => {
  const [completed, setCompleted] = React.useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setCompleted(event.target.value as string)
  }
  console.log(completed)

  const navigate = useNavigate()
  const [teams, setTeams] = React.useState<Team[]>([])
  React.useEffect(() => {
    const fetchData = async () => {
      Defense.getTeams().then((res) => {
        setTeams(res.data)
      })
    }
    fetchData()
  }, [])

  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const handleClose = () => {
    setOpen(false)
  }
  const [curPage, setCurPage] = React.useState(1)
  const [postPerPage] = React.useState(12)
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const indexOfLastPost = curPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = teams
    .filter((team) => {
      if (search === '') {
        return team
      } else if (
        team.creator.first_name.toLowerCase().includes(search.toLowerCase()) ||
        team.creator.last_name.toLowerCase().includes(search.toLowerCase()) ||
        team.creator.middle_name.toLowerCase().includes(search.toLowerCase())
      ) {
        return team
      }
    })
    .filter((team) => {
      if (completed === '') {
        return team
      } else if (completed === 'true') {
        return team.confirmed === true
      } else if (completed === 'false') {
        return team.confirmed === false
      }
    })

    .slice(indexOfFirstPost, indexOfLastPost)

  const paginationCount = Math.ceil(teams.length / postPerPage)
  function handlePage(pageNum: number) {
    setCurPage(pageNum)
  }
  const [id, setId] = React.useState<number | null>(null)
  const [moreInfo, setMoreInfo] = React.useState<any>([])

  return (
    <div>
      <HeaderComponent />

      <TableContainer component={Paper} className="table">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            marginLeft: 300,
            marginRight: 300,
          }}
        >
          <TextField
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            style={{
              width: '30%',
            }}
            id="standard-basic"
            placeholder="поиск по ФИО"
            variant="standard"
          />
          <FormControl
            style={{
              width: '20%',
            }}
          >
            <InputLabel id="demo-simple-select-label">Confirmed</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={completed}
              label="Completed"
              onChange={handleChange}
            >
              <MenuItem value={'true'}>True</MenuItem>
              <MenuItem value={'false'}>False</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Table sx={{ maxWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>Defense</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((row: Team, index: number) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.id}.{' '}
                  {row.creator.first_name.charAt(0).toUpperCase() +
                    row.creator.first_name.slice(1)}{' '}
                  {row.creator.last_name.charAt(0).toUpperCase() +
                    row.creator.last_name.slice(1)}{' '}
                  {row.creator.middle_name.charAt(0).toUpperCase() +
                    row.creator.middle_name.slice(1)}{' '}
                </TableCell>
                <TableCell>{row.confirmed ? 'true' : 'false'}</TableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: row.defense ? 'green' : 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      setOpen(true)
                      setId(row.id)
                      Defences.getMoreInfoSecretary(row.id).then((res) => {
                        setMoreInfo(res.data)
                      })
                    }}
                  >
                    Set Defense
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      setId(row.id)
                      navigate(`/moresec/${row.id}`)
                    }}
                  >
                    Подробнее
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination paginationCount={paginationCount} handlePage={handlePage} />
        <BasicModal
          open={open}
          handleClose={handleClose}
          id={id || null}
          formState={formState}
          moreInfo={moreInfo}
          setTeams={setTeams}
        />
      </TableContainer>
    </div>
  )
}

export default PersonalSec
