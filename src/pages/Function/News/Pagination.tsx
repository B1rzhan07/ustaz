import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  ul: {
    '& .MuiPaginationItem-icon': {
      display: 'none',
    },
  },
}))
type BasicPaginationProps = {
  paginationCount: number
  handlePage: (pageNum: number) => void
}
export default function BasicPagination({
  paginationCount,
  handlePage,
}: BasicPaginationProps) {
  const classes = useStyles()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <Stack spacing={2} direction="row">
        <Pagination
          count={paginationCount}
          color="primary"
          size="large"
          sx={{ marginBottom: '40px' }}
          onChange={(e: any) => handlePage(e.target.textContent)}
          classes={{ ul: classes.ul }}
        ></Pagination>
      </Stack>
    </div>
  )
}
