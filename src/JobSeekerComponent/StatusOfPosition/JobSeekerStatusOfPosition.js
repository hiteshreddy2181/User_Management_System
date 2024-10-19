import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ViewProfileTable from './ViewProfileTable'

const JobSeekerStatusOfPosition = () => {
  return (
    <Box>
      <Typography component={"div"} variant='h4' p={1} mt={2} fontWeight={"bold"}>Application Status</Typography>
      <ViewProfileTable />
    </Box>
  )
}

export default JobSeekerStatusOfPosition