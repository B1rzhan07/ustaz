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
import { fetchDefenceData } from '../../../store/Slices/defenceSlice'
import { useAppDispatch } from '../../../store/hook'
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

  const [stateToChange, setStateToChange] = React.useState('initial state')
  const handleClose = () => {
    setOpen(false)
    setStateToChange('new state')
  }
  const [curPage, setCurPage] = React.useState(1)
  const [postPerPage] = React.useState(12)
  const [formState, setFormState] = React.useState<
    'pending' | 'submitted' | 'error'
  >('submitted')
  const indexOfLastPost = curPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = teams.slice(indexOfFirstPost, indexOfLastPost)
  const paginationCount = Math.ceil(teams.length / postPerPage)
  function handlePage(pageNum: number) {
    setCurPage(pageNum)
  }
  const [id, setId] = React.useState<number | null>(null)
  const [moreInfo, setMoreInfo] = React.useState([])
  React.useEffect(() => {
    if (id !== null) {
      Defences.getMoreInfoSecretary(id).then((res) => {
        setMoreInfo(res.data)
        console.log(res.data)
      })
    }
  }, [id])
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchDefenceData(id))
  }, [dispatch, id])

  return (
    <div>
      <HeaderComponent />
      <TableContainer component={Paper} className="table">
        <Table sx={{ maxWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>Defense</TableCell>
              <TableCell>Больше информаций</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts.map((row: Team, index: number) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.id}. {row.creator.first_name} {row.creator.last_name}{' '}
                  {row.creator.middle_name}
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
                      setFormState('pending')
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
                      setOpen(true)
                      setId(row.id)
                      setFormState('submitted')
                    }}
                  >
                    более
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
