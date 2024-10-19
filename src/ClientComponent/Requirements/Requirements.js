import React from 'react'
import ReactTable from './ReactTable'
import { Typography } from '@mui/material'


const Requirements = () => {
  return (
    <>
      <Typography component={"div"} variant='h4' p={1} mt={2} fontWeight={"bold"}>Requirements</Typography>
      <ReactTable />
    </>
  )
}

export default Requirements