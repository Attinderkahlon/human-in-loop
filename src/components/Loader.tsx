import React from 'react'
import { Container, Box, CircularProgress } from '@mui/material'

const Loader: React.FC = () => (
  <Container>
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  </Container>
)

export default Loader
