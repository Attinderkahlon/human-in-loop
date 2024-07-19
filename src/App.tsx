interface DataRecord {
  break_1_finish: string | null
  break_1_start: string | null
  break_1_time: string | null
  break_2_finish: string | null
  break_2_start: string | null
  break_2_time: string | null
  break_3_time: string | null
  clock_off_time: string
  clock_on_time: string
  date: string
  driver_license: string | null
  driver_name: string
  file_path: string
  form_type: string
  human_check: number
  id: number
  odo_finish: string
  odo_start: string
  total_km: string
  total_rest: string | null
  total_work: string | null
  truck_rego_number: string | null
}

import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import {
  Button,
  Grid,
  Typography,
  TextField,
  Snackbar,
  Paper,
  Box,
  Container,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import useApi from './hooks/useApi'
import validationSchema from './validationSchema'

interface DataRecord {
  break_1_finish: string | null
  break_1_start: string | null
  break_1_time: string | null
  break_2_finish: string | null
  break_2_start: string | null
  break_2_time: string | null
  break_3_time: string | null
  clock_off_time: string
  clock_on_time: string
  date: string
  driver_license: string | null
  driver_name: string
  file_path: string
  form_type: string
  human_check: number
  id: number
  odo_finish: string
  odo_start: string
  total_km: string
  total_rest: string | null
  total_work: string | null
  truck_rego_number: string | null
}

const App: React.FC = () => {
  const [records, setRecords] = useState<DataRecord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { loading, error, fetchData } = useApi()

  useEffect(() => {
    fetchAllRecords()
  }, [])

  const fetchAllRecords: () => Promise<void> = async () => {
    try {
      const data: DataRecord[] = await fetchData(
        import.meta.env.VITE_API_DATA_URL
      )
      const unverifiedRecords = data.filter(
        (record) => record.human_check === 0
      )
      setRecords(unverifiedRecords)
      if (unverifiedRecords.length > 0) {
        fetchImage(unverifiedRecords[0].file_path)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setSnackbarMessage('Error fetching data. Please try again.')
      setSnackbarOpen(true)
    }
  }

  const fetchImage = async (imagePath: string) => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_IMAGE_URL, {
        params: { path: imagePath },
        responseType: 'blob',
      })
      const imageUrl = URL.createObjectURL(new Blob([response.data]))
      setImageUrl(imageUrl)
    } catch (error) {
      console.error('Error fetching image:', error)
      setSnackbarMessage('Error fetching image. Please try again.')
      setSnackbarOpen(true)
    }
  }

  const handleApprove = async (values: DataRecord) => {
    try {
      const updatedRecord = { ...values, human_check: 1 }
      // await postData(import.meta.env.VITE_API_APPROVE_URL, updatedRecord)
      console.log('Approving data:', updatedRecord)
      setSnackbarMessage('Record approved successfully.')
      setSnackbarOpen(true)
      moveToNextRecord()
    } catch (error) {
      console.error('Error approving data:', error)
      setSnackbarMessage('Error approving data. Please try again.')
      setSnackbarOpen(true)
    }
  }

  const moveToNextRecord = () => {
    const unverifiedRecords = records.filter(
      (_, index) => index !== currentIndex
    )
    setRecords(unverifiedRecords)
    if (unverifiedRecords.length > 0) {
      setCurrentIndex(0)
      fetchImage(unverifiedRecords[0].file_path)
      setIsEditing(false) // Reset the editing state
    } else {
      setSnackbarMessage('All records have been processed.')
      setSnackbarOpen(true)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleImageClick = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  if (loading) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight='100vh'
        >
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
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
  }

  if (records.length === 0) {
    return (
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
  }

  const currentRecord = records[currentIndex]

  return (
    <Container>
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            Record Verification
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Formik
              key={currentRecord.id} // Ensure formik reinitializes on record change
              initialValues={currentRecord}
              validationSchema={validationSchema}
              onSubmit={handleApprove}
            >
              {({ values, errors, touched, isSubmitting, handleChange }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Driver Name'
                        name='driver_name'
                        value={values.driver_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={
                          touched.driver_name && Boolean(errors.driver_name)
                        }
                        helperText={touched.driver_name && errors.driver_name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Date'
                        name='date'
                        value={values.date}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.date && Boolean(errors.date)}
                        helperText={touched.date && errors.date}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Clock On Time'
                        name='clock_on_time'
                        value={values.clock_on_time}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={
                          touched.clock_on_time && Boolean(errors.clock_on_time)
                        }
                        helperText={
                          touched.clock_on_time && errors.clock_on_time
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Clock Off Time'
                        name='clock_off_time'
                        value={values.clock_off_time}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={
                          touched.clock_off_time &&
                          Boolean(errors.clock_off_time)
                        }
                        helperText={
                          touched.clock_off_time && errors.clock_off_time
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='ODO Start'
                        name='odo_start'
                        value={values.odo_start}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.odo_start && Boolean(errors.odo_start)}
                        helperText={touched.odo_start && errors.odo_start}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='ODO Finish'
                        name='odo_finish'
                        value={values.odo_finish}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.odo_finish && Boolean(errors.odo_finish)}
                        helperText={touched.odo_finish && errors.odo_finish}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='Total KM'
                        name='total_km'
                        value={values.total_km}
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={touched.total_km && Boolean(errors.total_km)}
                        helperText={touched.total_km && errors.total_km}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display='flex' justifyContent='space-between'>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          disabled={isSubmitting}
                        >
                          Approve
                        </Button>
                        {!isEditing && (
                          <Button
                            onClick={handleEdit}
                            variant='outlined'
                            color='secondary'
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            {imageUrl && (
              <>
                <img
                  src={imageUrl}
                  alt='Record'
                  style={{ maxWidth: '100%', cursor: 'pointer' }}
                  onClick={handleImageClick}
                />
                <Dialog
                  open={isDialogOpen}
                  onClose={handleDialogClose}
                  maxWidth='lg'
                >
                  <DialogContent style={{ position: 'relative' }}>
                    <IconButton
                      style={{ position: 'absolute', top: 10, right: 10 }}
                      onClick={handleDialogClose}
                    >
                      <CloseIcon />
                    </IconButton>
                    <img
                      src={imageUrl}
                      alt='Enlarged Record'
                      style={{ width: '100%' }}
                    />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  )
}

export default App
