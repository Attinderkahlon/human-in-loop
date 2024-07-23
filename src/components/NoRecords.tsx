import React from 'react'
import { Container, Box, Typography } from '@mui/material'

const NoRecords: React.FC = () => (
  <Container>
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography>No records to verify.</Typography>
    </Box>
  </Container>
)

export default NoRecords
