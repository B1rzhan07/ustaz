import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Table } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 1,
  zIndex: 1000,
  p: 5,
};

export default function BasicModal({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: any;
  data: any;
}) {
  
  const handleClose = () => setOpen(false);
  console.log(data);
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography variant='h5' sx={{
            textAlign: 'center'
        
        }}>Оценки комиссий</Typography>
        
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {data && (
                <TableHead>
                  <TableRow>
                    <TableCell>Критерий</TableCell>
                    {data.map((commissionData: any, index: number) => (
                      <TableCell key={commissionData.commission.id} align="center">
                        {index+1}. {commissionData.commission.first_name} {commissionData.commission.last_name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {data && data[0]?.grades?.map((row: any, gradeIndex: number) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.criteria}
                    </TableCell>
                    {data.map((commissionData: any) => (
                      <TableCell key={commissionData.commission.id} align="center">
                        {commissionData.grades[gradeIndex].grade}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}
