import { Typography } from '@mui/material'
import React from 'react'
import ViewProfileTable from './ViewProfileTable'

const ViewProfiles = () => {
  return (
    <>
      <Typography component={"div"} variant='h4' p={1} mt={2} fontWeight={"bold"}>View Profiles</Typography>
      <ViewProfileTable />
    </>
  )
}

export default ViewProfiles