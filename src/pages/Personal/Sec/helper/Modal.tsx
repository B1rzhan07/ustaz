import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import {
  Button,
  Container,
  Label,
  Props,
  Select,
  SelectedCommission,
  style,
  User,
} from './styless'
import Defences from '../../../../services/Defences'
import ClearIcon from '@mui/icons-material/Clear'
import { stages } from './styless'
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
  React.useEffect(() => {
    Defences.getCommissions().then((res) => {
      setCommissions(res.data)
    })
  }, [])
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

  const show = []
  for (let i = 0; i < selectedCommissions.length; i++) {
    for (let j = 0; j < commissions.length; j++) {
      if (selectedCommissions[i] === commissions[j].id) {
        show[i] = commissions[j]
      }
    }
  }
  const [stage, setStage] = useState<any>(null)
  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStage(event.target.value)
  }

  console.log(stage)
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
            <Container>
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
            </Container>
          )}
          {formState === 'submitted' && (
            <Container>
              <h4>
                ФИО: {moreInfo?.creator?.first_name}{' '}
                {moreInfo?.creator?.last_name} {moreInfo?.creator?.middle_name}
              </h4>
              <Button
                onClick={() => {
                  window.open(moreInfo?.creator?.applicationFormURL)
                }}
              >
                ApplicationURL
              </Button>
              <Button
                onClick={() => window.open(moreInfo?.creator?.presentationURL)}
              >
                presentationURL
              </Button>
              <Button
                onClick={() => {
                  window.open(moreInfo?.creator?.lessonRecordingURL)
                }}
              >
                lessonRecordingURL
              </Button>
              <h4>
                Defence has:{' '}
                {moreInfo?.defences?.length === 0 ? 'Not been set' : 'Been set'}
              </h4>

              {moreInfo?.defences?.length > 0 && (
                <>
                  {moreInfo?.defences?.map((defence: any, index: number) => (
                    <div key={defence.id}>
                      stage: {defence.stage.name} <br />
                      {defence?.grades?.length > 0 && (
                        <div>
                          {defence?.grades?.map((grade: any, index: number) => (
                            <>
                              <div key={grade.id}>
                                commission:{grade?.commission.first_name}{' '}
                                {grade?.commission.last_name} grade:
                                {grade?.grade}
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              <Button onClick={confirm}>Confirm make true</Button>
              <Button onClick={deleteTeam}>Delete</Button>
            </Container>
          )}
        </Box>
      </Modal>
    </div>
  )
}
