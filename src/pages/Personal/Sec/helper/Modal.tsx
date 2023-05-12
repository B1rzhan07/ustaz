import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import {
  Label,
  Props,
  Select,
  SelectedCommission,
  style,
  User,
} from './styless'
import Button from '@mui/material/Button'
import { Slider } from '@mui/material'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'
import { stages } from './styless'
import Secretary from '../../../../services/Secretary'
import Defences from '../../../../services/Defences'

export default function BasicModal({
  open,
  handleClose,
  id,
  formState,
  moreInfo,
  setTeams,
}: Props) {
  const [stage, setStage] = useState<any>(null)
  const [selectedCommissions, setSelectedCommissions] = useState<any[]>([])
  const [commissions, setCommissions] = useState<User[]>([])

  var subjectId: number
  React.useEffect(() => {
    if (moreInfo?.team?.creator?.subject) {
      subjectId = moreInfo?.team?.creator?.subject?.id
    }
  }, [moreInfo])

  React.useEffect(() => {
    if (subjectId) {
      Defences.getCommissions(subjectId).then((res) => {
        setCommissions(res.data)
      })
    }
  }, [moreInfo])

  const handleCommissionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCommission = Number(event.target.value)

    if (
      !selectedCommissions.includes(newCommission) &&
      selectedCommissions.length < 5
    ) {
      setSelectedCommissions([...selectedCommissions, newCommission])
    } else if (selectedCommissions.includes(newCommission)) {
      setSelectedCommissions(
        selectedCommissions.filter((id) => id !== newCommission),
      )
    }
  }
  React.useEffect(() => {
    if (!open) {
      setSelectedCommissions([])
      setStage('')
    }
  }, [open])

  const [grade, setGrade] = useState<number>(0)

  const show = commissions.filter((commission) =>
    selectedCommissions.includes(commission.id),
  )

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStage(event.target.value)
  }

  const setDefence = async () => {
    await Defences.createDefence(selectedCommissions, id, stage).then(
      async (res) => {
        await Defences.updateTeamConfirmation(Number(id))
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        await Defences.getTeams().then((res) => {
          setTeams(res.data)
          localStorage.setItem('teams', JSON.stringify(res.data))
        })
        setSelectedCommissions([])
      },
    )
    handleClose()
    setSelectedCommissions([])
  }
  var ids = moreInfo?.defences?.find(
    (defence: any) => Number(defence.stage.id) === Number(stage),
  )?.id
  console.log('stage', stage)
  console.log('ids', ids)
  const updateDefence = () => {
    var ids = moreInfo?.defences?.find(
      (defence: any) => Number(defence.stage.id) === Number(stage),
    )?.id
    console.log('stage', stage)
    console.log('ids', ids)

    Secretary.updateDefence(ids, selectedCommissions, stage)
      .then((res) => {
        setSelectedCommissions([])
        handleClose()
        alert('Комиссий поменялись')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log('moreInfo', moreInfo)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  color: 'grey',
                }}
              >
                ФИО:{' '}
                {moreInfo?.team?.creator?.first_name.charAt(0).toUpperCase() +
                  moreInfo?.team?.creator?.first_name.slice(1)}{' '}
                {moreInfo?.team?.creator?.last_name.charAt(0).toUpperCase() +
                  moreInfo?.team?.creator?.last_name.slice(1)}{' '}
              </h2>
              {moreInfo?.defences?.length > 0 ? (
                <div>
                  <h2>Defences уже есть</h2>
                  <div>
                    Stage 1:{' '}
                    {moreInfo?.defences.find(
                      (defence: any) => defence.stage.id == 1,
                    ) ? (
                      <b
                        style={{
                          color: 'red',
                        }}
                      >
                        Коммиссий назначены
                      </b>
                    ) : (
                      <b>Коммиссий не назначены</b>
                    )}
                  </div>
                  <div>
                    Stage 2:{' '}
                    {moreInfo?.defences.find(
                      (defence: any) => defence.stage.id == 2,
                    ) ? (
                      <b
                        style={{
                          color: 'red',
                        }}
                      >
                        Коммиссий назначены
                      </b>
                    ) : (
                      <b>Коммиссий не назначены</b>
                    )}
                  </div>
                  <div>
                    Stage 3:{' '}
                    {moreInfo?.defences.find(
                      (defence: any) => defence.stage.id == 3,
                    ) ? (
                      <b
                        style={{
                          color: 'red',
                        }}
                      >
                        Коммиссий назначены
                      </b>
                    ) : (
                      <b>Коммиссий не назначены</b>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h2>Defences нет, создайте</h2>
                </div>
              )}
            </div>
            {moreInfo?.team?.creator?.subject ? (
              <>
                <Label htmlFor="commission-select"></Label>
                <Select
                  id="commission-select"
                  value=""
                  onChange={handleCommissionChange}
                >
                  <option value="" disabled>
                    Выберите Комиссию:
                  </option>
                  {commissions
                    .filter(
                      (commission) =>
                        !selectedCommissions.includes(Number(commission.id)),
                    )
                    .map((commission) => (
                      <>
                        {selectedCommissions.length === 5 ? (
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
              </>
            ) : (
              <h4
                style={{
                  color: 'blue',
                }}
              >
                Не указал предмет участия
              </h4>
            )}

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
            {moreInfo?.team?.creator?.subject && (
              <>
                <Label htmlFor="commission-select">Выберите Stage:</Label>
                <Select
                  id="commission-select"
                  value={stage}
                  onChange={handleStageChange}
                >
                  <option value="">Выберите Stage:</option>
                  {stages.map((stage: any) => (
                    <option value={stage.id}>{stage.name}</option>
                  ))}
                </Select>
              </>
            )}
            <Button
              disabled={
                moreInfo?.defences?.length === 3 ||
                moreInfo?.team?.creator?.subject === null
                  ? true
                  : false
              }
              variant="contained"
              onClick={setDefence}
            >
              Создать Defence
            </Button>

            {/* <Button
              disabled={moreInfo?.defences?.length === 0 ? true : false}
              style={{
                marginTop: '20px',
              }}
              variant="contained"
              onClick={updateDefence}
            >
              Изменить Defence
            </Button> */}
            <hr
              style={{
                width: '100%',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: ' space-around',
              }}
            >
              <Button
                variant="contained"
                onClick={
                  moreInfo?.team?.applicationFormURL
                    ? () => window.open(moreInfo?.team?.applicationFormURL)
                    : () => {}
                }
                disabled={
                  moreInfo?.team?.applicationFormURL === null ? true : false
                }
              >
                Өтініш формасы
              </Button>
              <Button
                variant="contained"
                onClick={
                  moreInfo?.team?.articleURL
                    ? () => window.open(moreInfo?.team?.articleURL)
                    : () => {}
                }
                disabled={moreInfo?.team?.articleURL === null ? true : false}
              >
                Мәтіндік Мақала
              </Button>
              <Button
                variant="contained"
                onClick={
                  moreInfo?.team?.curriculumURL
                    ? () => window.open(moreInfo?.team?.curriculumURL)
                    : () => {}
                }
                disabled={moreInfo?.team?.curriculumURL === null ? true : false}
              >
                ҚМЖ
              </Button>
              <Button
                variant="contained"
                onClick={
                  moreInfo?.team?.presentationURL
                    ? () => window.open(moreInfo?.team?.presentationURL)
                    : () => {}
                }
                disabled={
                  moreInfo?.team?.presentationURL === null ? true : false
                }
              >
                Мультиметиялық мақала
              </Button>
              {/* <Button
                variant="contained"
                onClick={
                  moreInfo?.team?.applicationFormURL
                    ? () => window.open(moreInfo?.team?.lessonRecordingURL)
                    : () => {}
                }
                disabled={
                  moreInfo?.team?.lessonRecordingURL === null ? true : false
                }
              >
                сабақтың записы
              </Button> */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
