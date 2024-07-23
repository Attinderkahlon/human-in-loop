import { useState, useCallback } from 'react'
import { DataRecord } from '../types'
import { fetchAllRecords, fetchImage } from '../utils/helpers'
import useApi from './useApi'
import useSnackbar from './useSnackbar'

const useRecords = () => {
  const { fetchData } = useApi()
  const { showSnackbar } = useSnackbar()
  const [records, setRecords] = useState<DataRecord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageUrl, setImageUrl] = useState<string>('')

  const loadRecords = useCallback(async () => {
    try {
      const unverifiedRecords = await fetchAllRecords(fetchData)
      setRecords(unverifiedRecords)
      if (unverifiedRecords.length > 0) {
        const imageUrl = await fetchImage(unverifiedRecords[0].file_path)
        setImageUrl(imageUrl)
      }
    } catch (error) {
      showSnackbar((error as Error).message)
    }
  }, [fetchData, showSnackbar])

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
        showSnackbar((error as Error).message)
      }
    } else {
      showSnackbar('All records have been processed.')
    }
  }, [records, currentIndex, showSnackbar])

  return { records, currentIndex, imageUrl, loadRecords, moveToNextRecord }
}

export default useRecords
