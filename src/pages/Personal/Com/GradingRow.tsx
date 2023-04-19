import { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

interface Criteria {
  criteria: {
    id: number
    description: string
  }
  setGrades: (grades: any) => void
}

const GradingRow = ({ criteria, setGrades }: Criteria) => {
  const [grade, setGrade] = useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setGrade(event.target.value as string)
    setGrades((grades: any) => {
      const newGrades = grades.filter(
        (item: any) => item.criteria !== criteria.id,
      )
      newGrades.push({
        criteria: Number(criteria.id),
        grade: Number(event.target.value),
      })
      return newGrades
    })
  }

  return (
    <TableRow key={criteria.id}>
      <TableCell width={1000}>
        {criteria.id}.{criteria.description}
      </TableCell>
      <TableCell>
        <Box
          sx={{ minWidth: 120 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id={`demo-simple-select-label-${criteria.id}`}>
              Баға
            </InputLabel>
            <Select
              labelId={`demo-simple-select-label-${criteria.id}`}
              id={`demo-simple-select-${criteria.id}`}
              value={grade}
              label="Grade"
              onChange={handleChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </TableCell>
    </TableRow>
  )
}
export default GradingRow