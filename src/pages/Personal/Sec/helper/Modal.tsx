import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import {
  Button,
  Label,
  Props,
  Select,
  SelectedCommission,
  style,
  User,
} from './styless'
import { Slider } from '@mui/material'
import Typography from '@mui/material/Typography'
import Defences from '../../../../services/Defences'
import ClearIcon from '@mui/icons-material/Clear'
import { stages } from './styless'
import Secretary from '../../../../services/Secretary'
export default function BasicModal({
  open,
  handleClose,
  id,
  formState,
  moreInfo,
  setTeams,
}: Props) {
  const [selectedCommissions, setSelectedCommissions] = useState<any[]>([])
  const [commissions, setCommissions] = useState<User[]>([])
  const [defences, setDefences] = useState<any>([])
  React.useEffect(() => {
    Defences.getCommissions().then((res) => {
      setCommissions(res.data)
    })
    Defences.getSecretaryDefence().then((res) => {
      setDefences(res.data)
    })
  }, [])
  const [isDefence, setIsDefence] = useState<any>([])
  React.useEffect(() => {
    if (id) {
      Secretary.getDefence(defenceId).then((res) => {
        setIsDefence(res.data)
      })
    }
  }, [id])

  const defense = defences.find(
    (d: any) => d?.team?.toString() === moreInfo?.team?.name.toString(),
  )
  var defenceId = defense?.id

  const handleCommissionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCommission = Number(event.target.value)

    if (
      !selectedCommissions.includes(newCommission) &&
      selectedCommissions.length < 3
    ) {
      setSelectedCommissions([...selectedCommissions, newCommission])
    } else if (selectedCommissions.includes(newCommission)) {
      setSelectedCommissions(
        selectedCommissions.filter((id) => id !== newCommission),
      )
    }
  }
  const [grade, setGrade] = useState<number>(0)
  const handleChange = (event: Event, value: number | number[]) => {
    setGrade(value as number)
  }

  const show = commissions.filter((commission) =>
    selectedCommissions.includes(commission.id),
  )

  const [stage, setStage] = useState<any>(null)
  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStage(event.target.value)
  }

  const setDefence = () => {
    Defences.createDefence(selectedCommissions, id, stage).then((res) => {
      console.log(res)
      setSelectedCommissions([])
    })
    handleClose()
    setSelectedCommissions([])
  }

  const confirm = () => {
    Defences.updateTeamConfirmation(id)
      .then((res) => {
        console.log(res)
        handleClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteTeam = () => {
    Defences.deleteTeam(id)
      .then((res) => {
        console.log(res)
        setTeams((prev: any) => prev.filter((team: any) => team.id !== id))
        handleClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const setFinalGrade = () => {
    Defences.setFinalGrade(defenceId, moreInfo.creator.id, grade)
    Defences.getSecrataryGrade(id)
  }

  const updateDefence = () => {}
  console.log(moreInfo)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {formState === 'pending' && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Label htmlFor="commission-select">Select Commission:</Label>
              <Select
                id="commission-select"
                value=""
                onChange={handleCommissionChange}
              >
                <option value="" disabled>
                  Select Commission
                </option>
                {commissions
                  .filter(
                    (commission) =>
                      !selectedCommissions.includes(Number(commission.id)),
                  )
                  .map((commission) => (
                    <>
                      {selectedCommissions.length === 3 ? (
                        <option
                          key={commission.id}
                          value={commission.id}
                          disabled
                        >
                          {commission.first_name} {commission.last_name}{' '}
                        </option>
                      ) : (
                        <option key={commission.id} value={commission.id}>
                          {commission.first_name} {commission.last_name}{' '}
                        </option>
                      )}
                    </>
                  ))}
              </Select>
              {show?.map((commission, index: number) => (
                <>
                  <SelectedCommission key={index}>
                    {commission.first_name} {commission.last_name}{' '}
                    <ClearIcon
                      sx={{
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        setSelectedCommissions(
                          selectedCommissions.filter(
                            (id) => id !== commission.id,
                          ),
                        )
                      }
                    />
                  </SelectedCommission>
                </>
              ))}
              <Label htmlFor="commission-select">Select Stage:</Label>
              <Select
                id="commission-select"
                value={stage}
                onChange={handleStageChange}
              >
                <option value="" disabled>
                  Select Stage
                </option>
                {stages.map((commission: any) => (
                  <option value={commission.id}>{commission.name}</option>
                ))}
              </Select>
              <Button onClick={setDefence}>Set Defence</Button>
              {defenceId && (
                <Button onClick={updateDefence}>UpdateDefence</Button>
              )}
            </div>
          )}
          {formState === 'submitted' && (
            <div
              style={
                moreInfo?.defences?.length > 0
                  ? { display: 'flex', flexDirection: 'row' }
                  : {}
              }
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexBasis: '50%',
                }}
              >
                <div
                  style={{
                    marginBottom: '20px',
                    margin: '0.5rem 0',
                    border: '1px solid #ccc',
                    borderRadius: '1rem',
                    padding: '1rem',
                  }}
                >
                  <h3>
                    ФИО: {moreInfo?.team?.creator?.first_name}{' '}
                    {moreInfo?.team?.creator?.last_name}{' '}
                    {moreInfo?.team?.creator?.middle_name}
                  </h3>
                  <p>Дата Рождения: {moreInfo?.team?.creator?.birthDate}</p>
                  <p>Email: {moreInfo?.creator?.email}</p>
                  <p>
                    Фото:{' '}
                    {moreInfo?.creator?.profilePhoto ? 'Есть' : 'Не указано'}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '30px',
                  }}
                >
                  <Button
                    style={{ flex: 1, margin: '0 10px' }}
                    onClick={() =>
                      window.open(moreInfo?.creator?.applicationFormURL)
                    }
                  >
                    Application URL
                  </Button>
                  <Button
                    style={{ flex: 1, margin: '0 10px' }}
                    onClick={() =>
                      window.open(moreInfo?.creator?.presentationURL)
                    }
                  >
                    Presentation URL
                  </Button>
                  <Button
                    style={{ flex: 1, margin: '0 10px' }}
                    onClick={() =>
                      window.open(moreInfo?.creator?.lessonRecordingURL)
                    }
                  >
                    Lesson Recording URL
                  </Button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Button
                    style={{
                      background: '#4caf50',
                      color: '#fff',
                      margin: '0 10px',
                    }}
                    onClick={confirm}
                  >
                    Подтвердить
                  </Button>
                  <Button
                    style={{
                      background: '#f44336',
                      color: '#fff',
                      margin: '0 10px',
                    }}
                    onClick={deleteTeam}
                  >
                    Удалить
                  </Button>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  flexBasis: '50%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem',
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ marginBottom: '1rem' }}
                  >
                    Defences
                  </Typography>
                  {moreInfo?.defences?.length > 0 ? (
                    moreInfo.defences.map((defence: any) => (
                      <div
                        key={defence.id}
                        style={{
                          margin: '0.5rem 0',
                          border: '1px solid #ccc',
                          borderRadius: '0.5rem',
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1" gutterBottom>
                          Stage: {defence.stage.name}
                        </Typography>
                        {defence.grades.length > 0 ? (
                          defence.grades.map((grade: any, index: number) => (
                            <Typography
                              key={grade.id}
                              variant="body2"
                              gutterBottom
                            >
                              {index + 1}. Оценил: {grade.commission.first_name}{' '}
                              {grade.commission.last_name},{' '}
                              <b>grade: {grade.grade}</b>
                            </Typography>
                          ))
                        ) : (
                          <Typography variant="body2" gutterBottom>
                            No grades available
                          </Typography>
                        )}
                      </div>
                    ))
                  ) : (
                    <Typography variant="body1" gutterBottom>
                      No defences available
                    </Typography>
                  )}
                </div>
                {moreInfo?.defences?.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      margin: '1rem',
                    }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ marginBottom: '1rem' }}
                    >
                      Final Grade: {grade}
                    </Typography>
                    <Slider
                      value={grade}
                      min={0}
                      max={100}
                      step={1}
                      onChange={handleChange}
                      aria-labelledby="continuous-slider"
                      style={{ width: '50%', marginBottom: '1rem' }}
                    />
                    <Button onClick={setFinalGrade}>Set Final Grade</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
