import { useState } from 'react'

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }

  const handleClose = () => setSnackbarOpen(false)

  return { snackbarOpen, snackbarMessage, showSnackbar, handleClose }
}

export default useSnackbar
