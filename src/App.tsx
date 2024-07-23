import React, { useState, useEffect, useCallback } from 'react'
import {
  Grid,
  Typography,
  Snackbar,
  Box,
  Container,
  Switch,
} from '@mui/material'
import useApi from './hooks/useApi'
import { DataRecord } from './types'
import { fetchAllRecords, fetchImage, handleApprove } from './utils/helpers'
import RecordForm from './components/RecordForm'
import ImageViewer from './components/ImageViewer'
import Loader from './components/Loader'
import ErrorDisplay from './components/ErrorDisplay'
import NoRecords from './components/NoRecords'

const App: React.FC = () => {
  const { loading, error, fetchData, postData } = useApi()
  const [records, setRecords] = useState<DataRecord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const loadRecords = useCallback(async () => {
    try {
      const unverifiedRecords = await fetchAllRecords(fetchData)
      setRecords(unverifiedRecords)
      if (unverifiedRecords.length > 0) {
        const imageUrl = await fetchImage(unverifiedRecords[0].file_path)
        setImageUrl(imageUrl)
      }
    } catch (error) {
      setSnackbarMessage((error as Error).message)
      setSnackbarOpen(true)
    }
  }, [fetchData])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  const moveToNextRecord = useCallback(async () => {
    const unverifiedRecords = records.filter(
      (_, index) => index !== currentIndex
    )
    setRecords(unverifiedRecords)
    if (unverifiedRecords.length > 0) {
      setCurrentIndex(0)
      try {
        const imageUrl = await fetchImage(unverifiedRecords[0].file_path)
        setImageUrl(imageUrl)
      } catch (error) {
        setSnackbarMessage((error as Error).message)
        setSnackbarOpen(true)
      }
      setIsEditing(false)
    } else {
      setSnackbarMessage('All records have been processed.')
      setSnackbarOpen(true)
    }
  }, [records, currentIndex])

  const onApprove = useCallback(
    async (values: DataRecord) => {
      try {
        await handleApprove(postData, values)
        setSnackbarMessage('Record approved successfully.')
        setSnackbarOpen(true)
        moveToNextRecord()
      } catch (error) {
        setSnackbarMessage((error as Error).message)
        setSnackbarOpen(true)
      }
    },
    [postData, moveToNextRecord]
  )

  const handleEdit = () => setIsEditing(true)

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  if (records.length === 0) {
    return <NoRecords />
  }

  const currentRecord = records[currentIndex]

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Container>
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='space-between' marginBottom={4}>
              <Typography variant='h4' gutterBottom>
                Record Verification
              </Typography>
              <div>
                Dark Mode
                <Switch
                  checked={darkMode}
                  onChange={() => {
                    setDarkMode(!darkMode)
                  }}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <RecordForm
              record={currentRecord}
              onSubmit={onApprove}
              isEditing={isEditing}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ImageViewer imageUrl={imageUrl} />
          </Grid>
        </Grid>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </div>
  )
}

export default App
