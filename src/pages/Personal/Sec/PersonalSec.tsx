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
import AuthService from '../../../services/AuthService'
import CircularProgress from '@mui/material/CircularProgress'

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
  React.useEffect(() => {
    Secretary.getDefenceGradeByDefenceId(23).then((res) => {
      console.log(res.data)
    })
  }, [])
  const navigate = useNavigate()
  const [subjects, setSubjects] = React.useState<any>([])
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const [search, setSearch] = React.useState('')
  const [completed, setCompleted] = React.useState<string>('')
  const [subject, setSubject] = React.useState<string>('')
  const handleChange = (event: SelectChangeEvent) => {
    setCompleted(event.target.value as string)
  }
  const handleSubject = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string)
  }
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const [teams, setTeams] = React.useState<Team[]>(
    JSON.parse(localStorage.getItem('teams') || '[]'),
  )

  React.useEffect(() => {
    if (teams.length === 0) {
      setFormState('pending')
    }
    const fetchData = async () => {
      Defense.getTeams().then((res) => {
        setTeams(res.data)
        localStorage.setItem('teams', JSON.stringify(res.data))
        setFormState('submitted')
      })
      AuthService.getSubjects().then((res) => {
        setSubjects(res.data)
      })
    }
    fetchData()
  }, [])

  const [curPage, setCurPage] = React.useState(1)
  const [postPerPage] = React.useState(15)
  const currentPosts = teams
    .filter((team: any) => {
      if (search === '') {
        return team
      } else if (
        team?.creator?.first_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        team?.creator?.last_name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        team?.creator?.middle_name?.toLowerCase().includes(search.toLowerCase())
      ) {
        return team
      }
    })
    .filter((team: any) => {
      if (completed === '') {
        return team
      } else if (completed === 'true') {
        return team?.confirmed === true
      } else if (completed === 'false') {
        return team?.confirmed === false
      }
    })
    .filter((team: any) => {
      if (subject === '') {
        return team
      }
      if (team?.creator?.subject?.id === subject) {
        return team
      }
    })

  const paginationCount = Math.ceil(currentPosts.length / postPerPage)

  const indexOfLastPost = curPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage

  const slicedPosts = currentPosts.slice(indexOfFirstPost, indexOfLastPost)
  console.log(slicedPosts)

  function handlePage(pageNum: number) {
    setCurPage(pageNum)
  }

  const [id, setId] = React.useState<number | null>(null)
  const [moreInfo, setMoreInfo] = React.useState<any>([])

  return (
    <div>
      <HeaderComponent />
      {formState === 'pending' ? (
        <CircularProgress
          size={100}
          style={{
            marginLeft: '50%',
            marginTop: '10%',
          }}
        />
      ) : (
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
                width: '30%',
              }}
            >
              <InputLabel id="demo-simple-select-label">Уроки</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subject}
                label="Completed"
                onChange={handleSubject}
              >
                {subjects?.map((subject: any) => {
                  return (
                    <MenuItem value={subject.id}>{subject.nameKaz}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl
              style={{
                width: '20%',
              }}
            >
              <InputLabel id="demo-simple-select-label">Подтвержден</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={completed}
                label="Completed"
                onChange={handleChange}
              >
                <MenuItem value={'true'}>Да</MenuItem>
                <MenuItem value={'false'}>Нет</MenuItem>
                <MenuItem value={''}>Все</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Table sx={{ maxWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell>ФИО</TableCell>
                <TableCell>Подтвержден</TableCell>
                <TableCell>Защита</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedPosts?.map((row: Team, index: number) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row?.id}.{' '}
                    {row?.creator?.first_name?.charAt(0).toUpperCase() +
                      row?.creator?.first_name?.slice(1)}{' '}
                    {row?.creator?.last_name?.charAt(0).toUpperCase() +
                      row?.creator?.last_name?.slice(1)}{' '}
                    {row?.creator?.middle_name?.charAt(0).toUpperCase() +
                      row?.creator?.middle_name?.slice(1)}{' '}
                  </TableCell>
                  <TableCell>{row?.confirmed ? 'Да' : 'Нет'}</TableCell>
                  <TableCell>
                    <button
                      style={{
                        backgroundColor: row?.defense ? 'green' : 'red',
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
                      Назначить Комиссию
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
                        setId(row?.id)
                        navigate(`/moresec/${row?.id}`)
                      }}
                    >
                      Подробнее
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            paginationCount={paginationCount}
            handlePage={handlePage}
          />
          <BasicModal
            open={open}
            handleClose={handleClose}
            id={id || null}
            formState={formState}
            moreInfo={moreInfo}
            setTeams={setTeams}
          />
        </TableContainer>
      )}
    </div>
  )
}

export default PersonalSec
