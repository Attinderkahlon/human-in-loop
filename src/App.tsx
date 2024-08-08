import React, { useState, useEffect, useCallback } from 'react'
import { Typography, Snackbar, Switch } from '@mui/material'
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
  const [darkMode, setDarkMode] = useState(true)

  const loadRecords = useCallback(async () => {
    try {
      const unverifiedRecords = await fetchAllRecords(fetchData)
      const modifiedRecords = unverifiedRecords.map((record) => ({
        ...record,
        driver_signature: record.driver_signature === null ? 'no' : 'yes',
      }))
      setRecords(modifiedRecords)
      if (modifiedRecords.length > 0) {
        const { imageUrl, error } = await fetchImage(
          modifiedRecords[0].file_path
        )
        if (error) {
          setSnackbarMessage(error)
          setSnackbarOpen(true)
        } else {
          setImageUrl(imageUrl ?? ('' as string)) // Cast imageUrl to string
        }
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
        const { imageUrl } = await fetchImage(unverifiedRecords[0].file_path)
        setImageUrl(imageUrl ?? ('' as string)) // Cast imageUrl to string
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
    <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
      <div className='container px-4 py-8 mx-auto'>
        <div className='flex flex-col space-y-8'>
          <div className='flex items-center justify-between'>
            <Typography variant='h4' className='text-2xl font-bold'>
              Record Verification
            </Typography>
            <div className='flex items-center space-x-2'>
              <span>Dark Mode</span>
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>

          <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8'>
            <div className='w-full lg:w-[30%]'>
              <RecordForm
                record={currentRecord}
                formType={currentRecord.form_type}
                onSubmit={onApprove}
                isEditing={isEditing}
                onEdit={handleEdit}
              />
            </div>
            <div className='w-full lg:w-[70%]'>
              <ImageViewer imageUrl={imageUrl} />
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  )
}

export default App
