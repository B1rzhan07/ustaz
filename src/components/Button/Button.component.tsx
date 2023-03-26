import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { blue } from '@mui/material/colors'
type ButtonProps = {
  word: string
  onClick: () => void
}
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
})

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[800]),
  backgroundColor: blue[800],
  borderRadius: 50,
  padding: '10px 12px',
  marginLeft: '20px',
  '&:hover': {
    backgroundColor: blue[900],
  },
}))

export default function ButtonComponent({ word, onClick }: ButtonProps) {
  return (
    <>
      <ColorButton variant="contained" word={''} onClick={onClick}>
        {word}
      </ColorButton>
    </>
  )
}
