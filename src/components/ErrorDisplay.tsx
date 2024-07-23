import React from 'react'
import { Container, Box, Typography } from '@mui/material'

interface ErrorDisplayProps {
  error: string
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
  <Container>
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography color='error'>{error}</Typography>
    </Box>
  </Container>
)

export default ErrorDisplay
