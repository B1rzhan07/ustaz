import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderComponent from './Header/Header.component';

import { Button, CircularProgress } from '@mui/material';
import BasicModal from './ModalFinal';
import { useGetFinalistsQuery, useGetSecretaryGradeByIdQuery } from '../store/feautures/getFinalGrades';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [id, setId] = React.useState<any>(null)
    const [defeces, setDefeces] = React.useState<any>([])
    const {data: teams, isLoading: isLoadteams}=useGetFinalistsQuery()    
    const { data, error, isLoading } = useGetSecretaryGradeByIdQuery(id)
    
  return (
    <>
    <HeaderComponent />
    <TableContainer component={Paper} sx={{ 
        padding: '20px',
    }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ФИО</StyledTableCell>
            <StyledTableCell >Предмет</StyledTableCell>
            <StyledTableCell>Число комиссий оценивших</StyledTableCell>
            <StyledTableCell >Финальная оценка</StyledTableCell>
            <StyledTableCell >Подробнее</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                isLoadteams ? <CircularProgress sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                
                }} /> :
                teams && teams.map((row: any, index: number) => (
                    <StyledTableRow sx={{
                        textAlign: 'center'
                    }}
                     key={row.name}>
                      <StyledTableCell >
                        {index+1}. {row.fullName}
                      </StyledTableCell>
                      <StyledTableCell>{row.subject}</StyledTableCell>
                      <StyledTableCell>{row.graded}</StyledTableCell>
                      <StyledTableCell>{Number(row.grade).toFixed(1)
                        }</StyledTableCell>
                      <StyledTableCell><Button variant='contained' onClick={()=>{
                        setOpen(true)
                        console.log(row.defenceId);
                        setId(row.defenceId)
                    }}
                    
                      >Подробнее</Button></StyledTableCell>
                    </StyledTableRow>
                  ))
            }
          {/* {teams && teams.map((row: any, index: number) => (
            <StyledTableRow sx={{
                textAlign: 'center'
            }}
             key={row.name}>
              <StyledTableCell >
                {index+1}. {row.fullName}
              </StyledTableCell>
              <StyledTableCell>{row.subject}</StyledTableCell>
              <StyledTableCell>{row.graded}</StyledTableCell>
              <StyledTableCell>{Number(row.grade).toFixed(1)
                }</StyledTableCell>
              <StyledTableCell><Button variant='contained' onClick={()=>{
                setOpen(true)
                console.log(row.defenceId);
                setId(row.defenceId)
            }}
            
              >Подробнее</Button></StyledTableCell>
            </StyledTableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    {
        isLoading ? <CircularProgress sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        
        }} /> :
            <BasicModal open={open} setOpen={setOpen} data={data}
            />
    }
    </>
  );
}