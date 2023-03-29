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

export default function BasicModal({
  open,
  handleClose,
  commissions,
  id,
}: Props) {
  const [selectedCommissions, setSelectedCommissions] = useState<any[]>([])

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

  console.log(show)
  console.log(id)
  console.log(selectedCommissions)

  const setDefence = () => {
    Defences.createDefence(selectedCommissions, id).then((res) => {
      console.log(res)
      setSelectedCommissions([])
    })
    handleClose()
    setSelectedCommissions([])
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
            {show?.map((commission) => (
              <>
                <SelectedCommission>
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
            <Button onClick={setDefence}>Set Defence</Button>
          </Container>
        </Box>
      </Modal>
    </div>
  )
}
