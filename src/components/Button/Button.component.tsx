import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
type ButtonProps = {
  word: string | false | null
  onClick: () => void
  other?: string
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#3E58E8'),
  backgroundColor: '#3E58E8',
  borderRadius: 50,
  padding: '10px 12px',
  marginLeft: '20px',
  '&:hover': {
    backgroundColor: '#3E58E8',
  },
  width: '50%',
}))

export default function ButtonComponent({ word, onClick, other }: ButtonProps) {
  return (
    <>
      <ColorButton
        other={other}
        variant="contained"
        word={''}
        onClick={onClick}
      >
        {word}
      </ColorButton>
    </>
  )
}
